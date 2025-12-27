import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ConditionalLayout from "@/components/ConditionalLayout";
import { MaintenanceCheck } from "@/components/MaintenanceCheck";

export const metadata: Metadata = {
  title: {
    default: "Mire Farms - Organic Farming in Somaliland | Fresh Pesticide-Free Produce",
    template: "%s | Mire Farms",
  },
  description: "Mire Farms cultivates high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland. Growing fresh, pesticide-free produce using sustainable farming methods. Order organic vegetables and fruits directly from the farm.",
  keywords: [
    "organic farming",
    "organic vegetables",
    "organic fruits",
    "Somaliland",
    "pesticide-free",
    "sustainable farming",
    "fresh produce",
    "Arabsiyo Village",
    "Gabiley Region",
    "organic produce",
    "farm fresh",
    "local farm",
  ],
  authors: [{ name: "Mire Farms" }],
  creator: "Mire Farms",
  publisher: "Mire Farms",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mirefarms.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "so": "/",
      "ar": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Mire Farms",
    title: "Mire Farms - Organic Farming in Somaliland | Fresh Pesticide-Free Produce",
    description: "Mire Farms cultivates high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland. Growing fresh, pesticide-free produce using sustainable farming methods.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Mire Farms - Organic Farming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mire Farms - Organic Farming in Somaliland",
    description: "Growing fresh, pesticide-free organic fruits and vegetables in Somaliland using sustainable farming methods.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <MaintenanceCheck>
              <ConditionalLayout>{children}</ConditionalLayout>
            </MaintenanceCheck>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

