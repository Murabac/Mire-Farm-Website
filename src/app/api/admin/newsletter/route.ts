import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

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
    const subscribed = searchParams.get('subscribed');
    const search = searchParams.get('search');

    let query = supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by subscription status
    if (subscribed === 'true') {
      query = query.eq('subscribed', true);
    } else if (subscribed === 'false') {
      query = query.eq('subscribed', false);
    }

    // Search by email
    if (search) {
      query = query.ilike('email', `%${search}%`);
    }

    const { data: subscribers, error } = await query;

    if (error) {
      console.error('Error fetching subscribers:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscribers: subscribers || [],
      total: subscribers?.length || 0,
      subscribed: subscribers?.filter(s => s.subscribed).length || 0,
      unsubscribed: subscribers?.filter(s => !s.subscribed).length || 0,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

