import Image from 'next/image';
import Link from 'next/link';

// ArrowRight Icon Component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const products = [
  {
    name: 'Fresh Vegetables',
    description: 'A wide variety of organic vegetables grown naturally',
    image: '/images/prod-1.jpg',
  },
  {
    name: 'Organic Fruits',
    description: 'Delicious fruits cultivated with care and sustainability',
    image: '/images/prod-2.jpg',
  },
];

export default function ProductsOverview() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C5F2D] mb-4">Our Fresh Produce</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We cultivate a diverse range of organic fruits and vegetables, all grown 
            with care and without the use of harmful pesticides or chemicals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {products.map((product, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
              <div className="h-80 overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-[#6B9E3E] text-white px-4 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                  100% Organic
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl text-[#2C5F2D] mb-3">{product.name}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-[#6B9E3E] text-white px-10 py-4 rounded-full hover:bg-[#5a8433] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg font-medium"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

