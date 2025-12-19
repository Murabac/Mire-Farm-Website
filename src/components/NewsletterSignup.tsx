'use client';

import { useState } from 'react';

// Bell Icon Component
const Bell = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

// ArrowRight Icon Component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"></path>
  </svg>
);

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    console.log('Subscribing:', email);
    setEmail('');
  };

  return (
    <section className="py-8 md:py-10 px-4 bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-3 md:mb-4">
          <Bell className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-3 md:mb-4">Stay Updated! 📬</h2>
        <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed px-2">
          Subscribe to our newsletter to receive the <strong>latest news and updates</strong> from Mire Farms delivered straight to your inbox
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3 max-w-lg mx-auto px-2">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 md:px-5 py-2.5 md:py-3 border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-full focus:outline-none focus:border-white text-white placeholder-white/70 text-sm md:text-base"
          />
          <button
            type="submit"
            className="group bg-white text-[#6B9E3E] px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg text-sm md:text-base font-medium whitespace-nowrap flex items-center justify-center gap-2"
          >
            Subscribe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
        <p className="text-xs text-green-100 mt-3 md:mt-4">
          ✨ Join 500+ subscribers who get our monthly updates
        </p>
      </div>
    </section>
  );
}

