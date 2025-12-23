'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Save, Languages, Upload, Newspaper, X, Image as ImageIcon, Calendar, User, Hash, Smile, Eye, EyeOff } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface NewsArticleFormData {
  en: {
    title: string;
    excerpt: string;
    content: string;
    badge: string;
    author: string;
  };
  so: {
    title: string;
    excerpt: string;
    content: string;
    badge: string;
    author: string;
  };
  ar: {
    title: string;
    excerpt: string;
    content: string;
    badge: string;
    author: string;
  };
}

export function NewsArticleEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  const isEditing = !!articleId;

  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<NewsArticleFormData>({
    en: {
      title: '',
      excerpt: '',
      content: '',
      badge: '',
      author: '',
    },
    so: {
      title: '',
      excerpt: '',
      content: '',
      badge: '',
      author: '',
    },
    ar: {
      title: '',
      excerpt: '',
      content: '',
      badge: '',
      author: '',
    },
  });
  const [image, setImage] = useState('');
  const [emoji, setEmoji] = useState('📰');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  useEffect(() => {
    if (isEditing && articleId) {
      fetchArticle();
    } else {
      setLoading(false);
    }
  }, [articleId, isEditing]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/news/${articleId}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data: NewsArticle = await response.json();
        setFormData({
          en: {
            title: data.title_en || '',
            excerpt: data.excerpt_en || '',
            content: data.content_en || '',
            badge: data.badge_en || '',
            author: data.author_en || '',
          },
          so: {
            title: data.title_so || '',
            excerpt: data.excerpt_so || '',
            content: data.content_so || '',
            badge: data.badge_so || '',
            author: data.author_so || '',
          },
          ar: {
            title: data.title_ar || '',
            excerpt: data.excerpt_ar || '',
            content: data.content_ar || '',
            badge: data.badge_ar || '',
            author: data.author_ar || '',
          },
        });
        setImage(data.image || '');
        setEmoji(data.emoji || '📰');
        setDate(data.date || new Date().toISOString().split('T')[0]);
        setDisplayOrder(data.display_order || 0);
        setActive(data.active !== false);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('file', file);
      formDataObj.append('folder', 'news');

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      if (data.url) {
        setImage(data.url);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        title_en: formData.en.title,
        title_so: formData.so.title || null,
        title_ar: formData.ar.title || null,
        excerpt_en: formData.en.excerpt,
        excerpt_so: formData.so.excerpt || null,
        excerpt_ar: formData.ar.excerpt || null,
        content_en: formData.en.content,
        content_so: formData.so.content || null,
        content_ar: formData.ar.content || null,
        badge_en: formData.en.badge,
        badge_so: formData.so.badge || null,
        badge_ar: formData.ar.badge || null,
        author_en: formData.en.author,
        author_so: formData.so.author || null,
        author_ar: formData.ar.author || null,
        image: image || null,
        emoji: emoji,
        date: date,
        display_order: displayOrder,
        active: active,
      };

      let response;
      if (isEditing) {
        response = await fetch(`/api/admin/news/${articleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/admin/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        await showSuccessAlert(isEditing ? 'News article updated successfully!' : 'News article created successfully!');
        router.push('/dashboard/news/newsletters');
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save news article. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  const currentData = formData[activeLanguage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D] flex items-center gap-3">
            <Newspaper className="w-8 h-8" />
            {isEditing ? 'Edit News Article' : 'Create News Article'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Edit the news article content' : 'Create a new news article post'}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/dashboard/news/newsletters')}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Article'}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Tabs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-bold text-gray-900">Language</h2>
            </div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLanguage(lang.code as Language)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    activeLanguage === lang.code
                      ? 'bg-[#6B9E3E] text-white border-[#6B9E3E]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#6B9E3E]'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Article Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Article Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Publication Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Smile className="w-4 h-4" />
                  Emoji
                </label>
                <input
                  type="text"
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="📰"
                  maxLength={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  {active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  Status
                </label>
                <button
                  onClick={() => setActive(!active)}
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-colors ${
                    active
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  {active ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <input
              type="text"
              value={currentData.title}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, title: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="Enter article title"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <textarea
              rows={3}
              value={currentData.excerpt}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, excerpt: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
              placeholder="Enter article excerpt"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <textarea
              rows={10}
              value={currentData.content}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, content: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none font-mono text-sm"
              placeholder="Enter article content"
            />
          </div>

          {/* Badge */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badge ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <input
              type="text"
              value={currentData.badge}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, badge: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="Enter badge text (e.g., Latest News)"
            />
          </div>

          {/* Author */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Author ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <input
              type="text"
              value={currentData.author}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, author: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="Enter author name"
            />
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Article Image
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black mb-2"
              placeholder="Enter image URL or upload image"
            />
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#6B9E3E] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {uploading && (
              <p className="text-sm text-blue-600 mt-2">Uploading...</p>
            )}
            {uploadError && (
              <p className="text-sm text-red-600 mt-2">{uploadError}</p>
            )}
            {image && !uploading && !uploadError && (
              <div className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={image}
                  src={image}
                  alt="Article preview"
                  className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  onError={() => setUploadError('Failed to load image')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="relative h-40 bg-gray-200">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image}
                    src={image}
                    alt={currentData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {emoji}
                  </div>
                )}
                {currentData.badge && (
                  <div className="absolute top-2 right-2 bg-[#6B9E3E] text-white px-3 py-1 rounded-full text-xs font-medium">
                    {currentData.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {currentData.title || 'Article Title'}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {currentData.excerpt || 'Article excerpt will appear here'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{date}</span>
                  <span>{currentData.author || 'Author'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

