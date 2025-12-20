import { Language } from './hero';

/**
 * News Article Types
 */

// Raw article data from Supabase
export interface NewsArticle {
  id: number;
  title_en: string;
  title_so: string | null;
  title_ar: string | null;
  excerpt_en: string;
  excerpt_so: string | null;
  excerpt_ar: string | null;
  content_en: string;
  content_so: string | null;
  content_ar: string | null;
  badge_en: string;
  badge_so: string | null;
  badge_ar: string | null;
  author_en: string;
  author_so: string | null;
  author_ar: string | null;
  image: string;
  emoji: string;
  date: string;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Localized article for use in components
export interface LocalizedNewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  badge: string;
  author: string;
  image: string;
  emoji: string;
  date: string;
}
