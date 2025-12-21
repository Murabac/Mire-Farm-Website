import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';
import { MissionVisionValue, CoreValue, MissionVisionSectionHeader } from '@/types/mission-vision';

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

    // Fetch all data in parallel
    const [sectionHeaderResult, mvvResult, coreValuesResult] = await Promise.all([
      // Section header
      supabase
        .from('mission_vision_section_header')
        .select('*')
        .eq('active', true)
        .single(),
      
      // Mission vision values (including inactive for admin)
      supabase
        .from('mission_vision_values')
        .select('*')
        .order('display_order', { ascending: true }),
      
      // Core values (including inactive for admin)
      supabase
        .from('core_values')
        .select('*')
        .order('display_order', { ascending: true }),
    ]);

    return NextResponse.json({
      sectionHeader: sectionHeaderResult.data as MissionVisionSectionHeader | null,
      missionVisionValues: (mvvResult.data || []) as MissionVisionValue[],
      coreValues: (coreValuesResult.data || []) as CoreValue[],
    });
  } catch (error) {
    console.error('Get mission vision error:', error);
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
    const { sectionHeader, missionVisionValues, coreValues } = body;

    const supabase = createServerClient();

    // Update section header
    if (sectionHeader) {
      const { data: existingHeader } = await supabase
        .from('mission_vision_section_header')
        .select('id')
        .eq('active', true)
        .single();

      const updateData = {
        ...sectionHeader,
        updated_at: new Date().toISOString(),
      };

      if (existingHeader) {
        const { error } = await supabase
          .from('mission_vision_section_header')
          .update(updateData)
          .eq('id', existingHeader.id);

        if (error) {
          console.error('Error updating section header:', error);
          return NextResponse.json(
            { error: 'Failed to update section header' },
            { status: 500 }
          );
        }
      } else {
        const { error } = await supabase
          .from('mission_vision_section_header')
          .insert({
            ...updateData,
            active: true,
          });

        if (error) {
          console.error('Error creating section header:', error);
          return NextResponse.json(
            { error: 'Failed to create section header' },
            { status: 500 }
          );
        }
      }
    }

    // Update mission vision values
    if (Array.isArray(missionVisionValues)) {
      const { data: existingMvv } = await supabase
        .from('mission_vision_values')
        .select('id');

      const existingIds = existingMvv?.map(item => item.id) || [];
      const idsToKeep = new Set<number>();

      // Separate updates and inserts
      const updates: any[] = [];
      const inserts: any[] = [];

      missionVisionValues.forEach((item: any) => {
        const updateData = {
          ...item,
          updated_at: new Date().toISOString(),
        };

        if (item.id && existingIds.includes(item.id)) {
          idsToKeep.add(item.id);
          updates.push(updateData);
        } else {
          const { id, created_at, updated_at, ...insertData } = updateData;
          inserts.push({
            ...insertData,
            title_so: insertData.title_so || null,
            title_ar: insertData.title_ar || null,
            description_so: insertData.description_so || null,
            description_ar: insertData.description_ar || null,
          });
        }
      });

      // Delete removed items
      const idsToDelete = existingIds.filter(id => !idsToKeep.has(id));
      if (idsToDelete.length > 0) {
        const { error } = await supabase
          .from('mission_vision_values')
          .delete()
          .in('id', idsToDelete);

        if (error) {
          console.error('Error deleting mission vision values:', error);
        }
      }

      // Insert new items
      if (inserts.length > 0) {
        const { error } = await supabase
          .from('mission_vision_values')
          .insert(inserts);

        if (error) {
          console.error('Error inserting mission vision values:', error);
          return NextResponse.json(
            { error: 'Failed to insert mission vision values' },
            { status: 500 }
          );
        }
      }

      // Update existing items
      for (const item of updates) {
        const { id, created_at, ...updateData } = item;
        const { error } = await supabase
          .from('mission_vision_values')
          .update(updateData)
          .eq('id', id);

        if (error) {
          console.error('Error updating mission vision value:', error);
          return NextResponse.json(
            { error: 'Failed to update mission vision values' },
            { status: 500 }
          );
        }
      }
    }

    // Update core values
    if (Array.isArray(coreValues)) {
      const { data: existingCv } = await supabase
        .from('core_values')
        .select('id');

      const existingIds = existingCv?.map(item => item.id) || [];
      const idsToKeep = new Set<number>();

      // Separate updates and inserts
      const updates: any[] = [];
      const inserts: any[] = [];

      coreValues.forEach((item: any) => {
        const updateData = {
          ...item,
          updated_at: new Date().toISOString(),
        };

        if (item.id && existingIds.includes(item.id)) {
          idsToKeep.add(item.id);
          updates.push(updateData);
        } else {
          const { id, created_at, updated_at, ...insertData } = updateData;
          inserts.push({
            ...insertData,
            title_so: insertData.title_so || null,
            title_ar: insertData.title_ar || null,
            description_so: insertData.description_so || null,
            description_ar: insertData.description_ar || null,
          });
        }
      });

      // Delete removed items
      const idsToDelete = existingIds.filter(id => !idsToKeep.has(id));
      if (idsToDelete.length > 0) {
        const { error } = await supabase
          .from('core_values')
          .delete()
          .in('id', idsToDelete);

        if (error) {
          console.error('Error deleting core values:', error);
        }
      }

      // Insert new items
      if (inserts.length > 0) {
        const { error } = await supabase
          .from('core_values')
          .insert(inserts);

        if (error) {
          console.error('Error inserting core values:', error);
          return NextResponse.json(
            { error: 'Failed to insert core values' },
            { status: 500 }
          );
        }
      }

      // Update existing items
      for (const item of updates) {
        const { id, created_at, ...updateData } = item;
        const { error } = await supabase
          .from('core_values')
          .update(updateData)
          .eq('id', id);

        if (error) {
          console.error('Error updating core value:', error);
          return NextResponse.json(
            { error: 'Failed to update core values' },
            { status: 500 }
          );
        }
      }
    }

    // Fetch and return updated data
    const [sectionHeaderResult, mvvResult, coreValuesResult] = await Promise.all([
      supabase
        .from('mission_vision_section_header')
        .select('*')
        .eq('active', true)
        .single(),
      supabase
        .from('mission_vision_values')
        .select('*')
        .order('display_order', { ascending: true }),
      supabase
        .from('core_values')
        .select('*')
        .order('display_order', { ascending: true }),
    ]);

    return NextResponse.json({
      sectionHeader: sectionHeaderResult.data as MissionVisionSectionHeader | null,
      missionVisionValues: (mvvResult.data || []) as MissionVisionValue[],
      coreValues: (coreValuesResult.data || []) as CoreValue[],
    });
  } catch (error) {
    console.error('Update mission vision error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


