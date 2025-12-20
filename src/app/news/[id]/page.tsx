import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getNewsArticleById, getNewsArticles, getLocalizedNewsArticle } from '@/lib/news-helpers';
import { NewsArticle } from '@/types/news';
import ArticleClient from './article-client';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getNewsArticleById(parseInt(params.id));

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  // Use English for metadata (default)
  const localized = getLocalizedNewsArticle(article, 'en');

  return {
    title: `${localized.title} | Mire Farms`,
    description: localized.excerpt,
    openGraph: {
      title: localized.title,
      description: localized.excerpt,
      images: [localized.image],
      type: 'article',
      publishedTime: localized.date,
      authors: [localized.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articleId = parseInt(params.id);
  const article = await getNewsArticleById(articleId);

  if (!article) {
    notFound();
  }

  // Get related articles (exclude current article, get 2 others)
  const allArticles = await getNewsArticles();
  const relatedArticles = allArticles
    .filter(a => a.id !== articleId)
    .slice(0, 2);

  return <ArticleClient article={article} relatedArticles={relatedArticles} />;
}
