'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedBenefits } from '@/lib/benefits-helpers';
import { Benefit, LocalizedBenefit } from '@/types/benefits';

// CheckCircle Icon Component
const CheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface BenefitsProps {
  benefitsData: Benefit[];
}

export default function Benefits({ benefitsData }: BenefitsProps) {
  const { language } = useLanguage();
  
  // Get localized benefits based on current language
  const localizedBenefits: LocalizedBenefit[] = benefitsData.length > 0
    ? getLocalizedBenefits(benefitsData, language)
    : [];

  // Fallback benefits if no data from database
  const fallbackBenefits: LocalizedBenefit[] = [
    { id: 1, text: '100% Organic' },
    { id: 2, text: 'Pesticide Free' },
    { id: 3, text: 'Locally Grown' },
    { id: 4, text: 'Fresh Daily' },
    { id: 5, text: 'Sustainable' },
    { id: 6, text: 'Quality Assured' },
];

  const benefits = localizedBenefits.length > 0 ? localizedBenefits : fallbackBenefits;

  return (
    <section className="bg-[#6B9E3E] text-white py-8 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


