'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide header/footer for auth pages
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const topBar = document.querySelector('[class*="TopBar"]')?.parentElement?.firstChild as HTMLElement;

    if (pathname === '/login' || pathname === '/register') {
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
      if (topBar) topBar.style.display = 'none';
    } else {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (topBar) topBar.style.display = '';
    }

    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (topBar) topBar.style.display = '';
    };
  }, [pathname]);

  return <>{children}</>;
}
