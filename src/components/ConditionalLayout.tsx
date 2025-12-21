'use client';

import { usePathname } from 'next/navigation';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide header/footer for auth pages and dashboard
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const isDashboardPage = pathname?.startsWith('/dashboard');
  
  if (isAuthPage || isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
