'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Languages, Upload, Rocket, Plus, Trash2, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { GrowthExpansionPlan, GrowthExpansionStat } from '@/types/our-farm';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface PlanFormItem {
  id: number | null;
  emoji: string;
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  display_order: number;
  active: boolean;
}

interface StatFormItem {
  id: number | null;
  number: string;
  label_en: string;
  label_so: string;
  label_ar: string;
  display_order: number;
  active: boolean;
}

const commonEmojis = ['🌍', '👨‍🌾', '🏗️', '🌿', '🚀', '📈', '🎯', '💡', '🤝', '🌱', '🏆', '⭐'];

export default function GrowthExpansionEditorPage() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [header, setHeader] = useState<{
    id: number | null;
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
    title_en: '',
    title_so: '',
    title_ar: '',
    description_en: '',
    description_so: '',
    description_ar: '',
    image_url: '',
    active: true,
  });

  const [plans, setPlans] = useState<PlanFormItem[]>([]);
  const [stats, setStats] = useState<StatFormItem[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/growth-expansion?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.header) {
          setHeader({
            id: data.header.id,
            title_en: data.header.title_en ?? '',
            title_so: data.header.title_so ?? '',
            title_ar: data.header.title_ar ?? '',
            description_en: data.header.description_en ?? '',
            description_so: data.header.description_so ?? '',
            description_ar: data.header.description_ar ?? '',
            image_url: data.header.image_url ?? '',
            active: data.header.active !== false,
          });
        }

        if (data.plans && Array.isArray(data.plans)) {
          setPlans(data.plans.map((p: GrowthExpansionPlan) => ({
            id: p.id,
            emoji: p.emoji ?? '🌍',
            title_en: p.title_en ?? '',
            title_so: p.title_so ?? '',
            title_ar: p.title_ar ?? '',
            description_en: p.description_en ?? '',
            description_so: p.description_so ?? '',
            description_ar: p.description_ar ?? '',
            display_order: p.display_order,
            active: p.active !== false,
          })));
        }

        if (data.stats && Array.isArray(data.stats)) {
          setStats(data.stats.map((s: GrowthExpansionStat) => ({
            id: s.id,
            number: s.number ?? '',
            label_en: s.label_en ?? '',
            label_so: s.label_so ?? '',
            label_ar: s.label_ar ?? '',
            display_order: s.display_order,
            active: s.active !== false,
          })));
        }
      } else {
        console.error('Failed to fetch growth expansion data:', response.status);
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
        setHeader(prev => ({ ...prev, image_url: data.url }));
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
      const response = await fetch('/api/admin/growth-expansion', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ header, plans, stats }),
      });

      if (response.ok) {
        await showSuccessAlert('Growth & Expansion section saved successfully!');
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

  // Plan management
  const addPlan = () => {
    const maxOrder = plans.reduce((max, p) => Math.max(max, p.display_order), 0);
    setPlans([...plans, {
      id: null,
      emoji: '🌍',
      title_en: '',
      title_so: '',
      title_ar: '',
      description_en: '',
      description_so: '',
      description_ar: '',
      display_order: maxOrder + 1,
      active: true,
    }]);
  };

  const removePlan = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this expansion plan?');
    if (confirmed) {
      setPlans(plans.filter((_, i) => i !== index));
    }
  };

  const updatePlan = (index: number, field: string, value: string | number | boolean) => {
    setPlans(plans.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const movePlan = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= plans.length) return;

    const newPlans = [...plans];
    const temp = newPlans[index].display_order;
    newPlans[index].display_order = newPlans[newIndex].display_order;
    newPlans[newIndex].display_order = temp;
    [newPlans[index], newPlans[newIndex]] = [newPlans[newIndex], newPlans[index]];
    setPlans(newPlans);
  };

  // Stat management
  const addStat = () => {
    const maxOrder = stats.reduce((max, s) => Math.max(max, s.display_order), 0);
    setStats([...stats, {
      id: null,
      number: '',
      label_en: '',
      label_so: '',
      label_ar: '',
      display_order: maxOrder + 1,
      active: true,
    }]);
  };

  const removeStat = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this stat?');
    if (confirmed) {
      setStats(stats.filter((_, i) => i !== index));
    }
  };

  const updateStat = (index: number, field: string, value: string | number | boolean) => {
    setStats(stats.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const moveStat = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stats.length) return;

    const newStats = [...stats];
    const temp = newStats[index].display_order;
    newStats[index].display_order = newStats[newIndex].display_order;
    newStats[newIndex].display_order = temp;
    [newStats[index], newStats[newIndex]] = [newStats[newIndex], newStats[index]];
    setStats(newStats);
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
            <Rocket className="w-8 h-8" />
            Growth & Expansion Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the Growth & Expansion section on the Our Farm page</p>
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

      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Section Header</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={header[`title_${currentLang}` as keyof typeof header] as string}
                onChange={(e) => setHeader({ ...header, [`title_${currentLang}`]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="e.g., Growth & Expansion Plans 🚀"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={header[`description_${currentLang}` as keyof typeof header] as string}
                onChange={(e) => setHeader({ ...header, [`description_${currentLang}`]: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                placeholder="Section description"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
            {header.image_url && (
              <div className="mb-4 relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={header.image_url}
                  src={header.image_url}
                  alt="Growth Expansion"
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

      {/* Expansion Plans */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Expansion Plans</h2>
          <button
            onClick={addPlan}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Plan
          </button>
        </div>

        <div className="space-y-4">
          {plans.map((plan, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{plan.emoji}</span>
                  <span className="font-medium text-gray-700">Plan {index + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => movePlan(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => movePlan(index, 'down')}
                    disabled={index === plans.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removePlan(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Emoji</label>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {commonEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => updatePlan(index, 'emoji', emoji)}
                        className={`text-xl p-1 rounded ${plan.emoji === emoji ? 'bg-[#6B9E3E]/20 ring-2 ring-[#6B9E3E]' : 'hover:bg-gray-100'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={plan[`title_${currentLang}` as keyof PlanFormItem] as string}
                      onChange={(e) => updatePlan(index, `title_${currentLang}`, e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                      placeholder="Plan title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={plan[`description_${currentLang}` as keyof PlanFormItem] as string}
                      onChange={(e) => updatePlan(index, `description_${currentLang}`, e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm resize-none"
                      placeholder="Plan description"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {plans.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No expansion plans added yet. Click &quot;Add Plan&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">Statistics</h2>
          </div>
          <button
            onClick={addStat}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Stat
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700 text-sm">Stat {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveStat(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveStat(index, 'down')}
                    disabled={index === stats.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeStat(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Number</label>
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => updateStat(index, 'number', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                    placeholder="e.g., 100+"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Label</label>
                  <input
                    type="text"
                    value={stat[`label_${currentLang}` as keyof StatFormItem] as string}
                    onChange={(e) => updateStat(index, `label_${currentLang}`, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                    placeholder="e.g., Farmers Trained"
                  />
                </div>
              </div>
            </div>
          ))}

          {stats.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No statistics added yet. Click &quot;Add Stat&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
        <div className="bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white p-6 rounded-xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">
              {header[`title_${currentLang}` as keyof typeof header] as string || 'Section Title'}
            </h3>
            <p className="text-sm text-green-100">
              {header[`description_${currentLang}` as keyof typeof header] as string || 'Section description'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Image placeholder */}
            <div className="bg-white/10 rounded-lg h-32 flex items-center justify-center">
              {header.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={header.image_url}
                  src={header.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-white/50 text-sm">Image Preview</span>
              )}
            </div>

            {/* Plans preview */}
            <div className="space-y-2">
              {plans.slice(0, 3).map((plan, index) => (
                <div key={index} className="bg-white/10 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{plan.emoji}</span>
                    <div>
                      <h4 className="text-sm font-medium">
                        {plan[`title_${currentLang}` as keyof PlanFormItem] as string || 'Plan Title'}
                      </h4>
                      <p className="text-xs text-green-100 line-clamp-1">
                        {plan[`description_${currentLang}` as keyof PlanFormItem] as string || 'Description'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {plans.length > 3 && (
                <p className="text-xs text-white/60 text-center">+{plans.length - 3} more plans</p>
              )}
            </div>
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 p-3 rounded-lg text-center">
                <div className="text-xl font-bold">{stat.number || '0'}</div>
                <div className="text-xs text-green-100">
                  {stat[`label_${currentLang}` as keyof StatFormItem] as string || 'Label'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

