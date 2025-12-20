-- Gallery Categories Table (for dynamic filters)
-- Run this after 001_initial_schema.sql
-- This creates a table for gallery filter categories with multi-language support

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Gallery Categories Table
CREATE TABLE IF NOT EXISTS mire_farm_website.gallery_categories (
  id SERIAL PRIMARY KEY,
  -- Category key/slug (e.g., 'all', 'farm-operations', 'products', 'community')
  category_key TEXT NOT NULL UNIQUE,
  -- Category name in different languages
  name_en TEXT NOT NULL,
  name_so TEXT,
  name_ar TEXT,
  -- Emoji icon for the category
  emoji TEXT NOT NULL,
  -- Display order (for sorting filters)
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.gallery_categories ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Gallery categories are viewable by everyone"
  ON mire_farm_website.gallery_categories FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_categories_key ON mire_farm_website.gallery_categories(category_key);
CREATE INDEX IF NOT EXISTS idx_gallery_categories_active ON mire_farm_website.gallery_categories(active);
CREATE INDEX IF NOT EXISTS idx_gallery_categories_display_order ON mire_farm_website.gallery_categories(display_order);
