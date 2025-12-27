import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { ProductsOverviewSectionHeader, ProductsOverviewCard } from '@/types/products-overview';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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

    // Fetch header and cards in parallel
    const [headerResult, cardsResult] = await Promise.all([
      supabase
        .from('products_overview_section_header')
        .select('*')
        .eq('active', true)
        .single(),
      supabase
        .from('products_overview_cards')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true }),
    ]);

    console.log('API: GET - Fetched products overview from database:', {
      header: headerResult.data,
      cards: cardsResult.data,
    });

    const response = NextResponse.json({
      header: headerResult.data as ProductsOverviewSectionHeader | null,
      cards: (cardsResult.data || []) as ProductsOverviewCard[],
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
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
    const { header: headerData, cards: cardsData } = body;
    const supabase = createServerClient();

    // Update or create header
    if (headerData) {
      const { data: existingHeader } = await supabase
        .from('products_overview_section_header')
        .select('id')
        .eq('active', true)
        .single();

      const updateData = {
        ...headerData,
        updated_at: new Date().toISOString(),
      };

      if (existingHeader) {
        await supabase
          .from('products_overview_section_header')
          .update(updateData)
          .eq('id', existingHeader.id);
      } else {
        await supabase
          .from('products_overview_section_header')
          .insert({
            ...updateData,
            active: true,
          });
      }
    }

    // Update or create cards
    if (Array.isArray(cardsData)) {
      // Get all existing cards
      const { data: existingCards } = await supabase
        .from('products_overview_cards')
        .select('id');

      const existingIds = existingCards?.map(c => c.id) || [];
      const idsToKeep = new Set<number>();

      // Separate into updates and inserts
      const updates: any[] = [];
      const inserts: any[] = [];

      cardsData.forEach((card: any) => {
        const cardData = {
          name_en: card.name_en,
          name_so: card.name_so || null,
          name_ar: card.name_ar || null,
          description_en: card.description_en,
          description_so: card.description_so || null,
          description_ar: card.description_ar || null,
          image: card.image || null,
          display_order: card.display_order,
          updated_at: new Date().toISOString(),
        };

        if (card.id && existingIds.includes(card.id)) {
          idsToKeep.add(card.id);
          updates.push({ id: card.id, ...cardData });
        } else {
          inserts.push(cardData);
        }
      });

      // Delete cards that are not in the new list
      const idsToDelete = existingIds.filter(id => !idsToKeep.has(id));
      if (idsToDelete.length > 0) {
        await supabase
          .from('products_overview_cards')
          .delete()
          .in('id', idsToDelete);
      }

      // Insert new cards
      if (inserts.length > 0) {
        await supabase
          .from('products_overview_cards')
          .insert(inserts.map(card => ({ ...card, active: true })));
      }

      // Update existing cards
      for (const card of updates) {
        const { id, ...updateFields } = card;
        await supabase
          .from('products_overview_cards')
          .update(updateFields)
          .eq('id', id);
      }
    }

    // Fetch and return updated data
    const [headerResult, cardsResult] = await Promise.all([
      supabase
        .from('products_overview_section_header')
        .select('*')
        .eq('active', true)
        .single(),
      supabase
        .from('products_overview_cards')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true }),
    ]);

    console.log('API: PUT - Fetched updated products overview from database:', {
      header: headerResult.data,
      cards: cardsResult.data,
    });

    const response = NextResponse.json({
      header: headerResult.data as ProductsOverviewSectionHeader | null,
      cards: (cardsResult.data || []) as ProductsOverviewCard[],
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Content-Type-Options': 'nosniff',
      },
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
