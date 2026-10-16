'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import profile from '@/core/assets/images/profile.webp';
import { appConfig } from '@/core/configs/app.config';
import { cn } from '@/common/helpers/cn';
import { useIsScrolled } from '@/common/hooks/use-is-scrolled';

import { ThemeToggle } from '../theme-toggle';
import { MobileNav } from './mobile-nav';
import { isCurrent, navItems } from './nav-items';
import { useHeroInView } from './use-hero-in-view';

export function AppHeader() {
  const scrollThresholdRef = useRef<HTMLDivElement>(null);
  const isScrolled = useIsScrolled(scrollThresholdRef);
  const pathname = usePathname();
  const isHeroInView = useHeroInView(pathname);

  return (
    <>
      {/* Its 16px height is how far the page scrolls before the border shows.
          Pinned to the top of the page because <body> is its containing block. */}
      <div
        ref={scrollThresholdRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-4"
      />
      <header
        className={cn(
          'sticky top-0 z-30 w-full border-b bg-board transition-colors duration-200',
          isScrolled ? 'border-rim' : 'border-transparent',
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center"
            aria-label={`${appConfig.title}, home`}
          >
            <span className="relative block size-8 shrink-0 overflow-hidden rounded-[3px] border border-rim">
              <Image
                src={profile}
                alt=""
                fill
                sizes="32px"
                className="object-cover grayscale-[35%]"
              />
            </span>
            {/* Collapses to nothing while hidden, so the link shrinks to the avatar. */}
            <span
              aria-hidden={isHeroInView || undefined}
              className={cn(
                'grid transition-[grid-template-columns,opacity] duration-300 ease-out motion-reduce:transition-none',
                isHeroInView ? 'grid-cols-[0fr] opacity-0' : 'grid-cols-[1fr]',
              )}
            >
              <span className="min-w-0 overflow-hidden">
                <span className="flex items-baseline gap-2.5 whitespace-nowrap pl-3">
                  <span className="font-display font-extrabold text-[1.375rem] uppercase leading-none tracking-[0.03em]">
                    {appConfig.title}
                  </span>
                  <span className="hidden text-muted-foreground text-sm leading-none lg:inline">
                    Software Engineer
                  </span>
                </span>
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav aria-label="Main">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const current = isCurrent(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={current ? 'page' : undefined}
                        className={cn(
                          'stamp inline-flex h-9 items-center rounded-sm border-2 px-3 transition-colors duration-200',
                          current
                            ? 'border-tape-edge bg-tape text-tape-ink'
                            : 'border-transparent text-foreground hover:bg-foreground/8',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          <div className="flex items-center md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
