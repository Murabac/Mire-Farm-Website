'use client';

import { useState, useEffect } from 'react';
import { Save, Globe, Database, Key, AlertTriangle, Menu } from 'lucide-react';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '@/lib/swal';

interface LanguageSetting {
  language_code: string;
  enabled: boolean;
  display_order: number;
}

interface SiteSettings {
  siteName: string;
  defaultLanguage: string;
  timezone: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

interface MenuSetting {
  id?: number;
  menu_key: string;
  label: string;
  href: string;
  visible: boolean;
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
  const [menuSettings, setMenuSettings] = useState<MenuSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingMenu, setSavingMenu] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Mire Farms',
    defaultLanguage: 'en',
    timezone: 'Africa/Mogadishu',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  });
  const [savingGeneral, setSavingGeneral] = useState(false);

  useEffect(() => {
    fetchLanguageSettings();
    fetchSiteSettings();
    fetchMenuSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      // Add cache-busting to get fresh data
      const response = await fetch(`/api/admin/settings/site?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSiteSettings(prev => ({
            ...prev,
            ...data,
          }));
        }
      }
    } catch (error) {
      // Use defaults if fetch fails
    }
  };

  const handleSaveGeneralSettings = async () => {
    setSavingGeneral(true);
    try {
      const response = await fetch('/api/admin/settings/site', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(siteSettings),
      });

      if (response.ok) {
        await showSuccessAlert('General settings saved successfully!');
        // Refresh settings to ensure UI is in sync with database
        await fetchSiteSettings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save settings. Please try again.', 'Error');
    } finally {
      setSavingGeneral(false);
    }
  };

  const handleMaintenanceToggle = async () => {
    if (!siteSettings.maintenanceMode) {
      // Enabling maintenance mode - show confirmation
      const confirmed = await showConfirmDialog(
        'This will show a maintenance page to all visitors. Are you sure you want to enable maintenance mode?',
        'Enable Maintenance Mode?',
        'Yes, Enable',
        'Cancel'
      );
      if (!confirmed) return;
    }
    
    setSiteSettings(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode,
    }));
  };

  const fetchLanguageSettings = async () => {
    try {
      setLoading(true);
      // Add cache-busting to get fresh data
      const response = await fetch(`/api/admin/settings/languages?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
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
            // Use the actual database value - explicitly convert enabled to boolean
            return {
              ...existing,
              enabled: Boolean(existing.enabled),
            };
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
      console.error('Error fetching language settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageToggle = async (code: string) => {
    // Ensure at least one language remains enabled
    const enabledCount = languageSettings.filter(s => s.enabled && s.language_code !== code).length;
    if (enabledCount === 0) {
      await showErrorAlert('At least one language must be enabled', 'Validation Error');
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
      // Ensure enabled values are explicitly booleans
      const settingsToSave = languageSettings.map(s => ({
        ...s,
        enabled: Boolean(s.enabled),
      }));

      const response = await fetch(`/api/admin/settings/languages?t=${Date.now()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify({ settings: settingsToSave }),
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        // Use the response data directly to update state
        if (updatedSettings && Array.isArray(updatedSettings) && updatedSettings.length > 0) {
          const allLanguageCodes = ['en', 'so', 'ar'];
          const languageMap = new Map(updatedSettings.map((s: LanguageSetting) => [s.language_code, s]));
          
          const completeData: LanguageSetting[] = allLanguageCodes.map((code, index) => {
            const existing = languageMap.get(code);
            if (existing) {
              return {
                ...existing,
                enabled: Boolean(existing.enabled),
              };
            } else {
              return {
                language_code: code,
                enabled: code === 'en',
                display_order: index + 1,
              };
            }
          });
          
          completeData.sort((a, b) => a.display_order - b.display_order);
          setLanguageSettings(completeData);
        }
        await showSuccessAlert('Language settings saved successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving language settings:', error);
      await showErrorAlert('Failed to save language settings. Please try again.', 'Error');
    } finally {
      setSaving(false);
    }
  };

  const fetchMenuSettings = async () => {
    try {
      setLoadingMenu(true);
      const response = await fetch(`/api/admin/settings/menu?t=${Date.now()}`, {
        credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (response.ok) {
        const data: MenuSetting[] = await response.json();
        if (data && Array.isArray(data)) {
          setMenuSettings(data);
        }
      }
    } catch (error) {
      // Use defaults if fetch fails
      setMenuSettings([
        { menu_key: 'home', label: 'Home', href: '/', visible: true, display_order: 1 },
        { menu_key: 'our-farm', label: 'Our Farm', href: '/our-farm', visible: true, display_order: 2 },
        { menu_key: 'gallery', label: 'Gallery', href: '/gallery', visible: true, display_order: 3 },
        { menu_key: 'news', label: 'News', href: '/news', visible: true, display_order: 4 },
      ]);
    } finally {
      setLoadingMenu(false);
    }
  };

  const handleMenuToggle = (menuKey: string) => {
    // Ensure at least one menu item remains visible (Home should always be visible)
    const item = menuSettings.find(m => m.menu_key === menuKey);
    if (item?.menu_key === 'home' && item.visible) {
      showErrorAlert('Home link cannot be hidden', 'Validation Error');
      return;
    }

    setMenuSettings(prev =>
      prev.map(setting =>
        setting.menu_key === menuKey
          ? { ...setting, visible: !setting.visible }
          : setting
      )
    );
  };

  const handleSaveMenu = async () => {
    setSavingMenu(true);
    try {
      const response = await fetch('/api/admin/settings/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ menuItems: menuSettings }),
      });

      if (response.ok) {
        await showSuccessAlert('Menu settings saved successfully!');
        await fetchMenuSettings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        await showErrorAlert(errorData.error || 'Unknown error', 'Failed to save');
      }
    } catch (error) {
      await showErrorAlert('Failed to save menu settings. Please try again.', 'Error');
    } finally {
      setSavingMenu(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'menu', name: 'Menu', icon: Menu },
    { id: 'languages', name: 'Languages', icon: Globe },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'api', name: 'API & Integration', icon: Key },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2C5F2D]">Settings</h1>
        {siteSettings.maintenanceMode && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg border border-amber-300">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Maintenance Mode Active</span>
          </div>
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
              {/* Maintenance Mode Section */}
              <div className={`p-6 rounded-lg border-2 ${siteSettings.maintenanceMode ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-6 h-6 ${siteSettings.maintenanceMode ? 'text-amber-600' : 'text-gray-500'}`} />
                    <div>
                      <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
                      <p className="text-sm text-gray-600">
                        {siteSettings.maintenanceMode 
                          ? 'Website is currently in maintenance mode' 
                          : 'Enable to show maintenance page to visitors'}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteSettings.maintenanceMode}
                      onChange={handleMaintenanceToggle}
                      className="sr-only peer"
                    />
                    <div className={`w-14 h-7 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all ${
                      siteSettings.maintenanceMode 
                        ? 'bg-amber-500 after:translate-x-7' 
                        : 'bg-gray-300'
                    }`}></div>
                  </label>
                </div>
                
                {siteSettings.maintenanceMode && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance Message
                    </label>
                    <textarea
                      rows={3}
                      value={siteSettings.maintenanceMessage}
                      onChange={(e) => setSiteSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-black bg-white"
                      placeholder="Enter the message to display to visitors"
                    />
                  </div>
                )}
              </div>

              <hr className="border-gray-200" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteSettings.siteName}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Language
                </label>
                <select 
                  value={siteSettings.defaultLanguage}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                >
                  <option value="en">English</option>
                  <option value="so">Somali</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select 
                  value={siteSettings.timezone}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] text-black"
                >
                  <option value="Africa/Mogadishu">Africa/Mogadishu (UTC+3)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveGeneralSettings}
                  disabled={savingGeneral}
                  className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingGeneral ? 'Saving...' : 'Save General Settings'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Menu className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Menu Visibility</h3>
                  <p className="text-sm text-blue-700">
                    Hide menu items from visitors while you&apos;re working on those pages. 
                    Hidden pages are still accessible by direct URL.
                  </p>
                </div>
              </div>
              
              {loadingMenu ? (
                <div className="text-center py-8 text-gray-500">Loading menu settings...</div>
              ) : (
                <div className="space-y-3">
                  {menuSettings
                    .sort((a, b) => a.display_order - b.display_order)
                    .map((setting) => (
                      <div 
                        key={setting.menu_key} 
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                          setting.visible 
                            ? 'bg-white border-gray-200' 
                            : 'bg-gray-100 border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${setting.visible ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div>
                            <span className="font-medium text-gray-900">{setting.label}</span>
                            <span className="ml-2 text-sm text-gray-500">({setting.href})</span>
                          </div>
                          {!setting.visible && (
                            <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">Hidden</span>
                          )}
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.visible}
                            onChange={() => handleMenuToggle(setting.menu_key)}
                            className="sr-only peer"
                            disabled={setting.menu_key === 'home'}
                          />
                          <div className={`w-11 h-6 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B9E3E]/20 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            setting.visible 
                              ? 'bg-[#6B9E3E] after:translate-x-full after:border-white' 
                              : 'bg-gray-300'
                          } ${setting.menu_key === 'home' ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
                        </label>
                      </div>
                    ))}
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSaveMenu}
                  disabled={savingMenu || loadingMenu}
                  className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>{savingMenu ? 'Saving...' : 'Save Menu Settings'}</span>
                </button>
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

