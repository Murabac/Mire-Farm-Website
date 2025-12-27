import { NextResponse } from 'next/server';
import { createServerClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      // Return default menu if Supabase is not configured
      return NextResponse.json([
        { menu_key: 'home', label: 'Home', href: '/', visible: true },
        { menu_key: 'our-farm', label: 'Our Farm', href: '/our-farm', visible: true },
        { menu_key: 'gallery', label: 'Gallery', href: '/gallery', visible: true },
        { menu_key: 'news', label: 'News', href: '/news', visible: true },
      ], { headers: noCacheHeaders });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('menu_settings')
      .select('menu_key, label, href, visible')
      .eq('visible', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching menu settings:', error);
      // Return default visible menu on error
      return NextResponse.json([
        { menu_key: 'home', label: 'Home', href: '/', visible: true },
        { menu_key: 'our-farm', label: 'Our Farm', href: '/our-farm', visible: true },
        { menu_key: 'gallery', label: 'Gallery', href: '/gallery', visible: true },
        { menu_key: 'news', label: 'News', href: '/news', visible: true },
      ], { headers: noCacheHeaders });
    }

    return NextResponse.json(data || [], { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get public menu settings error:', error);
    return NextResponse.json([
      { menu_key: 'home', label: 'Home', href: '/', visible: true },
      { menu_key: 'our-farm', label: 'Our Farm', href: '/our-farm', visible: true },
      { menu_key: 'gallery', label: 'Gallery', href: '/gallery', visible: true },
      { menu_key: 'news', label: 'News', href: '/news', visible: true },
    ], { headers: noCacheHeaders });
  }
}


