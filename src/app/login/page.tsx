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

// Login translations
const loginTranslations = {
  en: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your account',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInButton: 'Sign In',
    noAccount: "Don't have an account?",
    signUpLink: 'Sign up here',
    loading: 'Signing in...',
    emailNotConfirmed: 'Your email address has not been confirmed yet.',
    emailNotConfirmedMessage: 'Please check your email and click the confirmation link to verify your account.',
    resendConfirmation: 'Resend Confirmation Email',
    resending: 'Sending...',
    confirmationSent: 'Confirmation email sent! Please check your inbox.',
    emailConfirmed: 'Email confirmed successfully! You can now sign in.',
  },
  so: {
    title: 'Soo Dhawow',
    subtitle: 'Gali akoonkaaga',
    emailLabel: 'Ciwaanka Email',
    emailPlaceholder: 'Geli ciwaanka emailkaaga',
    passwordLabel: 'Furaha',
    passwordPlaceholder: 'Geli furahaaga',
    rememberMe: 'I xasuuso',
    forgotPassword: 'Furaha ila wareegay?',
    signInButton: 'Gali',
    noAccount: 'Ma haysatid akoon?',
    signUpLink: 'Halkan iska diiwaan geli',
    loading: 'Galinaya...',
    emailNotConfirmed: 'Ciwaanka emailkaaga ma la xaqiijin.',
    emailNotConfirmedMessage: 'Fadlan hubi emailkaaga oo guji xiriirka xaqiijinta si aad u xaqiijiso akoonkaaga.',
    resendConfirmation: 'Dib u dir Emailka Xaqiijinta',
    resending: 'Dirista...',
    confirmationSent: 'Emailka xaqiijinta ayaa la diray! Fadlan hubi sanduuqaaga.',
    emailConfirmed: 'Emailka ayaa si guul leh loo xaqiijiyay! Hadda waa inaad gashid.',
  },
  ar: {
    title: 'مرحباً بعودتك',
    subtitle: 'قم بتسجيل الدخول إلى حسابك',
    emailLabel: 'عنوان البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signInButton: 'تسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    signUpLink: 'سجل هنا',
    loading: 'جارٍ تسجيل الدخول...',
    emailNotConfirmed: 'لم يتم تأكيد عنوان بريدك الإلكتروني بعد.',
    emailNotConfirmedMessage: 'يرجى التحقق من بريدك الإلكتروني والنقر على رابط التأكيد للتحقق من حسابك.',
    resendConfirmation: 'إعادة إرسال بريد التأكيد',
    resending: 'جارٍ الإرسال...',
    confirmationSent: 'تم إرسال بريد التأكيد! يرجى التحقق من صندوق الوارد الخاص بك.',
    emailConfirmed: 'تم تأكيد البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول.',
  },
};

export default function LoginPage() {
  const { language } = useLanguage();
  const { signIn, user, loading: authLoading, resendConfirmationEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resending, setResending] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const translations = loginTranslations[language] || loginTranslations.en;
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // Check for confirmation parameter in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('confirmed') === 'true') {
        setEmailConfirmed(true);
        // Clear the parameter from URL
        window.history.replaceState({}, '', '/login');
      }
    }
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailNotConfirmed(false);
    setConfirmationSent(false);
    setLoading(true);

    const result = await signIn(email, password);

    if (result.error) {
      // Check if error is related to email not confirmed
      const errorMessage = result.error.toLowerCase();
      const isEmailNotConfirmed = 
        errorMessage.includes('email not confirmed') ||
        errorMessage.includes('email not verified') ||
        errorMessage.includes('email_not_confirmed') ||
        errorMessage.includes('email_not_verified') ||
        errorMessage.includes('unconfirmed email') ||
        errorMessage.includes('email confirmation');
      
      if (isEmailNotConfirmed) {
        setEmailNotConfirmed(true);
        setError(translations.emailNotConfirmed);
      } else {
        setError(result.error);
      }
      setLoading(false);
    } else {
      // Navigation is handled in the signIn function
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    setResending(true);
    setError(null);
    setConfirmationSent(false);

    const result = await resendConfirmationEmail(email);

    if (result.error) {
      setError(result.error);
      setResending(false);
    } else {
      setConfirmationSent(true);
      setResending(false);
    }
  };

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

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Confirmed Success Message */}
            {emailConfirmed && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {translations.emailConfirmed}
              </div>
            )}
            {/* Error Message */}
            {error && (
              <div className={`px-4 py-3 rounded-lg text-sm ${
                emailNotConfirmed 
                  ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <p className="font-medium mb-1">{error}</p>
                {emailNotConfirmed && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm">{translations.emailNotConfirmedMessage}</p>
                    <button
                      type="button"
                      onClick={handleResendConfirmation}
                      disabled={resending}
                      className="w-full mt-2 bg-[#6B9E3E] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5a8a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {resending ? translations.resending : translations.resendConfirmation}
                    </button>
                    {confirmationSent && (
                      <p className="text-sm text-green-700 font-medium mt-2">
                        {translations.confirmationSent}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] transition-colors pr-12 text-black"
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#6B9E3E] border-gray-300 rounded focus:ring-[#6B9E3E]"
                />
                <span className="ml-2 text-sm text-gray-600">{translations.rememberMe}</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#6B9E3E] hover:text-[#2C5F2D] transition-colors"
              >
                {translations.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white py-3 rounded-lg font-medium hover:from-[#5a8a2e] hover:to-[#7ab338] transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? translations.loading : translations.signInButton}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {translations.noAccount}{' '}
                <Link
                  href="/register"
                  className="text-[#6B9E3E] hover:text-[#2C5F2D] font-medium transition-colors"
                >
                  {translations.signUpLink}
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
