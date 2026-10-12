import '@/core/styles/globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { appConfig } from '@/core/configs/app.config';
import {
  fontDisplay,
  fontMono,
  fontSans,
  fontStencil,
} from '@/core/styles/fonts';
import { AppLayout } from '@/common/components/layout/app-layout';
import { ThemeProvider } from '@/common/components/theme-provider';
import { Toaster } from '@/common/components/ui/sonner';
import { TooltipProvider } from '@/common/components/ui/tooltip';
import { cn } from '@/common/helpers/cn';
import {
  buildMetadata,
  defaultTitle,
  titleTemplate,
} from '@/common/helpers/metadata';

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

// No canonical URL here: every page sets its own, and one set here would leak
// to pages that do not.
export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: appConfig.url,
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'relative flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased',
          fontSans.variable,
          fontDisplay.variable,
          fontStencil.variable,
          fontMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AppLayout>{children}</AppLayout>
          </TooltipProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
