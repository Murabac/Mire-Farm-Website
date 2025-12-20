-- Seed Data for Products Section
-- Run this after 007_update_products_multilang.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Products Data with English, Somali, and Arabic translations
-- Note: We're not inserting into the old 'name' and 'description' columns as they're deprecated
INSERT INTO mire_farm_website.products (
  name_en, name_so, name_ar,
  description_en, description_so, description_ar,
  image,
  category,
  display_order,
  active,
  in_stock
) VALUES
  (
    'Fresh Vegetables',
    'Khudaarta Cusub',
    'خضروات طازجة',
    'A wide variety of organic vegetables grown naturally without pesticides or harmful chemicals.',
    'Noocyo badan oo khudaar dabiici ah oo la koriyey si dabiici ah oo aan dhirta iyo kiimikada wanaagsan lahayn.',
    'مجموعة واسعة من الخضروات العضوية المزروعة بشكل طبيعي بدون مبيدات أو مواد كيميائية ضارة.',
    '/images/prod-1.jpg',
    'vegetables',
    1,
    TRUE,
    TRUE
  ),
  (
    'Organic Fruits',
    'Mirooyinka Dabiiciga',
    'فواكه عضوية',
    'Delicious fruits cultivated with care and sustainability, ensuring the highest quality and natural taste.',
    'Mirooyin macaan oo la koriyey si xirfad leh iyo waarta, loo hubiyo tayada ugu sareysa iyo dhadhanka dabiiciga ah.',
    'فواكه لذيذة مزروعة بعناية واستدامة، مما يضمن أعلى جودة وطعم طبيعي.',
    '/images/prod-2.jpg',
    'fruits',
    2,
    TRUE,
    TRUE
  )
ON CONFLICT DO NOTHING;

