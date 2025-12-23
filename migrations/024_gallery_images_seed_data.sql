-- Gallery Images Seed Data
-- Run this after 001_initial_schema.sql
-- This inserts initial seed data for gallery images

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Gallery Images Data
INSERT INTO mire_farm_website.gallery_images (
  title,
  image_url,
  description,
  category,
  created_at
) VALUES 
  (
    'Sustainable Farm Fields',
    '/images/gellary-1.jpg',
    'Beautiful sustainable farm fields showing our commitment to organic farming practices',
    'farm-operations',
    NOW()
  ),
  (
    'Fresh Organic Vegetables',
    '/images/gellary-2.jpg',
    'A variety of fresh, organic vegetables grown with care and sustainable methods',
    'products',
    NOW()
  ),
  (
    'Organic Fruits',
    '/images/gellary-3.jpg',
    'Fresh, organic fruits harvested at peak ripeness for maximum flavor and nutrition',
    'products',
    NOW()
  ),
  (
    'Green Farm Rows',
    '/images/gellary-4.jpg',
    'Well-organized green farm rows showcasing our organized and efficient farming approach',
    'farm-operations',
    NOW()
  ),
  (
    'Harvest Time',
    '/images/gellary-5.jpg',
    'The rewarding moment of harvest, collecting the fruits of our sustainable labor',
    'farm-operations',
    NOW()
  ),
  (
    'Community Farming',
    '/images/gellary-6.jpg',
    'Community members working together in our farming initiatives',
    'community',
    NOW()
  ),
  (
    'Organic Vegetables Basket',
    '/images/gellary-7.jpg',
    'A beautiful basket filled with our freshly harvested organic vegetables',
    'products',
    NOW()
  ),
  (
    'Greenhouse Farming',
    '/images/gellary-8.jpg',
    'Our modern greenhouse facilities for year-round sustainable crop production',
    'farm-operations',
    NOW()
  )
ON CONFLICT DO NOTHING;

