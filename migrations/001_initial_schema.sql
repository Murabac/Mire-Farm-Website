-- Supabase Database Schema for Mire Farms Website
-- Initial Migration: Creates all tables, RLS policies, indexes, and seed data
-- Run this SQL in your Supabase SQL Editor to set up the complete database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  image TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  emoji TEXT NOT NULL,
  badge TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Contact Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  read BOOLEAN DEFAULT FALSE
);

-- Newsletter Subscriptions Table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

-- Products Table (if needed)
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  price DECIMAL(10, 2),
  category TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Gallery Images Table (if needed)
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Hero Section Table
CREATE TABLE IF NOT EXISTS hero_section (
  id SERIAL PRIMARY KEY,
  -- Badge text
  badge_text_en TEXT NOT NULL,
  badge_text_so TEXT,
  badge_text_ar TEXT,
  -- Main heading
  heading_prefix_en TEXT NOT NULL,
  heading_prefix_so TEXT,
  heading_prefix_ar TEXT,
  heading_highlight_en TEXT NOT NULL,
  heading_highlight_so TEXT,
  heading_highlight_ar TEXT,
  heading_suffix_en TEXT NOT NULL,
  heading_suffix_so TEXT,
  heading_suffix_ar TEXT,
  -- Description
  description_en TEXT NOT NULL,
  description_so TEXT,
  description_ar TEXT,
  -- Buttons
  primary_button_text_en TEXT NOT NULL,
  primary_button_text_so TEXT,
  primary_button_text_ar TEXT,
  secondary_button_text_en TEXT NOT NULL,
  secondary_button_text_so TEXT,
  secondary_button_text_ar TEXT,
  -- Stats
  stat1_number TEXT NOT NULL,
  stat1_label_en TEXT NOT NULL,
  stat1_label_so TEXT,
  stat1_label_ar TEXT,
  stat2_number TEXT NOT NULL,
  stat2_label_en TEXT NOT NULL,
  stat2_label_so TEXT,
  stat2_label_ar TEXT,
  stat3_number TEXT NOT NULL,
  stat3_label_en TEXT NOT NULL,
  stat3_label_so TEXT,
  stat3_label_ar TEXT,
  -- Image
  hero_image_url TEXT NOT NULL,
  -- Badge (bottom right)
  bottom_badge_title_en TEXT NOT NULL,
  bottom_badge_title_so TEXT,
  bottom_badge_title_ar TEXT,
  bottom_badge_subtitle_en TEXT NOT NULL,
  bottom_badge_subtitle_so TEXT,
  bottom_badge_subtitle_ar TEXT,
  -- Metadata
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust based on your needs)
-- News Articles: Public read, admin write
CREATE POLICY "News articles are viewable by everyone"
  ON news_articles FOR SELECT
  USING (true);

-- Contact Submissions: Anyone can insert, only admins can read
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Newsletter Subscriptions: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Newsletter subscriptions are viewable by everyone"
  ON newsletter_subscriptions FOR SELECT
  USING (true);

-- Products: Public read
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Gallery Images: Public read
CREATE POLICY "Gallery images are viewable by everyone"
  ON gallery_images FOR SELECT
  USING (true);

-- Hero Section: Public read
CREATE POLICY "Hero section is viewable by everyone"
  ON hero_section FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_news_articles_date ON news_articles(date);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON news_articles(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_hero_section_active ON hero_section(active);
