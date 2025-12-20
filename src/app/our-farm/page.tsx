import PageHeader from '@/components/PageHeader';
import BusinessModel from '@/components/our-farm/BusinessModel';
import ProduceTypes from '@/components/our-farm/ProduceTypes';
import SocialEnvironmentalImpact from '@/components/our-farm/SocialEnvironmentalImpact';
import GrowthExpansion from '@/components/our-farm/GrowthExpansion';

export default function OurFarm() {
  return (
    <main>
      <PageHeader
        badge={{
          text: 'Sustainable Agriculture Excellence',
        }}
        title="Our Farm 🌾"
        description={
          <>
            Learn about our <span className="text-[#6B9E3E] font-semibold">sustainable farming practices</span> and 
            commitment to <span className="text-[#6B9E3E] font-semibold">excellence</span>
          </>
        }
      />
      <BusinessModel />
      <ProduceTypes />
      <SocialEnvironmentalImpact />
      <GrowthExpansion />
    </main>
  );
}

