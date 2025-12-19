// Sparkles Icon Component
const Sparkles = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

interface PageHeaderProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  description: string | React.ReactNode;
  className?: string;
}

export default function PageHeader({ 
  badge, 
  title, 
  description,
  className = ''
}: PageHeaderProps) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-white to-[#F1F8E9] py-12 md:py-16 px-4 ${className}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B9E3E]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#8BC34A]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-[#6B9E3E]/10 text-[#6B9E3E] px-4 py-2 rounded-full mb-6">
            {badge.icon || <Sparkles className="w-4 h-4" />}
            <span className="text-sm font-medium">{badge.text}</span>
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2C5F2D] mb-4 md:mb-6">{title}</h1>
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
          {typeof description === 'string' ? (
            <p>{description}</p>
          ) : (
            description
          )}
        </div>
      </div>
    </section>
  );
}

