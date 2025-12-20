-- Cleanup: Remove tables from public schema if they exist
-- Run this ONLY if you have duplicate tables in the public schema
-- and want to keep only the mire_farm_website schema tables

-- WARNING: This will DELETE all data in these tables in the public schema!
-- Make sure you've migrated any important data to mire_farm_website schema first.

-- Check what tables exist in public schema (run this first to see what will be deleted)
-- Uncomment the SELECT below to see what tables are in public schema:
/*
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
AND table_name IN (
  'news_articles',
  'contact_submissions',
  'newsletter_subscriptions',
  'products',
  'gallery_images',
  'hero_section',
  'benefits',
  'mission_vision_values',
  'core_values',
  'mission_vision_section_header'
)
ORDER BY table_name;
*/

-- Drop tables from public schema (only if they exist and you want to remove them)
-- Uncomment the DROP statements below to actually delete them:

-- DROP TABLE IF EXISTS public.news_articles CASCADE;
-- DROP TABLE IF EXISTS public.contact_submissions CASCADE;
-- DROP TABLE IF EXISTS public.newsletter_subscriptions CASCADE;
-- DROP TABLE IF EXISTS public.products CASCADE;
-- DROP TABLE IF EXISTS public.gallery_images CASCADE;
-- DROP TABLE IF EXISTS public.hero_section CASCADE;
-- DROP TABLE IF EXISTS public.benefits CASCADE;
-- DROP TABLE IF EXISTS public.mission_vision_values CASCADE;
-- DROP TABLE IF EXISTS public.core_values CASCADE;
-- DROP TABLE IF EXISTS public.mission_vision_section_header CASCADE;

-- Note: CASCADE will also drop dependent objects like policies, indexes, etc.

