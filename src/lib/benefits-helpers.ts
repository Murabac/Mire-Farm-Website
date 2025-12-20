import { createServerClient, isSupabaseConfigured } from './supabase';
import { Benefit, LocalizedBenefit } from '@/types/benefits';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Benefits from Supabase
 */

// Get all active benefits from database
export async function getBenefits(): Promise<Benefit[]> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Benefits section will use fallback data.');
    return [];
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('benefits')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching benefits:', error);
      return [];
    }

    return data as Benefit[];
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return [];
  }
}

// Get localized benefits for a specific language
export function getLocalizedBenefits(
  benefits: Benefit[],
  language: Language = 'en'
): LocalizedBenefit[] {
  return benefits.map((benefit) => {
    const textKey = `text_${language}` as keyof Benefit;
    const text = (benefit[textKey] as string | undefined) || benefit.text_en;
    
    return {
      id: benefit.id,
      text: text,
    };
  });
}
