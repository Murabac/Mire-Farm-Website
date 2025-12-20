import { createServerClient, isSupabaseConfigured } from './supabase';
import { HeroSection, Language } from '@/types/hero';

/**
 * Helper functions for working with Hero Section from Supabase
 */

// Get active hero section from database
export async function getHeroSection(): Promise<HeroSection | null> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Hero section will use fallback data.');
    return null;
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('hero_section')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching hero section:', error);
      return null;
    }

    return data as HeroSection;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

// Helper function to get localized text
export function getLocalizedText(
  hero: HeroSection,
  field: keyof HeroSection,
  language: Language = 'en'
): string {
  const fieldKey = `${field}_${language}` as keyof HeroSection;
  const text = hero[fieldKey] as string | undefined;
  
  // Fallback to English if translation is not available
  if (!text && language !== 'en') {
    const englishKey = `${field}_en` as keyof HeroSection;
    return (hero[englishKey] as string) || '';
  }
  
  return text || '';
}

// Get all hero section text for a specific language
export function getHeroSectionByLanguage(
  hero: HeroSection,
  language: Language = 'en'
) {
  return {
    badgeText: getLocalizedText(hero, 'badge_text', language),
    headingPrefix: getLocalizedText(hero, 'heading_prefix', language),
    headingHighlight: getLocalizedText(hero, 'heading_highlight', language),
    headingSuffix: getLocalizedText(hero, 'heading_suffix', language),
    description: getLocalizedText(hero, 'description', language),
    primaryButtonText: getLocalizedText(hero, 'primary_button_text', language),
    secondaryButtonText: getLocalizedText(hero, 'secondary_button_text', language),
    stats: [
      {
        number: hero.stat1_number,
        label: getLocalizedText(hero, 'stat1_label', language),
      },
      {
        number: hero.stat2_number,
        label: getLocalizedText(hero, 'stat2_label', language),
      },
      {
        number: hero.stat3_number,
        label: getLocalizedText(hero, 'stat3_label', language),
      },
    ],
    heroImageUrl: hero.hero_image_url,
    bottomBadgeTitle: getLocalizedText(hero, 'bottom_badge_title', language),
    bottomBadgeSubtitle: getLocalizedText(hero, 'bottom_badge_subtitle', language),
  };
}
