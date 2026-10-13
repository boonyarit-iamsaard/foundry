'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/common/components/ui/button';

// The drawer (vaul and Radix Dialog) is loaded on the first tap, so it stays
// out of the JS every page downloads before its first paint.
const MobileNavDrawer = dynamic(
  () => import('./mobile-nav-drawer').then((mod) => mod.MobileNavDrawer),
  { ssr: false },
);

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when the route changes, adjusting state during render rather than
  // in an effect so the drawer never paints open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);

  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  function openDrawer() {
    setHasOpened(true);
    setIsOpen(true);
  }

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={openDrawer}
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">Open menu</span>
      </Button>
      {hasOpened ? (
        <MobileNavDrawer
          open={isOpen}
          onOpenChange={setIsOpen}
          pathname={pathname}
          onReturnFocus={() => triggerRef.current?.focus()}
        />
      ) : null}
    </>
  );
}
