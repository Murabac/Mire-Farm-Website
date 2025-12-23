import PageHeader from '@/components/PageHeader';
import BusinessModel from '@/components/our-farm/BusinessModel';
import ProduceTypes from '@/components/our-farm/ProduceTypes';
import SocialEnvironmentalImpact from '@/components/our-farm/SocialEnvironmentalImpact';
import GrowthExpansion from '@/components/our-farm/GrowthExpansion';
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

// Ensure fresh data is fetched on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function OurFarm() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData = await getPageHeaderByRoute('/our-farm');
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

