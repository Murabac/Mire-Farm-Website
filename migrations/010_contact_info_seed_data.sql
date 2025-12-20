-- Seed Data for Contact Information
-- Run this after 009_contact_info.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Contact Information Data with English, Somali, and Arabic translations
INSERT INTO mire_farm_website.contact_info (
  location_en, location_so, location_ar,
  phone,
  email,
  hours_en, hours_so, hours_ar,
  active
) VALUES
  (
    'Arabsiyo Village, Gabiley Region, Somaliland',
    'Magaalada Arabsiyo, Gobolka Gabiley, Somaliland',
    'قرية عربسيو، منطقة جابيلي، أرض الصومال',
    '+252 63 4222 609',
    'info@mirefarms.com',
    'Saturday - Thursday: 7:00 AM - 5:00 PM\nFriday: Closed',
    'Sabti - Khamiis: 7:00 AM - 5:00 PM\nJimco: Xiran',
    'السبت - الخميس: 7:00 صباحاً - 5:00 مساءً\nالجمعة: مغلق',
    TRUE
  )
ON CONFLICT DO NOTHING;
