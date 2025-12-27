import PageHeader from '@/components/PageHeader';
import NewsArticleCard from '@/components/news/NewsArticleCard';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { getNewsArticles } from '@/lib/news-helpers';
import { NewsArticle } from '@/types/news';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirefarms.com';
  
  return {
    title: "News & Updates - Mire Farms Organic Farming News",
    description: "Stay updated with the latest news, updates, and stories from Mire Farms. Read about our farming practices, community initiatives, and organic produce updates.",
    keywords: [
      "farm news",
      "organic farming updates",
      "agriculture news",
      "farm blog",
      "sustainable farming news",
      "community farming news",
    ],
    openGraph: {
      title: "News & Updates - Mire Farms",
      description: "Stay updated with the latest news and stories from Mire Farms.",
      url: `${baseUrl}/news`,
      siteName: "Mire Farms",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "News & Updates - Mire Farms",
      description: "Stay updated with the latest news from Mire Farms.",
    },
    alternates: {
      canonical: `${baseUrl}/news`,
    },
  };
}

export default async function News() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData = await getPageHeaderByRoute('/news');
  // Fetch news articles server-side for instant rendering
  const articlesData: NewsArticle[] = await getNewsArticles();

  return (
    <main>
      <PageHeader data={pageHeaderData} />

      {/* News Articles */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-10">
            {articlesData.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}
