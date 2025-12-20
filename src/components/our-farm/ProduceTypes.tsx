'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedProduceTypesHeader, getLocalizedProduceItems } from '@/lib/our-farm-helpers';
import { ProduceTypesHeader, ProduceItem, LocalizedProduceTypesHeader, LocalizedProduceItem } from '@/types/our-farm';

interface ProduceTypesProps {
  headerData: ProduceTypesHeader | null;
  produceItemsData: ProduceItem[];
}

// Fallback data
const fallbackHeader: LocalizedProduceTypesHeader = {
  id: 1,
  title: 'What We Grow 🌱',
  description: 'We cultivate a wide variety of organic fruits and vegetables throughout the year, adapting our crops to seasonal conditions for optimal quality.',
  footer_badge_text: '✨ All produce is grown using natural, pesticide-free methods',
};

const fallbackProduce: LocalizedProduceItem[] = [
  { id: 1, name: 'Tomatoes', emoji: '🍅', display_order: 1 },
  { id: 2, name: 'Peppers', emoji: '🌶️', display_order: 2 },
  { id: 3, name: 'Cucumbers', emoji: '🥒', display_order: 3 },
  { id: 4, name: 'Lettuce', emoji: '🥬', display_order: 4 },
  { id: 5, name: 'Spinach', emoji: '🥬', display_order: 5 },
  { id: 6, name: 'Carrots', emoji: '🥕', display_order: 6 },
  { id: 7, name: 'Pepper', emoji: '🫑', display_order: 7 },
  { id: 8, name: 'Oranges', emoji: '🍊', display_order: 8 },
  { id: 9, name: 'Potatoes', emoji: '🥔', display_order: 9 },
  { id: 10, name: 'Melons', emoji: '🍈', display_order: 10 },
  { id: 11, name: 'Herbs', emoji: '🌿', display_order: 11 },
  { id: 12, name: 'Onions', emoji: '🧅', display_order: 12 },
];

export default function ProduceTypes({ headerData, produceItemsData }: ProduceTypesProps) {
  const { language } = useLanguage();
  
  // Get localized header
  const localizedHeader: LocalizedProduceTypesHeader = headerData
    ? getLocalizedProduceTypesHeader(headerData, language)
    : fallbackHeader;

  // Get localized produce items
  const localizedProduce: LocalizedProduceItem[] = produceItemsData.length > 0
    ? getLocalizedProduceItems(produceItemsData, language)
    : [];

  const produce = localizedProduce.length > 0 ? localizedProduce : fallbackProduce;

  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-[#2C5F2D] mb-4">{localizedHeader.title}</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {localizedHeader.description}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produce.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#6B9E3E]"
            >
              <div className="text-4xl mb-3">{item.emoji}</div>
              <p className="text-base text-gray-800 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center px-2">
          <div className="inline-block bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium shadow-lg">
            {localizedHeader.footer_badge_text}
          </div>
        </div>
      </div>
    </section>
  );
}

