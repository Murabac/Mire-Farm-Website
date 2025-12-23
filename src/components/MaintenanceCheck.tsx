'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Pages that should be accessible even in maintenance mode
const ALLOWED_PATHS = [
  '/maintenance',
  '/login',
  '/dashboard',
  '/api',
];

export function MaintenanceCheck({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      // Skip check for allowed paths
      const isAllowedPath = ALLOWED_PATHS.some(path => pathname.startsWith(path));
      if (isAllowedPath) {
        setIsChecking(false);
        setIsAllowed(true);
        return;
      }

      try {
        // Add cache-busting to prevent stale data
        const response = await fetch(`/api/settings/maintenance?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await response.json();

        if (data.maintenanceMode) {
          // Redirect to maintenance page with message
          const message = encodeURIComponent(data.maintenanceMessage || '');
          router.push(`/maintenance?message=${message}`);
          setIsAllowed(false);
        } else {
          setIsAllowed(true);
        }
      } catch (error) {
        // On error, allow access
        setIsAllowed(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkMaintenance();
  }, [pathname, router]);

  // Show nothing while checking (or you could show a loading spinner)
  if (isChecking) {
    return null;
  }

  // If not allowed, don't render children (redirect will happen)
  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
}

