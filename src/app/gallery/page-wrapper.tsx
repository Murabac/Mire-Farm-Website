import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import Gallery from './page';

export default async function GalleryPage() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData = await getPageHeaderByRoute('/gallery');

  return <Gallery pageHeaderData={pageHeaderData} />;
}
