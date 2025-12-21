'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Database, Key } from 'lucide-react';

interface LanguageSetting {
  language_code: string;
  enabled: boolean;
  display_order: number;
}

const languageMap: { [key: string]: { name: string; code: string } } = {
  en: { name: 'English', code: 'en' },
  so: { name: 'Somali', code: 'so' },
  ar: { name: 'Arabic', code: 'ar' },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [languageSettings, setLanguageSettings] = useState<LanguageSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLanguageSettings();
  }, []);

  const fetchLanguageSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings/languages', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        setLoading(false);
        return;
      }
      
      const data: LanguageSetting[] = await response.json();
      
      // Use the data directly from the database - don't override values
      if (data && Array.isArray(data) && data.length > 0) {
        // Ensure we have all three languages with their actual database values
        const allLanguageCodes = ['en', 'so', 'ar'];
        const languageMap = new Map(data.map(s => [s.language_code, s]));
        
        // Build complete list using database values, only add defaults for truly missing ones
        const completeData: LanguageSetting[] = allLanguageCodes.map((code, index) => {
          const existing = languageMap.get(code);
          if (existing) {
            // Use the actual database value - this preserves enabled: false if that's what's in DB
            return existing;
          } else {
            // Only add default if language is missing from database
            return {
              language_code: code,
              enabled: code === 'en', // Only English enabled by default if missing
              display_order: index + 1,
            };
          }
        });
        
        // Sort by display_order
        completeData.sort((a, b) => a.display_order - b.display_order);
        setLanguageSettings(completeData);
      } else {
        // If no data, use defaults (shouldn't happen if migration ran)
        const defaultSettings: LanguageSetting[] = [
          { language_code: 'en', enabled: true, display_order: 1 },
          { language_code: 'so', enabled: true, display_order: 2 },
          { language_code: 'ar', enabled: true, display_order: 3 },
        ];
        setLanguageSettings(defaultSettings);
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageToggle = (code: string) => {
    // Ensure at least one language remains enabled
    const enabledCount = languageSettings.filter(s => s.enabled && s.language_code !== code).length;
    if (enabledCount === 0) {
      alert('At least one language must be enabled');
      return;
    }

    setLanguageSettings(prev =>
      prev.map(setting =>
        setting.language_code === code
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handleSaveLanguages = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings/languages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ settings: languageSettings }),
      });

      if (response.ok) {
        alert('Language settings saved successfully!');
        // Reload settings from API to ensure we have the latest data
        await fetchLanguageSettings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Failed to save language settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'languages', name: 'Languages', icon: Globe },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'api', name: 'API & Integration', icon: Key },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2C5F2D]">Settings</h1>
        {activeTab !== 'languages' && (
          <button className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors">
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex gap-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#6B9E3E] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  defaultValue="Mire Farms"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black">
                  <option value="en">English</option>
                  <option value="so">Somali</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black">
                  <option>Africa/Mogadishu (UTC+3)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-4">
              <p className="text-gray-600">Enable or disable languages for the website</p>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading language settings...</div>
              ) : (
                languageSettings
                  .sort((a, b) => a.display_order - b.display_order)
                  .map((setting) => {
                    const langInfo = languageMap[setting.language_code];
                    // Explicitly convert to boolean to ensure checkbox works correctly
                    const isEnabled = Boolean(setting.enabled);
                    return (
                      <div key={`${setting.language_code}-${setting.enabled}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{langInfo?.name || setting.language_code}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => handleLanguageToggle(setting.language_code)}
                            className="sr-only peer"
                            aria-checked={isEnabled}
                          />
                          <div className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B9E3E]/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            isEnabled 
                              ? 'bg-[#6B9E3E] peer-checked:after:translate-x-full peer-checked:after:border-white' 
                              : 'bg-gray-200'
                          }`}></div>
                        </label>
                      </div>
                    );
                  })
              )}
              {activeTab === 'languages' && (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveLanguages}
                    disabled={saving || loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-5 h-5" />
                    <span>{saving ? 'Saving...' : 'Save Language Settings'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-900">Database Connected</span>
                </div>
                <p className="text-sm text-green-700">Connection is healthy and active</p>
              </div>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Test Connection
              </button>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Regenerate API Key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

