# Database Migrations

This folder contains SQL migration files for setting up and maintaining the Supabase database schema.

## Migration Files

### 001_initial_schema.sql
Creates all database tables, enables Row Level Security (RLS), sets up security policies, and creates indexes for optimal performance.

**Tables created:**
- `news_articles` - News and blog articles
- `contact_submissions` - Contact form submissions
- `newsletter_subscriptions` - Newsletter email subscriptions
- `products` - Product catalog
- `gallery_images` - Gallery images
- `hero_section` - Hero section content with multi-language support

### 002_seed_data.sql
Inserts initial seed data into the database, including:
- Hero section data with English, Somali, and Arabic translations

### 003_benefits_section.sql
Creates the benefits table with multi-language support and inserts initial benefits data with English, Somali, and Arabic translations.

### 004_mission_vision_values.sql
Creates tables for mission, vision, values section:
- `mission_vision_values` - Main three cards (Mission, Vision, Values)
- `core_values` - Four core value cards
- `mission_vision_section_header` - Section title and description

### 005_mission_vision_seed_data.sql
Inserts initial seed data for mission, vision, and values with English, Somali, and Arabic translations.

## Running Migrations

1. **Initial Setup**: Run migrations in order:
   ```sql
   -- First, run 001_initial_schema.sql
   -- Then, run 002_seed_data.sql
   -- Then, run 003_benefits_section.sql
   -- Then, run 004_mission_vision_values.sql
   -- Finally, run 005_mission_vision_seed_data.sql
   ```

2. **In Supabase Dashboard**:
   - Go to SQL Editor
   - Copy and paste the contents of each migration file
   - Run them in order (001, then 002, then 003, then 004, then 005)

## Migration Naming Convention

Migrations are named with a three-digit prefix followed by an underscore and a descriptive name:
- `001_initial_schema.sql`
- `002_seed_data.sql`
- `003_benefits_section.sql`
- `004_mission_vision_values.sql`
- `005_mission_vision_seed_data.sql`
- `006_add_new_feature.sql` (future migrations)

This ensures migrations run in the correct order.

## Notes

- Always run migrations in order
- Test migrations on a development database first
- Keep migrations idempotent (safe to run multiple times) using `IF NOT EXISTS` clauses
- Never modify existing migrations once they've been run in production
