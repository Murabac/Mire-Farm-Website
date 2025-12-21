import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyToken, getTokenFromCookies } from '@/lib/auth-utils';

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

    // Delete subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to delete subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const { subscribed } = await request.json();

    if (typeof subscribed !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid subscription status' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Update subscriber status
    const updateData: any = {
      subscribed,
    };

    if (subscribed) {
      updateData.subscribed_at = new Date().toISOString();
      updateData.unsubscribed_at = null;
    } else {
      updateData.unsubscribed_at = new Date().toISOString();
    }

    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .update(updateData)
      .eq('id', params.id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to update subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscriber,
      message: `Subscriber ${subscribed ? 'subscribed' : 'unsubscribed'} successfully`,
    });
  } catch (error) {
    console.error('Update subscriber error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

