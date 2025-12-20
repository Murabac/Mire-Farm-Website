export interface Product {
  id: number;
  name_en: string;
  name_so?: string | null;
  name_ar?: string | null;
  description_en?: string | null;
  description_so?: string | null;
  description_ar?: string | null;
  image?: string | null;
  price?: number | null;
  category?: string | null;
  in_stock: boolean;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedProduct {
  id: number;
  name: string;
  description: string;
  image?: string | null;
  price?: number | null;
  category?: string | null;
  in_stock: boolean;
  display_order: number;
}

