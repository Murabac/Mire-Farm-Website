'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Languages, Package, Upload, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { ProductsOverviewSectionHeader, ProductsOverviewCard } from '@/types/products-overview';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert } from '@/lib/swal';

interface ProductsOverviewFormData {
  en: {
    title: string;
    description: string;
    buttonText: string;
    badgeText: string;
  };
  so: {
    title: string;
    description: string;
    buttonText: string;
    badgeText: string;
  };
  ar: {
    title: string;
    description: string;
    buttonText: string;
    badgeText: string;
  };
}

interface CardFormItem {
  id: number | null;
  name_en: string;
  name_so: string;
  name_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  image: string;
  display_order: number;
}

export function ProductsOverviewEditor() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProductsOverviewFormData>({
    en: {
      title: 'Our Fresh Produce',
      description: 'We cultivate a diverse range of organic fruits and vegetables, all grown with care and without the use of harmful pesticides or chemicals.',
      buttonText: 'View All Products',
      badgeText: '100% Organic',
    },
    so: {
      title: 'Khudaarta iyo Mirooyinkayaga Cusub',
      description: 'Waxaynu korinaynaa noocyo badan oo khudaar iyo mirooyin dabiici ah, dhammaan waxay la koriyey si xirfad leh oo aan la adeegsanayn dhirta ama kiimikada wanaagsan.',
      buttonText: 'Eeg Dhammaan Alaabta',
      badgeText: '100% Dabiici',
    },
    ar: {
      title: 'منتجاتنا الطازجة',
      description: 'نزرع مجموعة متنوعة من الفواكه والخضروات العضوية، كلها مزروعة بعناية وبدون استخدام مبيدات أو مواد كيميائية ضارة.',
      buttonText: 'عرض جميع المنتجات',
      badgeText: '100% عضوي',
    },
  });
  const [cards, setCards] = useState<CardFormItem[]>([]);
  const [uploading, setUploading] = useState<{ [key: number]: boolean }>({});
  const [uploadError, setUploadError] = useState<{ [key: number]: string | null }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`/api/admin/products-overview?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.header) {
          setFormData({
            en: {
              title: data.header.title_en || '',
              description: data.header.description_en || '',
              buttonText: data.header.button_text_en || '',
              badgeText: data.header.badge_text_en || '',
            },
            so: {
              title: data.header.title_so || '',
              description: data.header.description_so || '',
              buttonText: data.header.button_text_so || '',
              badgeText: data.header.badge_text_so || '',
            },
            ar: {
              title: data.header.title_ar || '',
              description: data.header.description_ar || '',
              buttonText: data.header.button_text_ar || '',
              badgeText: data.header.badge_text_ar || '',
            },
          });
        }

        if (data.cards && Array.isArray(data.cards)) {
          const formCards = data.cards.map((card: ProductsOverviewCard) => ({
            id: card.id,
            name_en: card.name_en || '',
            name_so: card.name_so || '',
            name_ar: card.name_ar || '',
            description_en: card.description_en || '',
            description_so: card.description_so || '',
            description_ar: card.description_ar || '',
            image: card.image || '',
            display_order: card.display_order,
          })).sort((a, b) => a.display_order - b.display_order);
          
          // Ensure we have exactly 2 cards
          while (formCards.length < 2) {
            formCards.push({
              id: null,
              name_en: '',
              name_so: '',
              name_ar: '',
              description_en: '',
              description_so: '',
              description_ar: '',
              image: '',
              display_order: formCards.length + 1,
            });
          }
          setCards(formCards.slice(0, 2));
        } else {
          // Initialize with empty cards if none exist
          setCards([
            {
              id: null,
              name_en: '',
              name_so: '',
              name_ar: '',
              description_en: '',
              description_so: '',
              description_ar: '',
              image: '',
              display_order: 1,
            },
            {
              id: null,
              name_en: '',
              name_so: '',
              name_ar: '',
              description_en: '',
              description_so: '',
              description_ar: '',
              image: '',
              display_order: 2,
            },
          ]);
        }
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (cardIndex: number, file: File) => {
    setUploading({ ...uploading, [cardIndex]: true });
    setUploadError({ ...uploadError, [cardIndex]: null });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'products-overview');

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
        const newCards = [...cards];
        newCards[cardIndex].image = data.url;
        setCards(newCards);
        // Clear upload error on success
        setUploadError({ ...uploadError, [cardIndex]: null });
        // Reset file input
        if (fileInputRefs.current[cardIndex]) {
          fileInputRefs.current[cardIndex]!.value = '';
        }
      } else {
        throw new Error('No URL returned from upload');
      }
    } catch (error) {
      setUploadError({ ...uploadError, [cardIndex]: error instanceof Error ? error.message : 'Failed to upload image' });
    } finally {
      setUploading({ ...uploading, [cardIndex]: false });
    }
  };

  const handleCardChange = (index: number, field: keyof CardFormItem, value: string | number) => {
    const newCards = [...cards];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setCards(newCards);
  };

  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === cards.length - 1) return;

    const newCards = [...cards];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newCards[index], newCards[targetIndex]] = [newCards[targetIndex], newCards[index]];
    
    // Update display orders
    const reordered = newCards.map((card, i) => ({
      ...card,
      display_order: i + 1,
    }));
    
    setCards(reordered);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const headerPayload = {
        title_en: formData.en.title,
        title_so: formData.so.title || null,
        title_ar: formData.ar.title || null,
        description_en: formData.en.description,
        description_so: formData.so.description || null,
        description_ar: formData.ar.description || null,
        button_text_en: formData.en.buttonText,
        button_text_so: formData.so.buttonText || null,
        button_text_ar: formData.ar.buttonText || null,
        badge_text_en: formData.en.badgeText,
        badge_text_so: formData.so.badgeText || null,
        badge_text_ar: formData.ar.badgeText || null,
      };

      const cardsPayload = cards.map((card) => ({
        id: card.id,
        name_en: card.name_en,
        name_so: card.name_so || null,
        name_ar: card.name_ar || null,
        description_en: card.description_en,
        description_so: card.description_so || null,
        description_ar: card.description_ar || null,
        image: card.image || null,
        display_order: card.display_order,
      }));

      const response = await fetch('/api/admin/products-overview', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ header: headerPayload, cards: cardsPayload }),
      });

      if (response.ok) {
        await showSuccessAlert('Products overview section saved successfully!');
        // Force reload by setting loading and fetching fresh data
        setLoading(true);
        await fetchData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save products overview section. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading products overview data...</p>
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
            <Package className="w-8 h-8" />
            Products Overview Section Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the products overview section content on the homepage</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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

          {/* Section Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Section Header</h2>
            
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={currentData.title}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLanguage]: { ...currentData, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="Enter section title"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={currentData.description}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLanguage]: { ...currentData, description: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                placeholder="Enter description"
              />
            </div>

            {/* Button Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={currentData.buttonText}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLanguage]: { ...currentData, buttonText: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="Enter button text"
              />
            </div>

            {/* Badge Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badge Text
              </label>
              <input
                type="text"
                value={currentData.badgeText}
                onChange={(e) => setFormData({
                  ...formData,
                  [activeLanguage]: { ...currentData, badgeText: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                placeholder="Enter badge text"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Cards</h2>
            <div className="space-y-6">
              {cards.map((card, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Card {index + 1}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMoveCard(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-600 hover:text-[#6B9E3E] disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveCard(index, 'down')}
                        disabled={index === cards.length - 1}
                        className="p-1 text-gray-600 hover:text-[#6B9E3E] disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Name
                    </label>
                    <input
                      type="text"
                      value={card[`name_${activeLanguage}` as keyof CardFormItem] as string}
                      onChange={(e) => handleCardChange(index, `name_${activeLanguage}` as keyof CardFormItem, e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                      placeholder="Enter card name"
                    />
                  </div>

                  {/* Card Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Description
                    </label>
                    <textarea
                      rows={3}
                      value={card[`description_${activeLanguage}` as keyof CardFormItem] as string}
                      onChange={(e) => handleCardChange(index, `description_${activeLanguage}` as keyof CardFormItem, e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
                      placeholder="Enter card description"
                    />
                  </div>

                  {/* Card Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Image
                    </label>
                    <input
                      type="text"
                      value={card.image}
                      onChange={(e) => handleCardChange(index, 'image', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black mb-2"
                      placeholder="Enter image URL or upload image"
                    />
                    <label className="block">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#6B9E3E] transition-colors cursor-pointer">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      </div>
                      <input
                        ref={(el) => { fileInputRefs.current[index] = el; }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                        }}
                        className="hidden"
                      />
                    </label>
                    {uploading[index] && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                    {uploadError[index] && (
                      <p className="text-sm text-red-600 mt-2">{uploadError[index]}</p>
                    )}
                    {card.image && !uploading[index] && !uploadError[index] && (
                      <div className="mt-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={card.image}
                          src={card.image}
                          alt={`Card ${index + 1} preview`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                          onError={() => setUploadError({ ...uploadError, [index]: 'Failed to load image' })}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-gradient-to-b from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200 space-y-4">
              <div className="text-center">
                <div className="inline-block bg-[#6B9E3E] text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                  {currentData.badgeText}
                </div>
                <h2 className="text-xl font-bold text-[#2C5F2D] mb-2">
                  {currentData.title}
                </h2>
                <p className="text-xs text-gray-600 mb-3">
                  {currentData.description}
                </p>
              </div>
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden border-2 border-gray-200">
                    {card.image && (
                      <div className="h-24 overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={card.image}
                          src={card.image}
                          alt={card[`name_${activeLanguage}` as keyof CardFormItem] as string}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[#6B9E3E] text-white px-2 py-1 rounded-full text-xs font-medium">
                          {currentData.badgeText}
                        </div>
                      </div>
                    )}
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-[#2C5F2D] mb-1">
                        {card[`name_${activeLanguage}` as keyof CardFormItem] as string || 'Card Name'}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {card[`description_${activeLanguage}` as keyof CardFormItem] as string || 'Card description'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#6B9E3E] text-white px-4 py-2 rounded-full text-xs font-medium">
                {currentData.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
