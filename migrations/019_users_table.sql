-- Users Table for Custom Authentication
-- This replaces Supabase Auth with a custom users table
-- Run this SQL in your Supabase SQL Editor

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Enable pgcrypto extension for password hashing (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users Table
CREATE TABLE IF NOT EXISTS mire_farm_website.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token TEXT,
  email_verification_expires TIMESTAMP WITH TIME ZONE,
  password_reset_token TEXT,
  password_reset_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON mire_farm_website.users(email);
CREATE INDEX IF NOT EXISTS idx_users_email_verification_token ON mire_farm_website.users(email_verification_token);
CREATE INDEX IF NOT EXISTS idx_users_password_reset_token ON mire_farm_website.users(password_reset_token);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION mire_farm_website.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON mire_farm_website.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON mire_farm_website.users
    FOR EACH ROW
    EXECUTE FUNCTION mire_farm_website.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE mire_farm_website.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Custom Authentication
-- Since we're using custom auth, we need policies that work with the anon role
-- These policies allow the API routes (using anon key) to insert and select users
-- Security is handled at the API layer with password hashing and JWT tokens

-- Allow inserts for new user registration (handled by API routes)
CREATE POLICY "Allow user registration"
    ON mire_farm_website.users
    FOR INSERT
    WITH CHECK (true);

-- Allow selects for user lookup (handled by API routes with proper authentication)
CREATE POLICY "Allow user lookup"
    ON mire_farm_website.users
    FOR SELECT
    USING (true);

-- Allow updates for user profile updates (handled by API routes with proper authentication)
CREATE POLICY "Allow user updates"
    ON mire_farm_website.users
    FOR UPDATE
    USING (true);

-- Allow deletes for user management (handled by API routes with proper authentication)
CREATE POLICY "Allow user deletes"
    ON mire_farm_website.users
    FOR DELETE
    USING (true);

-- Note: For better security in production, consider:
-- 1. Using service role key in API routes instead of anon key
-- 2. Creating more restrictive RLS policies based on your needs
-- 3. Adding additional validation in API routes

