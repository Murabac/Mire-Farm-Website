-- Generic Page Headers Table
-- Run this after 001_initial_schema.sql
-- This creates a generic table for page headers that can be used across all pages

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Page Headers Table (Generic - for all pages)
CREATE TABLE IF NOT EXISTS mire_farm_website.page_headers (
  id SERIAL PRIMARY KEY,
  -- Page route/identifier (e.g., '/our-farm', '/news', '/gallery', '/products', etc.)
  page_route TEXT NOT NULL UNIQUE,
  -- Badge text in different languages
  badge_text_en TEXT,
  badge_text_so TEXT,
  badge_text_ar TEXT,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages (can contain HTML/JSX)
  description_en TEXT,
  description_so TEXT,
  description_ar TEXT,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.page_headers ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Page headers are viewable by everyone"
  ON mire_farm_website.page_headers FOR SELECT
  USING (true);

-- Create index for page_route and active status
CREATE INDEX IF NOT EXISTS idx_page_headers_route ON mire_farm_website.page_headers(page_route);
CREATE INDEX IF NOT EXISTS idx_page_headers_active ON mire_farm_website.page_headers(active);
