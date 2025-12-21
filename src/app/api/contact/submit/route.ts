import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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

    // Basic validation for message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Create contact submission
    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          message: message.trim(),
          read: false,
        },
      ])
      .select('id, name, email, created_at')
      .single();

    if (error) {
      console.error('Error creating contact submission:', error);
      return NextResponse.json(
        { error: 'Failed to submit your message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Your message has been sent successfully! We will get back to you soon.',
        submission: {
          id: submission.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

