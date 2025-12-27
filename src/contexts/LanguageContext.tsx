'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language } from '@/types/hero';

interface LanguageSetting {
  language_code: string;
  enabled: boolean;
  display_order: number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  enabledLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  // Start with empty array - languages will be loaded from API
  const [enabledLanguages, setEnabledLanguages] = useState<Language[]>([]);

  // Fetch enabled languages - wrapped in useCallback for stability
  const fetchEnabledLanguages = useCallback(async () => {
    try {
      // Add cache-busting to get fresh data
      const response = await fetch(`/api/admin/settings/languages?t=${Date.now()}&r=${Math.random().toString(36).substring(7)}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });
      if (response.ok) {
        const settings: LanguageSetting[] = await response.json();
        const enabled = settings
          .filter(s => Boolean(s.enabled) === true)
          .sort((a, b) => a.display_order - b.display_order)
          .map(s => s.language_code as Language);
        
        if (enabled.length > 0) {
          setEnabledLanguages(enabled);
          
          // Get saved language from localStorage
          const savedLanguage = localStorage.getItem('mire-farm-language') as Language;
          
          // Validate saved language is enabled, if not use first enabled language
          let languageToSet: Language;
          if (savedLanguage && enabled.includes(savedLanguage)) {
            languageToSet = savedLanguage;
          } else {
            languageToSet = enabled[0];
            localStorage.setItem('mire-farm-language', enabled[0]);
          }
          
          // Set the validated language
          setLanguageState(languageToSet);
          
          // Update HTML attributes immediately
          document.documentElement.lang = languageToSet;
          if (languageToSet === 'ar') {
            document.documentElement.dir = 'rtl';
          } else {
            document.documentElement.dir = 'ltr';
          }
        }
      }
    } catch (error) {
      console.error('Error fetching enabled languages:', error);
    } finally {
      setMounted(true);
    }
  }, []);

  // Fetch enabled languages on mount
  useEffect(() => {
    fetchEnabledLanguages();
  }, [fetchEnabledLanguages]);

  // Refresh enabled languages when page becomes visible or gains focus (user switches tabs/windows back)
  useEffect(() => {
    if (!mounted) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchEnabledLanguages();
      }
    };

    const handleFocus = () => {
      fetchEnabledLanguages();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchEnabledLanguages, mounted]);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    // Only allow setting enabled languages - check if language is enabled
    if (enabledLanguages.length === 0 || !enabledLanguages.includes(lang)) {
      // If trying to set disabled language, fallback to first enabled
      if (enabledLanguages.length > 0) {
        const fallbackLang = enabledLanguages[0];
        setLanguageState(fallbackLang);
        localStorage.setItem('mire-farm-language', fallbackLang);
        document.documentElement.lang = fallbackLang;
        if (fallbackLang === 'ar') {
          document.documentElement.dir = 'rtl';
        } else {
          document.documentElement.dir = 'ltr';
        }
      }
      return;
    }

    setLanguageState(lang);
    localStorage.setItem('mire-farm-language', lang);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lang;
    
    // Update dir attribute for RTL languages (Arabic)
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  // Update HTML attributes when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
      if (language === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [language, mounted]);

  // Validate current language is still enabled (in case settings change)
  useEffect(() => {
    if (mounted && enabledLanguages.length > 0 && !enabledLanguages.includes(language)) {
      // Current language was disabled, switch to first enabled language
      const fallbackLanguage = enabledLanguages[0];
      setLanguageState(fallbackLanguage);
      localStorage.setItem('mire-farm-language', fallbackLanguage);
      
      // Update HTML attributes
      document.documentElement.lang = fallbackLanguage;
      if (fallbackLanguage === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [enabledLanguages, language, mounted]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, enabledLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
