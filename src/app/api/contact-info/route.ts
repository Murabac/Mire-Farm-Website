import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { ContactInfo } from '@/types/contact';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching contact info:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contact info' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as ContactInfo | null, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Get contact info error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

