-- Fix: Make old name and description columns nullable
-- Run this if you got an error about NOT NULL constraint on the name column
-- This should be run after 007_update_products_multilang.sql if you encountered the error

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Make old name and description columns nullable (they're deprecated in favor of multi-language columns)
ALTER TABLE mire_farm_website.products 
ALTER COLUMN name DROP NOT NULL,
ALTER COLUMN description DROP NOT NULL;

