import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import MissionVisionValues from '@/components/MissionVisionValues';
import ProductsOverview from '@/components/ProductsOverview';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <MissionVisionValues />
      <ProductsOverview />
      <ContactSection />
    </main>
  );
}

