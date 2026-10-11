import type { ReactNode } from 'react';

import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

type AppLayoutProps = Readonly<{
  children: ReactNode;
}>;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <a
        href="#main"
        className="stamp fixed top-3 left-4 z-50 -translate-y-16 rounded-sm border-2 border-tape-edge bg-tape px-3 py-2 text-tape-ink focus-visible:translate-y-0 motion-safe:transition-transform"
      >
        Skip to content
      </a>
      <AppHeader />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <AppFooter />
    </>
  );
}
