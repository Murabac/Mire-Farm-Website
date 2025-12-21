'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserPlus, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CreateUserPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordValid = formData.password.length >= 6;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    if (!passwordValid) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create user');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/users');
      }, 1500);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/users"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#2C5F2D]">Create New User</h1>
          <p className="text-gray-600 mt-1">Add a new user to the system</p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>User created successfully! Redirecting...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] transition-colors text-black"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#6B9E3E] transition-colors text-black"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                required
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-12 text-black ${
                  formData.password.length > 0 && !passwordValid
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
            {formData.password.length > 0 && (
              <p className={`text-xs mt-1 ${passwordValid ? 'text-green-600' : 'text-red-600'}`}>
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Confirm password"
                required
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors pr-12 text-black ${
                  formData.confirmPassword.length > 0
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
            {formData.confirmPassword.length > 0 && (
              <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || !passwordValid || !passwordsMatch || !formData.email}
              className="flex items-center gap-2 px-6 py-3 bg-[#6B9E3E] text-white rounded-lg font-medium hover:bg-[#5a8433] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create User</span>
                </>
              )}
            </button>
            <Link
              href="/dashboard/users"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

