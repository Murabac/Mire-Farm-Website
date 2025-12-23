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

    // Fetch growth expansion header
    const { data: header, error: headerError } = await supabase
      .from('growth_expansion_header')
      .select('*')
      .single();

    if (headerError && headerError.code !== 'PGRST116') {
      console.error('Error fetching growth expansion header:', headerError);
    }

    // Fetch growth expansion plans
    const { data: plans, error: plansError } = await supabase
      .from('growth_expansion_plans')
      .select('*')
      .order('display_order', { ascending: true });

    if (plansError) {
      console.error('Error fetching growth expansion plans:', plansError);
    }

    // Fetch growth expansion stats
    const { data: stats, error: statsError } = await supabase
      .from('growth_expansion_stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (statsError) {
      console.error('Error fetching growth expansion stats:', statsError);
    }

    return NextResponse.json({
      header: header || null,
      plans: plans || [],
      stats: stats || [],
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Get growth expansion error:', error);
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
    const { header, plans, stats } = body;

    const supabase = createServerClient();

    // Update header
    if (header) {
      const headerData = {
        title_en: header.title_en,
        title_so: header.title_so,
        title_ar: header.title_ar,
        description_en: header.description_en,
        description_so: header.description_so,
        description_ar: header.description_ar,
        image_url: header.image_url,
        active: header.active,
        updated_at: new Date().toISOString(),
      };

      if (header.id) {
        const { error } = await supabase
          .from('growth_expansion_header')
          .update(headerData)
          .eq('id', header.id);

        if (error) {
          console.error('Error updating growth expansion header:', error);
          return NextResponse.json({ error: 'Failed to update header' }, { status: 500, headers: noCacheHeaders });
        }
      } else {
        const { error } = await supabase
          .from('growth_expansion_header')
          .insert(headerData);

        if (error) {
          console.error('Error inserting growth expansion header:', error);
          return NextResponse.json({ error: 'Failed to create header' }, { status: 500, headers: noCacheHeaders });
        }
      }
    }

    // Update plans
    if (plans && Array.isArray(plans)) {
      // Get existing plan IDs
      const existingIds = plans.filter(p => p.id).map(p => p.id);
      
      // Delete plans that are no longer in the list
      if (existingIds.length > 0) {
        await supabase
          .from('growth_expansion_plans')
          .delete()
          .not('id', 'in', `(${existingIds.join(',')})`);
      } else {
        await supabase
          .from('growth_expansion_plans')
          .delete()
          .neq('id', 0);
      }

      for (const plan of plans) {
        const planData = {
          emoji: plan.emoji,
          title_en: plan.title_en,
          title_so: plan.title_so,
          title_ar: plan.title_ar,
          description_en: plan.description_en,
          description_so: plan.description_so,
          description_ar: plan.description_ar,
          display_order: plan.display_order,
          active: plan.active,
          updated_at: new Date().toISOString(),
        };

        if (plan.id) {
          const { error } = await supabase
            .from('growth_expansion_plans')
            .update(planData)
            .eq('id', plan.id);

          if (error) {
            console.error('Error updating plan:', error);
          }
        } else {
          const { error } = await supabase
            .from('growth_expansion_plans')
            .insert(planData);

          if (error) {
            console.error('Error inserting plan:', error);
          }
        }
      }
    }

    // Update stats
    if (stats && Array.isArray(stats)) {
      // Get existing stat IDs
      const existingIds = stats.filter(s => s.id).map(s => s.id);
      
      // Delete stats that are no longer in the list
      if (existingIds.length > 0) {
        await supabase
          .from('growth_expansion_stats')
          .delete()
          .not('id', 'in', `(${existingIds.join(',')})`);
      } else {
        await supabase
          .from('growth_expansion_stats')
          .delete()
          .neq('id', 0);
      }

      for (const stat of stats) {
        const statData = {
          number: stat.number,
          label_en: stat.label_en,
          label_so: stat.label_so,
          label_ar: stat.label_ar,
          display_order: stat.display_order,
          active: stat.active,
          updated_at: new Date().toISOString(),
        };

        if (stat.id) {
          const { error } = await supabase
            .from('growth_expansion_stats')
            .update(statData)
            .eq('id', stat.id);

          if (error) {
            console.error('Error updating stat:', error);
          }
        } else {
          const { error } = await supabase
            .from('growth_expansion_stats')
            .insert(statData);

          if (error) {
            console.error('Error inserting stat:', error);
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Put growth expansion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

