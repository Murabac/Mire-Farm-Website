-- Update Products Table for Multi-language Support
-- Run this after 001_initial_schema.sql
-- This adds multi-language columns to the products table

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Add multi-language columns for name
ALTER TABLE mire_farm_website.products 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS name_so TEXT,
ADD COLUMN IF NOT EXISTS name_ar TEXT;

-- Add multi-language columns for description
ALTER TABLE mire_farm_website.products 
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_so TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT;

-- Migrate existing data (if any) to English columns
UPDATE mire_farm_website.products 
SET name_en = name, description_en = description
WHERE name_en IS NULL AND name IS NOT NULL;

-- Make name_en NOT NULL (since we need at least English)
ALTER TABLE mire_farm_website.products 
ALTER COLUMN name_en SET NOT NULL;

-- Make old name and description columns nullable (they're deprecated in favor of multi-language columns)
ALTER TABLE mire_farm_website.products 
ALTER COLUMN name DROP NOT NULL,
ALTER COLUMN description DROP NOT NULL;

-- Add display_order column for ordering products
ALTER TABLE mire_farm_website.products 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Add active column to show/hide products
ALTER TABLE mire_farm_website.products 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

-- Create index for display_order and active
CREATE INDEX IF NOT EXISTS idx_products_display_order ON mire_farm_website.products(display_order);
CREATE INDEX IF NOT EXISTS idx_products_active ON mire_farm_website.products(active);
