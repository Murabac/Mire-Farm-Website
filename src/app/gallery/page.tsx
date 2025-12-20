import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { getGalleryCategories } from '@/lib/gallery-helpers';
import Gallery from './gallery-client';
import { GalleryCategory } from '@/types/gallery';
import { PageHeader } from '@/types/page-header';

export default async function GalleryPage() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData: PageHeader | null = await getPageHeaderByRoute('/gallery');
  // Fetch gallery categories server-side for instant rendering
  const categoriesData: GalleryCategory[] = await getGalleryCategories();

  return <Gallery pageHeaderData={pageHeaderData} categoriesData={categoriesData} />;
}
