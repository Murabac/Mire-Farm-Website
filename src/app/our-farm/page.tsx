import PageHeader from '@/components/PageHeader';
import BusinessModel from '@/components/our-farm/BusinessModel';
import ProduceTypes from '@/components/our-farm/ProduceTypes';
import SocialEnvironmentalImpact from '@/components/our-farm/SocialEnvironmentalImpact';
import GrowthExpansion from '@/components/our-farm/GrowthExpansion';
import SEOStructuredData from '@/components/SEOStructuredData';
import { getContactInfo } from '@/lib/contact-helpers';
import {
  getBusinessModel,
  getBusinessModelFeatures,
  getProduceTypesHeader,
  getProduceItems,
  getSocialImpactHeader,
  getSocialImpactCards,
  getEnvironmentalCommitment,
  getGrowthExpansionHeader,
  getGrowthExpansionPlans,
  getGrowthExpansionStats,
} from '@/lib/our-farm-helpers';
import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { BusinessModel as BusinessModelType, BusinessModelFeature } from '@/types/our-farm';
import { ProduceTypesHeader, ProduceItem } from '@/types/our-farm';
import { SocialImpactHeader, SocialImpactCard, EnvironmentalCommitment } from '@/types/our-farm';
import { GrowthExpansionHeader, GrowthExpansionPlan, GrowthExpansionStat } from '@/types/our-farm';
import { ContactInfo } from '@/types/contact';
import type { Metadata } from 'next';

// Ensure fresh data is fetched on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirefarms.com';
  
  return {
    title: "Our Farm - Sustainable Organic Farming in Somaliland | Mire Farms",
    description: "Learn about Mire Farms' sustainable organic farming practices, business model, produce types, social impact, and growth expansion plans in Somaliland.",
    keywords: [
      "organic farming Somaliland",
      "sustainable agriculture",
      "organic farm",
      "community farming",
      "environmental impact",
      "social responsibility",
      "farm business model",
      "organic produce types",
    ],
    openGraph: {
      title: "Our Farm - Sustainable Organic Farming in Somaliland",
      description: "Learn about Mire Farms' sustainable organic farming practices, business model, and social impact.",
      url: `${baseUrl}/our-farm`,
      siteName: "Mire Farms",
      images: [
        {
          url: `${baseUrl}/images/our-farm-hero.jpg`,
          width: 1200,
          height: 630,
          alt: "Mire Farms - Our Farm",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Farm - Sustainable Organic Farming in Somaliland",
      description: "Learn about Mire Farms' sustainable organic farming practices.",
      images: [`${baseUrl}/images/our-farm-hero.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/our-farm`,
    },
  };
}

export default async function OurFarm() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData = await getPageHeaderByRoute('/our-farm');
  const contactInfoData: ContactInfo | null = await getContactInfo();
  const businessModelData: BusinessModelType | null = await getBusinessModel();
  const businessModelFeaturesData: BusinessModelFeature[] = await getBusinessModelFeatures();
  const produceTypesHeaderData: ProduceTypesHeader | null = await getProduceTypesHeader();
  const produceItemsData: ProduceItem[] = await getProduceItems();
  const socialImpactHeaderData: SocialImpactHeader | null = await getSocialImpactHeader();
  const socialImpactCardsData: SocialImpactCard[] = await getSocialImpactCards();
  const environmentalCommitmentData: EnvironmentalCommitment | null = await getEnvironmentalCommitment();
  const growthExpansionHeaderData: GrowthExpansionHeader | null = await getGrowthExpansionHeader();
  const growthExpansionPlansData: GrowthExpansionPlan[] = await getGrowthExpansionPlans();
  const growthExpansionStatsData: GrowthExpansionStat[] = await getGrowthExpansionStats();

  return (
    <main>
      <SEOStructuredData contactInfo={contactInfoData} type="organization" />
      <PageHeader data={pageHeaderData} />
      <BusinessModel 
        businessModelData={businessModelData}
        featuresData={businessModelFeaturesData}
      />
      <ProduceTypes 
        headerData={produceTypesHeaderData}
        produceItemsData={produceItemsData}
      />
      <SocialEnvironmentalImpact 
        headerData={socialImpactHeaderData}
        cardsData={socialImpactCardsData}
        commitmentData={environmentalCommitmentData}
      />
      <GrowthExpansion 
        headerData={growthExpansionHeaderData}
        plansData={growthExpansionPlansData}
        statsData={growthExpansionStatsData}
      />
    </main>
  );
}

