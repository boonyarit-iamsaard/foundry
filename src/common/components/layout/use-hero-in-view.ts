'use client';

import { useEffect, useState } from 'react';

import { heroHeadingId } from '@/features/landing/hero';

/**
 * On the home page the hero already sets the name large, so the header
 * wordmark waits until the hero heading scrolls out of view.
 */
export function useHeroInView(pathname: string): boolean {
  const [isInView, setIsInView] = useState(pathname === '/');

  useEffect(() => {
    const heading =
      pathname === '/' ? document.getElementById(heroHeadingId) : null;

    if (!heading) {
      setIsInView(false);

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries[0]?.isIntersecting ?? false),
      { rootMargin: '-64px 0px 0px 0px' },
    );

    observer.observe(heading);

    return () => observer.disconnect();
  }, [pathname]);

  return isInView;
}
