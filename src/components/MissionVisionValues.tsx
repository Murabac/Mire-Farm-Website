// Icon Components
// 100% Organic Icon - Leaf
const OrganicIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
  </svg>
);

// Community First Icon - People/Community
const CommunityIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <circle cx="9" cy="7" r="4"></circle>
  </svg>
);

// Regional Leader Icon - Globe
const LeaderIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

// Sustainable Growth Icon - Trending Up
const GrowthIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 7h6v6"></path>
    <path d="m22 7-8.5 8.5-5-5L2 17"></path>
  </svg>
);

const values = [
  {
    icon: OrganicIcon,
    title: '100% Organic',
    description: 'Delivering the finest organic produce with uncompromising standards.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: CommunityIcon,
    title: 'Community First',
    description: 'Supporting local communities and building lasting relationships.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: LeaderIcon,
    title: 'Regional Leader',
    description: 'Setting standards for sustainable agriculture in the Horn of Africa.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: GrowthIcon,
    title: 'Sustainable Growth',
    description: 'Committed to eco-friendly practices that preserve our land for future generations.',
    color: 'bg-orange-100 text-orange-600',
  },
];

export default function MissionVisionValues() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C5F2D] mb-4">Why Choose Mire Farms?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re more than just a farm - we&apos;re a community dedicated to sustainable agriculture and healthy living
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-[#6B9E3E] transition-all transform hover:scale-105 shadow-lg">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="text-2xl text-[#2C5F2D] mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide the highest quality organic produce while supporting our local 
              community and protecting the environment for future generations.
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-[#6B9E3E] transition-all transform hover:scale-105 shadow-lg">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl text-[#2C5F2D] mb-4">Our Vision</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become the leading organic farm in the Horn of Africa, setting standards 
              for sustainable agriculture and community empowerment.
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-[#6B9E3E] transition-all transform hover:scale-105 shadow-lg">
            <div className="text-5xl mb-4">💚</div>
            <h3 className="text-2xl text-[#2C5F2D] mb-4">Our Values</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sustainability, quality, community, innovation, and environmental stewardship 
              guide everything we do at Mire Farms.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-100">
              <div className={`inline-flex items-center justify-center w-20 h-20 ${value.color} rounded-full mb-4`}>
                <value.icon className="w-10 h-10" />
              </div>
              <h3 className="text-xl text-[#2C5F2D] mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

