// Benefits Section Type Definitions

export interface Benefit {
  id: number;
  text_en: string;
  text_so?: string;
  text_ar?: string;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Helper type for localized benefit
export interface LocalizedBenefit {
  id: number;
  text: string;
}
