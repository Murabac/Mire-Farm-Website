import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: NextRequest) {
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

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching site settings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch site settings' },
        { status: 500 }
      );
    }

    // Return defaults if no data
    if (!data) {
      return NextResponse.json({
        siteName: 'Mire Farms',
        defaultLanguage: 'en',
        timezone: 'Africa/Mogadishu',
        maintenanceMode: false,
        maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
      }, { headers: noCacheHeaders });
    }

    return NextResponse.json({
      siteName: data.site_name || 'Mire Farms',
      defaultLanguage: data.default_language || 'en',
      timezone: data.timezone || 'Africa/Mogadishu',
      maintenanceMode: data.maintenance_mode || false,
      maintenanceMessage: data.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get site settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: noCacheHeaders }
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
    const { siteName, defaultLanguage, timezone, maintenanceMode, maintenanceMessage } = body;

    const supabase = createServerClient();

    // Check if settings exist
    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .single();

    const settingsData = {
      site_name: siteName,
      default_language: defaultLanguage,
      timezone: timezone,
      maintenance_mode: maintenanceMode,
      maintenance_message: maintenanceMessage,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('site_settings')
        .update(settingsData)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Insert new
      result = await supabase
        .from('site_settings')
        .insert(settingsData)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error saving site settings:', result.error);
      return NextResponse.json(
        { error: 'Failed to save site settings' },
        { status: 500, headers: noCacheHeaders }
      );
    }

    return NextResponse.json({ success: true, data: result.data }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put site settings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}

