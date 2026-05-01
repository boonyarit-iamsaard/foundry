'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useClerk } from '@clerk/nextjs';
import { LogOutIcon, TerminalSquareIcon } from 'lucide-react';

import { Button } from '@/common/components/ui/button';

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: Readonly<AdminShellProps>) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-background/95 sticky top-0 z-10 border-b">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <TerminalSquareIcon className="size-5" />
            <span className="font-semibold">Owner Console</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut(() => router.push('/'))}
          >
            <LogOutIcon className="size-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
