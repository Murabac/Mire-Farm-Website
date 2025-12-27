import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { NewsArticle } from '@/types/news';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const articleId = parseInt(params.id);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', articleId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch news article' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as NewsArticle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const articleId = parseInt(params.id);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const supabase = createServerClient();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('news_articles')
      .update(updateData)
      .eq('id', articleId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to update news article' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as NewsArticle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const articleId = parseInt(params.id);
    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', articleId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete news article' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



