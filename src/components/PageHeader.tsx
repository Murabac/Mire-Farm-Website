'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeader as PageHeaderType } from '@/types/page-header';
import { getLocalizedPageHeader } from '@/lib/page-header-helpers';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Sparkles Icon Component
const Sparkles = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

interface PageHeaderProps {
  data?: PageHeaderType | null;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title?: string;
  description?: string | React.ReactNode;
  className?: string;
}

export default function PageHeader({ 
  data: propData,
  badge, 
  title, 
  description,
  className = ''
}: PageHeaderProps) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [fetchedData, setFetchedData] = useState<PageHeaderType | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Start as false since we prefer server-side data

  // Fetch page header data from database based on current route (only if no props/data provided)
  useEffect(() => {
    // If data is provided via props, use it and skip fetching
    if (propData) {
      setFetchedData(propData);
      setIsLoading(false);
      return;
    }

    // If props are provided (title, badge, description), skip fetching
    if (title || badge || description) {
      setIsLoading(false);
      return;
    }

    // Only fetch if Supabase is configured
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    // Fetch data based on current route (client-side fallback)
    const fetchPageHeader = async () => {
      try {
        const { data, error } = await supabase
          .from('page_headers')
          .select('*')
          .eq('page_route', pathname || '/')
          .eq('active', true)
          .single();

        if (error) {
          // Only log if it's not a "table not found" error (PGRST205)
          // This is expected if migrations haven't been run yet
          if (error.code !== 'PGRST205') {
            console.error('Error fetching page header:', error);
          }
          setFetchedData(null);
        } else {
          setFetchedData(data as PageHeaderType);
        }
      } catch (error) {
        console.error('Error fetching page header:', error);
        setFetchedData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageHeader();
  }, [pathname, propData, title, badge, description]);

  // Determine which data source to use
  // Priority: props > fetched data > empty
  let badgeText = '';
  let headerTitle = '';
  let headerDescription: string | React.ReactNode = '';

  // If props are provided, use them (highest priority)
  if (title || badge || description) {
    badgeText = badge?.text || '';
    headerTitle = title || '';
    headerDescription = description || '';
  } 
  // Otherwise, use fetched data from database
  else {
    const data = propData || fetchedData;
    if (data) {
      // Re-localize whenever language changes (language is from context, will trigger re-render)
      const localized = getLocalizedPageHeader(data, language);
      badgeText = localized.badge_text || '';
      headerTitle = localized.title || '';
      headerDescription = localized.description || '';
    }
  }

  // Show loading state only if we're fetching client-side and have no props/data
  // This should rarely happen now since pages fetch server-side
  if (isLoading && !title && !badge && !description && !propData && !fetchedData) {
    return null;
  }

  // Don't render if we have no content at all
  if (!badgeText && !headerTitle && !headerDescription) {
    return null;
  }

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] py-12 md:py-16 px-4 ${className}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B9E3E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8BC34A]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {(badge || badgeText) && (
          <div className="inline-flex items-center gap-2 bg-[#6B9E3E]/10 text-[#6B9E3E] px-4 py-2 rounded-full mb-6">
            {badge?.icon || <Sparkles className="w-4 h-4" />}
            <span className="text-sm font-medium">{badgeText}</span>
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2C5F2D] mb-4 md:mb-6">{headerTitle}</h1>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
          {typeof headerDescription === 'string' ? (
            <p>{headerDescription}</p>
          ) : (
            headerDescription
          )}
        </div>
      </div>
    </section>
  );
}

