import PageHeader from '@/components/PageHeader';
import NewsArticleCard from '@/components/news/NewsArticleCard';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { getNewsArticles } from '@/lib/news-helpers';
import { NewsArticle } from '@/types/news';

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
