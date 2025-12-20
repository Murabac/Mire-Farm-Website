'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { NewsArticle, LocalizedNewsArticle } from '@/types/news';
import { getLocalizedNewsArticle } from '@/lib/news-helpers';

// Calendar Icon Component
const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// User Icon Component
const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

interface NewsArticleCardProps {
  article: NewsArticle | LocalizedNewsArticle;
}

export default function NewsArticleCard({ article }: NewsArticleCardProps) {
  const { language } = useLanguage();

  // Localize the article if it's a raw NewsArticle (has multi-language fields)
  const localizedArticle: LocalizedNewsArticle = 'title_en' in article
    ? getLocalizedNewsArticle(article as NewsArticle, language)
    : (article as LocalizedNewsArticle);

  return (
    <Link href={`/news/${localizedArticle.id}`}>
      <article className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-gray-100 cursor-pointer">
        <div className="grid md:grid-cols-5 gap-0">
        <div className="md:col-span-2 h-64 md:h-auto relative overflow-hidden group">
          <Image
            src={localizedArticle.image}
            alt={localizedArticle.title}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            {localizedArticle.badge}
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-2xl p-2.5 rounded-full shadow-lg">
            {localizedArticle.emoji}
          </div>
        </div>
        <div className="md:col-span-3 p-5 md:p-6">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-medium">{localizedArticle.date}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full text-xs">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium">{localizedArticle.author}</span>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-[#2C5F2D] mb-3 md:mb-4 leading-tight">{localizedArticle.title}</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4 leading-relaxed">{localizedArticle.excerpt}</p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">{localizedArticle.content}</p>
        </div>
      </div>
    </article>
    </Link>
  );
}

