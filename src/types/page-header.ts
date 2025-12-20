export interface PageHeader {
  id: number;
  page_route: string;
  badge_text_en?: string | null;
  badge_text_so?: string | null;
  badge_text_ar?: string | null;
  title_en: string;
  title_so?: string | null;
  title_ar?: string | null;
  description_en?: string | null;
  description_so?: string | null;
  description_ar?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedPageHeader {
  id: number;
  page_route: string;
  badge_text?: string;
  title: string;
  description?: string;
}
