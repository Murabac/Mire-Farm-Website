# Step-by-Step Guide: Setting Up Mire Farm Website Schema in Supabase

This guide will walk you through setting up the `mire_farm_website` schema in your Supabase project.

## Prerequisites

- You have a Supabase project created
- You have access to the Supabase dashboard
- You have the migration files from the `migrations/` folder

---

## Step 1: Open Supabase SQL Editor

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Log in to your account
3. Select your project (or create a new one if you haven't already)
4. In the left sidebar, click on **SQL Editor**
5. Click the **New query** button (or use the existing query editor)

**Note:** You'll be running all migrations directly in the Supabase SQL Editor on the website. This is the recommended approach and works perfectly fine. Each migration should be run in a separate query window.

---

## Step 2: Create the Schema (Run Migration 000)

1. Open the file `migrations/000_create_schema.sql` from your project (in your code editor)
2. **Copy the entire contents** of the file (Ctrl+A, then Ctrl+C / Cmd+A, then Cmd+C)
3. Go back to the Supabase SQL Editor
4. **Paste it** into the SQL Editor (Ctrl+V / Cmd+V)
5. Click the **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`)
6. You should see a success message: "Success. No rows returned"

**Tips for SQL Editor:**
- Make sure you copy the ENTIRE file content, including all comments
- After running, you can see the execution time and any messages at the bottom
- If there's an error, it will be displayed in red - read it carefully

**What this does:**
- Enables the `pgcrypto` extension (required for UUID generation using `gen_random_uuid()`)
- Creates the `mire_farm_website` schema
- Sets up permissions for `anon`, `authenticated`, and `service_role` roles
- Prepares the schema for your tables

**Note:** The `pgcrypto` extension is commonly available in Supabase and modern PostgreSQL. If you get an error, you can try enabling it manually: Go to **Database** → **Extensions** in the Supabase dashboard and enable `pgcrypto` if it's not already enabled.

---

## Step 3: Expose the Schema in Supabase Settings

**IMPORTANT:** This step is required for the Supabase API to access your custom schema.

1. In the Supabase dashboard, click on **Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. Scroll down to find the **Exposed schemas** section
4. You'll see a list or input field for schemas
5. **Add `mire_farm_website`** to the list:
   - If there's a text input, type: `mire_farm_website`
   - If there's a list, click "Add schema" and enter: `mire_farm_website`
   - Make sure it's added to the list (you should see `public` and `mire_farm_website`)
6. Click **Save** at the bottom of the page
7. Wait for the confirmation message

**Note:** If you don't see an "Exposed schemas" section, it might be under a different name like "Database schemas" or "API schemas". Look for any setting related to schema exposure.

---

## Step 4: Run the Initial Schema Migration (001)

1. In the SQL Editor, click **New query** button (top right, or use the "+" icon) to create a fresh query tab
2. Open the file `migrations/001_initial_schema.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste it** into the new query tab in SQL Editor
5. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)
6. You should see: "Success. No rows returned"

**Note:** Creating a new query tab for each migration helps keep things organized. You can have multiple tabs open and switch between them.

**What this does:**
- Creates all the main tables (`news_articles`, `contact_submissions`, `newsletter_subscriptions`, `products`, `gallery_images`, `hero_section`)
- Enables Row Level Security (RLS)
- Creates security policies
- Creates indexes for performance

---

## Step 5: Insert Seed Data for Hero Section (002)

1. Click **New query** in the SQL Editor (create a new tab)
2. Open the file `migrations/002_seed_data.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste it** into the new query tab
5. Click **Run**
6. You should see: "Success. 1 row inserted" (or similar message showing data was inserted)

**What this does:**
- Inserts initial hero section data with English, Somali, and Arabic translations

---

## Step 6: Create Benefits Table (003)

1. Click **New query** in the SQL Editor (create a new tab)
2. Open the file `migrations/003_benefits_section.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste it** into the new query tab
5. Click **Run**
6. You should see: "Success" message (may show multiple success messages for table creation and inserts)

**What this does:**
- Creates the `benefits` table
- Inserts initial benefits data with multi-language support

---

## Step 7: Create Mission/Vision/Values Tables (004)

1. Click **New query** in the SQL Editor (create a new tab)
2. Open the file `migrations/004_mission_vision_values.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste it** into the new query tab
5. Click **Run**
6. You should see: "Success" message (may show multiple success messages for each table and policy created)

**What this does:**
- Creates `mission_vision_values` table
- Creates `core_values` table
- Creates `mission_vision_section_header` table
- Sets up RLS and indexes

---

## Step 8: Insert Mission/Vision/Values Seed Data (005)

1. Click **New query** in the SQL Editor (create a new tab)
2. Open the file `migrations/005_mission_vision_seed_data.sql` from your project
3. **Copy the entire contents** of the file
4. **Paste it** into the new query tab
5. Click **Run**
6. You should see: "Success" messages for each INSERT statement (usually 3 success messages: one for header, one for mission/vision/values, one for core values)

**What this does:**
- Inserts section header data
- Inserts mission, vision, and values data
- Inserts core values data
- All with multi-language support (English, Somali, Arabic)

---

## Step 9: Verify the Setup

### Option A: Check in Table Editor

1. In the Supabase dashboard, click on **Table Editor** in the left sidebar
2. You should see a dropdown or list showing schemas
3. Select `mire_farm_website` from the schema dropdown
4. You should see all your tables:
   - `benefits`
   - `contact_submissions`
   - `core_values`
   - `gallery_images`
   - `hero_section`
   - `mission_vision_section_header`
   - `mission_vision_values`
   - `news_articles`
   - `newsletter_subscriptions`
   - `products`

### Option B: Verify with SQL Query

1. In the SQL Editor, run this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'mire_farm_website'
ORDER BY table_name;
```

2. You should see a list of all 10 tables

### Option C: Check Data

1. In the SQL Editor, run:

```sql
SELECT * FROM mire_farm_website.hero_section;
```

2. You should see 1 row with hero section data

---

## Step 10: Test Your Application

1. Make sure your `.env.local` file has the correct Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

3. Visit your website and check:
   - Hero section displays correctly
   - Benefits section shows data
   - Mission/Vision/Values section displays content
   - Language switching works

---

## Troubleshooting

### Error: "schema mire_farm_website does not exist"
- **Solution:** Make sure you ran `000_create_schema.sql` first (Step 2)

### Error: "function gen_random_uuid() does not exist" or "function uuid_generate_v4() does not exist"
- **Solution:** 
  1. The `pgcrypto` extension should be enabled in `000_create_schema.sql`
  2. If it still fails, manually enable it:
     - Go to **Database** → **Extensions** in Supabase dashboard
     - Find `pgcrypto` in the list
     - Click **Enable** if it's not already enabled
  3. Then re-run `000_create_schema.sql` and `001_initial_schema.sql`
  4. **Alternative:** If `pgcrypto` is not available, you can use `uuid-ossp` instead:
     - In `000_create_schema.sql`, change `pgcrypto` to `uuid-ossp`
     - In `001_initial_schema.sql`, change `gen_random_uuid()` to `public.uuid_generate_v4()`

### Error: "permission denied for schema mire_farm_website"
- **Solution:** Make sure you exposed the schema in Settings > API (Step 3)

### Error: "relation does not exist"
- **Solution:** Check that you ran all migrations in order (000, 001, 002, 003, 004, 005)

### Tables not showing in Table Editor
- **Solution:** 
  1. Make sure you selected the `mire_farm_website` schema from the dropdown
  2. Refresh the page
  3. Check that the schema was exposed in Settings > API

### Application not fetching data
- **Solution:**
  1. Verify your `.env.local` has the correct credentials
  2. Check browser console for errors
  3. Verify the schema is exposed in Supabase Settings > API
  4. Check that the Supabase client is configured correctly (it should be using `mire_farm_website` schema)

---

## Quick Reference: Migration Order

Always run migrations in this exact order:

1. ✅ `000_create_schema.sql` - Create schema
2. ⚙️ **Expose schema in Settings > API** (Step 3)
3. ✅ `001_initial_schema.sql` - Create tables
4. ✅ `002_seed_data.sql` - Hero section data
5. ✅ `003_benefits_section.sql` - Benefits table
6. ✅ `004_mission_vision_values.sql` - Mission/Vision tables
7. ✅ `005_mission_vision_seed_data.sql` - Mission/Vision data

---

## Next Steps

After completing this setup:

- Your database is ready to use
- All tables are in the `mire_farm_website` schema
- Multi-language support is configured
- Your Next.js application should be able to fetch data from Supabase

If you need to add more tables or modify the schema in the future, create new migration files following the naming convention: `006_description.sql`, `007_description.sql`, etc.
