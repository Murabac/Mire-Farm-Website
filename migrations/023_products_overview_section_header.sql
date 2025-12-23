-- Products Overview Section Header and Cards Tables
-- Run this after 000_create_schema.sql and 001_initial_schema.sql
-- This creates tables for the products overview section header and cards on the homepage

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Products Overview Section Header Table
CREATE TABLE IF NOT EXISTS mire_farm_website.products_overview_section_header (
  id SERIAL PRIMARY KEY,
  -- Title in different languages
  title_en TEXT NOT NULL,
  title_so TEXT,
  title_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Button text in different languages
  button_text_en TEXT NOT NULL,
  button_text_so TEXT,
  button_text_ar TEXT,
  -- Badge text in different languages
  badge_text_en TEXT NOT NULL,
  badge_text_so TEXT,
  badge_text_ar TEXT,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products Overview Cards Table (exactly 2 cards)
CREATE TABLE IF NOT EXISTS mire_farm_website.products_overview_cards (
  id SERIAL PRIMARY KEY,
  -- Name in different languages
  name_en TEXT NOT NULL,
  name_so TEXT,
  name_ar TEXT,
  -- Description in different languages
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Image URL
  image TEXT,
  -- Display order (1 or 2)
  display_order INTEGER NOT NULL DEFAULT 1 CHECK (display_order IN (1, 2)),
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  -- Ensure unique display_order
  UNIQUE(display_order)
);

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.products_overview_section_header ENABLE ROW LEVEL SECURITY;
ALTER TABLE mire_farm_website.products_overview_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Products overview section header is viewable by everyone"
  ON mire_farm_website.products_overview_section_header FOR SELECT
  USING (true);

CREATE POLICY "Products overview cards are viewable by everyone"
  ON mire_farm_website.products_overview_cards FOR SELECT
  USING (true);

-- Create indexes for active status
CREATE INDEX IF NOT EXISTS idx_products_overview_section_header_active ON mire_farm_website.products_overview_section_header(active);
CREATE INDEX IF NOT EXISTS idx_products_overview_cards_active ON mire_farm_website.products_overview_cards(active);
CREATE INDEX IF NOT EXISTS idx_products_overview_cards_display_order ON mire_farm_website.products_overview_cards(display_order);

-- Insert default seed data for section header
INSERT INTO mire_farm_website.products_overview_section_header (
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  button_text_en, button_text_so, button_text_ar,
  badge_text_en, badge_text_so, badge_text_ar,
  active
) VALUES (
  'Our Fresh Produce',
  'Khudaarta iyo Mirooyinkayaga Cusub',
  'منتجاتنا الطازجة',
  'We cultivate a diverse range of organic fruits and vegetables, all grown with care and without the use of harmful pesticides or chemicals.',
  'Waxaynu korinaynaa noocyo badan oo khudaar iyo mirooyin dabiici ah, dhammaan waxay la koriyey si xirfad leh oo aan la adeegsanayn dhirta ama kiimikada wanaagsan.',
  'نزرع مجموعة متنوعة من الفواكه والخضروات العضوية، كلها مزروعة بعناية وبدون استخدام مبيدات أو مواد كيميائية ضارة.',
  'View All Products',
  'Eeg Dhammaan Alaabta',
  'عرض جميع المنتجات',
  '100% Organic',
  '100% Dabiici',
  '100% عضوي',
  TRUE
)
ON CONFLICT DO NOTHING;

-- Insert default seed data for cards
INSERT INTO mire_farm_website.products_overview_cards (
  name_en, name_so, name_ar,
  description_en, description_so, description_ar,
  image,
  display_order,
  active
) VALUES 
  (
    'Fresh Vegetables',
    'Khudaar Cusub',
    'خضروات طازجة',
    'A wide variety of organic vegetables grown naturally',
    'Noocyo badan oo khudaar dabiici ah oo si dabiici ah loo koro',
    'مجموعة متنوعة من الخضروات العضوية المزروعة بشكل طبيعي',
    '/images/prod-1.jpg',
    1,
    TRUE
  ),
  (
    'Organic Fruits',
    'Mirooyin Dabiici',
    'فواكه عضوية',
    'Delicious fruits cultivated with care and sustainability',
    'Mirooyin macaan oo si xirfad leh oo waarta loo koro',
    'فواكه لذيذة مزروعة بعناية واستدامة',
    '/images/prod-2.jpg',
    2,
    TRUE
  )
ON CONFLICT (display_order) DO NOTHING;

