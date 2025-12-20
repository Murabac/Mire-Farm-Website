import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import NewsletterSignup from '@/components/news/NewsletterSignup';
import { newsArticles, getArticleById } from '@/data/newsArticles';

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

// Arrow Left Icon Component
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticleById(params.id);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Mire Farms`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleById(params.id);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <PageHeader
        badge={{
          text: article.badge,
        }}
        title={article.title}
        description={
          <>
            <span className="text-[#6B9E3E] font-semibold">{article.excerpt}</span>
          </>
        }
      />

      {/* Article Content */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-[#6B9E3E] hover:text-[#2C5F2D] font-medium mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to News</span>
          </Link>

          {/* Article Meta Information */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">{article.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full">
              <User className="w-4 h-4" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-full">
              <span className="text-xl">{article.emoji}</span>
              <span className="font-medium">{article.badge}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {article.badge}
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-3xl p-3 rounded-full shadow-lg">
              {article.emoji}
            </div>
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed border-l-4 border-[#6B9E3E] pl-6 py-2">
                {article.excerpt}
              </p>
              <div className="text-base md:text-lg text-gray-700 leading-relaxed">
                <p>{article.content}</p>
              </div>
            </div>
          </article>

          {/* Divider */}
          <div className="my-12 border-t-2 border-gray-200"></div>

          {/* Related Articles Section */}
          <div className="mt-12">
            <h2 className="text-2xl md:text-3xl text-[#2C5F2D] font-bold mb-6">More News</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {newsArticles
                .filter(a => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/news/${relatedArticle.id}`}
                    className="group bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {relatedArticle.badge}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#2C5F2D] mb-2 group-hover:text-[#6B9E3E] transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedArticle.excerpt}</p>
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{relatedArticle.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </main>
  );
}
