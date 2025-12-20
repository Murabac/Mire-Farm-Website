import { createServerClient, isSupabaseConfigured } from './supabase';
import { ContactInfo, LocalizedContactInfo } from '@/types/contact';
import { Language } from '@/types/hero';

/**
 * Helper functions for working with Contact Information from Supabase
 */

// Get active contact information from database
export async function getContactInfo(): Promise<ContactInfo | null> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Contact section will use fallback data.');
    return null;
  }

  try {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .eq('active', true)
      .single();

    if (error) {
      console.error('Error fetching contact info:', error);
      return null;
    }

    return data as ContactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// Helper function to get localized contact info
export function getLocalizedContactInfo(
  contactInfo: ContactInfo,
  language: Language = 'en'
): LocalizedContactInfo {
  const locationKey = `location_${language}` as keyof ContactInfo;
  const hoursKey = `hours_${language}` as keyof ContactInfo;
  
  const location = (contactInfo[locationKey] as string | undefined) || contactInfo.location_en;
  const hours = (contactInfo[hoursKey] as string | undefined) || contactInfo.hours_en;

  return {
    id: contactInfo.id,
    location: location,
    phone: contactInfo.phone,
    email: contactInfo.email,
    hours: hours,
  };
}

