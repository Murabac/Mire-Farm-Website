import { NewsArticle } from '@/components/news/NewsArticleCard';

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Regional Agriculture Officials Visit Mire Farms',
    date: 'December 10, 2024',
    author: 'Farm Management',
    image: '/images/gellary-1.jpg',
    excerpt: 'Officials from the Ministry of Agriculture toured our facilities to learn about our organic farming practices and discuss potential collaboration opportunities.',
    content: 'Representatives from the Ministry of Agriculture, along with international agricultural experts, visited Mire Farms to observe our sustainable farming practices. The delegation was impressed by our pesticide-free methods and the quality of our produce.',
    emoji: '🏛️',
    badge: 'Official Visit'
  },
  {
    id: 2,
    title: 'Mire Farms Expands to New Regional Markets',
    date: 'November 28, 2024',
    author: 'Business Development',
    image: '/images/gellary-2.jpg',
    excerpt: 'We are excited to announce that our organic produce is now available in markets across Djibouti and Ethiopia, marking a significant milestone in our expansion plans.',
    content: 'After months of preparation and meeting international quality standards, Mire Farms has successfully launched distribution channels in Djibouti and Ethiopia. This expansion represents our commitment to bringing quality organic produce to the wider Horn of Africa region.',
    emoji: '🌍',
    badge: 'Expansion'
  },
  {
    id: 3,
    title: 'Community Farmer Training Program Launch',
    date: 'November 15, 2024',
    author: 'Community Outreach',
    image: '/images/gellary-3.jpg',
    excerpt: 'Mire Farms launches comprehensive training program to help local farmers transition to sustainable organic farming practices.',
    content: 'Our new farmer training initiative aims to empower the local agricultural community with knowledge and skills in organic farming. The program covers sustainable practices, natural pest management, and efficient water usage.',
    emoji: '👨‍🌾',
    badge: 'Community'
  },
  {
    id: 4,
    title: 'Record Harvest Season at Mire Farms',
    date: 'October 30, 2024',
    author: 'Farm Operations',
    image: '/images/gellary-4.jpg',
    excerpt: 'This season&apos;s harvest exceeded expectations, demonstrating the effectiveness of our sustainable farming methods and dedicated team.',
    content: 'Thanks to favorable weather conditions and our improved organic farming techniques, this harvest season has been our most successful to date. We&apos;ve seen significant increases in both yield and quality across all our crops.',
    emoji: '🌾',
    badge: 'Milestone'
  },
  {
    id: 5,
    title: 'New Irrigation System Improves Water Efficiency',
    date: 'October 12, 2024',
    author: 'Infrastructure Team',
    image: '/images/gellary-5.jpg',
    excerpt: 'Installation of modern drip irrigation system reduces water usage by 40% while improving crop yields.',
    content: 'Our investment in modern irrigation infrastructure is paying dividends. The new system ensures optimal water distribution to all crops while significantly reducing water waste, supporting our commitment to environmental sustainability.',
    emoji: '💧',
    badge: 'Innovation'
  },
  {
    id: 6,
    title: 'Mire Farms Celebrates First Year Anniversary',
    date: 'September 20, 2024',
    author: 'Farm Management',
    image: '/images/gellary-6.jpg',
    excerpt: 'Reflecting on a successful first year of operation and looking forward to continued growth and community impact.',
    content: 'Since establishing our farm in 2024, we&apos;ve achieved remarkable milestones including successful harvests, market expansion, and positive community impact. We&apos;re grateful for the support of our community and excited for what the future holds.',
    emoji: '🎉',
    badge: 'Anniversary'
  },
];

// Function to get article by ID
export function getArticleById(id: string | number): NewsArticle | undefined {
  const articleId = typeof id === 'string' ? parseInt(id) : id;
  return newsArticles.find(article => article.id === articleId);
}
