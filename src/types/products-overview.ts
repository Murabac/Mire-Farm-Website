// Products Overview Section Header and Cards Type Definitions

export interface ProductsOverviewSectionHeader {
  id: number;
  title_en: string;
  title_so?: string;
  title_ar?: string;
  description_en: string;
  description_so?: string;
  description_ar?: string;
  button_text_en: string;
  button_text_so?: string;
  button_text_ar?: string;
  badge_text_en: string;
  badge_text_so?: string;
  badge_text_ar?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductsOverviewCard {
  id: number;
  name_en: string;
  name_so?: string;
  name_ar?: string;
  description_en: string;
  description_so?: string;
  description_ar?: string;
  image?: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Localized types
export interface LocalizedProductsOverviewHeader {
  title: string;
  description: string;
  buttonText: string;
  badgeText: string;
}

export interface LocalizedProductsOverviewCard {
  id: number;
  name: string;
  description: string;
  image?: string;
  display_order: number;
}

