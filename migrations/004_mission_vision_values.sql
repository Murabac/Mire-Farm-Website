-- Mission, Vision, and Values Section Tables with Multi-language Support
-- Run this SQL in your Supabase SQL Editor
-- NOTE: Run 000_create_schema.sql and 001_initial_schema.sql FIRST

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Mission, Vision, Values Table (Main three cards)
CREATE TABLE IF NOT EXISTS mire_farm_website.mission_vision_values (
  id SERIAL PRIMARY KEY,
  -- Type: 'mission', 'vision', or 'values'
  type TEXT NOT NULL CHECK (type IN ('mission', 'vision', 'values')),
  -- Emoji icon
  emoji TEXT NOT NULL,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Background color class (for styling)
  bg_color_class TEXT DEFAULT 'from-green-50 to-white',
  -- Border color class
  border_color_class TEXT DEFAULT 'border-green-100',
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Core Values Table (Four value cards)
CREATE TABLE IF NOT EXISTS mire_farm_website.core_values (
  id SERIAL PRIMARY KEY,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Icon type (for rendering the icon component)
  icon_type TEXT NOT NULL DEFAULT 'organic',
  -- Color classes for icon background
  color_class TEXT DEFAULT 'bg-green-100 text-green-600',
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Section Header Table (Title and description)
CREATE TABLE IF NOT EXISTS mire_farm_website.mission_vision_section_header (
  id SERIAL PRIMARY KEY,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.mission_vision_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.mission_vision_section_header ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Mission vision values are viewable by everyone"
  ON mire_farm_website.mission_vision_values FOR SELECT
  USING (true);

CREATE POLICY "Core values are viewable by everyone"
  ON mire_farm_website.core_values FOR SELECT
  USING (true);

CREATE POLICY "Mission vision section header is viewable by everyone"
  ON mire_farm_website.mission_vision_section_header FOR SELECT
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_mission_vision_values_type ON mire_farm_website.mission_vision_values(type);
CREATE INDEX IF NOT EXISTS idx_mission_vision_values_display_order ON mire_farm_website.mission_vision_values(display_order);
CREATE INDEX IF NOT EXISTS idx_mission_vision_values_active ON mire_farm_website.mission_vision_values(active);
CREATE INDEX IF NOT EXISTS idx_core_values_display_order ON mire_farm_website.core_values(display_order);
CREATE INDEX IF NOT EXISTS idx_core_values_active ON mire_farm_website.core_values(active);
CREATE INDEX IF NOT EXISTS idx_mission_vision_section_header_active ON mire_farm_website.mission_vision_section_header(active);
