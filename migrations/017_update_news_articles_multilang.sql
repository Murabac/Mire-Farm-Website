-- Update News Articles Table for Multi-language Support
-- Run this after 001_initial_schema.sql
-- This updates the news_articles table to support multi-language content

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Add multi-language columns to news_articles table
-- We'll keep the existing columns for backward compatibility and add new ones

-- Make old columns nullable first (to allow migration)
ALTER TABLE mire_farm_website.news_articles 
  ALTER COLUMN title DROP NOT NULL,
  ALTER COLUMN excerpt DROP NOT NULL,
  ALTER COLUMN content DROP NOT NULL,
  ALTER COLUMN badge DROP NOT NULL,
  ALTER COLUMN author DROP NOT NULL;

-- Add multi-language title columns
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS title_en TEXT,
  ADD COLUMN IF NOT EXISTS title_so TEXT,
  ADD COLUMN IF NOT EXISTS title_ar TEXT;

-- Add multi-language excerpt columns
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_so TEXT,
  ADD COLUMN IF NOT EXISTS excerpt_ar TEXT;

-- Add multi-language content columns
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS content_en TEXT,
  ADD COLUMN IF NOT EXISTS content_so TEXT,
  ADD COLUMN IF NOT EXISTS content_ar TEXT;

-- Add multi-language badge columns
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS badge_en TEXT,
  ADD COLUMN IF NOT EXISTS badge_so TEXT,
  ADD COLUMN IF NOT EXISTS badge_ar TEXT;

-- Add multi-language author columns
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS author_en TEXT,
  ADD COLUMN IF NOT EXISTS author_so TEXT,
  ADD COLUMN IF NOT EXISTS author_ar TEXT;

-- Migrate existing data: populate new columns from old columns, and old columns from new English columns
UPDATE mire_farm_website.news_articles 
SET 
  title_en = COALESCE(title_en, title),
  excerpt_en = COALESCE(excerpt_en, excerpt),
  content_en = COALESCE(content_en, content),
  badge_en = COALESCE(badge_en, badge),
  author_en = COALESCE(author_en, author),
  title = COALESCE(title, title_en),
  excerpt = COALESCE(excerpt, excerpt_en),
  content = COALESCE(content, content_en),
  badge = COALESCE(badge, badge_en),
  author = COALESCE(author, author_en)
WHERE title_en IS NULL OR title IS NULL;

-- Add active and display_order columns for better management
ALTER TABLE mire_farm_website.news_articles 
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_active ON mire_farm_website.news_articles(active);
CREATE INDEX IF NOT EXISTS idx_news_articles_display_order ON mire_farm_website.news_articles(display_order);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at_desc ON mire_farm_website.news_articles(created_at DESC);
