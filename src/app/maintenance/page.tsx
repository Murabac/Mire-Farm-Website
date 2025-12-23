'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MaintenancePage() {
  const router = useRouter();
  const [message, setMessage] = useState('We are currently performing scheduled maintenance. Please check back soon.');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Get the maintenance message from the URL if provided
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('message');
    if (msg) {
      setMessage(decodeURIComponent(msg));
    }
  }, []);

  const checkStatus = async () => {
    setChecking(true);
    try {
      // Add cache-busting to get fresh data
      const response = await fetch(`/api/settings/maintenance?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();
      
      if (!data.maintenanceMode) {
        // Maintenance mode is off, redirect to home
        router.push('/');
      }
    } catch (error) {
      // On error, try to go home anyway
      router.push('/');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F5E9] to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="Mire Farms"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>

        {/* Icon - Tractor */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-[#E8F5E9] border-2 border-[#6B9E3E]/30 rounded-full flex items-center justify-center">
            <svg className="w-14 h-14 text-[#6B9E3E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Tractor body */}
              <rect x="2" y="10" width="10" height="6" rx="1" />
              {/* Tractor cabin */}
              <path d="M6 10V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
              {/* Cabin window */}
              <rect x="7" y="6" width="3" height="3" rx="0.5" />
              {/* Engine/hood */}
              <rect x="12" y="12" width="6" height="4" rx="1" />
              {/* Exhaust pipe */}
              <path d="M14 12V9" />
              <path d="M13 9h2" />
              {/* Small front wheel */}
              <circle cx="16" cy="18" r="2" />
              {/* Large rear wheel */}
              <circle cx="5" cy="18" r="3" />
              {/* Wheel details */}
              <circle cx="5" cy="18" r="1" />
              <circle cx="16" cy="18" r="0.5" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#2C5F2D] mb-4">
          Under Maintenance
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          {message}
        </p>

        {/* Decorative elements */}
        <div className="flex justify-center gap-4 mb-8">
          <span className="text-4xl">🌱</span>
          <span className="text-4xl">🥬</span>
          <span className="text-4xl">🌿</span>
        </div>

        {/* Check Status Button */}
        <button
          onClick={checkStatus}
          disabled={checking}
          className="px-6 py-3 bg-[#6B9E3E] text-white rounded-lg hover:bg-[#5a8433] transition-colors disabled:opacity-50"
        >
          {checking ? 'Checking...' : 'Check Status'}
        </button>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-500">
          We apologize for any inconvenience. Our team is working hard to get things back up and running.
        </p>
      </div>
    </div>
  );
}

