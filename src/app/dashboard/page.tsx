'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Dashboard translations
const dashboardTranslations = {
  en: {
    title: 'Dashboard',
    welcome: 'Welcome to your dashboard',
    loading: 'Loading...',
    redirecting: 'Redirecting to login...',
  },
  so: {
    title: 'Dashboard',
    welcome: 'Ku soo dhawoow dashboardkaaga',
    loading: 'Waa la soo gelinayaa...',
    redirecting: 'Waa la wadi doonaa galitaanka...',
  },
  ar: {
    title: 'لوحة التحكم',
    welcome: 'مرحباً بك في لوحة التحكم',
    loading: 'جارٍ التحميل...',
    redirecting: 'جارٍ إعادة التوجيه إلى تسجيل الدخول...',
  },
};

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const translations = dashboardTranslations[language] || dashboardTranslations.en;

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9]">
        <div className="text-center">
          <p className="text-gray-600">{translations.redirecting}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-2">
                {translations.title}
              </h1>
              <p className="text-gray-600">
                {translations.welcome}, {user.email}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="px-6 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#6B9E3E]/10 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-[#6B9E3E]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[#2C5F2D] mb-4">
              Authentication Successful!
            </h2>
            <p className="text-gray-600 mb-6">
              Your dashboard is ready. This is a blank page for testing authentication.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-800 mb-3">User Information:</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name || 'Not set'}</p>
                <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
                {user.created_at && (
                  <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
