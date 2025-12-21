import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    // Get all language settings (public endpoint for frontend)
    const { data, error } = await supabase
      .from('language_settings')
      .select('id, language_code, enabled, display_order, created_at, updated_at')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { 
          error: 'Failed to fetch language settings',
          details: error,
          message: 'Check server logs for details'
        },
        { status: 500 }
      );
    }

    // If no data, return empty array
    if (!data || data.length === 0) {
      return NextResponse.json([]);
    }

    // Explicitly ensure boolean values are properly typed
    const normalizedData = data.map(item => ({
      ...item,
      enabled: Boolean(item.enabled),
    }));

    return NextResponse.json(normalizedData);
  } catch (error) {
    // Return error instead of defaults so we can debug
    return NextResponse.json(
      { 
        error: 'Exception while fetching language settings',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { settings } = body;

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected array of settings.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Ensure at least one language is enabled
    const enabledCount = settings.filter((s: any) => s.enabled).length;
    if (enabledCount === 0) {
      return NextResponse.json(
        { error: 'At least one language must be enabled' },
        { status: 400 }
      );
    }

    // Update each language setting
    for (const setting of settings) {
      const { data: existing, error: checkError } = await supabase
        .from('language_settings')
        .select('id')
        .eq('language_code', setting.language_code)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 means no rows found, which is fine - we'll insert
        // Silently continue - error will be handled if insert/update fails
      }

      if (existing) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('language_settings')
          .update({
            enabled: setting.enabled,
            display_order: setting.display_order,
            updated_at: new Date().toISOString(),
          })
          .eq('language_code', setting.language_code);

        if (updateError) {
          return NextResponse.json(
            { error: `Failed to update language setting for ${setting.language_code}` },
            { status: 500 }
          );
        }
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('language_settings')
          .insert({
            language_code: setting.language_code,
            enabled: setting.enabled,
            display_order: setting.display_order,
          });

        if (insertError) {
          return NextResponse.json(
            { error: `Failed to insert language setting for ${setting.language_code}` },
            { status: 500 }
          );
        }
      }
    }

    // Fetch and return updated settings
    const { data: updatedSettings, error: fetchError } = await supabase
      .from('language_settings')
      .select('*')
      .order('display_order', { ascending: true });

    if (fetchError) {
      return NextResponse.json(
        { error: 'Settings saved but failed to fetch updated settings' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedSettings || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

