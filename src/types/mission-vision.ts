// Mission, Vision, and Values Type Definitions

export interface MissionVisionValue {
  id: number;
  type: 'mission' | 'vision' | 'values';
  emoji: string;
  title_en: string;
  title_so?: string;
  title_ar?: string;
  description_en: string;
  description_so?: string;
  description_ar?: string;
  bg_color_class: string;
  border_color_class: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CoreValue {
  id: number;
  title_en: string;
  title_so?: string;
  title_ar?: string;
  description_en: string;
  description_so?: string;
  description_ar?: string;
  icon_type: string;
  color_class: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MissionVisionSectionHeader {
  id: number;
  title_en: string;
  title_so?: string;
  title_ar?: string;
  description_en: string;
  description_so?: string;
  description_ar?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Localized types
export interface LocalizedMissionVisionValue {
  id: number;
  type: 'mission' | 'vision' | 'values';
  emoji: string;
  title: string;
  description: string;
  bg_color_class: string;
  border_color_class: string;
}

export interface LocalizedCoreValue {
  id: number;
  title: string;
  description: string;
  icon_type: string;
  color_class: string;
}

export interface LocalizedSectionHeader {
  title: string;
  description: string;
}
