'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedGrowthExpansionHeader, getLocalizedGrowthExpansionPlans, getLocalizedGrowthExpansionStats } from '@/lib/our-farm-helpers';
import { GrowthExpansionHeader, GrowthExpansionPlan, GrowthExpansionStat, LocalizedGrowthExpansionHeader, LocalizedGrowthExpansionPlan, LocalizedGrowthExpansionStat } from '@/types/our-farm';

interface GrowthExpansionProps {
  headerData: GrowthExpansionHeader | null;
  plansData: GrowthExpansionPlan[];
  statsData: GrowthExpansionStat[];
}

// Fallback data
const fallbackHeader: LocalizedGrowthExpansionHeader = {
  id: 1,
  title: 'Growth & Expansion Plans 🚀',
  description: 'Building a brighter future for farming in the Horn of Africa',
  image_url: '/images/our-farm-hero.jpg',
};

const fallbackPlans: LocalizedGrowthExpansionPlan[] = [
  {
    id: 1,
    emoji: '🌍',
    title: 'Regional Market Expansion',
    description: 'We are actively expanding our distribution network to reach markets in Djibouti, Ethiopia, and Somalia, bringing quality organic produce to more communities across the Horn of Africa.',
    display_order: 1,
  },
  {
    id: 2,
    emoji: '👨‍🌾',
    title: 'Farmer Training Programs',
    description: 'We\'re developing comprehensive training programs to share our knowledge with other farmers in the community, helping them adopt sustainable organic farming practices and improve their livelihoods.',
    display_order: 2,
  },
  {
    id: 3,
    emoji: '🏗️',
    title: 'Infrastructure Development',
    description: 'Investing in modern farming infrastructure, including irrigation systems, storage facilities, and processing equipment to increase efficiency and maintain product quality.',
    display_order: 3,
  },
  {
    id: 4,
    emoji: '🌿',
    title: 'Product Diversification',
    description: 'Continuously researching and testing new crop varieties to expand our product range and meet evolving market demands while maintaining our organic standards.',
    display_order: 4,
  },
];

const fallbackStats: LocalizedGrowthExpansionStat[] = [
  { id: 1, number: '4+', label: 'Countries Reached', display_order: 1 },
  { id: 2, number: '100+', label: 'Farmers Trained', display_order: 2 },
  { id: 3, number: '50+', label: 'Hectares Farmed', display_order: 3 },
  { id: 4, number: '100%', label: 'Organic Certified', display_order: 4 },
];

export default function GrowthExpansion({ headerData, plansData, statsData }: GrowthExpansionProps) {
  const { language } = useLanguage();
  
  // Get localized header
  const localizedHeader: LocalizedGrowthExpansionHeader = headerData
    ? getLocalizedGrowthExpansionHeader(headerData, language)
    : fallbackHeader;

  // Get localized plans
  const localizedPlans: LocalizedGrowthExpansionPlan[] = plansData.length > 0
    ? getLocalizedGrowthExpansionPlans(plansData, language)
    : [];

  const plans = localizedPlans.length > 0 ? localizedPlans : fallbackPlans;

  // Get localized stats
  const localizedStats: LocalizedGrowthExpansionStat[] = statsData.length > 0
    ? getLocalizedGrowthExpansionStats(statsData, language)
    : [];

  const stats = localizedStats.length > 0 ? localizedStats : fallbackStats;

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">{localizedHeader.title}</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {localizedHeader.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-10">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-full h-full bg-white/10 rounded-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 max-h-[300px] md:max-h-[615px]">
              <Image
                src={localizedHeader.image_url}
                alt="Farming community"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-3 md:space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="text-2xl md:text-3xl flex-shrink-0">{plan.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl mb-2">{plan.title}</h3>
                    <p className="text-sm md:text-base text-green-100 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border-2 border-white/20 text-center">
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.number}</div>
              <div className="text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

