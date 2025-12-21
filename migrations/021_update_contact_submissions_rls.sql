-- Update Contact Submissions RLS Policies
-- Run this to ensure proper RLS policies for contact submissions
-- This allows public inserts and admin access for reads/updates/deletes

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON mire_farm_website.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions are viewable by everyone" ON mire_farm_website.contact_submissions;
DROP POLICY IF EXISTS "Allow contact form submission" ON mire_farm_website.contact_submissions;
DROP POLICY IF EXISTS "Allow contact submission lookup" ON mire_farm_website.contact_submissions;
DROP POLICY IF EXISTS "Allow contact submission updates" ON mire_farm_website.contact_submissions;
DROP POLICY IF EXISTS "Allow contact submission deletes" ON mire_farm_website.contact_submissions;

-- Create new policies for custom authentication
-- Allow public inserts for contact form submissions
CREATE POLICY "Allow contact form submission"
    ON mire_farm_website.contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- Allow selects for admin users (handled by API routes with proper authentication)
CREATE POLICY "Allow contact submission lookup"
    ON mire_farm_website.contact_submissions
    FOR SELECT
    USING (true);

-- Allow updates for admin management (mark as read/unread)
CREATE POLICY "Allow contact submission updates"
    ON mire_farm_website.contact_submissions
    FOR UPDATE
    USING (true);

-- Allow deletes for admin management
CREATE POLICY "Allow contact submission deletes"
    ON mire_farm_website.contact_submissions
    FOR DELETE
    USING (true);

