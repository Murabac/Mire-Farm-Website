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
      .from('menu_settings')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu settings:', error);
      return NextResponse.json({ error: 'Failed to fetch menu settings' }, { status: 500, headers: noCacheHeaders });
    }

    return NextResponse.json(data || [], { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get menu settings error:', error);
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
    const { menuItems } = body;

    if (!menuItems || !Array.isArray(menuItems)) {
      return NextResponse.json({ error: 'Invalid menu items data' }, { status: 400, headers: noCacheHeaders });
    }

    const supabase = createServerClient();

    // Update each menu item
    for (const item of menuItems) {
      const { error } = await supabase
        .from('menu_settings')
        .update({
          visible: item.visible,
          updated_at: new Date().toISOString(),
        })
        .eq('menu_key', item.menu_key);

      if (error) {
        console.error('Error updating menu item:', error);
      }
    }

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put menu settings error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}


