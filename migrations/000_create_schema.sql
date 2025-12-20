-- Create Schema for Mire Farm Website
-- Run this FIRST before any other migrations
-- This creates a dedicated schema for the Mire Farm website

-- Enable pgcrypto extension (required for UUID generation)
-- This provides gen_random_uuid() which is preferred in modern PostgreSQL/Supabase
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

-- Create the schema
CREATE SCHEMA IF NOT EXISTS mire_farm_website;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA mire_farm_website TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA mire_farm_website TO service_role;

-- Grant permissions on all existing objects (if any)
GRANT ALL ON ALL TABLES IN SCHEMA mire_farm_website TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA mire_farm_website TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA mire_farm_website TO anon, authenticated, service_role;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mire_farm_website
GRANT ALL ON TABLES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mire_farm_website
GRANT ALL ON ROUTINES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA mire_farm_website
GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

-- IMPORTANT: After running this migration, you must:
-- 1. Go to Supabase Dashboard > Settings > API
-- 2. Add 'mire_farm_website' to the "Exposed schemas" list
-- 3. Save the settings

