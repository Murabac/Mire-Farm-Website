import { createServerClient, isSupabaseConfigured } from './supabase';
import { GalleryCategory, LocalizedGalleryCategory } from '@/types/gallery';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Gallery Categories from Supabase
 */

// Get all active gallery categories
export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Gallery categories will use fallback data.');
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('gallery_categories')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      // Only log if it's not a "table not found" error (PGRST205)
      if (error.code !== 'PGRST205') {
        console.error('Error fetching gallery categories:', error);
      }
      return [];
    }

    return (data || []) as GalleryCategory[];
  } catch (error) {
    console.error('Error fetching gallery categories:', error);
    return [];
  }
}

// Helper function to get localized gallery category
export function getLocalizedGalleryCategory(
  category: GalleryCategory,
  language: Language = 'en'
): LocalizedGalleryCategory {
  const nameKey = `name_${language}` as keyof GalleryCategory;
  const name = (category[nameKey] as string | undefined) || category.name_en;

  return {
    id: category.id,
    category_key: category.category_key,
    name: name,
    emoji: category.emoji,
    display_order: category.display_order,
  };
}

// Helper function to localize an array of categories
export function getLocalizedGalleryCategories(
  categories: GalleryCategory[],
  language: Language = 'en'
): LocalizedGalleryCategory[] {
  return categories.map((category) => getLocalizedGalleryCategory(category, language));
}
