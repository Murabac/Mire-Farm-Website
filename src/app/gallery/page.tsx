import PageHeader from '@/components/PageHeader';

export default function Gallery() {
  return (
    <main>
      <PageHeader
        badge={{
          text: 'Visual Journey Through Mire Farms',
        }}
        title="Gallery 📸"
        description={
          <>
            Explore our <span className="text-[#6B9E3E] font-semibold">farm, crops, and operations</span> through these beautiful images
          </>
        }
      />
    </main>
  );
}


