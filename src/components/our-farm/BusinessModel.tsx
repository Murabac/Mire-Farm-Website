import Image from 'next/image';

// MapPin Icon Component
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// TrendingUp Icon Component
const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 7h6v6"></path>
    <path d="m22 7-8.5 8.5-5-5L2 17"></path>
  </svg>
);

export default function BusinessModel() {
  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-4 py-2 rounded-full mb-4 text-sm md:text-base font-medium">
              💼 Our Business Model
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2C5F2D] mb-4 leading-tight">
              Quality Over Quantity, Always
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-5 leading-relaxed">
              Mire Farms operates on a <strong className="text-[#6B9E3E]">sustainable business model</strong> that combines traditional 
              farming wisdom with modern organic practices. We focus on quality over quantity, 
              ensuring every piece of produce meets our high standards.
            </p>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-5 rounded-xl border-2 border-green-100">
                <div className="flex items-start gap-3">
                  <div className="bg-[#6B9E3E] text-white p-2.5 rounded-full flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#2C5F2D] mb-1.5">Perfect Location</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Strategically located in <strong>Arabsiyo Village, Gabiley Region</strong>, where 
                      the climate and soil conditions are ideal for growing a diverse range of fruits 
                      and vegetables.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-100">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 text-white p-2.5 rounded-full flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#2C5F2D] mb-1.5">Direct to Market</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      By cutting out middlemen and establishing direct relationships with buyers, 
                      we ensure <strong>fair prices</strong> for our produce while keeping costs reasonable for consumers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full bg-gradient-to-br from-[#6B9E3E]/20 to-[#8BC34A]/20 rounded-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 max-h-[400px] md:max-h-[615px]">
              <Image
                src="/images/our-farm-hero.jpg"
                alt="Farmers harvesting"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-white rounded-xl shadow-lg p-3 md:p-4 border-4 border-[#6B9E3E]">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-1">🌱</div>
                <div className="text-base md:text-lg font-bold text-[#6B9E3E]">Organic</div>
                <div className="text-xs text-gray-600">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

