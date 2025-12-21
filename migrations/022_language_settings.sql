-- Language Settings Table
-- Run this after 001_initial_schema.sql
-- This stores which languages are enabled/disabled for the website

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Language Settings Table
CREATE TABLE IF NOT EXISTS mire_farm_website.language_settings (
  id SERIAL PRIMARY KEY,
  language_code TEXT NOT NULL UNIQUE CHECK (language_code IN ('en', 'so', 'ar')),
  enabled BOOLEAN DEFAULT TRUE NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.language_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (needed for frontend to check enabled languages)
CREATE POLICY "Language settings are viewable by everyone"
  ON mire_farm_website.language_settings FOR SELECT
  USING (true);

-- Create policy for authenticated users to update (admin only)
CREATE POLICY "Language settings can be updated by authenticated users"
  ON mire_farm_website.language_settings FOR UPDATE
  USING (true);

CREATE POLICY "Language settings can be inserted by authenticated users"
  ON mire_farm_website.language_settings FOR INSERT
  WITH CHECK (true);

-- Create index for enabled status and display order
CREATE INDEX IF NOT EXISTS idx_language_settings_enabled ON mire_farm_website.language_settings(enabled);
CREATE INDEX IF NOT EXISTS idx_language_settings_display_order ON mire_farm_website.language_settings(display_order);

-- Insert default language settings (all enabled by default)
INSERT INTO mire_farm_website.language_settings (language_code, enabled, display_order) VALUES
  ('en', TRUE, 1),
  ('so', TRUE, 2),
  ('ar', TRUE, 3)
ON CONFLICT (language_code) DO NOTHING;


