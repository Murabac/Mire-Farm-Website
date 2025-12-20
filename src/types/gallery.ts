import { Language } from './hero';

/**
 * Gallery Category Types
 */

// Raw category data from Supabase
export interface GalleryCategory {
  id: number;
  category_key: string;
  name_en: string;
  name_so: string | null;
  name_ar: string | null;
  emoji: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Localized category for use in components
export interface LocalizedGalleryCategory {
  id: number;
  category_key: string;
  name: string;
  emoji: string;
  display_order: number;
}
