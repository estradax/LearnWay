# Troubleshooting Guide

## Common Errors and Solutions

### 1. Database Connection Error

**Error**: `TypeError: Cannot read properties of undefined (reading 'query')`

**Solution**: 
- Run `npm run setup` to configure your environment variables
- Ensure your `DATABASE_URL` is correct and accessible
- Check if your database is running and accessible

### 2. Missing Environment Variables

**Error**: Script exits with "Missing required environment variables"

**Solution**:
```bash
npm run setup
```

This will guide you through setting up:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

### 3. Database Schema Issues

**Error**: Table doesn't exist or schema mismatch

**Solution**:
1. Ensure your database has the lessons table schema
2. Run your Drizzle migrations:
   ```bash
   npx drizzle-kit push
   # or
   npm run db:migrate
   ```

### 4. Supabase Storage Issues

**Error**: Image upload fails

**Solution**:
1. Verify your Supabase credentials are correct
2. Ensure the "learnway-attachment" storage bucket exists
3. Check bucket permissions for file uploads

### 5. SQLite File Not Found

**Error**: Cannot find superprof_teachers.db

**Solution**:
- Ensure the SQLite file is in your project root directory
- Check file permissions

### 6. Permission Issues

**Error**: Cannot create temp directory or files

**Solution**:
- Check write permissions in your project directory
- Ensure you have sufficient disk space

## Getting Help

1. **Check the logs**: The script provides detailed logging
2. **Verify prerequisites**: Ensure all requirements are met
3. **Test database connection**: The script tests the connection before proceeding
4. **Check environment**: Use `npm run setup` to verify configuration

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | `eyJhbGciOiJIUzI1NiIs...` |

## Database Connection Examples

### Neon Database
```
DATABASE_URL=postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database
```

### Supabase Database
```
DATABASE_URL=postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
```

### Local PostgreSQL
```
DATABASE_URL=postgresql://username:password@localhost:5432/database
``` 