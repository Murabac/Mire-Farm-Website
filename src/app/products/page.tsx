import PageHeader from '@/components/PageHeader';
import { getPageHeaderByRoute } from '@/lib/page-header-helpers';

export default async function Products() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData = await getPageHeaderByRoute('/products');

  return (
    <main>
      <PageHeader data={pageHeaderData} />
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            Products page content coming soon...
          </p>
        </div>
      </section>
    </main>
  );
}

