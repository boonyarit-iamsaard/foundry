'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowRightIcon, DownloadIcon, MenuIcon } from 'lucide-react';

import profile from '@/core/assets/images/profile.webp';
import { appConfig } from '@/core/configs/app.config';
import { Button } from '@/common/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/common/components/ui/drawer';
import { cn } from '@/common/helpers/cn';

import { ThemeToggle } from '../theme-toggle';

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
];

type HeaderState = 'drawerOpen' | 'closedScrolled' | 'closedNotScrolled';

const headerStateClasses: Record<HeaderState, string> = {
  drawerOpen: 'border-transparent',
  closedScrolled: 'border-paint',
  closedNotScrolled: 'border-transparent',
};

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getHeaderClasses(
  shouldRenderDrawer: boolean,
  isScrolled: boolean,
): string {
  if (shouldRenderDrawer) {
    return headerStateClasses.drawerOpen;
  }

  if (isScrolled) {
    return headerStateClasses.closedScrolled;
  }

  return headerStateClasses.closedNotScrolled;
}

export function AppHeader() {
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

  // Close the drawer only when the route actually changes. Reacting to the
  // drawer's own open state here would close it the moment it opens.
  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) {
      return;
    }

    previousPathnameRef.current = pathname;
    handleDrawerOpenChange(false);
  }, [handleDrawerOpenChange, pathname]);

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

  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b-2 bg-board transition-colors duration-200',
        getHeaderClasses(shouldRenderDrawer, isScrolled),
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Boonyarit Iamsa-ard, home"
        >
          <span className="relative block size-8 shrink-0 overflow-hidden rounded-[3px] border-2 border-paint">
            <Image
              src={profile}
              alt=""
              fill
              sizes="32px"
              className="object-cover grayscale-[35%]"
            />
          </span>
          <span className="flex items-baseline gap-2.5">
            <span className="font-display font-extrabold text-[1.375rem] uppercase leading-none tracking-[0.03em]">
              Boonyarit Iamsa-ard
            </span>
            <span className="stamp hidden text-muted-foreground text-xs leading-none lg:inline">
              Software Engineer
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
          <Drawer
            direction="left"
            open={isDrawerOpen}
            onOpenChange={handleDrawerOpenChange}
            autoFocus={isDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DrawerTrigger>
            {shouldRenderDrawer ? (
              <DrawerContent className="pegboard flex flex-col border-paint border-r-2 shadow-none">
                <DrawerHeader className="bg-board">
                  <DrawerTitle className="text-left font-display font-extrabold text-xl uppercase tracking-[0.03em]">
                    <Link
                      href="/"
                      onClick={() => handleDrawerOpenChange(false)}
                    >
                      Boonyarit Iamsa-ard
                    </Link>
                  </DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Navigate to different sections of the website.
                  </DrawerDescription>
                </DrawerHeader>
                <nav
                  aria-label="Main"
                  className="flex flex-1 flex-col gap-3 px-4 py-4"
                >
                  {navItems.map((item) => {
                    const current = isCurrent(pathname, item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={current ? 'page' : undefined}
                        className={cn(
                          'flex items-center rounded-sm border-2 border-paint px-4 py-3 font-bold font-display text-lg uppercase tracking-[0.08em]',
                          current ? 'bg-tape text-tape-ink' : 'bg-plate',
                        )}
                        onClick={() => handleDrawerOpenChange(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <div className="mt-auto grid gap-3 pt-6">
                    <Button asChild variant="tape" size="lg">
                      <Link
                        href="/#contact"
                        onClick={() => handleDrawerOpenChange(false)}
                      >
                        Write to me
                        <ArrowRightIcon aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="bg-plate"
                    >
                      <a href={appConfig.resume} download>
                        <DownloadIcon aria-hidden="true" />
                        Download resume
                      </a>
                    </Button>
                  </div>
                </nav>
                <div className="flex items-center justify-between border-paint border-t-2 bg-board p-4">
                  <span className="stamp text-muted-foreground text-xs">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
              </DrawerContent>
            ) : null}
          </Drawer>
        </div>
      </div>
    </header>
  );
}
