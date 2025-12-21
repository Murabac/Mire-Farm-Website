import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { HeroSection } from '@/types/hero';

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

    // Get active hero section, or create one if it doesn't exist
    let { data, error } = await supabase
      .from('hero_section')
      .select('*')
      .eq('active', true)
      .single();

    if (error && error.code === 'PGRST116') {
      // No active hero section found, return null
      return NextResponse.json(null);
    }

    if (error) {
      console.error('Error fetching hero section:', error);
      return NextResponse.json(
        { error: 'Failed to fetch hero section' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as HeroSection);
  } catch (error) {
    console.error('Get hero section error:', error);
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

    // Check if there's an active hero section
    const { data: existingHero } = await supabase
      .from('hero_section')
      .select('id')
      .eq('active', true)
      .single();

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (existingHero) {
      // Update existing active hero section
      const { data, error } = await supabase
        .from('hero_section')
        .update(updateData)
        .eq('id', existingHero.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating hero section:', error);
        return NextResponse.json(
          { error: 'Failed to update hero section' },
          { status: 500 }
        );
      }

      return NextResponse.json(data as HeroSection);
    } else {
      // Create new hero section
      const { data, error } = await supabase
        .from('hero_section')
        .insert({
          ...updateData,
          active: true,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating hero section:', error);
        return NextResponse.json(
          { error: 'Failed to create hero section' },
          { status: 500 }
        );
      }

      return NextResponse.json(data as HeroSection);
    }
  } catch (error) {
    console.error('Update hero section error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

