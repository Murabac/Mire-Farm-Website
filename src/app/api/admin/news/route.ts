import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { NewsArticle } from '@/types/news';

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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const search = searchParams.get('search');

    // For admin, we can fetch all articles (not just active ones)
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    // Filter by active status if provided
    if (active === 'true') {
      query = query.eq('active', true);
    } else if (active === 'false') {
      query = query.eq('active', false);
    }

    // Search by title (in any language)
    if (search) {
      query = query.or(`title_en.ilike.%${search}%,title_so.ilike.%${search}%,title_ar.ilike.%${search}%`);
    }

    const { data: articles, error } = await query;

    if (error) {
      console.error('Error fetching news articles:', error);
      return NextResponse.json(
        { error: 'Failed to fetch news articles' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      articles: (articles || []) as NewsArticle[],
      total: articles?.length || 0,
      active: articles?.filter(a => a.active).length || 0,
      inactive: articles?.filter(a => !a.active).length || 0,
    });
  } catch (error) {
    console.error('Get news articles error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const supabase = createServerClient();

    // Get max display_order to set default
    const { data: existingArticles } = await supabase
      .from('news_articles')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1);

    const maxOrder = existingArticles && existingArticles.length > 0 
      ? existingArticles[0].display_order 
      : 0;

    const insertData = {
      ...body,
      display_order: body.display_order ?? maxOrder + 1,
      active: body.active !== undefined ? body.active : true,
      date: body.date || new Date().toISOString().split('T')[0],
    };

    const { data, error } = await supabase
      .from('news_articles')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating news article:', error);
      return NextResponse.json(
        { error: 'Failed to create news article' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as NewsArticle);
  } catch (error) {
    console.error('Create news article error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
