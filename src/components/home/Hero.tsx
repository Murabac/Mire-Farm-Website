'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getHeroSectionByLanguage } from '@/lib/hero-helpers';
import { HeroSection } from '@/types/hero';

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

// ArrowRight Icon Component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

interface HeroProps {
  heroSectionData: HeroSection | null;
}

export default function Hero({ heroSectionData }: HeroProps) {
  const { language } = useLanguage();
  
  // Get localized content based on current language
  const heroData = heroSectionData 
    ? getHeroSectionByLanguage(heroSectionData, language)
    : null;

  // Fallback to default values if heroData is not available
  const badgeText = heroData?.badgeText || '100% Organic & Natural';
  const headingPrefix = heroData?.headingPrefix || 'Growing a';
  const headingHighlight = heroData?.headingHighlight || 'Sustainable';
  const headingSuffix = heroData?.headingSuffix || 'Future';
  const description = heroData?.description || 'Cultivating high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland using natural and pesticide-free farming methods.';
  const primaryButtonText = heroData?.primaryButtonText || 'Explore Our Farm';
  const secondaryButtonText = heroData?.secondaryButtonText || 'Get in Touch';
  const stats = heroData?.stats || [
    { number: '100+', label: 'Crop Varieties' },
    { number: '100%', label: 'Organic' },
    { number: '4+', label: 'Countries' },
  ];
  // Get hero image URL, ensuring we use the database value if available
  const heroImageUrl = heroData?.heroImageUrl && heroData.heroImageUrl.trim() !== '' 
    ? heroData.heroImageUrl 
    : '/images/hero-image.jpg';
  const bottomBadgeTitle = heroData?.bottomBadgeTitle || 'Est. 2024';
  const bottomBadgeSubtitle = heroData?.bottomBadgeSubtitle || 'Organic Farm';
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] py-12 md:py-16 lg:py-24 px-6 sm:px-8 md:px-4">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-[#6B9E3E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#8BC34A]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#6B9E3E]/10 text-[#6B9E3E] px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{badgeText}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2C5F2D] mb-6 leading-tight">
              {headingPrefix} <span className="text-[#6B9E3E] relative">
                {headingHighlight}
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C60 2 140 2 198 10" stroke="#8BC34A" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span> {headingSuffix}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
              <Link
                href="/our-farm"
                className="group bg-[#6B9E3E] text-white px-8 py-4 rounded-full hover:bg-[#5a8433] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-medium flex items-center justify-center gap-2"
              >
                {primaryButtonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#contact"
                className="bg-white text-[#6B9E3E] border-2 border-[#6B9E3E] px-8 py-4 rounded-full hover:bg-[#6B9E3E] hover:text-white transition-all transform hover:scale-105 shadow-md text-lg font-medium text-center"
              >
                {secondaryButtonText}
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6B9E3E]">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative mt-8 md:mt-0">
            <div className="absolute -top-4 -right-4 w-full h-full bg-[#6B9E3E]/20 rounded-3xl"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <Image
                src={heroImageUrl}
                alt="Mire Farms sustainable agriculture"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white rounded-2xl shadow-xl p-4 md:p-6 border-4 border-[#6B9E3E]">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-[#6B9E3E]">{bottomBadgeTitle}</div>
                <div className="text-xs md:text-sm text-gray-600">{bottomBadgeSubtitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

