import PageHeader from '@/components/PageHeader';

export default function News() {
  return (
    <main>
      <PageHeader
        badge={{
          text: 'Latest Stories & Updates',
        }}
        title="News & Updates 📰"
        description={
          <>
            Stay informed about the <span className="text-[#6B9E3E] font-semibold">latest happenings</span> at Mire Farms
          </>
        }
      />
    </main>
  );
}


