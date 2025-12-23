'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedProductsOverviewHeader, getLocalizedProductsOverviewCard } from '@/lib/products-overview-helpers';
import { ProductsOverviewSectionHeader, ProductsOverviewCard } from '@/types/products-overview';

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

interface ProductsOverviewProps {
  sectionHeaderData: ProductsOverviewSectionHeader | null;
  cardsData: ProductsOverviewCard[];
}

// Fallback section header (used if database data is not available)
const fallbackSectionHeaders = {
  en: {
    title: 'Our Fresh Produce',
    description: 'We cultivate a diverse range of organic fruits and vegetables, all grown with care and without the use of harmful pesticides or chemicals.',
    buttonText: 'View All Products',
    badgeText: '100% Organic',
  },
  so: {
    title: 'Khudaarta iyo Mirooyinkayaga Cusub',
    description: 'Waxaynu korinaynaa noocyo badan oo khudaar iyo mirooyin dabiici ah, dhammaan waxay la koriyey si xirfad leh oo aan la adeegsanayn dhirta ama kiimikada wanaagsan.',
    buttonText: 'Eeg Dhammaan Alaabta',
    badgeText: '100% Dabiici',
  },
  ar: {
    title: 'منتجاتنا الطازجة',
    description: 'نزرع مجموعة متنوعة من الفواكه والخضروات العضوية، كلها مزروعة بعناية وبدون استخدام مبيدات أو مواد كيميائية ضارة.',
    buttonText: 'عرض جميع المنتجات',
    badgeText: '100% عضوي',
  },
};

// Fallback cards data
const fallbackCards = [
  {
    id: 1,
    name: 'Fresh Vegetables',
    description: 'A wide variety of organic vegetables grown naturally',
    image: '/images/prod-1.jpg',
    display_order: 1,
  },
  {
    id: 2,
    name: 'Organic Fruits',
    description: 'Delicious fruits cultivated with care and sustainability',
    image: '/images/prod-2.jpg',
    display_order: 2,
  },
];

export default function ProductsOverview({ sectionHeaderData, cardsData }: ProductsOverviewProps) {
  const { language } = useLanguage();
  
  // Get localized header from database, or fall back to default
  const header = sectionHeaderData
    ? getLocalizedProductsOverviewHeader(sectionHeaderData, language)
    : fallbackSectionHeaders[language] || fallbackSectionHeaders.en;
  
  // Get localized cards
  const localizedCards = cardsData.length > 0
    ? cardsData.map(card => getLocalizedProductsOverviewCard(card, language))
    : [];

  // Use localized cards if available, otherwise use fallback
  const cards = localizedCards.length > 0 ? localizedCards : fallbackCards;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C5F2D] mb-4">{header.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {header.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {cards.map((card) => (
            <div key={card.id} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-[#6B9E3E] text-white px-4 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                  {header.badgeText}
                </div>
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.name}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-8">
                <h3 className="text-2xl text-[#2C5F2D] mb-3">{card.name}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/our-farm"
            className="group inline-flex items-center gap-2 bg-[#6B9E3E] text-white px-10 py-4 rounded-full hover:bg-[#5a8433] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-medium"
          >
            {header.buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

