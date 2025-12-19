'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';

// X Icon Component
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
);

const categoryEmojis: { [key: string]: string } = {
  'All': '🖼️',
  'Farm Operations': '🚜',
  'Products': '🍎',
  'Community': '👥'
};

const categories = ['All', 'Farm Operations', 'Products', 'Community'];

// Gallery images - using local images from the images folder
const galleryImages = [
  {
    id: 1,
    url: '/images/gellary-1.jpg',
    title: 'Sustainable Farm Fields',
    category: 'Farm Operations',
    emoji: '🌾'
  },
  {
    id: 2,
    url: '/images/gellary-2.jpg',
    title: 'Fresh Organic Vegetables',
    category: 'Products',
    emoji: '🥬'
  },
  {
    id: 3,
    url: '/images/gellary-3.jpg',
    title: 'Organic Fruits',
    category: 'Products',
    emoji: '🍓'
  },
  {
    id: 4,
    url: '/images/gellary-4.jpg',
    title: 'Green Farm Rows',
    category: 'Farm Operations',
    emoji: '🌱'
  },
  {
    id: 5,
    url: '/images/gellary-5.jpg',
    title: 'Harvest Time',
    category: 'Farm Operations',
    emoji: '🧺'
  },
  {
    id: 6,
    url: '/images/gellary-6.jpg',
    title: 'Community Farming',
    category: 'Community',
    emoji: '👥'
  },
  {
    id: 7,
    url: '/images/gellary-7.jpg',
    title: 'Organic Vegetables Basket',
    category: 'Products',
    emoji: '🧺'
  },
  {
    id: 8,
    url: '/images/gellary-8.jpg',
    title: 'Greenhouse Farming',
    category: 'Farm Operations',
    emoji: '🏡'
  },
];

type GalleryImage = typeof galleryImages[0];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

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
      
      {/* Filter Buttons */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full transition-all transform hover:scale-105 text-xs md:text-sm font-medium shadow-md ${
                  filter === category
                    ? 'bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <span className="mr-1.5">{categoryEmojis[category]}</span>
                {category}
              </button>
            ))}
          </div>
          
          <div className="text-center mt-4 md:mt-6">
            <p className="text-sm md:text-base text-gray-600">
              Showing <span className="text-[#6B9E3E] font-bold">{filteredImages.length}</span> {filteredImages.length === 1 ? 'image' : 'images'}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/90 backdrop-blur-sm text-lg md:text-xl p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {image.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
                    <h3 className="text-base md:text-lg mb-1.5">{image.title}</h3>
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs">
                      <span>{categoryEmojis[image.category]}</span>
                      <span>{image.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-3 md:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-3 md:top-4 right-3 md:right-4 text-white hover:text-[#8BC34A] bg-white/10 backdrop-blur-sm p-2.5 md:p-3 rounded-full transition-all hover:scale-110 z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div className="max-w-5xl max-h-[90vh] flex flex-col w-full">
            <div className="relative flex-1 flex items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="text-white text-center mt-3 md:mt-4 bg-black/50 backdrop-blur-sm p-3 md:p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
                <span className="text-2xl md:text-3xl">{selectedImage.emoji}</span>
                <h3 className="text-xl md:text-2xl">{selectedImage.title}</h3>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-sm md:text-base">
                <span>{categoryEmojis[selectedImage.category]}</span>
                <span className="text-[#8BC34A]">{selectedImage.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
