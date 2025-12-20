// Hero Section Type Definitions

export interface HeroSection {
  id: number;
  // Badge text
  badge_text_en: string;
  badge_text_so?: string;
  badge_text_ar?: string;
  // Main heading
  heading_prefix_en: string;
  heading_prefix_so?: string;
  heading_prefix_ar?: string;
  heading_highlight_en: string;
  heading_highlight_so?: string;
  heading_highlight_ar?: string;
  heading_suffix_en: string;
  heading_suffix_so?: string;
  heading_suffix_ar?: string;
  // Description
  description_en: string;
  description_so?: string;
  description_ar?: string;
  // Buttons
  primary_button_text_en: string;
  primary_button_text_so?: string;
  primary_button_text_ar?: string;
  secondary_button_text_en: string;
  secondary_button_text_so?: string;
  secondary_button_text_ar?: string;
  // Stats
  stat1_number: string;
  stat1_label_en: string;
  stat1_label_so?: string;
  stat1_label_ar?: string;
  stat2_number: string;
  stat2_label_en: string;
  stat2_label_so?: string;
  stat2_label_ar?: string;
  stat3_number: string;
  stat3_label_en: string;
  stat3_label_so?: string;
  stat3_label_ar?: string;
  // Image
  hero_image_url: string;
  // Bottom badge
  bottom_badge_title_en: string;
  bottom_badge_title_so?: string;
  bottom_badge_title_ar?: string;
  bottom_badge_subtitle_en: string;
  bottom_badge_subtitle_so?: string;
  bottom_badge_subtitle_ar?: string;
  // Metadata
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Language type for i18n support
export type Language = 'en' | 'so' | 'ar';

// Helper type for getting localized text
export type LocalizedText<T extends string> = {
  [K in `${T}_${Language}`]?: string;
};

// Helper function type for getting text by language
export type GetTextByLanguage = (
  field: string,
  language: Language
) => string;
