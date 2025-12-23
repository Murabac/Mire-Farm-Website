'use client';

import { useState, useEffect } from 'react';
import { Save, Languages, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactInfo } from '@/types/contact';
import { Language } from '@/types/hero';
import { showSuccessAlert, showErrorAlert } from '@/lib/swal';

interface ContactInfoFormData {
  en: {
    location: string;
    hours: string;
  };
  so: {
    location: string;
    hours: string;
  };
  ar: {
    location: string;
    hours: string;
  };
  phone: string;
  email: string;
}

export function ContactInfoEditor() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ContactInfoFormData>({
    en: {
      location: 'Arabsiyo Village, Gabiley Region, Somaliland',
      hours: 'Saturday - Thursday: 7:00 AM - 5:00 PM\nFriday: Closed',
    },
    so: {
      location: 'Magaalada Arabsiyo, Gobolka Gabiley, Somaliland',
      hours: 'Sabti - Khamiis: 7:00 AM - 5:00 PM\nJimco: Xiran',
    },
    ar: {
      location: 'قرية عربسيو، منطقة جابيلي، أرض الصومال',
      hours: 'السبت - الخميس: 7:00 صباحاً - 5:00 مساءً\nالجمعة: مغلق',
    },
    phone: '+252 63 4222 609',
    email: 'info@mirefarms.com',
  });

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
      const response = await fetch(`/api/admin/contact-info?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
      });

      if (response.ok) {
        const data: ContactInfo | null = await response.json();
        
        if (data) {
          setFormData({
            en: {
              location: data.location_en || '',
              hours: data.hours_en || '',
            },
            so: {
              location: data.location_so || '',
              hours: data.hours_so || '',
            },
            ar: {
              location: data.location_ar || '',
              hours: data.hours_ar || '',
            },
            phone: data.phone || '',
            email: data.email || '',
          });
        }
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        location_en: formData.en.location,
        location_so: formData.so.location || null,
        location_ar: formData.ar.location || null,
        hours_en: formData.en.hours,
        hours_so: formData.so.hours || null,
        hours_ar: formData.ar.hours || null,
        phone: formData.phone,
        email: formData.email,
      };

      const response = await fetch('/api/admin/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await showSuccessAlert('Contact info saved successfully!');
        // Force reload by setting loading and fetching fresh data
        setLoading(true);
        await fetchData();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save contact info. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">Loading contact info data...</p>
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
            <Phone className="w-8 h-8" />
            Contact Info Editor
          </h1>
          <p className="text-gray-600 mt-1">Edit the contact information displayed on the homepage</p>
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

          {/* Phone & Email (Not language-specific) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="+252 63 4222 609"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                  placeholder="info@mirefarms.com"
                />
              </div>
            </div>
          </div>

          {/* Location (Language-specific) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <textarea
              rows={3}
              value={currentData.location}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, location: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
              placeholder="Enter location address"
            />
            <p className="text-xs text-gray-500 mt-2">Use line breaks for multi-line addresses</p>
          </div>

          {/* Operating Hours (Language-specific) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Operating Hours ({languages.find(l => l.code === activeLanguage)?.name})
            </label>
            <textarea
              rows={4}
              value={currentData.hours}
              onChange={(e) => setFormData({
                ...formData,
                [activeLanguage]: { ...currentData, hours: e.target.value }
              })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black resize-none"
              placeholder="Enter operating hours"
            />
            <p className="text-xs text-gray-500 mt-2">Use line breaks to separate different days/hours</p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Preview</h2>
            <div className="bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white p-6 rounded-xl border-2 border-gray-200">
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h3>
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {currentData.location || 'Location address'}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </h3>
                  <p className="text-xs">{formData.phone || 'Phone number'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </h3>
                  <p className="text-xs">{formData.email || 'Email address'}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Hours
                  </h3>
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {currentData.hours || 'Operating hours'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

