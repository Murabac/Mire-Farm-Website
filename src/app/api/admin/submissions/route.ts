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
    const read = searchParams.get('read');
    const search = searchParams.get('search');

    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by read status
    if (read === 'true') {
      query = query.eq('read', true);
    } else if (read === 'false') {
      query = query.eq('read', false);
    }

    // Search by name, email, or message
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`);
    }

    const { data: submissions, error } = await query;

    if (error) {
      console.error('Error fetching submissions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      submissions: submissions || [],
      total: submissions?.length || 0,
      read: submissions?.filter(s => s.read).length || 0,
      unread: submissions?.filter(s => !s.read).length || 0,
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

