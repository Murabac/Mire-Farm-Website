import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

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

    // Fetch all stats in parallel
    const [usersResult, submissionsResult, subscribersResult, newsResult] = await Promise.all([
      // Users count
      supabase
        .from('users')
        .select('*', { count: 'exact', head: true }),
      
      // Contact submissions count
      supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true }),
      
      // Newsletter subscribers count (active subscribers)
      supabase
        .from('newsletter_subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('subscribed', true),
      
      // News articles count
      supabase
        .from('news_articles')
        .select('*', { count: 'exact', head: true }),
    ]);

    // Log any errors for debugging
    if (usersResult.error) {
      console.error('Error fetching users count:', usersResult.error);
    }
    if (submissionsResult.error) {
      console.error('Error fetching submissions count:', submissionsResult.error);
    }
    if (subscribersResult.error) {
      console.error('Error fetching subscribers count:', subscribersResult.error);
    }
    if (newsResult.error) {
      console.error('Error fetching news articles count:', newsResult.error);
    }

    return NextResponse.json({
      users: usersResult.count || 0,
      submissions: submissionsResult.count || 0,
      subscribers: subscribersResult.count || 0,
      newsArticles: newsResult.count || 0,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

