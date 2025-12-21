'use client';

import { useState, useEffect } from 'react';
import { Save, Languages, Plus, Trash2, GripVertical, Target } from 'lucide-react';
import { MissionVisionValue, CoreValue, MissionVisionSectionHeader } from '@/types/mission-vision';
import { Language } from '@/types/hero';

interface SectionHeaderForm {
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
}

interface MissionVisionFormItem {
  id: number | null;
  type: 'mission' | 'vision' | 'values';
  emoji: string;
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  bg_color_class: string;
  border_color_class: string;
  display_order: number;
  active: boolean;
}

interface CoreValueFormItem {
  id: number | null;
  title_en: string;
  title_so: string;
  title_ar: string;
  description_en: string;
  description_so: string;
  description_ar: string;
  icon_type: string;
  color_class: string;
  display_order: number;
  active: boolean;
}

const bgColorOptions = [
  { value: 'from-green-50 to-white', label: 'Green' },
  { value: 'from-blue-50 to-white', label: 'Blue' },
  { value: 'from-purple-50 to-white', label: 'Purple' },
  { value: 'from-orange-50 to-white', label: 'Orange' },
  { value: 'from-pink-50 to-white', label: 'Pink' },
  { value: 'from-yellow-50 to-white', label: 'Yellow' },
];

const borderColorOptions = [
  { value: 'border-green-100', label: 'Green' },
  { value: 'border-blue-100', label: 'Blue' },
  { value: 'border-purple-100', label: 'Purple' },
  { value: 'border-orange-100', label: 'Orange' },
  { value: 'border-pink-100', label: 'Pink' },
  { value: 'border-yellow-100', label: 'Yellow' },
];

const iconTypeOptions = [
  { value: 'organic', label: 'Organic' },
  { value: 'community', label: 'Community' },
  { value: 'leader', label: 'Leader' },
  { value: 'growth', label: 'Growth' },
];

const colorClassOptions = [
  { value: 'bg-green-100 text-green-600', label: 'Green' },
  { value: 'bg-blue-100 text-blue-600', label: 'Blue' },
  { value: 'bg-purple-100 text-purple-600', label: 'Purple' },
  { value: 'bg-orange-100 text-orange-600', label: 'Orange' },
  { value: 'bg-pink-100 text-pink-600', label: 'Pink' },
  { value: 'bg-yellow-100 text-yellow-600', label: 'Yellow' },
];

export function MissionVisionEditor() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sectionHeader, setSectionHeader] = useState<SectionHeaderForm>({
    title_en: '',
    title_so: '',
    title_ar: '',
    description_en: '',
    description_so: '',
    description_ar: '',
  });
  const [missionVisionValues, setMissionVisionValues] = useState<MissionVisionFormItem[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValueFormItem[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/mission-vision', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        // Set section header
        if (data.sectionHeader) {
          setSectionHeader({
            title_en: data.sectionHeader.title_en || '',
            title_so: data.sectionHeader.title_so || '',
            title_ar: data.sectionHeader.title_ar || '',
            description_en: data.sectionHeader.description_en || '',
            description_so: data.sectionHeader.description_so || '',
            description_ar: data.sectionHeader.description_ar || '',
          });
        }

        // Set mission vision values
        if (data.missionVisionValues) {
          const mvvItems = data.missionVisionValues.map((item: MissionVisionValue) => ({
            id: item.id,
            type: item.type,
            emoji: item.emoji || '',
            title_en: item.title_en || '',
            title_so: item.title_so || '',
            title_ar: item.title_ar || '',
            description_en: item.description_en || '',
            description_so: item.description_so || '',
            description_ar: item.description_ar || '',
            bg_color_class: item.bg_color_class || 'from-green-50 to-white',
            border_color_class: item.border_color_class || 'border-green-100',
            display_order: item.display_order || 0,
            active: item.active !== false,
          })).sort((a: MissionVisionFormItem, b: MissionVisionFormItem) => a.display_order - b.display_order);
          
          setMissionVisionValues(mvvItems);
        }

        // Set core values
        if (data.coreValues) {
          const cvItems = data.coreValues.map((item: CoreValue) => ({
            id: item.id,
            title_en: item.title_en || '',
            title_so: item.title_so || '',
            title_ar: item.title_ar || '',
            description_en: item.description_en || '',
            description_so: item.description_so || '',
            description_ar: item.description_ar || '',
            icon_type: item.icon_type || 'organic',
            color_class: item.color_class || 'bg-green-100 text-green-600',
            display_order: item.display_order || 0,
            active: item.active !== false,
          })).sort((a: CoreValueFormItem, b: CoreValueFormItem) => a.display_order - b.display_order);
          
          setCoreValues(cvItems);
        }
      }
    } catch (error) {
      console.error('Error fetching mission vision data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        sectionHeader: {
          title_en: sectionHeader.title_en,
          title_so: sectionHeader.title_so || null,
          title_ar: sectionHeader.title_ar || null,
          description_en: sectionHeader.description_en,
          description_so: sectionHeader.description_so || null,
          description_ar: sectionHeader.description_ar || null,
        },
        missionVisionValues: missionVisionValues.map(item => ({
          id: item.id,
          type: item.type,
          emoji: item.emoji,
          title_en: item.title_en,
          title_so: item.title_so || null,
          title_ar: item.title_ar || null,
          description_en: item.description_en,
          description_so: item.description_so || null,
          description_ar: item.description_ar || null,
          bg_color_class: item.bg_color_class,
          border_color_class: item.border_color_class,
          display_order: item.display_order,
          active: item.active,
        })),
        coreValues: coreValues.map(item => ({
          id: item.id,
          title_en: item.title_en,
          title_so: item.title_so || null,
          title_ar: item.title_ar || null,
          description_en: item.description_en,
          description_so: item.description_so || null,
          description_ar: item.description_ar || null,
          icon_type: item.icon_type,
          color_class: item.color_class,
          display_order: item.display_order,
          active: item.active,
        })),
      };

      const response = await fetch('/api/admin/mission-vision', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Mission & Vision saved successfully!');
        await fetchData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving mission vision:', error);
      alert('Failed to save mission & vision. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleMoveUp = (index: number, type: 'mvv' | 'cv') => {
    if (index === 0) return;
    
    if (type === 'mvv') {
      const newItems = [...missionVisionValues];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      const reordered = newItems.map((item, i) => ({ ...item, display_order: i }));
      setMissionVisionValues(reordered);
    } else {
      const newItems = [...coreValues];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      const reordered = newItems.map((item, i) => ({ ...item, display_order: i }));
      setCoreValues(reordered);
    }
  };

  const handleMoveDown = (index: number, type: 'mvv' | 'cv') => {
    const items = type === 'mvv' ? missionVisionValues : coreValues;
    if (index === items.length - 1) return;
    
    if (type === 'mvv') {
      const newItems = [...missionVisionValues];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      const reordered = newItems.map((item, i) => ({ ...item, display_order: i }));
      setMissionVisionValues(reordered);
    } else {
      const newItems = [...coreValues];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      const reordered = newItems.map((item, i) => ({ ...item, display_order: i }));
      setCoreValues(reordered);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading mission & vision data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D] flex items-center gap-3">
            <Target className="w-8 h-8" />
            Mission & Vision Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the mission, vision, and values section content</p>
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title ({languages.find(l => l.code === activeLanguage)?.name})
                </label>
                <input
                  type="text"
                  value={sectionHeader[`title_${activeLanguage}` as keyof SectionHeaderForm]}
                  onChange={(e) => setSectionHeader({
                    ...sectionHeader,
                    [`title_${activeLanguage}`]: e.target.value
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description ({languages.find(l => l.code === activeLanguage)?.name})
                </label>
                <textarea
                  rows={3}
                  value={sectionHeader[`description_${activeLanguage}` as keyof SectionHeaderForm]}
                  onChange={(e) => setSectionHeader({
                    ...sectionHeader,
                    [`description_${activeLanguage}`]: e.target.value
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="Enter section description"
                />
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Mission, Vision & Values</h2>
            <div className="space-y-4">
              {missionVisionValues.map((item, index) => {
                const titleKey = `title_${activeLanguage}` as keyof MissionVisionFormItem;
                const descKey = `description_${activeLanguage}` as keyof MissionVisionFormItem;

                return (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex flex-col gap-1 pt-2">
                        <button
                          onClick={() => handleMoveUp(index, 'mvv')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <GripVertical className="w-4 h-4 rotate-90" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index, 'mvv')}
                          disabled={index === missionVisionValues.length - 1}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <GripVertical className="w-4 h-4 -rotate-90" />
                        </button>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                            <select
                              value={item.type}
                              onChange={(e) => {
                                const newItems = [...missionVisionValues];
                                newItems[index].type = e.target.value as 'mission' | 'vision' | 'values';
                                setMissionVisionValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                            >
                              <option value="mission">Mission</option>
                              <option value="vision">Vision</option>
                              <option value="values">Values</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Emoji</label>
                            <input
                              type="text"
                              value={item.emoji}
                              onChange={(e) => {
                                const newItems = [...missionVisionValues];
                                newItems[index].emoji = e.target.value;
                                setMissionVisionValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                              placeholder="🌱"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Title ({languages.find(l => l.code === activeLanguage)?.name})
                          </label>
                          <input
                            type="text"
                            value={item[titleKey] as string}
                            onChange={(e) => {
                              const newItems = [...missionVisionValues];
                              (newItems[index][titleKey] as string) = e.target.value;
                              setMissionVisionValues(newItems);
                            }}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description ({languages.find(l => l.code === activeLanguage)?.name})
                          </label>
                          <textarea
                            rows={3}
                            value={item[descKey] as string}
                            onChange={(e) => {
                              const newItems = [...missionVisionValues];
                              (newItems[index][descKey] as string) = e.target.value;
                              setMissionVisionValues(newItems);
                            }}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Background</label>
                            <select
                              value={item.bg_color_class}
                              onChange={(e) => {
                                const newItems = [...missionVisionValues];
                                newItems[index].bg_color_class = e.target.value;
                                setMissionVisionValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                            >
                              {bgColorOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Border</label>
                            <select
                              value={item.border_color_class}
                              onChange={(e) => {
                                const newItems = [...missionVisionValues];
                                newItems[index].border_color_class = e.target.value;
                                setMissionVisionValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                            >
                              {borderColorOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.active}
                            onChange={(e) => {
                              const newItems = [...missionVisionValues];
                              newItems[index].active = e.target.checked;
                              setMissionVisionValues(newItems);
                            }}
                            className="w-4 h-4 text-[#6B9E3E] border-gray-300 rounded"
                          />
                          <label className="text-sm text-gray-600">Active</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Core Values</h2>
            <div className="space-y-4">
              {coreValues.map((item, index) => {
                const titleKey = `title_${activeLanguage}` as keyof CoreValueFormItem;
                const descKey = `description_${activeLanguage}` as keyof CoreValueFormItem;

                return (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex flex-col gap-1 pt-2">
                        <button
                          onClick={() => handleMoveUp(index, 'cv')}
                          disabled={index === 0}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <GripVertical className="w-4 h-4 rotate-90" />
                        </button>
                        <button
                          onClick={() => handleMoveDown(index, 'cv')}
                          disabled={index === coreValues.length - 1}
                          className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <GripVertical className="w-4 h-4 -rotate-90" />
                        </button>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Icon Type</label>
                            <select
                              value={item.icon_type}
                              onChange={(e) => {
                                const newItems = [...coreValues];
                                newItems[index].icon_type = e.target.value;
                                setCoreValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                            >
                              {iconTypeOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                            <select
                              value={item.color_class}
                              onChange={(e) => {
                                const newItems = [...coreValues];
                                newItems[index].color_class = e.target.value;
                                setCoreValues(newItems);
                              }}
                              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                            >
                              {colorClassOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Title ({languages.find(l => l.code === activeLanguage)?.name})
                          </label>
                          <input
                            type="text"
                            value={item[titleKey] as string}
                            onChange={(e) => {
                              const newItems = [...coreValues];
                              (newItems[index][titleKey] as string) = e.target.value;
                              setCoreValues(newItems);
                            }}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description ({languages.find(l => l.code === activeLanguage)?.name})
                          </label>
                          <textarea
                            rows={2}
                            value={item[descKey] as string}
                            onChange={(e) => {
                              const newItems = [...coreValues];
                              (newItems[index][descKey] as string) = e.target.value;
                              setCoreValues(newItems);
                            }}
                            className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.active}
                            onChange={(e) => {
                              const newItems = [...coreValues];
                              newItems[index].active = e.target.checked;
                              setCoreValues(newItems);
                            }}
                            className="w-4 h-4 text-[#6B9E3E] border-gray-300 rounded"
                          />
                          <label className="text-sm text-gray-600">Active</label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            
            {/* Section Header Preview */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-[#2C5F2D] mb-2">
                {sectionHeader[`title_${activeLanguage}` as keyof SectionHeaderForm] || 'Section Title'}
              </h3>
              <p className="text-sm text-gray-600">
                {sectionHeader[`description_${activeLanguage}` as keyof SectionHeaderForm] || 'Section description'}
              </p>
            </div>

            {/* Mission/Vision/Values Preview */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              {missionVisionValues.filter(item => item.active).map((item, index) => {
                const titleKey = `title_${activeLanguage}` as keyof MissionVisionFormItem;
                const descKey = `description_${activeLanguage}` as keyof MissionVisionFormItem;
                
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br ${item.bg_color_class} p-4 rounded-lg border-2 ${item.border_color_class}`}
                  >
                    <div className="text-2xl mb-2">{item.emoji}</div>
                    <h4 className="text-sm font-bold text-[#2C5F2D] mb-1">
                      {item[titleKey] as string || 'Title'}
                    </h4>
                    <p className="text-xs text-gray-700">
                      {item[descKey] as string || 'Description'}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Core Values Preview */}
            <div className="grid grid-cols-2 gap-2">
              {coreValues.filter(item => item.active).map((item, index) => {
                const titleKey = `title_${activeLanguage}` as keyof CoreValueFormItem;
                const descKey = `description_${activeLanguage}` as keyof CoreValueFormItem;
                
                return (
                  <div key={index} className="bg-white p-3 rounded-lg border-2 border-gray-100">
                    <div className={`inline-flex items-center justify-center w-8 h-8 ${item.color_class} rounded-full mb-2 text-xs`}>
                      {item.icon_type.charAt(0).toUpperCase()}
                    </div>
                    <h5 className="text-xs font-bold text-[#2C5F2D] mb-1">
                      {item[titleKey] as string || 'Title'}
                    </h5>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {item[descKey] as string || 'Description'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

