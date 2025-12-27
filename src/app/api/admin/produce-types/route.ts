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

    // Fetch produce types header
    const { data: header, error: headerError } = await supabase
      .from('produce_types_header')
      .select('*')
      .single();

    if (headerError && headerError.code !== 'PGRST116') {
      console.error('Error fetching produce types header:', headerError);
    }

    // Fetch produce items
    const { data: items, error: itemsError } = await supabase
      .from('produce_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (itemsError) {
      console.error('Error fetching produce items:', itemsError);
    }

    return NextResponse.json({
      header: header || null,
      items: items || [],
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get produce types error:', error);
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
    const { header, items } = body;

    const supabase = createServerClient();

    // Update header
    if (header) {
      const headerData = {
        title_en: header.title_en,
        title_so: header.title_so,
        title_ar: header.title_ar,
        description_en: header.description_en,
        description_so: header.description_so,
        description_ar: header.description_ar,
        footer_badge_text_en: header.footer_badge_text_en,
        footer_badge_text_so: header.footer_badge_text_so,
        footer_badge_text_ar: header.footer_badge_text_ar,
        active: header.active,
        updated_at: new Date().toISOString(),
      };

      if (header.id) {
        const { error } = await supabase
          .from('produce_types_header')
          .update(headerData)
          .eq('id', header.id);

        if (error) {
          console.error('Error updating produce types header:', error);
          return NextResponse.json({ error: 'Failed to update header' }, { status: 500, headers: noCacheHeaders });
        }
      } else {
        const { error } = await supabase
          .from('produce_types_header')
          .insert(headerData);

        if (error) {
          console.error('Error inserting produce types header:', error);
          return NextResponse.json({ error: 'Failed to create header' }, { status: 500, headers: noCacheHeaders });
        }
      }
    }

    // Update items
    if (items && Array.isArray(items)) {
      // Get existing item IDs
      const existingIds = items.filter(item => item.id).map(item => item.id);
      
      // Delete items that are no longer in the list
      if (existingIds.length > 0) {
        await supabase
          .from('produce_items')
          .delete()
          .not('id', 'in', `(${existingIds.join(',')})`);
      } else {
        // If no existing IDs, delete all items (they'll be re-created)
        await supabase
          .from('produce_items')
          .delete()
          .neq('id', 0); // Delete all
      }

      for (const item of items) {
        const itemData = {
          name_en: item.name_en,
          name_so: item.name_so,
          name_ar: item.name_ar,
          emoji: item.emoji,
          display_order: item.display_order,
          active: item.active,
          updated_at: new Date().toISOString(),
        };

        if (item.id) {
          const { error } = await supabase
            .from('produce_items')
            .update(itemData)
            .eq('id', item.id);

          if (error) {
            console.error('Error updating produce item:', error);
          }
        } else {
          const { error } = await supabase
            .from('produce_items')
            .insert(itemData);

          if (error) {
            console.error('Error inserting produce item:', error);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put produce types error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}


