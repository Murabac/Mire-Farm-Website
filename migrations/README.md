# Database Migrations

This folder contains SQL migration files for setting up and maintaining the Supabase database schema.

## Migration Files

### 000_create_schema.sql
**IMPORTANT: Run this FIRST before any other migrations!**

Creates the `mire_farm_website` schema and sets up necessary permissions. This allows the Mire Farm website to use its own dedicated schema within a shared Supabase project.

### 001_initial_schema.sql
Creates all database tables in the `mire_farm_website` schema, enables Row Level Security (RLS), sets up security policies, and creates indexes for optimal performance.

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

### 006_cleanup_public_schema.sql
Optional cleanup script to remove duplicate tables from the public schema if they exist. Only run this if you have duplicate tables and want to keep only the `mire_farm_website` schema tables.

### 007_update_products_multilang.sql
Updates the products table to include multi-language support for name and description fields. Adds `display_order` and `active` columns for better product management.

### 008_products_seed_data.sql
Inserts initial seed data for products with English, Somali, and Arabic translations.

### 009_contact_info.sql
Creates the contact_info table to store dynamic contact information (location, phone, email, hours) with multi-language support.

### 010_contact_info_seed_data.sql
Inserts initial seed data for contact information with English, Somali, and Arabic translations.

### 011_our_farm_schema.sql
Creates all tables for the Our Farm page sections with multi-language support:
- `business_model` - Business model section
- `business_model_features` - Feature cards (Perfect Location, Direct to Market)
- `produce_types_header` - Produce section header
- `produce_items` - List of produce items
- `social_impact_header` - Social impact section header
- `social_impact_cards` - Impact cards (4 cards)
- `environmental_commitment` - Environmental commitment section
- `growth_expansion_header` - Growth expansion section header
- `growth_expansion_plans` - Expansion plans (4 plans)
- `growth_expansion_stats` - Statistics (4 stats)

### 012_our_farm_seed_data.sql
Inserts initial seed data for all Our Farm page sections with English, Somali, and Arabic translations.

### 013_page_headers_table.sql
Creates a generic `page_headers` table that can be used across all pages. This table stores page header data (badge, title, description) with multi-language support, identified by `page_route`.

### 014_page_headers_seed_data.sql
Inserts initial seed data for page headers across all pages (our-farm, news, gallery, products, about, contact) with English, Somali, and Arabic translations.

### 015_gallery_categories_schema.sql
Creates the `gallery_categories` table for dynamic gallery filter categories with multi-language support. Categories include name, emoji, and display order.

### 016_gallery_categories_seed_data.sql
Inserts initial seed data for gallery categories (All, Farm Operations, Products, Community) with English, Somali, and Arabic translations.

### 017_update_news_articles_multilang.sql
Updates the `news_articles` table to support multi-language content. Adds columns for title, excerpt, content, badge, and author in English, Somali, and Arabic. Also adds `active` and `display_order` columns for better article management.

### 018_news_articles_seed_data.sql
Inserts initial seed data for news articles with English, Somali, and Arabic translations. Includes 6 sample articles covering various topics like official visits, expansion, community programs, harvest milestones, infrastructure improvements, and anniversaries.

## Running Migrations

1. **Initial Setup**: Run migrations in order:
   ```sql
   -- FIRST: Run 000_create_schema.sql (creates the mire_farm_website schema)
   -- Then, run 001_initial_schema.sql
   -- Then, run 002_seed_data.sql
   -- Then, run 003_benefits_section.sql
   -- Then, run 004_mission_vision_values.sql
   -- Then, run 005_mission_vision_seed_data.sql
   -- Then, run 007_update_products_multilang.sql
   -- Then, run 008_products_seed_data.sql
   -- Then, run 009_contact_info.sql
   -- Then, run 010_contact_info_seed_data.sql
   -- Then, run 011_our_farm_schema.sql
   -- Then, run 012_our_farm_seed_data.sql
   -- Then, run 013_page_headers_table.sql
   -- Then, run 014_page_headers_seed_data.sql
   -- Then, run 015_gallery_categories_schema.sql
   -- Then, run 016_gallery_categories_seed_data.sql
   -- Then, run 017_update_news_articles_multilang.sql
   -- Finally, run 018_news_articles_seed_data.sql
   ```

2. **In Supabase Dashboard**:
   - Go to SQL Editor
   - Copy and paste the contents of each migration file
   - Run them in order (000, 001, 002, 003, 004, 005, 007, 008, 009, 010, 011, 012, 013, 014)
   - **Note:** Skip 006 unless you need to clean up duplicate tables from public schema

## Migration Naming Convention

Migrations are named with a three-digit prefix followed by an underscore and a descriptive name:
- `000_create_schema.sql` - **Run this first!**
- `001_initial_schema.sql`
- `002_seed_data.sql`
- `003_benefits_section.sql`
- `004_mission_vision_values.sql`
- `005_mission_vision_seed_data.sql`
- `006_cleanup_public_schema.sql` - Optional cleanup
- `007_update_products_multilang.sql`
- `008_products_seed_data.sql`
- `009_contact_info.sql`
- `010_contact_info_seed_data.sql`
- `011_our_farm_schema.sql`
- `012_our_farm_seed_data.sql`
- `013_page_headers_table.sql`
- `014_page_headers_seed_data.sql`
- `015_gallery_categories_schema.sql`
- `016_gallery_categories_seed_data.sql`
- `017_update_news_articles_multilang.sql`
- `018_news_articles_seed_data.sql`
- `019_add_new_feature.sql` (future migrations)

This ensures migrations run in the correct order.

## Schema Organization

All tables are created in the `mire_farm_website` schema, allowing this website to coexist with other projects in the same Supabase database. This provides:
- **Isolation**: Tables are organized under a dedicated schema
- **Organization**: Easy to identify which tables belong to this project
- **Multi-project support**: Share one Supabase project across multiple applications

The Supabase client is configured to use the `mire_farm_website` schema by default.

## Notes

- **Always run 000_create_schema.sql FIRST** before any other migrations
- Always run migrations in order
- Test migrations on a development database first
- Keep migrations idempotent (safe to run multiple times) using `IF NOT EXISTS` clauses
- Never modify existing migrations once they've been run in production
