import Image from 'next/image';

export default function GrowthExpansion() {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">Growth & Expansion Plans 🚀</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            Building a brighter future for farming in the Horn of Africa
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center mb-10">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-full h-full bg-white/10 rounded-2xl"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500 max-h-[300px] md:max-h-[615px]">
              <Image
                src="/images/our-farm-hero.jpg"
                alt="Farming community"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 space-y-3 md:space-y-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="text-2xl md:text-3xl flex-shrink-0">🌍</div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl mb-2">Regional Market Expansion</h3>
                  <p className="text-sm md:text-base text-green-100 leading-relaxed">
                    We are actively expanding our distribution network to reach markets in 
                    <strong> Djibouti, Ethiopia, and Somalia</strong>, bringing quality organic produce to 
                    more communities across the Horn of Africa.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="text-2xl md:text-3xl flex-shrink-0">👨‍🌾</div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl mb-2">Farmer Training Programs</h3>
                  <p className="text-sm md:text-base text-green-100 leading-relaxed">
                    We&apos;re developing comprehensive <strong>training programs</strong> to share our knowledge 
                    with other farmers in the community, helping them adopt sustainable 
                    organic farming practices and improve their livelihoods.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="text-2xl md:text-3xl flex-shrink-0">🏗️</div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl mb-2">Infrastructure Development</h3>
                  <p className="text-sm md:text-base text-green-100 leading-relaxed">
                    Investing in <strong>modern farming infrastructure</strong>, including irrigation systems, 
                    storage facilities, and processing equipment to increase efficiency and 
                    maintain product quality.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 md:p-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="text-2xl md:text-3xl flex-shrink-0">🌿</div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl mb-2">Product Diversification</h3>
                  <p className="text-sm md:text-base text-green-100 leading-relaxed">
                    Continuously researching and testing <strong>new crop varieties</strong> to expand our 
                    product range and meet evolving market demands while maintaining our 
                    organic standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border-2 border-white/20 text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">4+</div>
            <div className="text-sm md:text-base">Countries Reached</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border-2 border-white/20 text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">100+</div>
            <div className="text-sm md:text-base">Farmers Trained</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border-2 border-white/20 text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">50+</div>
            <div className="text-sm md:text-base">Hectares Farmed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border-2 border-white/20 text-center">
            <div className="text-3xl md:text-4xl font-bold mb-1">100%</div>
            <div className="text-sm md:text-base">Organic Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}

