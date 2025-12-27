'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ContactInfo } from '@/types/contact';

interface SEOStructuredDataProps {
  contactInfo?: ContactInfo | null;
  type?: 'organization' | 'website';
}

export default function SEOStructuredData({ contactInfo, type = 'organization' }: SEOStructuredDataProps) {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirefarms.com';
    
    let structuredData: any = {};

    if (type === 'organization' || type === 'website') {
      const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mire Farms",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "description": language === 'en' 
          ? "Mire Farms cultivates high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland. Growing fresh, pesticide-free produce using sustainable farming methods."
          : language === 'so'
          ? "Mire Farms waxay korinaysaa khudaarta iyo mirooyinka tayo sare leh ee dabiiciga ah ee ku yaala Magaalada Arabsiyo, Somaliland."
          : "مزارع مير تزرع الفواكه والخضروات العضوية عالية الجودة في قرية العربصيو، صوماليلاند.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": contactInfo?.location_en || "Arabsiyo Village",
          "addressRegion": "Gabiley Region",
          "addressCountry": "SO",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": contactInfo?.phone || "+252 63 4222 609",
          "contactType": "Customer Service",
          "email": contactInfo?.email || "info@mirefarms.com",
        },
        "sameAs": [
          // Add your social media URLs here when available
          // "https://www.facebook.com/mirefarms",
          // "https://www.twitter.com/mirefarms",
          // "https://www.instagram.com/mirefarms",
        ],
      };

      structuredData = organizationData;
    }

    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"][data-seo-structured]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-structured', 'true');
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-seo-structured]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, language, contactInfo]);

  return null;
}

