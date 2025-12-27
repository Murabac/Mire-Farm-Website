import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: noCacheHeaders });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401, headers: noCacheHeaders });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('page_headers')
      .select('*')
      .order('page_route', { ascending: true });

    if (error) {
      console.error('Error fetching page headers:', error);
      return NextResponse.json({ error: 'Failed to fetch page headers' }, { status: 500, headers: noCacheHeaders });
    }

    return NextResponse.json({ headers: data || [] }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get page headers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: noCacheHeaders });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401, headers: noCacheHeaders });
    }

    const body = await request.json();
    const { header } = body;

    if (!header || !header.id) {
      return NextResponse.json({ error: 'Header ID is required' }, { status: 400, headers: noCacheHeaders });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('page_headers')
      .update({
        badge_text_en: header.badge_text_en,
        badge_text_so: header.badge_text_so,
        badge_text_ar: header.badge_text_ar,
        title_en: header.title_en,
        title_so: header.title_so,
        title_ar: header.title_ar,
        description_en: header.description_en,
        description_so: header.description_so,
        description_ar: header.description_ar,
        active: header.active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', header.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating page header:', error);
      return NextResponse.json({ error: 'Failed to update page header' }, { status: 500, headers: noCacheHeaders });
    }

    return NextResponse.json({ success: true, header: data }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put page header error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}


