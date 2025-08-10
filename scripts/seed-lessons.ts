import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { createClient } from '@supabase/supabase-js';
import { lesson, lessonLanguage, lessonAward, lessonCertification } from '../lib/server/schema/lesson';
import { user } from '../lib/server/schema/auth';
import { nanoid } from 'nanoid';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';
import 'dotenv/config';
import { sql } from 'drizzle-orm';

// Check required environment variables
function checkEnvironmentVariables() {
  const requiredVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease create a .env.local file with these variables.');
    console.error('See env.example for reference.');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded successfully');
}

// Initialize Drizzle database connection
function initializeDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  
  const sql = neon(databaseUrl);
  const db = drizzle(sql);
  
  return db;
}

// Initialize Supabase client
function initializeSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials are not set');
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

// Upload file to Supabase storage
async function uploadFileToSupabase(file: File, supabase: any) {
  const extension = file.name.split(".").pop();
  const fileName = `${nanoid()}.${extension}`;

  const { error } = await supabase.storage
    .from("learnway-attachment")
    .upload(fileName, file);

  if (error) {
    return { error };
  }

  const { data: urlData } = supabase.storage
    .from("learnway-attachment")
    .getPublicUrl(fileName);

  return { url: urlData.publicUrl, error: null };
}

// Fetch random user IDs from the user table
async function getRandomUserIds(db: any, count: number): Promise<string[]> {
  try {
    const users = await db.select({ id: user.id }).from(user);
    
    if (users.length === 0) {
      console.warn('⚠️  No users found in the user table. Using fallback creator IDs.');
      return Array.from({ length: count }, (_, i) => `fallback-user-${i + 1}`);
    }
    
    // Shuffle the users and take the required count
    const shuffledUsers = users.sort(() => Math.random() - 0.5);
    const selectedUsers = shuffledUsers.slice(0, count);
    
    // If we need more IDs than available users, repeat some
    const userIds: string[] = [];
    for (let i = 0; i < count; i++) {
      userIds.push(selectedUsers[i % selectedUsers.length].id);
    }
    
    console.log(`✅ Fetched ${userIds.length} user IDs for lesson creation`);
    return userIds;
  } catch (error) {
    console.error('Error fetching user IDs:', error);
    console.warn('⚠️  Using fallback creator IDs due to error.');
    return Array.from({ length: count }, (_, i) => `fallback-user-${i + 1}`);
  }
}

interface Teacher {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews_count: number;
  status: string;
  subject: string;
  description: string;
  pricing: string;
  offers: string;
  image_url: string;
  scraped_at: string;
  source_url: string;
}

async function downloadImage(url: string, filePath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`Failed to download image: ${response.statusCode}`);
        file.close();
        fs.unlinkSync(filePath);
        resolve(false);
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
      
      file.on('error', (err) => {
        console.error(`Error writing file: ${err}`);
        fs.unlinkSync(filePath);
        resolve(false);
      });
    }).on('error', (err) => {
      console.error(`Error downloading image: ${err}`);
      resolve(false);
    });
  });
}

async function createTempFileFromUrl(url: string): Promise<string | null> {
  try {
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const fileName = `${nanoid()}.jpg`;
    const filePath = path.join(tempDir, fileName);
    
    const success = await downloadImage(url, filePath);
    if (success) {
      return filePath;
    }
    return null;
  } catch (error) {
    console.error(`Error creating temp file: ${error}`);
    return null;
  }
}

async function seedLessons() {
  try {
    console.log('Starting to seed lessons...');
    
    // Check environment variables first
    checkEnvironmentVariables();
    
    // Initialize database and Supabase connections
    const db = initializeDatabase();
    const supabase = initializeSupabase();
    
    // Test database connection
    console.log('Testing database connection...');
    try {
      await db.execute(sql`SELECT 1`);
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      console.error('Please check your DATABASE_URL and ensure the database is accessible.');
      process.exit(1);
    }
    
    // Test Supabase connection
    console.log('Testing Supabase connection...');
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) {
        throw error;
      }
      console.log('✅ Supabase connection successful');
    } catch (supabaseError) {
      console.error('❌ Supabase connection failed:', supabaseError);
      console.error('Please check your Supabase credentials and ensure the project is accessible.');
      process.exit(1);
    }
    
    // Open SQLite database
    const sqliteDb = await open({
      filename: './superprof_teachers.db',
      driver: sqlite3.Database
    });
    
    // Get all teachers from SQLite
    const teachers: Teacher[] = await sqliteDb.all('SELECT * FROM teachers');
    console.log(`Found ${teachers.length} teachers to seed`);
    
    // Fetch random user IDs for lesson creation
    const userIds = await getRandomUserIds(db, teachers.length);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < teachers.length; i++) {
      const teacher = teachers[i];
      const userId = userIds[i];
      
      try {
        console.log(`Processing teacher: ${teacher.name} (Creator: ${userId})`);
        
        let imageUrl = null;
        
        // Download and upload image if available
        if (teacher.image_url) {
          try {
            console.log(`Downloading image for ${teacher.name} from: ${teacher.image_url}`);
            const tempFilePath = await createTempFileFromUrl(teacher.image_url);
            
            if (tempFilePath) {
              // Create a File object from the temp file
              const fileBuffer = fs.readFileSync(tempFilePath);
              const file = new File([fileBuffer], 'image.jpg', { type: 'image/jpeg' });
              
              // Upload to Supabase
              const uploadResult = await uploadFileToSupabase(file, supabase);
              
              if (uploadResult.url) {
                imageUrl = uploadResult.url;
                console.log(`Image uploaded successfully for ${teacher.name}: ${imageUrl}`);
              } else {
                console.error(`Failed to upload image for ${teacher.name}:`, uploadResult.error);
              }
              
              // Clean up temp file
              fs.unlinkSync(tempFilePath);
            }
          } catch (imageError) {
            console.error(`Error processing image for ${teacher.name}:`, imageError);
          }
        }
        
        // Parse pricing to extract hourly rate
        let hourlyRate = 25.00; // Default rate
        if (teacher.pricing) {
          const priceMatch = teacher.pricing.match(/\$?(\d+(?:\.\d{2})?)/);
          if (priceMatch) {
            hourlyRate = parseFloat(priceMatch[1]);
          }
        }
        
        // Insert lesson record
        const [lessonRecord] = await db.insert(lesson).values({
          creatorId: userId,
          fullName: teacher.name,
          email: `seeded-${teacher.id}@example.com`,
          primarySubject: teacher.subject || 'General',
          location: teacher.location || 'Unknown',
          description: teacher.description || 'No description available',
          education: 'Bachelor\'s Degree', // Default value
          yearsExperience: Math.floor(Math.random() * 10) + 1, // Random 1-10 years
          hourlyRate: hourlyRate.toString(),
          availability: 'Weekdays and Weekends', // Default value
          image: imageUrl,
          createdAt: new Date(),
          updatedAt: new Date(),
        }).returning();
        
        console.log(`Lesson created for ${teacher.name} with ID: ${lessonRecord.id}`);
        
        // Add some sample languages (you can customize this)
        if (lessonRecord.id) {
          await db.insert(lessonLanguage).values({
            lessonId: lessonRecord.id,
            language: 'English',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          
          // Add some sample awards
          if (teacher.rating && teacher.rating >= 4.5) {
            await db.insert(lessonAward).values({
              lessonId: lessonRecord.id,
              award: 'High Rating Award',
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
          
          // Add some sample certifications
          await db.insert(lessonCertification).values({
            lessonId: lessonRecord.id,
            certification: 'Teaching Certification',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        
        successCount++;
        
      } catch (error) {
        console.error(`Error processing teacher ${teacher.name}:`, error);
        errorCount++;
      }
    }
    
    await sqliteDb.close();
    
    console.log('\n=== Seeding Complete ===');
    console.log(`Successfully seeded: ${successCount} lessons`);
    console.log(`Errors: ${errorCount}`);
    
    // Clean up temp directory
    const tempDir = path.join(process.cwd(), 'temp');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedLessons().catch(console.error); 