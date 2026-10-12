'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowRightIcon, DownloadIcon, MenuIcon } from 'lucide-react';

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
import { isCurrent, navItems } from './nav-items';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close when the route changes, adjusting state during render rather than
  // in an effect so the drawer never paints open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // Links close the drawer themselves too, so a link to the current page
  // (or a hash on it, like /#contact) still closes it.
  function close() {
    setIsOpen(false);
  }

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen} autoFocus>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="size-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="pegboard flex flex-col border-paint border-r-2 shadow-none">
        <DrawerHeader className="bg-board">
          <DrawerTitle className="text-left font-display font-extrabold text-xl uppercase tracking-[0.03em]">
            <Link href="/" onClick={close}>
              {appConfig.title}
            </Link>
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Navigate to different sections of the website.
          </DrawerDescription>
        </DrawerHeader>
        <nav aria-label="Main" className="flex flex-1 flex-col gap-3 px-4 py-4">
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
                onClick={close}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-auto grid gap-3 pt-6">
            <Button asChild variant="tape" size="lg">
              <Link href="/#contact" onClick={close}>
                Write to me
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-plate">
              <a href={appConfig.resume} download>
                <DownloadIcon aria-hidden="true" />
                Download resume
              </a>
            </Button>
          </div>
        </nav>
        <div className="flex items-center justify-between border-paint border-t-2 bg-board p-4">
          <span className="stamp text-muted-foreground text-xs">Theme</span>
          <ThemeToggle />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
