const produceEmojis: { [key: string]: string } = {
  'Tomatoes': '🍅',
  'Peppers': '🌶️',
  'Cucumbers': '🥒',
  'Lettuce': '🥬',
  'Spinach': '🥬',
  'Carrots': '🥕',
  'Pepper': '🫑',
  'Oranges': '🍊',
  'Potatoes': '🥔',
  'Melons': '🍈',
  'Herbs': '🌿',
  'Onions': '🧅'
};

const produce = [
  'Tomatoes', 'Peppers', 'Cucumbers', 'Lettuce', 'Spinach', 'Carrots',
  'Pepper', 'Oranges', 'Potatoes', 'Melons', 'Herbs', 'Onions'
];

export default function ProduceTypes() {
  return (
    <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-[#2C5F2D] mb-4">What We Grow 🌱</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We cultivate a <span className="text-[#6B9E3E] font-semibold">wide variety</span> of organic fruits and vegetables throughout the year, 
            adapting our crops to seasonal conditions for optimal quality.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {produce.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-[#6B9E3E]"
            >
              <div className="text-4xl mb-3">{produceEmojis[item]}</div>
              <p className="text-base text-gray-800 font-medium">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center px-2">
          <div className="inline-block bg-gradient-to-r from-[#6B9E3E] to-[#8BC34A] text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium shadow-lg">
            ✨ All produce is grown using natural, pesticide-free methods
          </div>
        </div>
      </div>
    </section>
  );
}

