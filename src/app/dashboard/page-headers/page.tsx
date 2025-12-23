'use client';

import { useState, useEffect, useCallback } from 'react';
import { PanelTop, Save, Languages, Edit2, X, Eye, EyeOff } from 'lucide-react';
import { PageHeader } from '@/types/page-header';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert } from '@/lib/swal';

// Map page routes to friendly names
const pageRouteNames: { [key: string]: string } = {
  '/our-farm': 'Our Farm',
  '/news': 'News',
  '/gallery': 'Gallery',
};

// Routes to exclude from the editor
const excludedRoutes = ['/products', '/contact', '/about'];

export default function PageHeadersEditorPage() {
  const [headers, setHeaders] = useState<PageHeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingHeader, setEditingHeader] = useState<PageHeader | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchHeaders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/page-headers?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        // Filter out excluded routes
        const filteredHeaders = (data.headers || []).filter(
          (h: PageHeader) => !excludedRoutes.includes(h.page_route)
        );
        setHeaders(filteredHeaders);
      }
    } catch (error) {
      console.error('Error fetching headers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHeaders();
  }, [fetchHeaders]);

  const handleEdit = (header: PageHeader) => {
    setEditingHeader({ ...header });
  };

  const handleCancelEdit = () => {
    setEditingHeader(null);
  };

  const handleSave = async () => {
    if (!editingHeader) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/page-headers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ header: editingHeader }),
      });

      if (response.ok) {
        await showSuccessAlert('Page header updated successfully!');
        setEditingHeader(null);
        await fetchHeaders();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save page header. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const updateEditingHeader = (field: string, value: string | boolean) => {
    if (!editingHeader) return;
    setEditingHeader({ ...editingHeader, [field]: value });
  };

  const getPageName = (route: string) => {
    return pageRouteNames[route] || route;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D] flex items-center gap-3">
            <PanelTop className="w-8 h-8" />
            Page Headers Editor
          </h1>
          <p className="text-gray-600 mt-1">Manage the header content for each page</p>
        </div>
      </div>

      {/* Edit Form */}
      {editingHeader && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-[#6B9E3E]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Editing: {getPageName(editingHeader.page_route)} Page Header
            </h2>
            <button
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <Languages className="w-5 h-5 text-gray-600" />
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
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Badge Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Text ({languages.find(l => l.code === activeLanguage)?.name})
                </label>
                <input
                  type="text"
                  value={editingHeader[`badge_text_${activeLanguage}` as keyof PageHeader] as string || ''}
                  onChange={(e) => updateEditingHeader(`badge_text_${activeLanguage}`, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="e.g., Our Story"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title ({languages.find(l => l.code === activeLanguage)?.name}) *
                </label>
                <input
                  type="text"
                  value={editingHeader[`title_${activeLanguage}` as keyof PageHeader] as string || ''}
                  onChange={(e) => updateEditingHeader(`title_${activeLanguage}`, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Page title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description ({languages.find(l => l.code === activeLanguage)?.name})
                </label>
                <textarea
                  rows={4}
                  value={editingHeader[`description_${activeLanguage}` as keyof PageHeader] as string || ''}
                  onChange={(e) => updateEditingHeader(`description_${activeLanguage}`, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                  placeholder="Page description"
                />
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Active</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingHeader.active}
                    onChange={(e) => updateEditingHeader('active', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B9E3E]/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                    editingHeader.active 
                      ? 'bg-[#6B9E3E] after:translate-x-full after:border-white' 
                      : 'bg-gray-200'
                  }`}></div>
                </label>
              </div>
            </div>

            {/* Live Preview */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Live Preview</h3>
              <div className="bg-gradient-to-br from-[#E8F5E9] to-white p-6 rounded-xl border-2 border-gray-200">
                {editingHeader[`badge_text_${activeLanguage}` as keyof PageHeader] && (
                  <div className="inline-block bg-[#6B9E3E]/10 text-[#6B9E3E] px-3 py-1 rounded-full text-xs mb-3">
                    {editingHeader[`badge_text_${activeLanguage}` as keyof PageHeader] as string}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-[#2C5F2D] mb-2">
                  {editingHeader[`title_${activeLanguage}` as keyof PageHeader] as string || 'Page Title'}
                </h2>
                <p className="text-sm text-gray-600">
                  {editingHeader[`description_${activeLanguage}` as keyof PageHeader] as string || 'Page description will appear here...'}
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 border-2 border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Headers List */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">All Page Headers</h2>
          <p className="text-sm text-gray-600">Click edit to modify a page header</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
              <p className="text-gray-600">Loading page headers...</p>
            </div>
          </div>
        ) : headers.length === 0 ? (
          <div className="text-center py-12">
            <PanelTop className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No page headers found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {headers.map((header) => (
              <div
                key={header.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {getPageName(header.page_route)}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {header.page_route}
                      </span>
                      {header.active ? (
                        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          <Eye className="w-3 h-3" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          <EyeOff className="w-3 h-3" />
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Title:</strong> {header.title_en}
                    </p>
                    {header.description_en && (
                      <p className="text-sm text-gray-500 line-clamp-1">
                        <strong>Description:</strong> {header.description_en}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleEdit(header)}
                    disabled={editingHeader !== null}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

