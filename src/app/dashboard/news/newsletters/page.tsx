'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Eye, EyeOff, Calendar, User, Newspaper } from 'lucide-react';
import { NewsArticle } from '@/types/news';

export default function NewslettersListPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<string>('all'); // 'all', 'true', 'false'

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterActive !== 'all') {
        params.append('active', filterActive);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`/api/admin/news?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles || []);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, [filterActive, searchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D] flex items-center gap-3">
            <Newspaper className="w-8 h-8" />
            News Articles
          </h1>
          <p className="text-gray-600 mt-1">Manage all news articles and posts</p>
        </div>
        <Link
          href="/dashboard/news/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create News Post</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E]"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterActive('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterActive === 'all'
                  ? 'bg-[#6B9E3E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterActive('true')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filterActive === 'true'
                  ? 'bg-[#6B9E3E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              Active
            </button>
            <button
              onClick={() => setFilterActive('false')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filterActive === 'false'
                  ? 'bg-[#6B9E3E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <EyeOff className="w-4 h-4" />
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No news articles found</p>
            <Link
              href="/dashboard/news/new"
              className="inline-block mt-4 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
            >
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Article Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title_en}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          {article.emoji}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {!article.active && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                              Inactive
                            </span>
                          )}
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {article.badge_en || 'News'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {article.title_en}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt_en}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(article.date || article.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{article.author_en}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Order: {article.display_order}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex-shrink-0">
                        <Link
                          href={`/dashboard/news/new?id=${article.id}`}
                          className="px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors text-sm font-medium"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
