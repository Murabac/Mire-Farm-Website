'use client';

import { useState } from 'react';
import { Save, Globe, Database, Key } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

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
        <button className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors">
          <Save className="w-5 h-5" />
          <span>Save Settings</span>
        </button>
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
              {['English', 'Somali', 'Arabic'].map((lang) => (
                <div key={lang} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{lang}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#6B9E3E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B9E3E]"></div>
                  </label>
                </div>
              ))}
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

