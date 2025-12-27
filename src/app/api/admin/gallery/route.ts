import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { GalleryImage } from '@/types/gallery-images';

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
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Search by title or description
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: images, error } = await query;

    if (error) {
      console.error('Error fetching gallery images:', error);
      return NextResponse.json(
        { error: 'Failed to fetch gallery images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      images: (images || []) as GalleryImage[],
      total: images?.length || 0,
    });
  } catch (error) {
    console.error('Get gallery images error:', error);
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

    const insertData = {
      title: body.title || null,
      image_url: body.image_url,
      description: body.description || null,
      category: body.category || null,
    };

    const { data, error } = await supabase
      .from('gallery_images')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery image:', error);
      return NextResponse.json(
        { error: 'Failed to create gallery image' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as GalleryImage);
  } catch (error) {
    console.error('Create gallery image error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



