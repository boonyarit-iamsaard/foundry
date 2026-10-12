'use client';

import type { RefObject } from 'react';

import { useEffect, useState } from 'react';

/**
 * Whether the page has scrolled past `marker`, an element pinned to the top
 * of the page whose height is the scroll threshold. Observing it updates
 * while scrolling, with no scroll listener to debounce.
 */
export function useIsScrolled(marker: RefObject<HTMLElement | null>): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = marker.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries) =>
      setIsScrolled(!(entries[0]?.isIntersecting ?? true)),
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [marker]);

  return isScrolled;
}
