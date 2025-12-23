'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  menu_key: string;
  label: string;
  href: string;
  visible: boolean;
}

const defaultNavLinks: MenuItem[] = [
  { menu_key: 'home', href: '/', label: 'Home', visible: true },
  { menu_key: 'our-farm', href: '/our-farm', label: 'Our Farm', visible: true },
  { menu_key: 'gallery', href: '/gallery', label: 'Gallery', visible: true },
  { menu_key: 'news', href: '/news', label: 'News', visible: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<MenuItem[]>(defaultNavLinks);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const fetchMenuSettings = async () => {
      try {
        const response = await fetch(`/api/settings/menu?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (response.ok) {
          const data: MenuItem[] = await response.json();
          if (data && Array.isArray(data) && data.length > 0) {
            setNavLinks(data);
          }
        }
      } catch (error) {
        // Use default links if fetch fails
      }
    };
    fetchMenuSettings();
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="w-full bg-white" dir="ltr">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Mire Farms Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex flex-1 justify-center gap-8 items-center">
            {navLinks.filter(link => link.visible).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-green-600'
                      : 'text-gray-800 hover:text-green-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons / Contact Us */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/#contact"
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-800 hover:text-green-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="flex flex-col gap-4">
              {navLinks.filter(link => link.visible).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block font-medium transition-colors duration-200 py-2 ${
                      isActive(link.href)
                        ? 'text-green-600'
                        : 'text-gray-800 hover:text-green-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="block bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center mt-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 py-2 text-center mt-2"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/#contact"
                    className="block bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

