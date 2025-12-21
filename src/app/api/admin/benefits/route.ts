import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { Benefit } from '@/types/benefits';

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

    // Get all benefits (including inactive for admin)
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching benefits:', error);
      return NextResponse.json(
        { error: 'Failed to fetch benefits' },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Benefit[]);
  } catch (error) {
    console.error('Get benefits error:', error);
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
    const { benefits: benefitsData } = body;

    if (!Array.isArray(benefitsData)) {
      return NextResponse.json(
        { error: 'Invalid request body. Expected array of benefits.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Get all existing benefits
    const { data: existingBenefits } = await supabase
      .from('benefits')
      .select('id');

    const existingIds = existingBenefits?.map(b => b.id) || [];

    // Separate into updates and inserts
    const updates: Benefit[] = [];
    const inserts: Omit<Benefit, 'id' | 'created_at' | 'updated_at'>[] = [];
    const idsToKeep = new Set<number>();

    benefitsData.forEach((benefit: any) => {
      const updateData = {
        ...benefit,
        updated_at: new Date().toISOString(),
      };

      if (benefit.id && existingIds.includes(benefit.id)) {
        // Existing benefit - update it
        idsToKeep.add(benefit.id);
        updates.push(updateData as Benefit);
      } else {
        // New benefit - insert it
        const { id, created_at, updated_at, ...insertData } = updateData;
        inserts.push({
          ...insertData,
          text_so: insertData.text_so || null,
          text_ar: insertData.text_ar || null,
        });
      }
    });

    // Delete benefits that are not in the new list
    const idsToDelete = existingIds.filter(id => !idsToKeep.has(id));
    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('benefits')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        console.error('Error deleting benefits:', deleteError);
        return NextResponse.json(
          { error: 'Failed to delete benefits' },
          { status: 500 }
        );
      }
    }

    // Insert new benefits
    if (inserts.length > 0) {
      const { error: insertError } = await supabase
        .from('benefits')
        .insert(inserts);

      if (insertError) {
        console.error('Error inserting benefits:', insertError);
        return NextResponse.json(
          { error: 'Failed to insert benefits' },
          { status: 500 }
        );
      }
    }

    // Update existing benefits
    for (const benefit of updates) {
      const { id, created_at, ...updateData } = benefit;
      const { error: updateError } = await supabase
        .from('benefits')
        .update(updateData)
        .eq('id', id);

      if (updateError) {
        console.error('Error updating benefit:', updateError);
        return NextResponse.json(
          { error: 'Failed to update benefits' },
          { status: 500 }
        );
      }
    }

    // Fetch and return all benefits
    const { data: allBenefits, error: fetchError } = await supabase
      .from('benefits')
      .select('*')
      .order('display_order', { ascending: true });

    if (fetchError) {
      console.error('Error fetching updated benefits:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch updated benefits' },
        { status: 500 }
      );
    }

    return NextResponse.json(allBenefits as Benefit[]);
  } catch (error) {
    console.error('Update benefits error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


