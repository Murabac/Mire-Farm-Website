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
import { getProducts } from '@/lib/products-helpers';
import { getContactInfo } from '@/lib/contact-helpers';
import { HeroSection } from '@/types/hero';
import { Benefit } from '@/types/benefits';
import { Product } from '@/types/products';
import { ContactInfo } from '@/types/contact';

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

  // Fetch products data from database
  const productsData: Product[] = await getProducts();

  // Fetch contact information from database
  const contactInfoData: ContactInfo | null = await getContactInfo();

  return (
    <main>
      <Hero heroSectionData={heroData} />
      <Benefits benefitsData={benefitsData} />
      <MissionVisionValues
        sectionHeader={sectionHeader}
        missionVisionValues={missionVisionValues}
        coreValues={coreValues}
      />
      <ProductsOverview productsData={productsData} />
      <ContactSection contactInfoData={contactInfoData} />
    </main>
  );
}

