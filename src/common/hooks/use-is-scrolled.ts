'use client';

import type { RefObject } from 'react';

import { useEffect, useState } from 'react';

/**
 * Whether the page has scrolled past an element pinned to the top of the page
 * whose height is the scroll threshold. Observing it updates while scrolling,
 * with no scroll listener to debounce.
 */
export function useIsScrolled(
  scrollThresholdRef: RefObject<HTMLElement | null>,
): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const element = scrollThresholdRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries) =>
      setIsScrolled(!(entries[0]?.isIntersecting ?? true)),
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollThresholdRef]);

  return isScrolled;
}
