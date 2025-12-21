-- Fix RLS Policies for Users Table
-- Run this if you already ran 019_users_table.sql and need to fix the RLS policies
-- This removes the old policies that use auth.uid() and creates new ones for custom auth

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON mire_farm_website.users;
DROP POLICY IF EXISTS "Users can update own profile" ON mire_farm_website.users;
DROP POLICY IF EXISTS "Allow user registration" ON mire_farm_website.users;
DROP POLICY IF EXISTS "Allow user lookup" ON mire_farm_website.users;
DROP POLICY IF EXISTS "Allow user updates" ON mire_farm_website.users;
DROP POLICY IF EXISTS "Allow user deletes" ON mire_farm_website.users;

-- Create new policies for custom authentication
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

