import { createServerClient, isSupabaseConfigured } from './supabase';
import { NewsArticle, LocalizedNewsArticle } from '@/types/news';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with News Articles from Supabase
 */

// Get all active news articles
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. News articles will use fallback data.');
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      // Only log if it's not a "table not found" error (PGRST205)
      if (error.code !== 'PGRST205') {
        console.error('Error fetching news articles:', error);
      }
      return [];
    }

    return (data || []) as NewsArticle[];
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

// Get a single news article by ID
export async function getNewsArticleById(id: number): Promise<NewsArticle | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. News article will use fallback data.');
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('news_articles')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single();

    if (error) {
      // Only log if it's not a "table not found" error (PGRST205)
      if (error.code !== 'PGRST205') {
        console.error('Error fetching news article:', error);
      }
      return null;
    }

    return data as NewsArticle;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

// Helper function to get localized news article
export function getLocalizedNewsArticle(
  article: NewsArticle,
  language: Language = 'en'
): LocalizedNewsArticle {
  const titleKey = `title_${language}` as keyof NewsArticle;
  const excerptKey = `excerpt_${language}` as keyof NewsArticle;
  const contentKey = `content_${language}` as keyof NewsArticle;
  const badgeKey = `badge_${language}` as keyof NewsArticle;
  const authorKey = `author_${language}` as keyof NewsArticle;

  const title = (article[titleKey] as string | undefined) || article.title_en;
  const excerpt = (article[excerptKey] as string | undefined) || article.excerpt_en;
  const content = (article[contentKey] as string | undefined) || article.content_en;
  const badge = (article[badgeKey] as string | undefined) || article.badge_en;
  const author = (article[authorKey] as string | undefined) || article.author_en;

  return {
    id: article.id,
    title: title,
    excerpt: excerpt,
    content: content,
    badge: badge,
    author: author,
    image: article.image,
    emoji: article.emoji,
    date: article.date,
  };
}

// Helper function to localize an array of articles
export function getLocalizedNewsArticles(
  articles: NewsArticle[],
  language: Language = 'en'
): LocalizedNewsArticle[] {
  return articles.map((article) => getLocalizedNewsArticle(article, language));
}
