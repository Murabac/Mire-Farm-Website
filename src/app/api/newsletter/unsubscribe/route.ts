import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Find subscriber
    const { data: subscriber, error: findError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, subscribed')
      .eq('email', email.toLowerCase())
      .single();

    if (findError || !subscriber) {
      return NextResponse.json(
        { error: 'Email not found in our newsletter list' },
        { status: 404 }
      );
    }

    if (!subscriber.subscribed) {
      return NextResponse.json(
        { message: 'You are already unsubscribed' },
        { status: 200 }
      );
    }

    // Unsubscribe
    const { error: updateError } = await supabase
      .from('newsletter_subscribers')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed from our newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

