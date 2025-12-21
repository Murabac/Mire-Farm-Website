'use client';

import { useState, useEffect } from 'react';
import { Save, Languages, Upload, Sparkles } from 'lucide-react';
import { HeroSection, Language } from '@/types/hero';

interface HeroFormData {
  en: {
    badgeText: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    description: string;
    button1Text: string;
    button2Text: string;
    stats: Array<{ number: string; label: string }>;
    bottomBadge: string;
  };
  so: {
    badgeText: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    description: string;
    button1Text: string;
    button2Text: string;
    stats: Array<{ number: string; label: string }>;
    bottomBadge: string;
  };
  ar: {
    badgeText: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    description: string;
    button1Text: string;
    button2Text: string;
    stats: Array<{ number: string; label: string }>;
    bottomBadge: string;
  };
}

export function HeroEditor() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroImageUrl, setHeroImageUrl] = useState('/images/hero-image.jpg');
  const [formData, setFormData] = useState<HeroFormData>({
    en: {
      badgeText: '100% Organic & Natural',
      headingPrefix: 'Growing a',
      headingHighlight: 'Sustainable',
      headingSuffix: 'Future',
      description: 'Cultivating high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland using natural and pesticide-free farming methods.',
      button1Text: 'Explore Our Farm',
      button2Text: 'Get in Touch',
      stats: [
        { number: '100+', label: 'Crop Varieties' },
        { number: '100%', label: 'Organic' },
        { number: '4+', label: 'Countries' }
      ],
      bottomBadge: 'Est. 2024 - Organic Farm'
    },
    so: {
      badgeText: '100% Dabiici & Dabiici ah',
      headingPrefix: 'Korinta',
      headingHighlight: 'Mustaqbalka',
      headingSuffix: 'Waara',
      description: 'Beerista khudaar iyo miraha tayo sare leh oo dabiici ah',
      button1Text: 'Baaro Beerteenna',
      button2Text: 'Nala Soo Xiriir',
      stats: [
        { number: '100+', label: 'Noocyada Dalaga' },
        { number: '100%', label: 'Dabiici' },
        { number: '4+', label: 'Waddamo' }
      ],
      bottomBadge: 'La aasaasay 2024 - Beer Dabiici'
    },
    ar: {
      badgeText: '100٪ عضوي وطبيعي',
      headingPrefix: 'زراعة',
      headingHighlight: 'مستقبل',
      headingSuffix: 'مستدام',
      description: 'زراعة الفواكه والخضروات العضوية عالية الجودة',
      button1Text: 'استكشف مزرعتنا',
      button2Text: 'تواصل معنا',
      stats: [
        { number: '100+', label: 'أصناف المحاصيل' },
        { number: '100٪', label: 'عضوي' },
        { number: '4+', label: 'دول' }
      ],
      bottomBadge: 'تأسست 2024 - مزرعة عضوية'
    }
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  // Fetch hero section data on mount
  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero', {
        credentials: 'include',
      });

      if (response.ok) {
        const data: HeroSection = await response.json();
        
        // Transform database format to form format
        setFormData({
          en: {
            badgeText: data.badge_text_en || '',
            headingPrefix: data.heading_prefix_en || '',
            headingHighlight: data.heading_highlight_en || '',
            headingSuffix: data.heading_suffix_en || '',
            description: data.description_en || '',
            button1Text: data.primary_button_text_en || '',
            button2Text: data.secondary_button_text_en || '',
            stats: [
              { number: data.stat1_number || '', label: data.stat1_label_en || '' },
              { number: data.stat2_number || '', label: data.stat2_label_en || '' },
              { number: data.stat3_number || '', label: data.stat3_label_en || '' }
            ],
            bottomBadge: `${data.bottom_badge_title_en || ''} - ${data.bottom_badge_subtitle_en || ''}`
          },
          so: {
            badgeText: data.badge_text_so || '',
            headingPrefix: data.heading_prefix_so || '',
            headingHighlight: data.heading_highlight_so || '',
            headingSuffix: data.heading_suffix_so || '',
            description: data.description_so || '',
            button1Text: data.primary_button_text_so || '',
            button2Text: data.secondary_button_text_so || '',
            stats: [
              { number: data.stat1_number || '', label: data.stat1_label_so || '' },
              { number: data.stat2_number || '', label: data.stat2_label_so || '' },
              { number: data.stat3_number || '', label: data.stat3_label_so || '' }
            ],
            bottomBadge: `${data.bottom_badge_title_so || ''} - ${data.bottom_badge_subtitle_so || ''}`
          },
          ar: {
            badgeText: data.badge_text_ar || '',
            headingPrefix: data.heading_prefix_ar || '',
            headingHighlight: data.heading_highlight_ar || '',
            headingSuffix: data.heading_suffix_ar || '',
            description: data.description_ar || '',
            button1Text: data.primary_button_text_ar || '',
            button2Text: data.secondary_button_text_ar || '',
            stats: [
              { number: data.stat1_number || '', label: data.stat1_label_ar || '' },
              { number: data.stat2_number || '', label: data.stat2_label_ar || '' },
              { number: data.stat3_number || '', label: data.stat3_label_ar || '' }
            ],
            bottomBadge: `${data.bottom_badge_title_ar || ''} - ${data.bottom_badge_subtitle_ar || ''}`
          }
        });
        
        setHeroImageUrl(data.hero_image_url || '/images/hero-image.jpg');
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Transform form data to database format
      const bottomBadgeParts = {
        en: formData.en.bottomBadge.split(' - '),
        so: formData.so.bottomBadge.split(' - '),
        ar: formData.ar.bottomBadge.split(' - ')
      };

      const payload = {
        // Badge text
        badge_text_en: formData.en.badgeText,
        badge_text_so: formData.so.badgeText || null,
        badge_text_ar: formData.ar.badgeText || null,
        // Main heading
        heading_prefix_en: formData.en.headingPrefix,
        heading_prefix_so: formData.so.headingPrefix || null,
        heading_prefix_ar: formData.ar.headingPrefix || null,
        heading_highlight_en: formData.en.headingHighlight,
        heading_highlight_so: formData.so.headingHighlight || null,
        heading_highlight_ar: formData.ar.headingHighlight || null,
        heading_suffix_en: formData.en.headingSuffix,
        heading_suffix_so: formData.so.headingSuffix || null,
        heading_suffix_ar: formData.ar.headingSuffix || null,
        // Description
        description_en: formData.en.description,
        description_so: formData.so.description || null,
        description_ar: formData.ar.description || null,
        // Buttons
        primary_button_text_en: formData.en.button1Text,
        primary_button_text_so: formData.so.button1Text || null,
        primary_button_text_ar: formData.ar.button1Text || null,
        secondary_button_text_en: formData.en.button2Text,
        secondary_button_text_so: formData.so.button2Text || null,
        secondary_button_text_ar: formData.ar.button2Text || null,
        // Stats
        stat1_number: formData.en.stats[0].number,
        stat1_label_en: formData.en.stats[0].label,
        stat1_label_so: formData.so.stats[0].label || null,
        stat1_label_ar: formData.ar.stats[0].label || null,
        stat2_number: formData.en.stats[1].number,
        stat2_label_en: formData.en.stats[1].label,
        stat2_label_so: formData.so.stats[1].label || null,
        stat2_label_ar: formData.ar.stats[1].label || null,
        stat3_number: formData.en.stats[2].number,
        stat3_label_en: formData.en.stats[2].label,
        stat3_label_so: formData.so.stats[2].label || null,
        stat3_label_ar: formData.ar.stats[2].label || null,
        // Image
        hero_image_url: heroImageUrl,
        // Bottom badge
        bottom_badge_title_en: bottomBadgeParts.en[0] || '',
        bottom_badge_title_so: bottomBadgeParts.so[0] || null,
        bottom_badge_title_ar: bottomBadgeParts.ar[0] || null,
        bottom_badge_subtitle_en: bottomBadgeParts.en[1] || '',
        bottom_badge_subtitle_so: bottomBadgeParts.so[1] || null,
        bottom_badge_subtitle_ar: bottomBadgeParts.ar[1] || null,
      };

      const response = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Hero section saved successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Failed to save hero section. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroImageUrl(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading hero section data...</p>
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
            <Sparkles className="w-8 h-8" />
            Hero Section Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the main hero section content for your homepage</p>
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

          {/* Badge Text */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
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

          {/* Heading */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Main Heading</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Prefix
                </label>
                <input
                  type="text"
                  value={currentData.headingPrefix}
                  onChange={(e) => setFormData({
                    ...formData,
                    [activeLanguage]: { ...currentData, headingPrefix: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Prefix text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Highlight (colored text)
                </label>
                <input
                  type="text"
                  value={currentData.headingHighlight}
                  onChange={(e) => setFormData({
                    ...formData,
                    [activeLanguage]: { ...currentData, headingHighlight: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Highlighted text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Suffix
                </label>
                <input
                  type="text"
                  value={currentData.headingSuffix}
                  onChange={(e) => setFormData({
                    ...formData,
                    [activeLanguage]: { ...currentData, headingSuffix: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Suffix text"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={currentData.description}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, description: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="Enter description"
            />
          </div>

          {/* Buttons */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Call-to-Action Buttons</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={currentData.button1Text}
                  onChange={(e) => setFormData({
                    ...formData,
                    [activeLanguage]: { ...currentData, button1Text: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={currentData.button2Text}
                  onChange={(e) => setFormData({
                    ...formData,
                    [activeLanguage]: { ...currentData, button2Text: e.target.value }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              {currentData.stats.map((stat, index) => (
                <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number
                    </label>
                    <input
                      type="text"
                      value={stat.number}
                      onChange={(e) => {
                        const newStats = [...currentData.stats];
                        newStats[index].number = e.target.value;
                        setFormData({
                          ...formData,
                          [activeLanguage]: { ...currentData, stats: newStats }
                        });
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...currentData.stats];
                        newStats[index].label = e.target.value;
                        setFormData({
                          ...formData,
                          [activeLanguage]: { ...currentData, stats: newStats }
                        });
                      }}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Badge */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bottom Badge (Format: Title - Subtitle)
            </label>
            <input
              type="text"
              value={currentData.bottomBadge}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, bottomBadge: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
              placeholder="Est. 2024 - Organic Farm"
            />
            <p className="text-xs text-gray-500 mt-2">Use &quot; - &quot; to separate title and subtitle</p>
          </div>

          {/* Hero Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hero Image URL
            </label>
            <input
              type="text"
              value={heroImageUrl}
              onChange={handleImageUrlChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] mb-4 text-black"
              placeholder="/images/hero-image.jpg"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">Enter image URL above</p>
              <p className="text-xs text-gray-500 mt-1">Or upload to /public/images/ and use the path</p>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-gradient-to-br from-[#E8F5E9] to-white p-6 rounded-xl border-2 border-gray-200">
              <div className="inline-block bg-[#6B9E3E]/10 text-[#6B9E3E] px-3 py-1 rounded-full text-xs mb-4">
                {currentData.badgeText}
              </div>
              <h1 className="text-2xl font-bold text-[#2C5F2D] mb-3 leading-tight">
                {currentData.headingPrefix} <span className="text-[#6B9E3E]">{currentData.headingHighlight}</span> {currentData.headingSuffix}
              </h1>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {currentData.description}
              </p>
              <div className="space-y-2 mb-4">
                <button className="w-full bg-[#6B9E3E] text-white px-4 py-2 rounded-lg text-sm">
                  {currentData.button1Text}
                </button>
                <button className="w-full border-2 border-[#6B9E3E] text-[#6B9E3E] px-4 py-2 rounded-lg text-sm">
                  {currentData.button2Text}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {currentData.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-[#6B9E3E]">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-xs text-gray-600">
                {currentData.bottomBadge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

