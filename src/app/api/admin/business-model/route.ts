import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: noCacheHeaders });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401, headers: noCacheHeaders });
    }

    const supabase = createServerClient();

    // Fetch business model header
    const { data: businessModel, error: bmError } = await supabase
      .from('business_model')
      .select('*')
      .single();

    if (bmError && bmError.code !== 'PGRST116') {
      console.error('Error fetching business model:', bmError);
    }

    // Fetch business model features
    const { data: features, error: featuresError } = await supabase
      .from('business_model_features')
      .select('*')
      .order('display_order', { ascending: true });

    if (featuresError) {
      console.error('Error fetching features:', featuresError);
    }

    return NextResponse.json({
      businessModel: businessModel || null,
      features: features || [],
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get business model error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    const token = getTokenFromCookies(cookieHeader);

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401, headers: noCacheHeaders });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401, headers: noCacheHeaders });
    }

    const body = await request.json();
    const { businessModel, features } = body;

    const supabase = createServerClient();

    // Update business model header
    if (businessModel) {
      const bmData = {
        badge_text_en: businessModel.badge_text_en,
        badge_text_so: businessModel.badge_text_so,
        badge_text_ar: businessModel.badge_text_ar,
        title_en: businessModel.title_en,
        title_so: businessModel.title_so,
        title_ar: businessModel.title_ar,
        description_en: businessModel.description_en,
        description_so: businessModel.description_so,
        description_ar: businessModel.description_ar,
        image_url: businessModel.image_url,
        active: businessModel.active,
        updated_at: new Date().toISOString(),
      };

      if (businessModel.id) {
        const { error } = await supabase
          .from('business_model')
          .update(bmData)
          .eq('id', businessModel.id);

        if (error) {
          console.error('Error updating business model:', error);
          return NextResponse.json({ error: 'Failed to update business model' }, { status: 500, headers: noCacheHeaders });
        }
      } else {
        const { error } = await supabase
          .from('business_model')
          .insert(bmData);

        if (error) {
          console.error('Error inserting business model:', error);
          return NextResponse.json({ error: 'Failed to create business model' }, { status: 500, headers: noCacheHeaders });
        }
      }
    }

    // Update features
    if (features && Array.isArray(features)) {
      for (const feature of features) {
        const featureData = {
          icon_type: feature.icon_type,
          title_en: feature.title_en,
          title_so: feature.title_so,
          title_ar: feature.title_ar,
          description_en: feature.description_en,
          description_so: feature.description_so,
          description_ar: feature.description_ar,
          bg_color_class: feature.bg_color_class,
          border_color_class: feature.border_color_class,
          icon_bg_color: feature.icon_bg_color,
          display_order: feature.display_order,
          active: feature.active,
          updated_at: new Date().toISOString(),
        };

        if (feature.id) {
          const { error } = await supabase
            .from('business_model_features')
            .update(featureData)
            .eq('id', feature.id);

          if (error) {
            console.error('Error updating feature:', error);
          }
        } else {
          const { error } = await supabase
            .from('business_model_features')
            .insert(featureData);

          if (error) {
            console.error('Error inserting feature:', error);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put business model error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

