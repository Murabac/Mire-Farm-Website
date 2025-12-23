-- Site Settings Table
-- Run this to create the site_settings table for general site configuration

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Site Settings Table
CREATE TABLE IF NOT EXISTS mire_farm_website.site_settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Mire Farms',
  default_language TEXT NOT NULL DEFAULT 'en',
  timezone TEXT NOT NULL DEFAULT 'Africa/Mogadishu',
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  maintenance_message TEXT DEFAULT 'We are currently performing scheduled maintenance. Please check back soon.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (needed for maintenance mode check)
CREATE POLICY "Site settings are viewable by everyone"
  ON mire_farm_website.site_settings FOR SELECT
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update site settings"
  ON mire_farm_website.site_settings FOR UPDATE
  USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert site settings"
  ON mire_farm_website.site_settings FOR INSERT
  WITH CHECK (true);

-- Insert default settings
INSERT INTO mire_farm_website.site_settings (
  site_name,
  default_language,
  timezone,
  maintenance_mode,
  maintenance_message
) VALUES (
  'Mire Farms',
  'en',
  'Africa/Mogadishu',
  FALSE,
  'We are currently performing scheduled maintenance. Please check back soon.'
) ON CONFLICT DO NOTHING;

