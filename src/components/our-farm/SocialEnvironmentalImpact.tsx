'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedSocialImpactHeader, getLocalizedSocialImpactCards, getLocalizedEnvironmentalCommitment } from '@/lib/our-farm-helpers';
import { SocialImpactHeader, SocialImpactCard, EnvironmentalCommitment, LocalizedSocialImpactHeader, LocalizedSocialImpactCard, LocalizedEnvironmentalCommitment } from '@/types/our-farm';

// Icon Components
const CommunityIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <circle cx="9" cy="7" r="4"></circle>
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

// Icon map
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  community: CommunityIcon,
  leaf: LeafIcon,
  heart: HeartIcon,
  globe: GlobeIcon,
};

interface SocialEnvironmentalImpactProps {
  headerData: SocialImpactHeader | null;
  cardsData: SocialImpactCard[];
  commitmentData: EnvironmentalCommitment | null;
}

// Fallback data
const fallbackHeader: LocalizedSocialImpactHeader = {
  id: 1,
  title: 'Our Impact 💚',
  description: 'At Mire Farms, we believe in creating positive change for both people and planet.',
};

const fallbackCards: LocalizedSocialImpactCard[] = [
  {
    id: 1,
    icon_type: 'community',
    emoji: '🤝',
    title: 'Community Empowerment',
    description: 'We create employment opportunities and support local communities through fair wages and capacity building programs.',
    color_class: 'bg-blue-100 text-blue-600',
    display_order: 1,
  },
  {
    id: 2,
    icon_type: 'leaf',
    emoji: '🌿',
    title: 'Environmental Protection',
    description: 'Our organic farming methods protect soil health, preserve biodiversity, and reduce carbon emissions.',
    color_class: 'bg-green-100 text-green-600',
    display_order: 2,
  },
  {
    id: 3,
    icon_type: 'heart',
    emoji: '💚',
    title: 'Health & Nutrition',
    description: 'We provide access to fresh, nutritious, and chemical-free produce that promotes better health outcomes.',
    color_class: 'bg-pink-100 text-pink-600',
    display_order: 3,
  },
  {
    id: 4,
    icon_type: 'globe',
    emoji: '🌍',
    title: 'Sustainable Future',
    description: 'By practicing sustainable agriculture, we contribute to food security and environmental conservation for future generations.',
    color_class: 'bg-purple-100 text-purple-600',
    display_order: 4,
  },
];

const fallbackCommitment: LocalizedEnvironmentalCommitment = {
  id: 1,
  emoji: '🌍',
  title: 'Environmental Commitment',
  description: 'We are committed to reducing our environmental footprint through sustainable farming practices, water conservation, and natural pest management. Our goal is to leave the land better than we found it for future generations.',
};

export default function SocialEnvironmentalImpact({ headerData, cardsData, commitmentData }: SocialEnvironmentalImpactProps) {
  const { language } = useLanguage();
  
  // Get localized header
  const localizedHeader: LocalizedSocialImpactHeader = headerData
    ? getLocalizedSocialImpactHeader(headerData, language)
    : fallbackHeader;

  // Get localized cards
  const localizedCards: LocalizedSocialImpactCard[] = cardsData.length > 0
    ? getLocalizedSocialImpactCards(cardsData, language)
    : [];

  const cards = localizedCards.length > 0 ? localizedCards : fallbackCards;

  // Get localized commitment
  const localizedCommitment: LocalizedEnvironmentalCommitment = commitmentData
    ? getLocalizedEnvironmentalCommitment(commitmentData, language)
    : fallbackCommitment;

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-[#2C5F2D] mb-4">{localizedHeader.title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {localizedHeader.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {cards.map((card) => {
            const IconComponent = iconMap[card.icon_type] || CommunityIcon;
            return (
              <div 
                key={card.id} 
                className="bg-gradient-to-br from-white to-gray-50 p-5 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-100 hover:border-[#6B9E3E]"
              >
                <div className="flex gap-3 md:gap-4 items-start">
                  <div className={`${card.color_class} p-3 md:p-4 rounded-xl shadow-md flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-lg md:text-xl text-[#2C5F2D]">{card.title}</h3>
                      <span className="text-xl md:text-2xl">{card.emoji}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-gradient-to-br from-[#6B9E3E] to-[#8BC34A] p-6 md:p-8 rounded-2xl shadow-xl text-white">
          <div className="max-w-4xl mx-auto text-center px-2">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">{localizedCommitment.emoji}</div>
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4">{localizedCommitment.title}</h3>
            <p className="text-base md:text-lg leading-relaxed">
              {localizedCommitment.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

