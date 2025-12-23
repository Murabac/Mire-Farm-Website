# Supabase Storage Setup Guide for Image Uploads

This guide will help you set up Supabase Storage to enable image uploads in the Hero Editor (and other content management features).

## Step 1: Create a Storage Bucket

1. Go to your Supabase project dashboard at [https://app.supabase.com](https://app.supabase.com)
2. Log in and select your project
3. In the left sidebar, click on **Storage**
4. Click the **New bucket** button (or **Create bucket**)
5. Configure the bucket:
   - **Name**: `images` (this must match the bucket name in the code)
   - **Public bucket**: ✅ **Check this box** (required for public image URLs)
   - **File size limit**: `5242880` (5MB) or your preferred limit
   - **Allowed MIME types**: Leave empty to allow all image types, or specify: `image/jpeg,image/jpg,image/png,image/webp,image/gif`
6. Click **Create bucket**

## Step 2: Set Up Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies to allow:
- **Public read access** (so images can be viewed on your website)
- **Upload access** (for admins to upload images)

**Important**: Since this project uses custom authentication (not Supabase Auth), you have two options:

### Recommended: Use Service Role Key (Bypasses RLS)

1. Go to **Settings** → **API** in your Supabase dashboard
2. Find the **service_role key** (keep this secret - never expose it in client-side code)
3. Add it to your `.env.local` file:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
4. With the service role key, the upload API will bypass RLS policies
5. You still need public read access policy (see below)

### Option A: Using the Dashboard (Alternative: Using RLS Policies)

1. In the Storage section, click on your `images` bucket
2. Go to the **Policies** tab
3. Click **New policy** or **Add policy**

#### Create Public Read Policy:

1. Click **New policy**
2. Select **For full customization** or **Create a policy from scratch**
3. Configure the policy:
   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT` (Read)
   - **Target roles**: `public`
   - **Policy definition**: 
     ```sql
     true
     ```
   - Or use the visual editor and set it to allow `SELECT` for `public` role
4. Click **Review** then **Save policy**

#### Create Upload Policy (if NOT using service role key):

**Note**: If you're using the service role key (recommended), you can skip this step.

1. Click **New policy** again
2. Select **For full customization** or **Create a policy from scratch**
3. Configure the policy:
   - **Policy name**: `Public upload access` (or use anon role)
   - **Allowed operation**: `INSERT` (Upload)
   - **Target roles**: `anon` (since custom auth doesn't use authenticated role)
   - **Policy definition**:
     ```sql
     true
     ```
   - Or use the visual editor and set it to allow `INSERT` for `anon` role
4. Click **Review** then **Save policy**

**Important**: If using anon role for uploads, the API route authentication (JWT tokens) still protects your upload endpoint. The storage policy just allows the anon role to insert files, but only your authenticated API can call the upload endpoint.

#### Create Update Policy (if NOT using service role key, optional):

1. Click **New policy** again
2. Configure the policy:
   - **Policy name**: `Public update access`
   - **Allowed operation**: `UPDATE`
   - **Target roles**: `anon`
   - **Policy definition**:
     ```sql
     true
     ```
3. Click **Review** then **Save policy**

#### Create Delete Policy (if NOT using service role key, optional):

1. Click **New policy** again
2. Configure the policy:
   - **Policy name**: `Public delete access`
   - **Allowed operation**: `DELETE`
   - **Target roles**: `anon`
   - **Policy definition**:
     ```sql
     true
     ```
3. Click **Review** then **Save policy**

### Option B: Using SQL Editor (Alternative)

If you prefer using SQL, you can run these commands in the SQL Editor:

1. Go to **SQL Editor** in the Supabase dashboard
2. Click **New query**
3. Paste the following SQL:

```sql
-- Allow public read access to images bucket
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Allow anon role to upload images (if NOT using service role key)
-- Note: Your API route still protects this with JWT authentication
CREATE POLICY "Anon upload access"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'images');

-- Allow anon role to update images (optional, if NOT using service role key)
CREATE POLICY "Anon update access"
ON storage.objects
FOR UPDATE
TO anon
USING (bucket_id = 'images');

-- Allow anon role to delete images (optional, if NOT using service role key)
CREATE POLICY "Anon delete access"
ON storage.objects
FOR DELETE
TO anon
USING (bucket_id = 'images');
```

4. Click **Run** to execute the SQL

**Note**: 
- If you're using the **service role key** (recommended), you only need the public read policy. The service role bypasses RLS.
- If you're NOT using the service role key, use `anon` role instead of `authenticated` since this project uses custom authentication.
- The upload API route still protects uploads with JWT token authentication, so allowing `anon` role at the storage level is safe.

## Step 3: Verify Your Environment Variables

Make sure your `.env.local` file has the required Supabase variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Optionally, you can add the service role key for more permissions (recommended for admin operations):

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

You can find these in **Settings** → **API** in your Supabase dashboard.

## Step 4: Test the Upload

1. Start your development server: `npm run dev`
2. Log in to the dashboard
3. Navigate to **Dashboard** → **Content** → **Hero Section**
4. Scroll to the **Hero Image** section
5. Click on the upload area or use the file input
6. Select an image file (JPEG, PNG, WebP, or GIF, max 5MB)
7. The image should upload and the URL should be automatically filled in
8. The preview should show your uploaded image

## Troubleshooting

### Error: "Bucket not found"
- Make sure the bucket name is exactly `images` (case-sensitive)
- Verify the bucket exists in your Supabase Storage dashboard

### Error: "New row violates row-level security policy"
- Check that you've created the storage policies as described above
- Verify the bucket is set to **Public** if you want public read access
- If using custom auth, you may need to adjust policies to allow `anon` role, or ensure the service role key is being used

### Error: "Upload failed" or 401/403 errors
- Check that you're logged in to the dashboard
- Verify your JWT token is valid
- Check that the upload API route authentication is working
- Ensure the storage policies allow authenticated users to INSERT

### Images not displaying
- Check that the bucket is set to **Public**
- Verify the public read policy is active
- Check the browser console for CORS or other errors
- Ensure the image URL is correctly saved in the database

### File size errors
- The default limit is 5MB
- You can adjust this in the API route (`src/app/api/admin/upload-image/route.ts`)
- Also adjust the bucket file size limit in Supabase Storage settings

## Additional Notes

- Images are stored in folders within the bucket (e.g., `hero/` for hero images)
- File names are automatically generated to prevent conflicts
- The public URL format will be: `https://[project-ref].supabase.co/storage/v1/object/public/images/[folder]/[filename]`
- You can organize images in different folders (hero, products, gallery, etc.) by modifying the `folder` parameter in the upload API

## Security Best Practices

1. **File Type Validation**: The API already validates file types on the server
2. **File Size Limits**: 5MB limit is enforced on both client and server
3. **Authentication**: Only authenticated users can upload (enforced by API route)
4. **Unique Filenames**: Prevents file overwrites and naming conflicts
5. **Storage Policies**: RLS policies provide an additional layer of security

Consider adding:
- Image optimization/compression before upload
- Virus scanning for uploaded files
- Rate limiting on upload endpoints
- Regular cleanup of orphaned files

