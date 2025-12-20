import { createServerClient, isSupabaseConfigured } from './supabase';
import { Language } from '@/types/hero';
import {
  BusinessModel,
  LocalizedBusinessModel,
  BusinessModelFeature,
  LocalizedBusinessModelFeature,
  ProduceTypesHeader,
  LocalizedProduceTypesHeader,
  ProduceItem,
  LocalizedProduceItem,
  SocialImpactHeader,
  LocalizedSocialImpactHeader,
  SocialImpactCard,
  LocalizedSocialImpactCard,
  EnvironmentalCommitment,
  LocalizedEnvironmentalCommitment,
  GrowthExpansionHeader,
  LocalizedGrowthExpansionHeader,
  GrowthExpansionPlan,
  LocalizedGrowthExpansionPlan,
  GrowthExpansionStat,
  LocalizedGrowthExpansionStat,
} from '@/types/our-farm';

/**
 * Helper functions for working with Our Farm page data from Supabase
 */

// Helper function to get localized text
function getLocalizedText(
  data: any,
  field: string,
  language: Language = 'en'
): string {
  const fieldKey = `${field}_${language}` as keyof typeof data;
  const text = data[fieldKey] as string | undefined;
  
  // Fallback to English if translation is not available
  if (!text && language !== 'en') {
    const englishKey = `${field}_en` as keyof typeof data;
    return (data[englishKey] as string) || '';
  }
  
  return text || '';
}

// Business Model
export async function getBusinessModel(): Promise<BusinessModel | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('business_model')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      // Only log if it's not a "table not found" error (PGRST205)
      // This is expected if migrations haven't been run yet
      if (error.code !== 'PGRST205') {
        console.error('Error fetching business model:', error);
      }
      return null;
    }

    return data as BusinessModel;
  } catch (error) {
    console.error('Error fetching business model:', error);
    return null;
  }
}

export function getLocalizedBusinessModel(
  model: BusinessModel,
  language: Language = 'en'
): LocalizedBusinessModel {
  return {
    id: model.id,
    badge_text: getLocalizedText(model, 'badge_text', language),
    title: getLocalizedText(model, 'title', language),
    description: getLocalizedText(model, 'description', language),
    image_url: model.image_url,
  };
}

// Business Model Features
export async function getBusinessModelFeatures(): Promise<BusinessModelFeature[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('business_model_features')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching business model features:', error);
      return [];
    }

    return (data as BusinessModelFeature[]) || [];
  } catch (error) {
    console.error('Error fetching business model features:', error);
    return [];
  }
}

export function getLocalizedBusinessModelFeatures(
  features: BusinessModelFeature[],
  language: Language = 'en'
): LocalizedBusinessModelFeature[] {
  return features.map((feature) => ({
    id: feature.id,
    icon_type: feature.icon_type,
    title: getLocalizedText(feature, 'title', language),
    description: getLocalizedText(feature, 'description', language),
    bg_color_class: feature.bg_color_class,
    border_color_class: feature.border_color_class,
    icon_bg_color: feature.icon_bg_color,
    display_order: feature.display_order,
  }));
}

// Produce Types Header
export async function getProduceTypesHeader(): Promise<ProduceTypesHeader | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('produce_types_header')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching produce types header:', error);
      return null;
    }

    return data as ProduceTypesHeader;
  } catch (error) {
    console.error('Error fetching produce types header:', error);
    return null;
  }
}

export function getLocalizedProduceTypesHeader(
  header: ProduceTypesHeader,
  language: Language = 'en'
): LocalizedProduceTypesHeader {
  return {
    id: header.id,
    title: getLocalizedText(header, 'title', language),
    description: getLocalizedText(header, 'description', language),
    footer_badge_text: getLocalizedText(header, 'footer_badge_text', language),
  };
}

// Produce Items
export async function getProduceItems(): Promise<ProduceItem[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('produce_items')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching produce items:', error);
      return [];
    }

    return (data as ProduceItem[]) || [];
  } catch (error) {
    console.error('Error fetching produce items:', error);
    return [];
  }
}

export function getLocalizedProduceItems(
  items: ProduceItem[],
  language: Language = 'en'
): LocalizedProduceItem[] {
  return items.map((item) => ({
    id: item.id,
    name: getLocalizedText(item, 'name', language),
    emoji: item.emoji,
    display_order: item.display_order,
  }));
}

// Social Impact Header
export async function getSocialImpactHeader(): Promise<SocialImpactHeader | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('social_impact_header')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching social impact header:', error);
      return null;
    }

    return data as SocialImpactHeader;
  } catch (error) {
    console.error('Error fetching social impact header:', error);
    return null;
  }
}

export function getLocalizedSocialImpactHeader(
  header: SocialImpactHeader,
  language: Language = 'en'
): LocalizedSocialImpactHeader {
  return {
    id: header.id,
    title: getLocalizedText(header, 'title', language),
    description: getLocalizedText(header, 'description', language),
  };
}

// Social Impact Cards
export async function getSocialImpactCards(): Promise<SocialImpactCard[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('social_impact_cards')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching social impact cards:', error);
      return [];
    }

    return (data as SocialImpactCard[]) || [];
  } catch (error) {
    console.error('Error fetching social impact cards:', error);
    return [];
  }
}

export function getLocalizedSocialImpactCards(
  cards: SocialImpactCard[],
  language: Language = 'en'
): LocalizedSocialImpactCard[] {
  return cards.map((card) => ({
    id: card.id,
    icon_type: card.icon_type,
    emoji: card.emoji,
    title: getLocalizedText(card, 'title', language),
    description: getLocalizedText(card, 'description', language),
    color_class: card.color_class,
    display_order: card.display_order,
  }));
}

// Environmental Commitment
export async function getEnvironmentalCommitment(): Promise<EnvironmentalCommitment | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('environmental_commitment')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching environmental commitment:', error);
      return null;
    }

    return data as EnvironmentalCommitment;
  } catch (error) {
    console.error('Error fetching environmental commitment:', error);
    return null;
  }
}

export function getLocalizedEnvironmentalCommitment(
  commitment: EnvironmentalCommitment,
  language: Language = 'en'
): LocalizedEnvironmentalCommitment {
  return {
    id: commitment.id,
    emoji: commitment.emoji,
    title: getLocalizedText(commitment, 'title', language),
    description: getLocalizedText(commitment, 'description', language),
  };
}

// Growth Expansion Header
export async function getGrowthExpansionHeader(): Promise<GrowthExpansionHeader | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('growth_expansion_header')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching growth expansion header:', error);
      return null;
    }

    return data as GrowthExpansionHeader;
  } catch (error) {
    console.error('Error fetching growth expansion header:', error);
    return null;
  }
}

export function getLocalizedGrowthExpansionHeader(
  header: GrowthExpansionHeader,
  language: Language = 'en'
): LocalizedGrowthExpansionHeader {
  return {
    id: header.id,
    title: getLocalizedText(header, 'title', language),
    description: getLocalizedText(header, 'description', language),
    image_url: header.image_url,
  };
}

// Growth Expansion Plans
export async function getGrowthExpansionPlans(): Promise<GrowthExpansionPlan[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('growth_expansion_plans')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching growth expansion plans:', error);
      return [];
    }

    return (data as GrowthExpansionPlan[]) || [];
  } catch (error) {
    console.error('Error fetching growth expansion plans:', error);
    return [];
  }
}

export function getLocalizedGrowthExpansionPlans(
  plans: GrowthExpansionPlan[],
  language: Language = 'en'
): LocalizedGrowthExpansionPlan[] {
  return plans.map((plan) => ({
    id: plan.id,
    emoji: plan.emoji,
    title: getLocalizedText(plan, 'title', language),
    description: getLocalizedText(plan, 'description', language),
    display_order: plan.display_order,
  }));
}

// Growth Expansion Stats
export async function getGrowthExpansionStats(): Promise<GrowthExpansionStat[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('growth_expansion_stats')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching growth expansion stats:', error);
      return [];
    }

    return (data as GrowthExpansionStat[]) || [];
  } catch (error) {
    console.error('Error fetching growth expansion stats:', error);
    return [];
  }
}

export function getLocalizedGrowthExpansionStats(
  stats: GrowthExpansionStat[],
  language: Language = 'en'
): LocalizedGrowthExpansionStat[] {
  return stats.map((stat) => ({
    id: stat.id,
    number: stat.number,
    label: getLocalizedText(stat, 'label', language),
    display_order: stat.display_order,
  }));
}
