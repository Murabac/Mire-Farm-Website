// Note: Page headers are now in the generic page_headers table (see src/types/page-header.ts)

// Business Model
export interface BusinessModel {
  id: number;
  badge_text_en: string;
  badge_text_so?: string | null;
  badge_text_ar?: string | null;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  image_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedBusinessModel {
  id: number;
  badge_text: string;
  title: string;
  description: string;
  image_url: string;
}

// Business Model Features
export interface BusinessModelFeature {
  id: number;
  icon_type: string;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  bg_color_class: string;
  border_color_class: string;
  icon_bg_color: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedBusinessModelFeature {
  id: number;
  icon_type: string;
  title: string;
  description: string;
  bg_color_class: string;
  border_color_class: string;
  icon_bg_color: string;
  display_order: number;
}

// Produce Types Header
export interface ProduceTypesHeader {
  id: number;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  footer_badge_text_en: string;
  footer_badge_text_so?: string | null;
  footer_badge_text_ar?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedProduceTypesHeader {
  id: number;
  title: string;
  description: string;
  footer_badge_text: string;
}

// Produce Items
export interface ProduceItem {
  id: number;
  name_en: string;
  name_so?: string | null;
  name_ar?: string | null;
  emoji: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedProduceItem {
  id: number;
  name: string;
  emoji: string;
  display_order: number;
}

// Social Impact Header
export interface SocialImpactHeader {
  id: number;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedSocialImpactHeader {
  id: number;
  title: string;
  description: string;
}

// Social Impact Cards
export interface SocialImpactCard {
  id: number;
  icon_type: string;
  emoji: string;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  color_class: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedSocialImpactCard {
  id: number;
  icon_type: string;
  emoji: string;
  title: string;
  description: string;
  color_class: string;
  display_order: number;
}

// Environmental Commitment
export interface EnvironmentalCommitment {
  id: number;
  emoji: string;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedEnvironmentalCommitment {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

// Growth Expansion Header
export interface GrowthExpansionHeader {
  id: number;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  image_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedGrowthExpansionHeader {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

// Growth Expansion Plans
export interface GrowthExpansionPlan {
  id: number;
  emoji: string;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en: string;
  description_so?: string | null;
  description_ar?: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedGrowthExpansionPlan {
  id: number;
  emoji: string;
  title: string;
  description: string;
  display_order: number;
}

// Growth Expansion Stats
export interface GrowthExpansionStat {
  id: number;
  number: string;
  label_en: string;
  label_so?: string | null;
  label_ar?: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedGrowthExpansionStat {
  id: number;
  number: string;
  label: string;
  display_order: number;
}
