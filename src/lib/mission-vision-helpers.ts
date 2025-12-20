import { createServerClient, isSupabaseConfigured } from './supabase';
import {
  MissionVisionValue,
  CoreValue,
  MissionVisionSectionHeader,
  LocalizedMissionVisionValue,
  LocalizedCoreValue,
  LocalizedSectionHeader,
} from '@/types/mission-vision';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Mission, Vision, and Values from Supabase
 */

// Get section header
export async function getMissionVisionSectionHeader(): Promise<MissionVisionSectionHeader | null> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Mission vision section will use fallback data.');
    return null;
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('mission_vision_section_header')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching mission vision section header:', error);
      return null;
    }

    return data as MissionVisionSectionHeader;
  } catch (error) {
    console.error('Error fetching mission vision section header:', error);
    return null;
  }
}

// Get mission, vision, and values
export async function getMissionVisionValues(): Promise<MissionVisionValue[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return [];
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('mission_vision_values')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching mission vision values:', error);
      return [];
    }

    return data as MissionVisionValue[];
  } catch (error) {
    console.error('Error fetching mission vision values:', error);
    return [];
  }
}

// Get core values
export async function getCoreValues(): Promise<CoreValue[]> {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured.');
    return [];
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('core_values')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching core values:', error);
      return [];
    }

    return data as CoreValue[];
  } catch (error) {
    console.error('Error fetching core values:', error);
    return [];
  }
}

// Get localized section header
export function getLocalizedSectionHeader(
  header: MissionVisionSectionHeader | null,
  language: Language = 'en'
): LocalizedSectionHeader {
  if (!header) {
    return {
      title: 'Why Choose Mire Farms?',
      description: 'We\'re more than just a farm - we\'re a community dedicated to sustainable agriculture and healthy living',
    };
  }

  const titleKey = `title_${language}` as keyof MissionVisionSectionHeader;
  const descKey = `description_${language}` as keyof MissionVisionSectionHeader;

  return {
    title: (header[titleKey] as string) || header.title_en,
    description: (header[descKey] as string) || header.description_en,
  };
}

// Get localized mission vision values
export function getLocalizedMissionVisionValues(
  values: MissionVisionValue[],
  language: Language = 'en'
): LocalizedMissionVisionValue[] {
  return values.map((value) => {
    const titleKey = `title_${language}` as keyof MissionVisionValue;
    const descKey = `description_${language}` as keyof MissionVisionValue;

    return {
      id: value.id,
      type: value.type,
      emoji: value.emoji,
      title: (value[titleKey] as string) || value.title_en,
      description: (value[descKey] as string) || value.description_en,
      bg_color_class: value.bg_color_class,
      border_color_class: value.border_color_class,
    };
  });
}

// Get localized core values
export function getLocalizedCoreValues(
  values: CoreValue[],
  language: Language = 'en'
): LocalizedCoreValue[] {
  return values.map((value) => {
    const titleKey = `title_${language}` as keyof CoreValue;
    const descKey = `description_${language}` as keyof CoreValue;

    return {
      id: value.id,
      title: (value[titleKey] as string) || value.title_en,
      description: (value[descKey] as string) || value.description_en,
      icon_type: value.icon_type,
      color_class: value.color_class,
    };
  });
}
