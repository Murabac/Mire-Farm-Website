// CheckCircle Icon Component
const CheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const benefits = [
  '100% Organic',
  'Pesticide Free',
  'Locally Grown',
  'Fresh Daily',
  'Sustainable',
  'Quality Assured',
];

export default function Benefits() {
  return (
    <section className="bg-[#6B9E3E] text-white py-8 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


