import Hero from '@/components/home/Hero';
import Benefits from '@/components/home/Benefits';
import MissionVisionValues from '@/components/home/MissionVisionValues';
import ProductsOverview from '@/components/home/ProductsOverview';
import ContactSection from '@/components/home/ContactSection';
import { getHeroSection } from '@/lib/hero-helpers';
import { getBenefits } from '@/lib/benefits-helpers';
import {
  getMissionVisionSectionHeader,
  getMissionVisionValues,
  getCoreValues,
} from '@/lib/mission-vision-helpers';
import { HeroSection } from '@/types/hero';
import { Benefit } from '@/types/benefits';

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

  return (
    <main>
      <Hero heroSectionData={heroData} />
      <Benefits benefitsData={benefitsData} />
      <MissionVisionValues
        sectionHeader={sectionHeader}
        missionVisionValues={missionVisionValues}
        coreValues={coreValues}
      />
      <ProductsOverview />
      <ContactSection />
    </main>
  );
}

