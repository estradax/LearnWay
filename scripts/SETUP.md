# Setup Guide for Seeding Script

## Required Environment Variables

Before running the seeding script, ensure you have the following environment variables set up:

### Database Connection
```bash
DATABASE_URL=your_postgres_connection_string_here
```

### Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Environment File Setup

Create a `.env.local` file in your project root with:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## How to Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Ensure your storage bucket "learnway-attachment" exists

## Database Schema

Make sure your database has the lessons table schema created. You can run your Drizzle migrations first:

```bash
npm run db:migrate
# or
npx drizzle-kit push
```

## Storage Bucket

Ensure your Supabase storage bucket "learnway-attachment" is created and has the correct permissions for file uploads.

## Running the Script

After setting up the environment:

```bash
npm run seed
```

The script will:
1. Connect to your PostgreSQL database
2. Read from the SQLite file
3. Download and upload images to Supabase
4. Insert lesson records
5. Create related language, award, and certification records 