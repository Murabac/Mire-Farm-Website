import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SCHEMA_NAME = 'mire_farm_website';

// Create client-side Supabase client
// Note: This will work even if env vars are missing (for development)
// Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in production
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    db: {
      schema: SCHEMA_NAME,
    },
  }
);

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Server-side Supabase client (for use in API routes and server components)
// For custom auth, we can use service role key for better security (optional)
// If SERVICE_ROLE_KEY is set, it will be used; otherwise, anon key is used
export const createServerClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  // Use service role key if available (more secure for server-side operations)
  // Otherwise fall back to anon key
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY) in your .env.local file.');
  }
  
  return createClient(url, key, {
    db: {
      schema: SCHEMA_NAME,
    },
  });
};
