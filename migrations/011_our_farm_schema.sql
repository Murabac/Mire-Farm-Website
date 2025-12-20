-- Our Farm Page Tables with Multi-language Support
-- Run this after 001_initial_schema.sql
-- This creates tables for all sections on the our-farm page

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Note: Page headers are now managed in the generic page_headers table (see 013_page_headers_table.sql)
-- This migration no longer creates our_farm_page_header table

-- Business Model Section Table
CREATE TABLE IF NOT EXISTS mire_farm_website.business_model (
  id SERIAL PRIMARY KEY,
  -- Badge text in different languages
  badge_text_en TEXT NOT NULL,
  badge_text_so TEXT,
  badge_text_ar TEXT,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Image URL
  image_url TEXT NOT NULL,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Business Model Features Table (Perfect Location, Direct to Market, etc.)
CREATE TABLE IF NOT EXISTS mire_farm_website.business_model_features (
  id SERIAL PRIMARY KEY,
  -- Icon type (map_pin, trending_up, etc.)
  icon_type TEXT NOT NULL DEFAULT 'map_pin',
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Color classes for styling
  bg_color_class TEXT DEFAULT 'from-green-50 to-blue-50',
  border_color_class TEXT DEFAULT 'border-green-100',
  icon_bg_color TEXT DEFAULT 'bg-[#6B9E3E]',
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Produce Types Section Header Table
CREATE TABLE IF NOT EXISTS mire_farm_website.produce_types_header (
  id SERIAL PRIMARY KEY,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Footer badge text in different languages
  footer_badge_text_en TEXT NOT NULL,
  footer_badge_text_so TEXT,
  footer_badge_text_ar TEXT,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Produce Items Table
CREATE TABLE IF NOT EXISTS mire_farm_website.produce_items (
  id SERIAL PRIMARY KEY,
  -- Name in different languages
  name_en TEXT NOT NULL,
  name_so TEXT,
  name_ar TEXT,
  -- Emoji for the produce
  emoji TEXT NOT NULL,
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Social Environmental Impact Section Header Table
CREATE TABLE IF NOT EXISTS mire_farm_website.social_impact_header (
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

-- Social Impact Cards Table
CREATE TABLE IF NOT EXISTS mire_farm_website.social_impact_cards (
  id SERIAL PRIMARY KEY,
  -- Icon type (community, leaf, heart, globe)
  icon_type TEXT NOT NULL DEFAULT 'community',
  -- Emoji
  emoji TEXT NOT NULL,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Color classes
  color_class TEXT DEFAULT 'bg-blue-100 text-blue-600',
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Environmental Commitment Section Table
CREATE TABLE IF NOT EXISTS mire_farm_website.environmental_commitment (
  id SERIAL PRIMARY KEY,
  -- Emoji
  emoji TEXT NOT NULL,
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

-- Growth Expansion Section Header Table
CREATE TABLE IF NOT EXISTS mire_farm_website.growth_expansion_header (
  id SERIAL PRIMARY KEY,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Image URL
  image_url TEXT NOT NULL,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Growth Expansion Plans Table
CREATE TABLE IF NOT EXISTS mire_farm_website.growth_expansion_plans (
  id SERIAL PRIMARY KEY,
  -- Emoji
  emoji TEXT NOT NULL,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Growth Expansion Stats Table
CREATE TABLE IF NOT EXISTS mire_farm_website.growth_expansion_stats (
  id SERIAL PRIMARY KEY,
  -- Stat number (can be text like "4+", "100+", etc.)
  number TEXT NOT NULL,
  -- Label in different languages
  label_en TEXT NOT NULL,
  label_so TEXT,
  label_ar TEXT,
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.business_model ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.business_model_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.produce_types_header ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.produce_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.social_impact_header ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.social_impact_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.environmental_commitment ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.growth_expansion_header ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.growth_expansion_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.growth_expansion_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Business model is viewable by everyone"
  ON mire_farm_website.business_model FOR SELECT
  USING (true);

CREATE POLICY "Business model features are viewable by everyone"
  ON mire_farm_website.business_model_features FOR SELECT
  USING (true);

CREATE POLICY "Produce types header is viewable by everyone"
  ON mire_farm_website.produce_types_header FOR SELECT
  USING (true);

CREATE POLICY "Produce items are viewable by everyone"
  ON mire_farm_website.produce_items FOR SELECT
  USING (true);

CREATE POLICY "Social impact header is viewable by everyone"
  ON mire_farm_website.social_impact_header FOR SELECT
  USING (true);

CREATE POLICY "Social impact cards are viewable by everyone"
  ON mire_farm_website.social_impact_cards FOR SELECT
  USING (true);

CREATE POLICY "Environmental commitment is viewable by everyone"
  ON mire_farm_website.environmental_commitment FOR SELECT
  USING (true);

CREATE POLICY "Growth expansion header is viewable by everyone"
  ON mire_farm_website.growth_expansion_header FOR SELECT
  USING (true);

CREATE POLICY "Growth expansion plans are viewable by everyone"
  ON mire_farm_website.growth_expansion_plans FOR SELECT
  USING (true);

CREATE POLICY "Growth expansion stats are viewable by everyone"
  ON mire_farm_website.growth_expansion_stats FOR SELECT
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_business_model_active ON mire_farm_website.business_model(active);
CREATE INDEX IF NOT EXISTS idx_business_model_features_display_order ON mire_farm_website.business_model_features(display_order);
CREATE INDEX IF NOT EXISTS idx_business_model_features_active ON mire_farm_website.business_model_features(active);
CREATE INDEX IF NOT EXISTS idx_produce_items_display_order ON mire_farm_website.produce_items(display_order);
CREATE INDEX IF NOT EXISTS idx_produce_items_active ON mire_farm_website.produce_items(active);
CREATE INDEX IF NOT EXISTS idx_social_impact_cards_display_order ON mire_farm_website.social_impact_cards(display_order);
CREATE INDEX IF NOT EXISTS idx_social_impact_cards_active ON mire_farm_website.social_impact_cards(active);
CREATE INDEX IF NOT EXISTS idx_growth_expansion_plans_display_order ON mire_farm_website.growth_expansion_plans(display_order);
CREATE INDEX IF NOT EXISTS idx_growth_expansion_plans_active ON mire_farm_website.growth_expansion_plans(active);
CREATE INDEX IF NOT EXISTS idx_growth_expansion_stats_display_order ON mire_farm_website.growth_expansion_stats(display_order);
CREATE INDEX IF NOT EXISTS idx_growth_expansion_stats_active ON mire_farm_website.growth_expansion_stats(active);
