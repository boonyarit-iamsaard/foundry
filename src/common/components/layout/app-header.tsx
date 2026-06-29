'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import profile from '@/core/assets/images/profile.webp';
import { Button } from '@/common/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/common/components/ui/drawer';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/common/components/ui/navigation-menu';
import { cn } from '@/common/helpers/cn';

import { ThemeToggle } from '../theme-toggle';

const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
];

type HeaderState = 'drawerOpen' | 'closedScrolled' | 'closedNotScrolled';

const headerStateClasses: Record<HeaderState, string> = {
  drawerOpen: 'border-transparent bg-transparent ring-transparent',
  closedScrolled:
    'backdrop-blur border-border bg-background/80 ring-border ring-1',
  closedNotScrolled: 'backdrop-blur bg-transparent',
};

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

// TODO: this component is getting too complex, break it down and ensure its performance is optimal
// TODO: re-consider debounce, transition, and animation timing
export function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const router = useRouter();
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

  return (
    <header
      className={cn(
        'fixed top-0 z-10 w-full transition-colors duration-100 ease-in-out',
        getHeaderClasses(shouldRenderDrawer, isScrolled),
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Home">
          <Image
            src={profile}
            alt="Boonyarit Iamsa-ard"
            width={32}
            height={32}
            priority
            sizes="32px"
            className="ring-border size-8 rounded-full object-cover ring-1"
          />
          <span className="font-bold">Boonyarit I.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex md:flex-1 md:justify-end">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'bg-transparent',
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Drawer
            direction="left"
            open={isDrawerOpen}
            onOpenChange={handleDrawerOpenChange}
            autoFocus={isDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            {shouldRenderDrawer ? (
              <DrawerContent className="flex flex-col border-r-0 shadow-none">
                <DrawerHeader>
                  <DrawerTitle
                    className="flex items-center gap-2.5"
                    onClick={() => {
                      handleDrawerOpenChange(false);
                      router.push('/');
                    }}
                  >
                    <Image
                      src={profile}
                      alt="Boonyarit Iamsa-ard"
                      width={32}
                      height={32}
                      sizes="32px"
                      className="ring-border size-8 rounded-full object-cover ring-1"
                    />
                    <span className="inline-block font-bold">Boonyarit I.</span>
                  </DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Navigate to different sections of the website.
                  </DrawerDescription>
                </DrawerHeader>
                <nav className="flex flex-1 flex-col gap-4 px-4 py-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors',
                        'hover:bg-muted',
                        pathname === item.href
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      onClick={() => handleDrawerOpenChange(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center justify-end border-t p-4">
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
