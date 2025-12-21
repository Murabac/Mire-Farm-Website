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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, subscribed')
      .eq('email', email.toLowerCase())
      .single();

    if (existingSubscriber) {
      // If already subscribed, return success
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter' },
          { status: 200 }
        );
      }

      // If unsubscribed, resubscribe them
      const { data: updatedSubscriber, error: updateError } = await supabase
        .from('newsletter_subscribers')
        .update({
          subscribed: true,
          subscribed_at: new Date().toISOString(),
          unsubscribed_at: null,
        })
        .eq('id', existingSubscriber.id)
        .select('id, email, subscribed')
        .single();

      if (updateError) {
        console.error('Error resubscribing:', updateError);
        return NextResponse.json(
          { error: 'Failed to resubscribe' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'Successfully resubscribed to our newsletter', subscriber: updatedSubscriber },
        { status: 200 }
      );
    }

    // Create new subscriber
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: email.toLowerCase(),
          subscribed: true,
        },
      ])
      .select('id, email, subscribed, subscribed_at')
      .single();

    if (error) {
      console.error('Error creating subscriber:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Successfully subscribed to our newsletter!',
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

