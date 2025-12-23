import { createServerClient, isSupabaseConfigured } from './supabase';
import { 
  ProductsOverviewSectionHeader, 
  ProductsOverviewCard,
  LocalizedProductsOverviewHeader,
  LocalizedProductsOverviewCard 
} from '@/types/products-overview';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Products Overview Section Header and Cards from Supabase
 */

// Get active products overview section header from database
export async function getProductsOverviewSectionHeader(): Promise<ProductsOverviewSectionHeader | null> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('products_overview_section_header')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching products overview section header:', error);
      return null;
    }

    return data as ProductsOverviewSectionHeader;
  } catch (error) {
    console.error('Error fetching products overview section header:', error);
    return null;
  }
}

// Get active products overview cards from database
export async function getProductsOverviewCards(): Promise<ProductsOverviewCard[]> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('products_overview_cards')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching products overview cards:', error);
      return [];
    }

    return (data as ProductsOverviewCard[]) || [];
  } catch (error) {
    console.error('Error fetching products overview cards:', error);
    return [];
  }
}

// Get localized header for a specific language
export function getLocalizedProductsOverviewHeader(
  header: ProductsOverviewSectionHeader,
  language: Language = 'en'
): LocalizedProductsOverviewHeader {
  return {
    title: header[`title_${language}` as keyof ProductsOverviewSectionHeader] as string || header.title_en,
    description: header[`description_${language}` as keyof ProductsOverviewSectionHeader] as string || header.description_en,
    buttonText: header[`button_text_${language}` as keyof ProductsOverviewSectionHeader] as string || header.button_text_en,
    badgeText: header[`badge_text_${language}` as keyof ProductsOverviewSectionHeader] as string || header.badge_text_en,
  };
}

// Get localized card for a specific language
export function getLocalizedProductsOverviewCard(
  card: ProductsOverviewCard,
  language: Language = 'en'
): LocalizedProductsOverviewCard {
  return {
    id: card.id,
    name: card[`name_${language}` as keyof ProductsOverviewCard] as string || card.name_en,
    description: card[`description_${language}` as keyof ProductsOverviewCard] as string || card.description_en,
    image: card.image || undefined,
    display_order: card.display_order,
  };
}

