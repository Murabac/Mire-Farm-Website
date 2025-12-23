import { NextResponse } from 'next/server';
import { createServerClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Public API to check maintenance mode status
export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        maintenanceMode: false,
        maintenanceMessage: '',
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('site_settings')
      .select('maintenance_mode, maintenance_message')
      .single();

    if (error) {
      // If table doesn't exist or other error, return not in maintenance
      return NextResponse.json({
        maintenanceMode: false,
        maintenanceMessage: '',
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    return NextResponse.json({
      maintenanceMode: data?.maintenance_mode || false,
      maintenanceMessage: data?.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    return NextResponse.json({
      maintenanceMode: false,
      maintenanceMessage: '',
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
}

