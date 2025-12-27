import Hero from '@/components/home/Hero';
import Benefits from '@/components/home/Benefits';
import MissionVisionValues from '@/components/home/MissionVisionValues';
import ProductsOverview from '@/components/home/ProductsOverview';
import ContactSection from '@/components/home/ContactSection';
import SEOStructuredData from '@/components/SEOStructuredData';
import { getHeroSection } from '@/lib/hero-helpers';
import { getBenefits } from '@/lib/benefits-helpers';
import {
  getMissionVisionSectionHeader,
  getMissionVisionValues,
  getCoreValues,
} from '@/lib/mission-vision-helpers';
import { getProductsOverviewSectionHeader, getProductsOverviewCards } from '@/lib/products-overview-helpers';
import { getContactInfo } from '@/lib/contact-helpers';
import { HeroSection } from '@/types/hero';
import { Benefit } from '@/types/benefits';
import { ProductsOverviewSectionHeader, ProductsOverviewCard } from '@/types/products-overview';
import { ContactInfo } from '@/types/contact';
import type { Metadata } from 'next';

// Force dynamic rendering to always fetch fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirefarms.com';
  
  return {
    title: "Mire Farms - Organic Farming in Somaliland | Fresh Pesticide-Free Produce",
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
    openGraph: {
      title: "Mire Farms - Organic Farming in Somaliland",
      description: "Growing fresh, pesticide-free organic fruits and vegetables in Somaliland using sustainable farming methods.",
      url: baseUrl,
      siteName: "Mire Farms",
      images: [
        {
          url: `${baseUrl}/images/logo.png`,
          width: 1200,
          height: 630,
          alt: "Mire Farms - Organic Farming",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mire Farms - Organic Farming in Somaliland",
      description: "Growing fresh, pesticide-free organic fruits and vegetables in Somaliland.",
      images: [`${baseUrl}/images/logo.png`],
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default async function Home() {
  // Fetch hero section data from database
  // Pass the full data object to Hero component, which will handle language selection
  const heroData: HeroSection | null = await getHeroSection();
  
  // Fetch benefits data from database
  const benefitsData: Benefit[] = await getBenefits();

  // Fetch mission, vision, and values data from database
  const sectionHeader = await getMissionVisionSectionHeader();
  const missionVisionValues = await getMissionVisionValues();
  const coreValues = await getCoreValues();

  // Fetch products overview section header and cards from database
  const productsOverviewHeaderData: ProductsOverviewSectionHeader | null = await getProductsOverviewSectionHeader();
  const productsOverviewCardsData: ProductsOverviewCard[] = await getProductsOverviewCards();

  // Fetch contact information from database
  const contactInfoData: ContactInfo | null = await getContactInfo();

  return (
    <main>
      <SEOStructuredData contactInfo={contactInfoData} type="organization" />
      <Hero heroSectionData={heroData} />
      <Benefits benefitsData={benefitsData} />
      <MissionVisionValues
        sectionHeader={sectionHeader}
        missionVisionValues={missionVisionValues}
        coreValues={coreValues}
      />
      <ProductsOverview sectionHeaderData={productsOverviewHeaderData} cardsData={productsOverviewCardsData} />
      <ContactSection contactInfoData={contactInfoData} />
    </main>
  );
}

