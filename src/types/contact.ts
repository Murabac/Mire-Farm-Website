export interface ContactInfo {
  id: number;
  location_en: string;
  location_so?: string | null;
  location_ar?: string | null;
  phone: string;
  email: string;
  hours_en: string;
  hours_so?: string | null;
  hours_ar?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedContactInfo {
  id: number;
  location: string;
  phone: string;
  email: string;
  hours: string;
}

