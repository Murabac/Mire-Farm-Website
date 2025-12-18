import Link from 'next/link';
import Image from 'next/image';

// Icon Components
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#2C5F2D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Image
              src="/images/Mire fields.png"
              alt="Mire Farms Logo"
              width={64}
              height={64}
              className="h-16 w-auto mb-4"
            />
            <p className="text-green-100 text-sm">
              Growing organic, pesticide-free produce in Somaliland since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-green-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-farm" className="text-green-100 hover:text-white transition-colors">
                  Our Farm
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-green-100 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-green-100 hover:text-white transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-green-100">Arabsiyo Village, Gabiley Region, Somaliland</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-green-100">+252 63 4222 609</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-green-100">info@mirefarms.com</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h3 className="mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <h3 className="mb-2">Hours</h3>
            <p className="text-green-100 text-sm">Saturday - Thursday: 7:00 AM - 5:00 PM</p>
            <p className="text-green-100 text-sm">Friday: Closed</p>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-100 text-sm">
            © {new Date().getFullYear()} Mire Farms. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-green-100 hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

