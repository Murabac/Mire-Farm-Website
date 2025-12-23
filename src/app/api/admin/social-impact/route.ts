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

    // Fetch social impact header
    const { data: header, error: headerError } = await supabase
      .from('social_impact_header')
      .select('*')
      .single();

    if (headerError && headerError.code !== 'PGRST116') {
      console.error('Error fetching social impact header:', headerError);
    }

    // Fetch social impact cards
    const { data: cards, error: cardsError } = await supabase
      .from('social_impact_cards')
      .select('*')
      .order('display_order', { ascending: true });

    if (cardsError) {
      console.error('Error fetching social impact cards:', cardsError);
    }

    // Fetch environmental commitment
    const { data: commitment, error: commitmentError } = await supabase
      .from('environmental_commitment')
      .select('*')
      .single();

    if (commitmentError && commitmentError.code !== 'PGRST116') {
      console.error('Error fetching environmental commitment:', commitmentError);
    }

    return NextResponse.json({
      header: header || null,
      cards: cards || [],
      commitment: commitment || null,
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get social impact error:', error);
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
    const { header, cards, commitment } = body;

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
        active: header.active,
        updated_at: new Date().toISOString(),
      };

      if (header.id) {
        const { error } = await supabase
          .from('social_impact_header')
          .update(headerData)
          .eq('id', header.id);

        if (error) {
          console.error('Error updating social impact header:', error);
          return NextResponse.json({ error: 'Failed to update header' }, { status: 500, headers: noCacheHeaders });
        }
      } else {
        const { error } = await supabase
          .from('social_impact_header')
          .insert(headerData);

        if (error) {
          console.error('Error inserting social impact header:', error);
          return NextResponse.json({ error: 'Failed to create header' }, { status: 500, headers: noCacheHeaders });
        }
      }
    }

    // Update cards
    if (cards && Array.isArray(cards)) {
      // Get existing card IDs
      const existingIds = cards.filter(c => c.id).map(c => c.id);
      
      // Delete cards that are no longer in the list
      if (existingIds.length > 0) {
        await supabase
          .from('social_impact_cards')
          .delete()
          .not('id', 'in', `(${existingIds.join(',')})`);
      } else {
        await supabase
          .from('social_impact_cards')
          .delete()
          .neq('id', 0);
      }

      for (const card of cards) {
        const cardData = {
          icon_type: card.icon_type,
          emoji: card.emoji,
          title_en: card.title_en,
          title_so: card.title_so,
          title_ar: card.title_ar,
          description_en: card.description_en,
          description_so: card.description_so,
          description_ar: card.description_ar,
          color_class: card.color_class,
          display_order: card.display_order,
          active: card.active,
          updated_at: new Date().toISOString(),
        };

        if (card.id) {
          const { error } = await supabase
            .from('social_impact_cards')
            .update(cardData)
            .eq('id', card.id);

          if (error) {
            console.error('Error updating card:', error);
          }
        } else {
          const { error } = await supabase
            .from('social_impact_cards')
            .insert(cardData);

          if (error) {
            console.error('Error inserting card:', error);
          }
        }
      }
    }

    // Update environmental commitment
    if (commitment) {
      const commitmentData = {
        emoji: commitment.emoji,
        title_en: commitment.title_en,
        title_so: commitment.title_so,
        title_ar: commitment.title_ar,
        description_en: commitment.description_en,
        description_so: commitment.description_so,
        description_ar: commitment.description_ar,
        active: commitment.active,
        updated_at: new Date().toISOString(),
      };

      if (commitment.id) {
        const { error } = await supabase
          .from('environmental_commitment')
          .update(commitmentData)
          .eq('id', commitment.id);

        if (error) {
          console.error('Error updating environmental commitment:', error);
          return NextResponse.json({ error: 'Failed to update commitment' }, { status: 500, headers: noCacheHeaders });
        }
      } else {
        const { error } = await supabase
          .from('environmental_commitment')
          .insert(commitmentData);

        if (error) {
          console.error('Error inserting environmental commitment:', error);
          return NextResponse.json({ error: 'Failed to create commitment' }, { status: 500, headers: noCacheHeaders });
        }
      }
    }

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put social impact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

