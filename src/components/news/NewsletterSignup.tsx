'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types/hero';

// Bell Icon Component
const Bell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

// ArrowRight Icon Component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
);

// Newsletter translations
const newsletterTranslations = {
  en: {
    title: 'Stay Updated! 📬',
    description: 'Subscribe to our newsletter to receive the latest news and updates from Mire Farms delivered straight to your inbox',
    emailPlaceholder: 'Enter your email address',
    subscribeButton: 'Subscribe',
    subscriberCount: '✨ Join 500+ subscribers who get our monthly updates',
  },
  so: {
    title: 'La Soco! 📬',
    description: 'Iska diiwaan geli wararka aanu soo dirayno si aad u hesho wararka ugu dambeeyay ee Beeraha Mire oo toos ugu yimaada sanduuqaaga',
    emailPlaceholder: 'Geli ciwaanka emaylkaaga',
    subscribeButton: 'Iska diiwaan geli',
    subscriberCount: '✨ Ku biir 500+ iska diiwaangelayaasha oo hela warbixinnada bishii kasta',
  },
  ar: {
    title: 'ابق على اطلاع! 📬',
    description: 'اشترك في نشرتنا الإخبارية لتلقي آخر الأخبار والتحديثات من مزرعة مير مباشرة إلى بريدك الوارد',
    emailPlaceholder: 'أدخل عنوان بريدك الإلكتروني',
    subscribeButton: 'اشترك',
    subscriberCount: '✨ انضم إلى أكثر من 500 مشترك يحصلون على تحديثاتنا الشهرية',
  },
};

export default function NewsletterSignup() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const translations = newsletterTranslations[language] || newsletterTranslations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-10 px-4 bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3 md:mb-4">
          <Bell className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">{translations.title}</h2>
        <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed px-2">
          {translations.description}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-lg mx-auto px-2">
          <input
            type="email"
            placeholder={translations.emailPlaceholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null);
            }}
            required
            disabled={loading}
            className="flex-1 px-4 md:px-5 py-2.5 md:py-3 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-full focus:outline-none focus:border-white text-white placeholder-white/70 text-sm md:text-base disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="group bg-white text-[#6B9E3E] px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-sm md:text-base font-medium whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#6B9E3E] border-t-transparent rounded-full animate-spin"></div>
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                {translations.subscribeButton}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        {message && (
          <div className={`mt-4 px-4 py-2 rounded-lg text-sm max-w-lg mx-auto ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
        <p className="text-xs text-green-100 mt-3 md:mt-4">
          {translations.subscriberCount}
        </p>
      </div>
    </section>
  );
}

