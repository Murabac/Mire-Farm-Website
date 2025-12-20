# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `mire-farm-website` (or your preferred name)
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project"

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find:
   - **Project URL**: Copy this value
   - **anon/public key**: Copy this value (this is safe to expose in client-side code)

## 3. Configure Environment Variables

Create a `.env.local` file in the root of your project with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from step 2.

## 4. Restart Your Development Server

After creating/updating `.env.local`, restart your Next.js development server:

```bash
npm run dev
```

## 5. Using Supabase in Your Code

### Client Components

```typescript
import { supabase } from '@/lib/supabase';

// Example: Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

### Server Components

```typescript
import { createServerClient } from '@/lib/supabase';

const supabase = createServerClient();
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

## 6. Set Up Database Schema

Run the database migrations in order:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the migrations from the `migrations/` folder in order:
   - First: `001_initial_schema.sql` - Creates all tables, RLS policies, and indexes
   - Then: `002_seed_data.sql` - Inserts initial seed data (hero section)

See `migrations/README.md` for more details about the migration files.

## Next Steps

- Set up authentication if needed
- Create API routes for server-side operations
- Customize the database schema as needed

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
