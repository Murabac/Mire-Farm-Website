'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Languages, Plus, Trash2, GripVertical, CheckCircle2 } from 'lucide-react';
import { Benefit } from '@/types/benefits';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface BenefitFormItem {
  id: number | null;
  text_en: string;
  text_so: string;
  text_ar: string;
  display_order: number;
  active: boolean;
}

export function BenefitsEditor() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [benefits, setBenefits] = useState<BenefitFormItem[]>([]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const fetchBenefitsData = useCallback(async () => {
    try {
      setLoading(true);
      // Use multiple cache-busting techniques
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const response = await fetch(`/api/admin/benefits?t=${timestamp}&r=${random}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (response.ok) {
        const data: Benefit[] = await response.json();
        console.log('Fetched benefits data from API:', data);
        console.log('Timestamp:', timestamp);
        
        // Always set benefits to what we get from the database (even if empty)
        if (data && Array.isArray(data)) {
          // Transform database format to form format
          const formBenefits = data.map((benefit) => ({
            id: benefit.id,
            text_en: benefit.text_en ?? '',
            text_so: benefit.text_so ?? '',
            text_ar: benefit.text_ar ?? '',
            display_order: benefit.display_order ?? 0,
            active: benefit.active !== false,
          })).sort((a, b) => a.display_order - b.display_order);
          
          console.log('Setting benefits state to:', formBenefits);
          // Set benefits directly
          setBenefits(formBenefits);
        } else {
          // If no data, set empty array
          setBenefits([]);
        }
      } else {
        console.error('Failed to fetch benefits:', response.status, response.statusText);
        // Set empty array on error to clear stale data
        setBenefits([]);
      }
    } catch (error) {
      console.error('Error fetching benefits data:', error);
      setBenefits([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch benefits data on mount
  useEffect(() => {
    fetchBenefitsData();
  }, [fetchBenefitsData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Transform form data to database format
      const payload = benefits.map((benefit, index) => ({
        id: benefit.id,
        text_en: benefit.text_en,
        text_so: benefit.text_so || null,
        text_ar: benefit.text_ar || null,
        display_order: benefit.display_order,
        active: benefit.active,
      }));

      const response = await fetch(`/api/admin/benefits?t=${Date.now()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ benefits: payload }),
      });

      if (response.ok) {
        // The PUT endpoint returns the updated benefits, use them directly
        const updatedData: Benefit[] = await response.json();
        console.log('Saved and received updated benefits:', updatedData);
        
        // Transform database format to form format and update state immediately
        const formBenefits = updatedData.map((benefit) => ({
          id: benefit.id,
          text_en: benefit.text_en ?? '',
          text_so: benefit.text_so ?? '',
          text_ar: benefit.text_ar ?? '',
          display_order: benefit.display_order ?? 0,
          active: benefit.active !== false,
        })).sort((a, b) => a.display_order - b.display_order);
        
        setBenefits(formBenefits);
        await showSuccessAlert('Benefits saved successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving benefits:', error);
      await showErrorAlert('Failed to save benefits. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddBenefit = () => {
    const maxOrder = benefits.length > 0 
      ? Math.max(...benefits.map(b => b.display_order)) 
      : -1;
    
    const newBenefit: BenefitFormItem = {
      id: null,
      text_en: '',
      text_so: '',
      text_ar: '',
      display_order: maxOrder + 1,
      active: true,
    };
    
    setBenefits([...benefits, newBenefit]);
  };

  const handleRemoveBenefit = async (index: number) => {
    const confirmed = await showConfirmDialog('Are you sure you want to remove this benefit?');
    if (confirmed) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      // Reorder remaining benefits
      const reordered = newBenefits.map((benefit, i) => ({
        ...benefit,
        display_order: i,
      }));
      setBenefits(reordered);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const newBenefits = [...benefits];
    [newBenefits[index - 1], newBenefits[index]] = [newBenefits[index], newBenefits[index - 1]];
    
    // Update display orders
    const reordered = newBenefits.map((benefit, i) => ({
      ...benefit,
      display_order: i,
    }));
    
    setBenefits(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === benefits.length - 1) return;
    
    const newBenefits = [...benefits];
    [newBenefits[index], newBenefits[index + 1]] = [newBenefits[index + 1], newBenefits[index]];
    
    // Update display orders
    const reordered = newBenefits.map((benefit, i) => ({
      ...benefit,
      display_order: i,
    }));
    
    setBenefits(reordered);
  };

  const handleBenefitChange = (index: number, field: keyof BenefitFormItem, value: string | boolean) => {
    const newBenefits = [...benefits];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: value,
    };
    setBenefits(newBenefits);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading benefits data...</p>
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
            <CheckCircle2 className="w-8 h-8" />
            Benefits Section Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the benefits displayed in the benefits section</p>
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

          {/* Benefits List */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Benefits</h2>
              <button
                onClick={handleAddBenefit}
                className="flex items-center gap-2 px-4 py-2 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Benefit</span>
              </button>
            </div>

            <div className="space-y-4">
              {benefits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No benefits yet. Click &quot;Add Benefit&quot; to get started.</p>
                </div>
              ) : (
                benefits.map((benefit, index) => {
                  const textField = `text_${activeLanguage}` as keyof BenefitFormItem;
                  const currentText = benefit[textField] as string;

                  return (
                    <div key={`benefit-${benefit.id}-${index}-${benefit.text_en}`} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-start gap-3">
                        {/* Drag Handle */}
                        <div className="flex flex-col gap-1 pt-2">
                          <button
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <GripVertical className="w-4 h-4 rotate-90" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(index)}
                            disabled={index === benefits.length - 1}
                            className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <GripVertical className="w-4 h-4 -rotate-90" />
                          </button>
                        </div>

                        {/* Input Field */}
                        <div className="flex-1">
                          <input
                            type="text"
                            value={currentText}
                            onChange={(e) => handleBenefitChange(index, textField, e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black bg-white"
                            placeholder={`Enter benefit text in ${languages.find(l => l.code === activeLanguage)?.name}`}
                          />
                        </div>

                        {/* Active Toggle */}
                        <div className="flex items-center gap-2 pt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={benefit.active}
                              onChange={(e) => handleBenefitChange(index, 'active', e.target.checked)}
                              className="w-5 h-5 text-[#6B9E3E] border-gray-300 rounded focus:ring-[#6B9E3E]"
                            />
                            <span className="text-sm text-gray-600">Active</span>
                          </label>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleRemoveBenefit(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Show other language texts as preview */}
                      {activeLanguage !== 'en' && benefit.text_en && (
                        <div className="mt-2 text-xs text-gray-500">
                          EN: {benefit.text_en}
                        </div>
                      )}
                      {activeLanguage !== 'so' && benefit.text_so && (
                        <div className="mt-1 text-xs text-gray-500">
                          SO: {benefit.text_so}
                        </div>
                      )}
                      {activeLanguage !== 'ar' && benefit.text_ar && (
                        <div className="mt-1 text-xs text-gray-500">
                          AR: {benefit.text_ar}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-[#6B9E3E] text-white p-4 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                {benefits
                  .filter(b => b.active)
                  .map((benefit, index) => {
                    const textField = `text_${activeLanguage}` as keyof BenefitFormItem;
                    const text = (benefit[textField] as string) || benefit.text_en || '';
                    
                    return text ? (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-medium">{text}</span>
                      </div>
                    ) : null;
                  })}
                {benefits.filter(b => b.active).length === 0 && (
                  <div className="col-span-2 text-center text-sm text-white/70 py-4">
                    No active benefits to preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

