'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Languages, Heart, Plus, Trash2, ArrowUp, ArrowDown, Globe, Leaf, Users } from 'lucide-react';
import { SocialImpactCard, EnvironmentalCommitment } from '@/types/our-farm';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface CardFormItem {
  id: number | null;
  icon_type: string;
  emoji: string;
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  color_class: string;
  display_order: number;
  active: boolean;
}

const iconOptions = [
  { value: 'community', label: 'Community 👥', icon: Users },
  { value: 'leaf', label: 'Leaf 🌿', icon: Leaf },
  { value: 'heart', label: 'Heart 💚', icon: Heart },
  { value: 'globe', label: 'Globe 🌍', icon: Globe },
];

const colorPresets = [
  { value: 'bg-blue-100 text-blue-600', label: 'Blue', bgPreview: 'bg-blue-100' },
  { value: 'bg-green-100 text-green-600', label: 'Green', bgPreview: 'bg-green-100' },
  { value: 'bg-pink-100 text-pink-600', label: 'Pink', bgPreview: 'bg-pink-100' },
  { value: 'bg-purple-100 text-purple-600', label: 'Purple', bgPreview: 'bg-purple-100' },
  { value: 'bg-orange-100 text-orange-600', label: 'Orange', bgPreview: 'bg-orange-100' },
  { value: 'bg-yellow-100 text-yellow-600', label: 'Yellow', bgPreview: 'bg-yellow-100' },
];

const commonEmojis = ['🤝', '🌿', '💚', '🌍', '👥', '🌱', '❤️', '🏆', '⭐', '🎯', '💡', '🌳'];

export default function SocialImpactEditorPage() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [header, setHeader] = useState<{
    id: number | null;
    title_en: string;
    title_so: string;
    title_ar: string;
    description_en: string;
    description_so: string;
    description_ar: string;
    active: boolean;
  }>({
    id: null,
    title_en: '',
    title_so: '',
    title_ar: '',
    description_en: '',
    description_so: '',
    description_ar: '',
    active: true,
  });

  const [cards, setCards] = useState<CardFormItem[]>([]);

  const [commitment, setCommitment] = useState<{
    id: number | null;
    emoji: string;
    title_en: string;
    title_so: string;
    title_ar: string;
    description_en: string;
    description_so: string;
    description_ar: string;
    active: boolean;
  }>({
    id: null,
    emoji: '🌍',
    title_en: '',
    title_so: '',
    title_ar: '',
    description_en: '',
    description_so: '',
    description_ar: '',
    active: true,
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/social-impact?t=${Date.now()}`, {
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
            active: data.header.active !== false,
          });
        }

        if (data.cards && Array.isArray(data.cards)) {
          setCards(data.cards.map((c: SocialImpactCard) => ({
            id: c.id,
            icon_type: c.icon_type ?? 'community',
            emoji: c.emoji ?? '🤝',
            title_en: c.title_en ?? '',
            title_so: c.title_so ?? '',
            title_ar: c.title_ar ?? '',
            description_en: c.description_en ?? '',
            description_so: c.description_so ?? '',
            description_ar: c.description_ar ?? '',
            color_class: c.color_class ?? 'bg-blue-100 text-blue-600',
            display_order: c.display_order,
            active: c.active !== false,
          })));
        }

        if (data.commitment) {
          setCommitment({
            id: data.commitment.id,
            emoji: data.commitment.emoji ?? '🌍',
            title_en: data.commitment.title_en ?? '',
            title_so: data.commitment.title_so ?? '',
            title_ar: data.commitment.title_ar ?? '',
            description_en: data.commitment.description_en ?? '',
            description_so: data.commitment.description_so ?? '',
            description_ar: data.commitment.description_ar ?? '',
            active: data.commitment.active !== false,
          });
        }
      } else {
        console.error('Failed to fetch social impact data:', response.status);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/social-impact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ header, cards, commitment }),
      });

      if (response.ok) {
        await showSuccessAlert('Social Impact section saved successfully!');
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

  // Card management
  const addCard = () => {
    const maxOrder = cards.reduce((max, c) => Math.max(max, c.display_order), 0);
    setCards([...cards, {
      id: null,
      icon_type: 'community',
      emoji: '🤝',
      title_en: '',
      title_so: '',
      title_ar: '',
      description_en: '',
      description_so: '',
      description_ar: '',
      color_class: 'bg-blue-100 text-blue-600',
      display_order: maxOrder + 1,
      active: true,
    }]);
  };

  const removeCard = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this impact card?');
    if (confirmed) {
      setCards(cards.filter((_, i) => i !== index));
    }
  };

  const updateCard = (index: number, field: string, value: string | number | boolean) => {
    setCards(cards.map((c, i) => i === index ? { ...c, [field]: value } : c));
  };

  const moveCard = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const newCards = [...cards];
    const temp = newCards[index].display_order;
    newCards[index].display_order = newCards[newIndex].display_order;
    newCards[newIndex].display_order = temp;
    [newCards[index], newCards[newIndex]] = [newCards[newIndex], newCards[index]];
    setCards(newCards);
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
            <Heart className="w-8 h-8" />
            Social Impact Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the Social & Environmental Impact section on the Our Farm page</p>
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
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={header[`title_${currentLang}` as keyof typeof header] as string}
              onChange={(e) => setHeader({ ...header, [`title_${currentLang}`]: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="e.g., Our Impact 💚"
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
      </div>

      {/* Impact Cards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Impact Cards</h2>
          <button
            onClick={addCard}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>

        <div className="space-y-4">
          {cards.map((card, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{card.emoji}</span>
                  <span className="font-medium text-gray-700">Card {index + 1}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveCard(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveCard(index, 'down')}
                    disabled={index === cards.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeCard(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icon</label>
                  <select
                    value={card.icon_type}
                    onChange={(e) => updateCard(index, 'icon_type', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
                  <div className="flex gap-1 flex-wrap">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => updateCard(index, 'color_class', preset.value)}
                        className={`w-8 h-8 rounded ${preset.bgPreview} ${
                          card.color_class === preset.value ? 'ring-2 ring-[#6B9E3E] ring-offset-1' : ''
                        }`}
                        title={preset.label}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Emoji</label>
                  <div className="flex flex-wrap gap-1">
                    {commonEmojis.slice(0, 6).map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => updateCard(index, 'emoji', emoji)}
                        className={`text-lg p-1 rounded ${card.emoji === emoji ? 'bg-[#6B9E3E]/20 ring-2 ring-[#6B9E3E]' : 'hover:bg-gray-100'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input
                    type="text"
                    value={card[`title_${currentLang}` as keyof CardFormItem] as string}
                    onChange={(e) => updateCard(index, `title_${currentLang}`, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                    placeholder="Card title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={card[`description_${currentLang}` as keyof CardFormItem] as string}
                    onChange={(e) => updateCard(index, `description_${currentLang}`, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm resize-none"
                    placeholder="Card description"
                  />
                </div>
              </div>
            </div>
          ))}

          {cards.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No impact cards added yet. Click &quot;Add Card&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Environmental Commitment */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Environmental Commitment Banner</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emoji</label>
            <div className="flex flex-wrap gap-2">
              {commonEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setCommitment({ ...commitment, emoji })}
                  className={`text-2xl p-2 rounded ${commitment.emoji === emoji ? 'bg-[#6B9E3E]/20 ring-2 ring-[#6B9E3E]' : 'hover:bg-gray-100'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={commitment[`title_${currentLang}` as keyof typeof commitment] as string}
              onChange={(e) => setCommitment({ ...commitment, [`title_${currentLang}`]: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="e.g., Environmental Commitment"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={4}
              value={commitment[`description_${currentLang}` as keyof typeof commitment] as string}
              onChange={(e) => setCommitment({ ...commitment, [`description_${currentLang}`]: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
              placeholder="Commitment description"
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
        <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
          {/* Header Preview */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-[#2C5F2D] mb-2">
              {header[`title_${currentLang}` as keyof typeof header] as string || 'Section Title'}
            </h3>
            <p className="text-sm text-gray-600">
              {header[`description_${currentLang}` as keyof typeof header] as string || 'Section description'}
            </p>
          </div>

          {/* Cards Preview */}
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {cards.map((card, index) => {
              const IconComponent = iconOptions.find(o => o.value === card.icon_type)?.icon || Users;
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg shadow border border-gray-100">
                  <div className="flex gap-3 items-start">
                    <div className={`${card.color_class} p-2 rounded-lg`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <h4 className="text-sm font-medium text-[#2C5F2D]">
                          {card[`title_${currentLang}` as keyof CardFormItem] as string || 'Card Title'}
                        </h4>
                        <span>{card.emoji}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {card[`description_${currentLang}` as keyof CardFormItem] as string || 'Description'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Commitment Preview */}
          <div className="bg-gradient-to-br from-[#6B9E3E] to-[#8BC34A] p-6 rounded-xl text-white text-center">
            <div className="text-2xl mb-2">{commitment.emoji}</div>
            <h4 className="text-lg font-medium mb-2">
              {commitment[`title_${currentLang}` as keyof typeof commitment] as string || 'Commitment Title'}
            </h4>
            <p className="text-sm text-green-100">
              {commitment[`description_${currentLang}` as keyof typeof commitment] as string || 'Commitment description'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


