'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Eye Icon Component
const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// Eye Off Icon Component
const EyeOff = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// Register translations
const registerTranslations = {
  en: {
    title: 'Create Account',
    subtitle: 'Sign up to get started',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    passwordRequirements: 'Password must be at least 6 characters',
    passwordsMatch: 'Passwords match',
    passwordsDontMatch: 'Passwords do not match',
    signUpButton: 'Sign Up',
    haveAccount: 'Already have an account?',
    signInLink: 'Sign in here',
    loading: 'Creating account...',
    success: 'Account created! Please check your email to verify your account.',
  },
  so: {
    title: 'Abuur Akoon',
    subtitle: 'Iska diiwaan geli si aad u bilowdo',
    nameLabel: 'Magaca Buuxa',
    namePlaceholder: 'Geli magacaaga buuxa',
    emailLabel: 'Ciwaanka Email',
    emailPlaceholder: 'Geli ciwaanka emailkaaga',
    passwordLabel: 'Furaha',
    passwordPlaceholder: 'Samee furaha',
    confirmPasswordLabel: 'Xaqiiji Furaha',
    confirmPasswordPlaceholder: 'Xaqiiji furahaaga',
    passwordRequirements: 'Furahu waa inuu ugu yaraan 6 xaraf yahay',
    passwordsMatch: 'Furahyadu waa isku mid yihiin',
    passwordsDontMatch: 'Furahyadu ma isku mid yihiin',
    signUpButton: 'Iska Diiwaan Geli',
    haveAccount: 'Horey u haysatid akoon?',
    signInLink: 'Halkan gali',
    loading: 'Akoonka abuurista...',
    success: 'Akoonka ayaa la abuuray! Fadlan hubi emailkaaga si aad u xaqiijiso akoonkaaga.',
  },
  ar: {
    title: 'إنشاء حساب',
    subtitle: 'سجل للبدء',
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك الكامل',
    emailLabel: 'عنوان البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أنشئ كلمة مرور',
    confirmPasswordLabel: 'تأكيد كلمة المرور',
    confirmPasswordPlaceholder: 'أكد كلمة المرور',
    passwordRequirements: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
    passwordsMatch: 'كلمات المرور متطابقة',
    passwordsDontMatch: 'كلمات المرور غير متطابقة',
    signUpButton: 'إنشاء حساب',
    haveAccount: 'لديك حساب بالفعل؟',
    signInLink: 'سجل الدخول هنا',
    loading: 'جارٍ إنشاء الحساب...',
    success: 'تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني للتحقق من حسابك.',
  },
};

export default function RegisterPage() {
  const { language } = useLanguage();
  const { signUp, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const translations = registerTranslations[language] || registerTranslations.en;

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const passwordValid = password.length >= 6;

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B9E3E] mb-4"></div>
          <p className="text-gray-600">{translations.loading}</p>
        </div>
      </div>
    );
  }

  // Redirect if already logged in
  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!passwordValid) {
      setError(translations.passwordRequirements);
      return;
    }

    if (!passwordsMatch) {
      setError(translations.passwordsDontMatch);
      return;
    }

    setLoading(true);

    const result = await signUp(email, password, name);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/images/logo.png"
              alt="Mire Farms Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2C5F2D] mb-2">
            {translations.title}
          </h1>
          <p className="text-gray-600">{translations.subtitle}</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {translations.success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.nameLabel}
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={translations.namePlaceholder}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] transition-colors text-black"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={translations.emailPlaceholder}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] transition-colors text-black"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.passwordLabel}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={translations.passwordPlaceholder}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-12 text-black ${
                    password.length > 0 && !passwordValid
                      ? 'border-red-300 focus:border-red-500'
                      : passwordValid
                      ? 'border-green-300 focus:border-green-500'
                      : 'border-gray-200 focus:border-[#6B9E3E]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {password.length > 0 && (
                <p className={`text-xs mt-1 ${passwordValid ? 'text-green-600' : 'text-red-600'}`}>
                  {translations.passwordRequirements}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {translations.confirmPasswordLabel}
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={translations.confirmPasswordPlaceholder}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-12 text-black ${
                    confirmPassword.length > 0
                      ? passwordsMatch
                        ? 'border-green-300 focus:border-green-500'
                        : 'border-red-300 focus:border-red-500'
                      : 'border-gray-200 focus:border-[#6B9E3E]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordsMatch ? translations.passwordsMatch : translations.passwordsDontMatch}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !passwordValid || !passwordsMatch}
              className="w-full bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white py-3 rounded-lg font-medium hover:from-[#5a8a2e] hover:to-[#7ab338] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? translations.loading : translations.signUpButton}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {translations.haveAccount}{' '}
                <Link
                  href="/login"
                  className="text-[#6B9E3E] hover:text-[#2C5F2D] font-medium transition-colors"
                >
                  {translations.signInLink}
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-[#6B9E3E] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
