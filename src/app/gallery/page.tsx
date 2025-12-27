import { getPageHeaderByRoute } from '@/lib/page-header-helpers';
import { getGalleryCategories, getGalleryImages } from '@/lib/gallery-helpers';
import Gallery from './gallery-client';
import { GalleryCategory } from '@/types/gallery';
import { GalleryImage } from '@/types/gallery-images';
import { PageHeader } from '@/types/page-header';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mirefarms.com';
  
  return {
    title: "Gallery - Organic Farm Photos | Mire Farms",
    description: "View photos of Mire Farms' organic farming operations, fresh produce, farm facilities, and community activities in Somaliland.",
    keywords: [
      "farm photos",
      "organic farm gallery",
      "farm images",
      "agriculture photos",
      "farm operations",
      "fresh produce photos",
    ],
    openGraph: {
      title: "Gallery - Organic Farm Photos | Mire Farms",
      description: "View photos of Mire Farms' organic farming operations and fresh produce.",
      url: `${baseUrl}/gallery`,
      siteName: "Mire Farms",
      images: [
        {
          url: `${baseUrl}/images/gellary-1.jpg`,
          width: 1200,
          height: 630,
          alt: "Mire Farms Gallery",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery - Organic Farm Photos",
      description: "View photos of Mire Farms' organic farming operations.",
      images: [`${baseUrl}/images/gellary-1.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/gallery`,
    },
  };
}

export default async function GalleryPage() {
  // Fetch page header data server-side for instant rendering
  const pageHeaderData: PageHeader | null = await getPageHeaderByRoute('/gallery');
  // Fetch gallery categories server-side for instant rendering
  const categoriesData: GalleryCategory[] = await getGalleryCategories();
  // Fetch gallery images server-side for instant rendering
  const imagesData: GalleryImage[] = await getGalleryImages();

  return <Gallery pageHeaderData={pageHeaderData} categoriesData={categoriesData} imagesData={imagesData} />;
}
