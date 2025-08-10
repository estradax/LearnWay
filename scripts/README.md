# Scripts

## Setup

Before running the seeding script, you need to set up your environment variables. Run:

```bash
npm run setup
```

This will guide you through setting up your database and Supabase credentials.

## Testing Database Connection

After setting up your environment variables, test your connections:

```bash
npm run test-db
```

This will verify that both your PostgreSQL database and Supabase are accessible, and check if the lessons table and storage bucket exist.

## seed-lessons.ts

This script seeds the lessons table with data from the `superprof_teachers.db` SQLite database.

### What it does:

1. **Reads from SQLite**: Connects to the `superprof_teachers.db` file and reads all teachers from the `teachers` table
2. **Downloads images**: Downloads profile images from the `image_url` field
3. **Uploads to Supabase**: Uploads the downloaded images to your Supabase storage bucket
4. **Creates lessons**: Inserts lesson records with the teacher data
5. **Adds related data**: Creates sample language, award, and certification records for each lesson

### Database Connection:

The script creates its own Drizzle database connection using the `DATABASE_URL` environment variable and its own Supabase client using the Supabase credentials, ensuring clean and independent connections to both services.

### Prerequisites:

- ✅ Environment variables configured (use `npm run setup`)
- ✅ Database connection verified (use `npm run test-db`)
- The `superprof_teachers.db` file should be in the project root
- Your database should have the lessons table schema already created
- Your database should have the user table with existing users (for lesson creator IDs)

### Usage:

```bash
npm run seed
```

Or run directly with tsx:

```bash
npx tsx scripts/seed-lessons.ts
```

### Workflow:

1. **Setup**: `npm run setup` - Configure environment variables
2. **Test**: `npm run test-db` - Verify database connection
3. **Seed**: `npm run seed` - Run the seeding script

### Troubleshooting:

If you get connection errors:

1. **Check environment variables**: Run `npm run setup` to configure them
2. **Verify database connection**: Ensure your DATABASE_URL is correct and accessible
3. **Verify Supabase connection**: Ensure your Supabase credentials are correct and accessible
4. **Check database schema**: Make sure your lessons table exists
5. **Check storage bucket**: Ensure the "learnway-attachment" bucket exists in Supabase
6. **Test connections**: Use `npm run test-db` to verify both connections before proceeding

### Data Mapping:

| SQLite Field | Lessons Table Field | Notes |
|--------------|---------------------|-------|
| name | fullName | Teacher's full name |
| location | location | Teaching location |
| subject | primarySubject | Main subject taught |
| description | description | Teacher description |
| pricing | hourlyRate | Extracted from pricing text |
| image_url | image | Downloaded and uploaded to Supabase |
| rating | - | Used to determine awards |
| - | creatorId | Random user ID from user table |
| - | email | Generated as "seeded-{id}@example.com" |
| - | education | Default: "Bachelor's Degree" |
| - | yearsExperience | Random 1-10 years |
| - | availability | Default: "Weekdays and Weekends" |

### Output:

The script will log:
- Progress for each teacher being processed
- Success/error counts
- Image upload status
- Final summary of seeded records

### Error Handling:

- Continues processing even if individual records fail
- Logs errors for debugging
- Cleans up temporary files
- Provides summary of successes and failures