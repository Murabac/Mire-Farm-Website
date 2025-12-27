'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Languages, Leaf, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { ProduceTypesHeader, ProduceItem } from '@/types/our-farm';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface ProduceItemForm {
  id: number | null;
  name_en: string;
  name_so: string;
  name_ar: string;
  emoji: string;
  display_order: number;
  active: boolean;
}

const commonEmojis = ['🍅', '🌶️', '🥒', '🥬', '🥕', '🫑', '🍊', '🥔', '🍈', '🌿', '🧅', '🍇', '🍋', '🥭', '🍌', '🥦', '🌽', '🍆'];

export default function ProduceTypesEditorPage() {
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
    footer_badge_text_en: string;
    footer_badge_text_so: string;
    footer_badge_text_ar: string;
    active: boolean;
  }>({
    id: null,
    title_en: 'What We Grow 🌱',
    title_so: 'Waxa Aan Korinayno 🌱',
    title_ar: 'ما نزرعه 🌱',
    description_en: 'We cultivate a wide variety of organic fruits and vegetables throughout the year.',
    description_so: 'Waxaynu korinaynaa noocyo badan oo khudaar iyo mirooyin dabiici ah sanadka oo dhan.',
    description_ar: 'نزرع مجموعة متنوعة من الفواكه والخضروات العضوية على مدار السنة.',
    footer_badge_text_en: '✨ All produce is grown using natural, pesticide-free methods',
    footer_badge_text_so: '✨ Dhammaan khudaarta waxaa la koriyey iyadoo la adeegsanayo hababka dabiiciga ah',
    footer_badge_text_ar: '✨ جميع المنتجات تزرع باستخدام طرق طبيعية خالية من المبيدات',
    active: true,
  });

  const [items, setItems] = useState<ProduceItemForm[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/produce-types?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.header) {
          setHeader({
            id: data.header.id,
            title_en: data.header.title_en || '',
            title_so: data.header.title_so || '',
            title_ar: data.header.title_ar || '',
            description_en: data.header.description_en || '',
            description_so: data.header.description_so || '',
            description_ar: data.header.description_ar || '',
            footer_badge_text_en: data.header.footer_badge_text_en || '',
            footer_badge_text_so: data.header.footer_badge_text_so || '',
            footer_badge_text_ar: data.header.footer_badge_text_ar || '',
            active: data.header.active !== false,
          });
        }

        if (data.items && data.items.length > 0) {
          setItems(data.items.map((item: ProduceItem) => ({
            id: item.id,
            name_en: item.name_en || '',
            name_so: item.name_so || '',
            name_ar: item.name_ar || '',
            emoji: item.emoji || '🌱',
            display_order: item.display_order,
            active: item.active !== false,
          })));
        }
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
      const response = await fetch('/api/admin/produce-types', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ header, items }),
      });

      if (response.ok) {
        await showSuccessAlert('Produce Types section saved successfully!');
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

  const addItem = () => {
    const maxOrder = items.reduce((max, item) => Math.max(max, item.display_order), 0);
    setItems([...items, {
      id: null,
      name_en: '',
      name_so: '',
      name_ar: '',
      emoji: '🌱',
      display_order: maxOrder + 1,
      active: true,
    }]);
  };

  const removeItem = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this produce item?');
    if (confirmed) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: string, value: string | number | boolean) => {
    setItems(items.map((item, i) => i === index ? { ...item, [field]: value } : item));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index].display_order;
    newItems[index].display_order = newItems[newIndex].display_order;
    newItems[newIndex].display_order = temp;
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
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
            <Leaf className="w-8 h-8" />
            Produce Types Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the Produce Types section on the Our Farm page</p>
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
              placeholder="e.g., What We Grow 🌱"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Footer Badge Text</label>
            <input
              type="text"
              value={header[`footer_badge_text_${currentLang}` as keyof typeof header] as string}
              onChange={(e) => setHeader({ ...header, [`footer_badge_text_${currentLang}`]: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="e.g., ✨ All produce is grown using natural methods"
            />
          </div>
        </div>
      </div>

      {/* Produce Items */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Produce Items</h2>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(index)}
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
                        onClick={() => updateItem(index, 'emoji', emoji)}
                        className={`text-xl p-1 rounded ${item.emoji === emoji ? 'bg-[#6B9E3E]/20 ring-2 ring-[#6B9E3E]' : 'hover:bg-gray-100'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={item.emoji}
                    onChange={(e) => updateItem(index, 'emoji', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                    placeholder="Or type custom emoji"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={item[`name_${currentLang}` as keyof ProduceItemForm] as string}
                    onChange={(e) => updateItem(index, `name_${currentLang}`, e.target.value)}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black text-sm"
                    placeholder="Produce name"
                  />
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No produce items added yet. Click &quot;Add Item&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
        <div className="bg-gradient-to-b from-[#E8F5E9] to-white p-6 rounded-xl border-2 border-gray-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#2C5F2D] mb-2">
              {header[`title_${currentLang}` as keyof typeof header] as string || 'Section Title'}
            </h3>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              {header[`description_${currentLang}` as keyof typeof header] as string || 'Section description'}
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {items.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg text-center shadow-sm border-2 border-transparent hover:border-[#6B9E3E]">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <p className="text-xs text-gray-700 font-medium">
                  {item[`name_${currentLang}` as keyof ProduceItemForm] as string || 'Name'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="inline-block bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-4 py-2 rounded-full text-xs font-medium">
              {header[`footer_badge_text_${currentLang}` as keyof typeof header] as string || 'Footer badge text'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


