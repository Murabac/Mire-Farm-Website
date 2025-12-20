import { createServerClient, isSupabaseConfigured } from './supabase';
import { PageHeader, LocalizedPageHeader } from '@/types/page-header';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Page Headers from Supabase
 */

// Get page header by route
export async function getPageHeaderByRoute(route: string): Promise<PageHeader | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Page header will use fallback data.');
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('page_headers')
      .select('*')
      .eq('page_route', route)
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching page header:', error);
      return null;
    }

    return data as PageHeader;
  } catch (error) {
    console.error('Error fetching page header:', error);
    return null;
  }
}

// Helper function to get localized page header
export function getLocalizedPageHeader(
  header: PageHeader,
  language: Language = 'en'
): LocalizedPageHeader {
  const badgeKey = `badge_text_${language}` as keyof PageHeader;
  const titleKey = `title_${language}` as keyof PageHeader;
  const descKey = `description_${language}` as keyof PageHeader;
  
  const badgeText = (header[badgeKey] as string | undefined) || header.badge_text_en || undefined;
  const title = (header[titleKey] as string | undefined) || header.title_en;
  const description = (header[descKey] as string | undefined) || header.description_en || undefined;

  return {
    id: header.id,
    page_route: header.page_route,
    badge_text: badgeText,
    title: title,
    description: description,
  };
}
