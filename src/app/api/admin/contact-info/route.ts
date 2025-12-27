import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { ContactInfo } from '@/types/contact';

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

    // Get active contact info
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('active', true)
      .single();

    if (error && error.code === 'PGRST116') {
      // No active contact info found, return null
      return NextResponse.json(null);
    }

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch contact info' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as ContactInfo);
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
    const supabase = createServerClient();

    // Check if there's an active contact info
    const { data: existingContactInfo } = await supabase
      .from('contact_info')
      .select('id')
      .eq('active', true)
      .single();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (existingContactInfo) {
      // Update existing active contact info
      const { data, error } = await supabase
        .from('contact_info')
        .update(updateData)
        .eq('id', existingContactInfo.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to update contact info' },
          { status: 500 }
        );
      }

      return NextResponse.json(data as ContactInfo);
    } else {
      // Create new contact info
      const { data, error } = await supabase
        .from('contact_info')
        .insert({
          ...updateData,
          active: true,
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to create contact info' },
          { status: 500 }
        );
      }

      return NextResponse.json(data as ContactInfo);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


