'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  getLocalizedSectionHeader,
  getLocalizedMissionVisionValues,
  getLocalizedCoreValues,
} from '@/lib/mission-vision-helpers';
import {
  MissionVisionValue,
  CoreValue,
  MissionVisionSectionHeader,
  LocalizedCoreValue,
  LocalizedMissionVisionValue,
} from '@/types/mission-vision';

// Icon Components
const OrganicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
);

const CommunityIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <circle cx="9" cy="7" r="4"></circle>
  </svg>
);

const LeaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const GrowthIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 7h6v6"></path>
    <path d="m22 7-8.5 8.5-5-5L2 17"></path>
  </svg>
);

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  organic: OrganicIcon,
  community: CommunityIcon,
  leader: LeaderIcon,
  growth: GrowthIcon,
};

interface MissionVisionValuesProps {
  sectionHeader: MissionVisionSectionHeader | null;
  missionVisionValues: MissionVisionValue[];
  coreValues: CoreValue[];
}

export default function MissionVisionValues({
  sectionHeader,
  missionVisionValues,
  coreValues,
}: MissionVisionValuesProps) {
  const { language } = useLanguage();

  // Get localized content
  const header = getLocalizedSectionHeader(sectionHeader, language);
  const mvvItems = getLocalizedMissionVisionValues(missionVisionValues, language);
  const localizedCoreValues = getLocalizedCoreValues(coreValues, language);

  // Fallback data
  const fallbackHeader = {
    title: 'Why Choose Mire Farms?',
    description: 'We\'re more than just a farm - we\'re a community dedicated to sustainable agriculture and healthy living',
  };

  const fallbackMvv: LocalizedMissionVisionValue[] = [
    {
      id: 1,
      type: 'mission',
      emoji: '🌱',
      title: 'Our Mission',
      description: 'To provide the highest quality organic produce while supporting our local community and protecting the environment for future generations.',
      bg_color_class: 'from-green-50 to-white',
      border_color_class: 'border-green-100',
    },
    {
      id: 2,
      type: 'vision',
      emoji: '🎯',
      title: 'Our Vision',
      description: 'To become the leading organic farm in the Horn of Africa, setting standards for sustainable agriculture and community empowerment.',
      bg_color_class: 'from-blue-50 to-white',
      border_color_class: 'border-blue-100',
    },
    {
      id: 3,
      type: 'values',
      emoji: '💚',
      title: 'Our Values',
      description: 'Sustainability, quality, community, innovation, and environmental stewardship guide everything we do at Mire Farms.',
      bg_color_class: 'from-purple-50 to-white',
      border_color_class: 'border-purple-100',
    },
  ];

  const fallbackCoreValues: LocalizedCoreValue[] = [
    {
      id: 1,
      title: '100% Organic',
      description: 'Delivering the finest organic produce with uncompromising standards.',
      icon_type: 'organic',
      color_class: 'bg-green-100 text-green-600',
    },
    {
      id: 2,
      title: 'Community First',
      description: 'Supporting local communities and building lasting relationships.',
      icon_type: 'community',
      color_class: 'bg-blue-100 text-blue-600',
    },
    {
      id: 3,
      title: 'Regional Leader',
      description: 'Setting standards for sustainable agriculture in the Horn of Africa.',
      icon_type: 'leader',
      color_class: 'bg-purple-100 text-purple-600',
    },
    {
      id: 4,
      title: 'Sustainable Growth',
      description: 'Committed to eco-friendly practices that preserve our land for future generations.',
      icon_type: 'growth',
      color_class: 'bg-orange-100 text-orange-600',
    },
  ];

  const finalHeader = sectionHeader ? header : fallbackHeader;
  const finalMvv = mvvItems.length > 0 ? mvvItems : fallbackMvv;
  const finalCoreValues = localizedCoreValues.length > 0 ? localizedCoreValues : fallbackCoreValues;
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C5F2D] mb-4">{finalHeader.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {finalHeader.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {finalMvv.map((item) => (
            <div
              key={item.id}
              className={`text-center bg-gradient-to-br ${item.bg_color_class} p-8 rounded-2xl border-2 ${item.border_color_class} hover:border-[#6B9E3E] transition-all transform hover:scale-105 shadow-lg`}
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-2xl text-[#2C5F2D] mb-4">{item.title}</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalCoreValues.map((value) => {
            const IconComponent = iconMap[value.icon_type] || OrganicIcon;
            return (
              <div
                key={value.id}
                className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-100"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 ${value.color_class} rounded-full mb-4`}>
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="text-xl text-[#2C5F2D] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

