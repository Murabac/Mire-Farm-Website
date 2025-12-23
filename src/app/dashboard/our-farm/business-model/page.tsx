'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Languages, Upload, Briefcase, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { BusinessModel, BusinessModelFeature } from '@/types/our-farm';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface FeatureFormItem {
  id: number | null;
  icon_type: string;
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  bg_color_class: string;
  border_color_class: string;
  icon_bg_color: string;
  display_order: number;
  active: boolean;
}

const iconOptions = [
  { value: 'map_pin', label: 'Map Pin 📍' },
  { value: 'trending_up', label: 'Trending Up 📈' },
];

const colorPresets = [
  { bg: 'from-green-50 to-blue-50', border: 'border-green-100', icon: 'bg-[#6B9E3E]', label: 'Green' },
  { bg: 'from-purple-50 to-pink-50', border: 'border-purple-100', icon: 'bg-purple-600', label: 'Purple' },
  { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-100', icon: 'bg-blue-600', label: 'Blue' },
  { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-100', icon: 'bg-orange-600', label: 'Orange' },
];

export default function BusinessModelEditorPage() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [businessModel, setBusinessModel] = useState<{
    id: number | null;
    badge_text_en: string;
    badge_text_so: string;
    badge_text_ar: string;
    title_en: string;
    title_so: string;
    title_ar: string;
    description_en: string;
    description_so: string;
    description_ar: string;
    image_url: string;
    active: boolean;
  }>({
    id: null,
    badge_text_en: '',
    badge_text_so: '',
    badge_text_ar: '',
    title_en: '',
    title_so: '',
    title_ar: '',
    description_en: '',
    description_so: '',
    description_ar: '',
    image_url: '',
    active: true,
  });

  const [features, setFeatures] = useState<FeatureFormItem[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/business-model?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Always update state with fetched data (or reset to empty if no data)
        if (data.businessModel) {
          setBusinessModel({
            id: data.businessModel.id,
            badge_text_en: data.businessModel.badge_text_en ?? '',
            badge_text_so: data.businessModel.badge_text_so ?? '',
            badge_text_ar: data.businessModel.badge_text_ar ?? '',
            title_en: data.businessModel.title_en ?? '',
            title_so: data.businessModel.title_so ?? '',
            title_ar: data.businessModel.title_ar ?? '',
            description_en: data.businessModel.description_en ?? '',
            description_so: data.businessModel.description_so ?? '',
            description_ar: data.businessModel.description_ar ?? '',
            image_url: data.businessModel.image_url ?? '/images/our-farm-hero.jpg',
            active: data.businessModel.active !== false,
          });
        }

        // Update features from database
        if (data.features && Array.isArray(data.features)) {
          setFeatures(data.features.map((f: BusinessModelFeature) => ({
            id: f.id,
            icon_type: f.icon_type ?? 'map_pin',
            title_en: f.title_en ?? '',
            title_so: f.title_so ?? '',
            title_ar: f.title_ar ?? '',
            description_en: f.description_en ?? '',
            description_so: f.description_so ?? '',
            description_ar: f.description_ar ?? '',
            bg_color_class: f.bg_color_class ?? 'from-green-50 to-blue-50',
            border_color_class: f.border_color_class ?? 'border-green-100',
            icon_bg_color: f.icon_bg_color ?? 'bg-[#6B9E3E]',
            display_order: f.display_order,
            active: f.active !== false,
          })));
        }
      } else {
        console.error('Failed to fetch business model data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'our-farm');

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      if (data.url) {
        setBusinessModel(prev => ({ ...prev, image_url: data.url }));
        setUploadError(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
      const response = await fetch('/api/admin/business-model', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ businessModel, features }),
      });

      if (response.ok) {
        await showSuccessAlert('Business Model section saved successfully!');
        await fetchData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    const maxOrder = features.reduce((max, f) => Math.max(max, f.display_order), 0);
    setFeatures([...features, {
      id: null,
      icon_type: 'map_pin',
      title_en: '',
      title_so: '',
      title_ar: '',
      description_en: '',
      description_so: '',
      description_ar: '',
      bg_color_class: 'from-green-50 to-blue-50',
      border_color_class: 'border-green-100',
      icon_bg_color: 'bg-[#6B9E3E]',
      display_order: maxOrder + 1,
      active: true,
    }]);
  };

  const removeFeature = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this feature?');
    if (confirmed) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (index: number, field: string, value: string | number | boolean) => {
    setFeatures(features.map((f, i) => i === index ? { ...f, [field]: value } : f));
  };

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= features.length) return;

    const newFeatures = [...features];
    const temp = newFeatures[index].display_order;
    newFeatures[index].display_order = newFeatures[newIndex].display_order;
    newFeatures[newIndex].display_order = temp;
    [newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]];
    setFeatures(newFeatures);
  };

  const applyColorPreset = (index: number, preset: typeof colorPresets[0]) => {
    updateFeature(index, 'bg_color_class', preset.bg);
    updateFeature(index, 'border_color_class', preset.border);
    updateFeature(index, 'icon_bg_color', preset.icon);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const currentLang = activeLanguage;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D] flex items-center gap-3">
            <Briefcase className="w-8 h-8" />
            Business Model Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the Business Model section on the Our Farm page</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

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

      {/* Main Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Section Header</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Badge Text</label>
              <input
                type="text"
                value={businessModel[`badge_text_${currentLang}` as keyof typeof businessModel] as string}
                onChange={(e) => setBusinessModel({ ...businessModel, [`badge_text_${currentLang}`]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="e.g., 💼 Our Business Model"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={businessModel[`title_${currentLang}` as keyof typeof businessModel] as string}
                onChange={(e) => setBusinessModel({ ...businessModel, [`title_${currentLang}`]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={businessModel[`description_${currentLang}` as keyof typeof businessModel] as string}
                onChange={(e) => setBusinessModel({ ...businessModel, [`description_${currentLang}`]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                placeholder="Section description"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
            {businessModel.image_url && (
              <div className="mb-4 relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={businessModel.image_url}
                  src={businessModel.image_url}
                  alt="Business Model"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <label className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#6B9E3E] transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload new image</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
            {uploadError && <p className="text-sm text-red-600 mt-2">{uploadError}</p>}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Features</h2>
          <button
            onClick={addFeature}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-700">Feature {index + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveFeature(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFeature(index, 'down')}
                    disabled={index === features.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFeature(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <select
                    value={feature.icon_type}
                    onChange={(e) => updateFeature(index, 'icon_type', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Preset</label>
                  <div className="flex gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => applyColorPreset(index, preset)}
                        className={`px-3 py-1 text-xs rounded border-2 ${
                          feature.bg_color_class === preset.bg
                            ? 'border-[#6B9E3E] bg-[#6B9E3E]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={feature[`title_${currentLang}` as keyof FeatureFormItem] as string}
                    onChange={(e) => updateFeature(index, `title_${currentLang}`, e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={2}
                    value={feature[`description_${currentLang}` as keyof FeatureFormItem] as string}
                    onChange={(e) => updateFeature(index, `description_${currentLang}`, e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                    placeholder="Feature description"
                  />
                </div>
              </div>
            </div>
          ))}

          {features.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No features added yet. Click &quot;Add Feature&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
        <div className="bg-gradient-to-br from-[#E8F5E9] to-white p-6 rounded-xl border-2 border-gray-200">
          <div className="inline-block bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-3 py-1 rounded-full text-sm mb-3">
            {businessModel[`badge_text_${currentLang}` as keyof typeof businessModel] as string || 'Badge Text'}
          </div>
          <h3 className="text-xl font-bold text-[#2C5F2D] mb-2">
            {businessModel[`title_${currentLang}` as keyof typeof businessModel] as string || 'Title'}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {businessModel[`description_${currentLang}` as keyof typeof businessModel] as string || 'Description'}
          </p>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className={`bg-gradient-to-br ${feature.bg_color_class} p-3 rounded-lg border ${feature.border_color_class}`}>
                <div className="flex items-start gap-2">
                  <div className={`${feature.icon_bg_color} text-white p-1.5 rounded-full flex-shrink-0`}>
                    <span className="text-xs">🔹</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#2C5F2D]">
                      {feature[`title_${currentLang}` as keyof FeatureFormItem] as string || 'Feature Title'}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {feature[`description_${currentLang}` as keyof FeatureFormItem] as string || 'Feature description'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

