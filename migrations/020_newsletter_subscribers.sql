-- Newsletter Subscribers Table
-- Run this SQL in your Supabase SQL Editor
-- Note: This creates a new table with enhanced features. If you have an existing newsletter_subscriptions table,
-- you may want to migrate data from it first.

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Drop old newsletter_subscriptions table if it exists (optional - comment out if you want to keep it)
-- DROP TABLE IF EXISTS mire_farm_website.newsletter_subscriptions;

-- Newsletter Subscribers Table (enhanced version)
CREATE TABLE IF NOT EXISTS mire_farm_website.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON mire_farm_website.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_subscribed ON mire_farm_website.newsletter_subscribers(subscribed);

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_newsletter_subscribers_updated_at ON mire_farm_website.newsletter_subscribers;
CREATE TRIGGER update_newsletter_subscribers_updated_at
    BEFORE UPDATE ON mire_farm_website.newsletter_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION mire_farm_website.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Newsletter Subscribers
-- Allow inserts for newsletter subscription (public)
CREATE POLICY "Allow newsletter subscription"
    ON mire_farm_website.newsletter_subscribers
    FOR INSERT
    WITH CHECK (true);

-- Allow selects for admin users (handled by API routes with proper authentication)
CREATE POLICY "Allow newsletter subscriber lookup"
    ON mire_farm_website.newsletter_subscribers
    FOR SELECT
    USING (true);

-- Allow updates for unsubscribing and admin management
CREATE POLICY "Allow newsletter subscriber updates"
    ON mire_farm_website.newsletter_subscribers
    FOR UPDATE
    USING (true);

-- Allow deletes for admin management
CREATE POLICY "Allow newsletter subscriber deletes"
    ON mire_farm_website.newsletter_subscribers
    FOR DELETE
    USING (true);

