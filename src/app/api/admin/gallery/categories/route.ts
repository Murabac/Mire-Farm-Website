import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { GalleryCategory } from '@/types/gallery';

export const dynamic = 'force-dynamic';

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

    const { data: categories, error } = await supabase
      .from('gallery_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch gallery categories' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      categories: (categories || []) as GalleryCategory[],
    });
  } catch (error) {
    console.error('Get gallery categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



