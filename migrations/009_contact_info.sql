-- Contact Information Table
-- Run this after 001_initial_schema.sql
-- This stores dynamic contact information (location, phone, email, hours)

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Contact Information Table
CREATE TABLE IF NOT EXISTS mire_farm_website.contact_info (
  id SERIAL PRIMARY KEY,
  -- Location with multi-language support
  location_en TEXT NOT NULL,
  location_so TEXT,
  location_ar TEXT,
  -- Phone number (same for all languages)
  phone TEXT NOT NULL,
  -- Email (same for all languages)
  email TEXT NOT NULL,
  -- Operating hours with multi-language support
  hours_en TEXT NOT NULL,
  hours_so TEXT,
  hours_ar TEXT,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.contact_info ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Contact info is viewable by everyone"
  ON mire_farm_website.contact_info FOR SELECT
  USING (true);

-- Create index for active status
CREATE INDEX IF NOT EXISTS idx_contact_info_active ON mire_farm_website.contact_info(active);

