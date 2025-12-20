-- Seed Data for Gallery Categories
-- Run this after 015_gallery_categories_schema.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Gallery Categories Data
INSERT INTO mire_farm_website.gallery_categories (
  category_key, name_en, name_so, name_ar, emoji, display_order, active
) VALUES
  (
    'all',
    'All',
    'Dhammaan',
    'الكل',
    '🖼️',
    0,
    TRUE
  ),
  (
    'farm-operations',
    'Farm Operations',
    'Hawlaha Beeraha',
    'عمليات المزرعة',
    '🚜',
    1,
    TRUE
  ),
  (
    'products',
    'Products',
    'Alaabta',
    'المنتجات',
    '🍎',
    2,
    TRUE
  ),
  (
    'community',
    'Community',
    'Bulshada',
    'المجتمع',
    '👥',
    3,
    TRUE
  )
ON CONFLICT (category_key) DO NOTHING;
