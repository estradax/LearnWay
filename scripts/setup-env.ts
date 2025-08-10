#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupEnvironment() {
  console.log('🚀 LearnWay Environment Setup\n');
  
  console.log('This script will help you set up your environment variables for the seeding script.\n');
  
  // Check if .env.local already exists
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const overwrite = await question('⚠️  .env.local already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }
  
  console.log('\n📝 Database Configuration');
  console.log('You need a PostgreSQL database connection string.');
  console.log('Examples:');
  console.log('- Neon: postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database');
  console.log('- Supabase: postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres');
  console.log('- Local: postgresql://username:password@localhost:5432/database\n');
  
  const databaseUrl = await question('Enter your DATABASE_URL: ');
  
  console.log('\n🔑 Supabase Configuration');
  console.log('Get these from your Supabase project dashboard > Settings > API\n');
  
  const supabaseUrl = await question('Enter your NEXT_PUBLIC_SUPABASE_URL: ');
  const supabaseKey = await question('Enter your NEXT_PUBLIC_SUPABASE_ANON_KEY: ');
  
  // Create .env.local file
  const envContent = `# Database Configuration
DATABASE_URL=${databaseUrl}

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}
`;
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ .env.local file created successfully!');
    console.log(`📁 Location: ${envPath}`);
    console.log('\n🔒 Important: Add .env.local to your .gitignore if it\'s not already there.');
    console.log('\n🚀 You can now run the seeding script with: npm run seed');
  } catch (error) {
    console.error('❌ Error creating .env.local file:', error);
  }
  
  rl.close();
}

setupEnvironment().catch(console.error); 