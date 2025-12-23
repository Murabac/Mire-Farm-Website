import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { getGalleryCategories, getGalleryImages } from '@/lib/gallery-helpers';
import Gallery from './gallery-client';
import { GalleryCategory } from '@/types/gallery';
import { GalleryImage } from '@/types/gallery-images';
import { PageHeader } from '@/types/page-header';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData: PageHeader | null = await getPageHeaderByRoute('/gallery');
  // Fetch gallery categories server-side for instant rendering
  const categoriesData: GalleryCategory[] = await getGalleryCategories();
  // Fetch gallery images server-side for instant rendering
  const imagesData: GalleryImage[] = await getGalleryImages();

  return <Gallery pageHeaderData={pageHeaderData} categoriesData={categoriesData} imagesData={imagesData} />;
}
