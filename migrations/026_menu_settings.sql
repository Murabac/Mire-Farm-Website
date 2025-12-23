-- Menu Settings Table
-- This table stores visibility settings for header menu items
SET search_path TO mire_farm_website, public;

CREATE TABLE IF NOT EXISTS mire_farm_website.menu_settings (
  id SERIAL PRIMARY KEY,
  menu_key TEXT UNIQUE NOT NULL,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.menu_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Menu settings are viewable by everyone"
  ON mire_farm_website.menu_settings FOR SELECT
  USING (true);

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update menu settings"
  ON mire_farm_website.menu_settings FOR UPDATE
  USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert menu settings"
  ON mire_farm_website.menu_settings FOR INSERT
  WITH CHECK (true);

-- Insert default menu items
INSERT INTO mire_farm_website.menu_settings (menu_key, label, href, visible, display_order)
VALUES 
  ('home', 'Home', '/', TRUE, 1),
  ('our-farm', 'Our Farm', '/our-farm', TRUE, 2),
  ('gallery', 'Gallery', '/gallery', TRUE, 3),
  ('news', 'News', '/news', TRUE, 4)
ON CONFLICT (menu_key) DO NOTHING;

