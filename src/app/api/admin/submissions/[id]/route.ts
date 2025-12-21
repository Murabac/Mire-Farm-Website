import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { read } = await request.json();

    if (typeof read !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid read status' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Update submission read status
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .update({ read })
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating submission:', error);
      return NextResponse.json(
        { error: 'Failed to update submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      submission,
      message: `Submission marked as ${read ? 'read' : 'unread'}`,
    });
  } catch (error) {
    console.error('Update submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Delete submission
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting submission:', error);
      return NextResponse.json(
        { error: 'Failed to delete submission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('Delete submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

