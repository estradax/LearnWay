#!/usr/bin/env tsx

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { createClient } from '@supabase/supabase-js';
import { sql } from 'drizzle-orm';

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
    console.error('\nPlease run: npm run setup');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded successfully');
}

function initializeDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  
  const sql = neon(databaseUrl);
  const db = drizzle(sql);
  
  return db;
}

function initializeSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials are not set');
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

async function testConnection() {
  try {
    console.log('🚀 Testing connections...\n');
    
    // Check environment variables
    checkEnvironmentVariables();
    
    // Test database connection
    console.log('1️⃣ Testing PostgreSQL database connection...');
    const db = initializeDatabase();
    const dbResult = await db.execute(sql`SELECT 1 as test`);
    console.log('✅ Database connection successful:', dbResult);
    
    // Test schema access
    console.log('\n2️⃣ Testing database schema...');
    try {
      const tables = await db.execute(sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('lessons', 'user')
        ORDER BY table_name
      `);
      
      if (Array.isArray(tables) && tables.length > 0) {
        const tableNames = tables.map((t: any) => t.table_name);
        console.log('✅ Found tables:', tableNames.join(', '));
        
        if (tableNames.includes('lessons')) {
          console.log('✅ Lessons table found');
        } else {
          console.log('⚠️  Lessons table not found - you may need to run migrations');
        }
        
        if (tableNames.includes('user')) {
          console.log('✅ User table found');
        } else {
          console.log('⚠️  User table not found - you may need to run migrations');
        }
      } else {
        console.log('⚠️  No required tables found - you may need to run migrations');
      }
    } catch (schemaError) {
      const errorMessage = schemaError instanceof Error ? schemaError.message : 'Unknown error';
      console.log('⚠️  Could not check schema (this is normal for new databases):', errorMessage);
    }
    
    // Test Supabase connection
    console.log('\n3️⃣ Testing Supabase connection...');
    const supabase = initializeSupabase();
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      throw bucketError;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Check if learnway-attachment bucket exists
    const attachmentBucket = buckets?.find(bucket => bucket.name === 'learnway-attachment');
    if (attachmentBucket) {
      console.log('✅ learnway-attachment storage bucket found');
    } else {
      console.log('⚠️  learnway-attachment storage bucket not found - you may need to create it');
    }
    
    console.log('\n🎉 All connection tests completed successfully!');
    console.log('You can now run: npm run seed');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Check your environment variables are correct');
    console.error('2. Ensure your database and Supabase are accessible');
    console.error('3. Run: npm run setup');
    process.exit(1);
  }
}

testConnection().catch(console.error); 