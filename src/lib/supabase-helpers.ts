import { supabase, isSupabaseConfigured } from './supabase';
import { NewsArticle } from '@/components/news/NewsArticleCard';

/**
 * Example helper functions for working with Supabase
 * Customize these based on your database schema
 */

// Example: Fetch news articles from Supabase
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Using fallback data.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching news articles:', error);
      return [];
    }

    return data as NewsArticle[];
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

// Example: Get a single news article by ID
export async function getNewsArticleById(id: number): Promise<NewsArticle | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching news article:', error);
      return null;
    }

    return data as NewsArticle;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

// Example: Submit contact form
export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured.' };
  }

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
