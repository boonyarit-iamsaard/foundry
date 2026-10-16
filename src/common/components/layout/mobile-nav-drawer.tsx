'use client';

import Link from 'next/link';

import { ArrowRightIcon, DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { Button } from '@/common/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/common/components/ui/drawer';
import { cn } from '@/common/helpers/cn';

import { ThemeToggle } from '../theme-toggle';
import { isCurrent, navItems } from './nav-items';

type MobileNavDrawerProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
  // The menu button lives outside the drawer, so the owner puts focus back.
  onReturnFocus: () => void;
}>;

export function MobileNavDrawer({
  open,
  onOpenChange,
  pathname,
  onReturnFocus,
}: MobileNavDrawerProps) {
  // Links close the drawer themselves too, so a link to the current page
  // (or a hash on it, like /#contact) still closes it.
  function close() {
    onOpenChange(false);
  }

  return (
    <Drawer direction="left" open={open} onOpenChange={onOpenChange} autoFocus>
      <DrawerContent
        className="flex flex-col border-rim border-r bg-board shadow-none"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          onReturnFocus();
        }}
      >
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
                  'flex items-center rounded-sm border border-rim px-4 py-3 font-bold font-display text-lg uppercase tracking-[0.08em]',
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
        <div className="flex items-center justify-between border-rim border-t bg-board p-4">
          <span className="stamp text-muted-foreground text-xs">Theme</span>
          <ThemeToggle />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
