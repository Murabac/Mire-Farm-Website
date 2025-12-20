-- Benefits Section Table with Multi-language Support (English, Somali, Arabic)
-- Run this SQL in your Supabase SQL Editor

-- Benefits Table
CREATE TABLE IF NOT EXISTS benefits (
  id SERIAL PRIMARY KEY,
  -- Benefit text in different languages
  text_en TEXT NOT NULL,
  text_so TEXT,
  text_ar TEXT,
  -- Display order
  display_order INTEGER NOT NULL DEFAULT 0,
  -- Active status
  active BOOLEAN DEFAULT TRUE,
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Benefits are viewable by everyone"
  ON benefits FOR SELECT
  USING (true);

-- Create index for display order and active status
CREATE INDEX IF NOT EXISTS idx_benefits_display_order ON benefits(display_order);
CREATE INDEX IF NOT EXISTS idx_benefits_active ON benefits(active);

-- Insert Benefits Data with English, Somali, and Arabic translations
INSERT INTO benefits (text_en, text_so, text_ar, display_order, active) VALUES
  ('100% Organic', '100% Dabiici', '100% عضوي', 1, TRUE),
  ('Pesticide Free', 'Aan Dhirta Lahayn', 'خالي من المبيدات', 2, TRUE),
  ('Locally Grown', 'Ku Koray Dalka', 'مزروع محلياً', 3, TRUE),
  ('Fresh Daily', 'Cusub Maalin Kasta', 'طازج يومياً', 4, TRUE),
  ('Sustainable', 'Waarta', 'مستدام', 5, TRUE),
  ('Quality Assured', 'Tayada La Hubiyay', 'الجودة مضمونة', 6, TRUE);
