import PageHeader from '@/components/PageHeader';
import NewsArticleCard from '@/components/news/NewsArticleCard';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { newsArticles } from '@/data/newsArticles';

export default function News() {
  return (
    <main>
      <PageHeader
        badge={{
          text: 'Latest Stories & Updates',
        }}
        title="News & Updates 📰"
        description={
          <>
            Stay informed about the <span className="text-[#6B9E3E] font-semibold">latest happenings</span> at Mire Farms
          </>
        }
      />

      {/* News Articles */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8 md:space-y-10">
            {newsArticles.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}
