'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function useAppHeaderBehavior() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const pathname = usePathname();

  const handleDrawerOpenChange = useCallback((open: boolean) => {
    if (open) {
      setShouldRenderDrawer(true);
      requestAnimationFrame(() => setIsDrawerOpen(true));

      return;
    }

    setIsDrawerOpen(false);
    setTimeout(() => {
      setShouldRenderDrawer(false);
    }, 50);
  }, []);

  useEffect(() => {
    if (!isDrawerOpen && !shouldRenderDrawer) {
      return;
    }

    const closeDrawerTimeout = window.setTimeout(() => {
      handleDrawerOpenChange(false);
    }, 0);

    return () => window.clearTimeout(closeDrawerTimeout);
  }, [handleDrawerOpenChange, isDrawerOpen, pathname, shouldRenderDrawer]);

  useEffect(() => {
    const threshold = 16;
    let scrollTimeout: number | null = null;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = window.setTimeout(() => {
        setIsScrolled(window.scrollY > threshold);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return {
    handleDrawerOpenChange,
    isDrawerOpen,
    isScrolled,
    pathname,
    shouldRenderDrawer,
  };
}
