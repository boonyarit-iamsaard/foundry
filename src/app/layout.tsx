import '@/core/styles/globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { appConfig } from '@/core/configs/app.config';
import { fontMono, fontSans } from '@/core/styles/fonts';
import { AppLayout } from '@/common/components/layout/app-layout';
import { ThemeProvider } from '@/common/components/theme-provider';
import { Toaster } from '@/common/components/ui/sonner';
import { TooltipProvider } from '@/common/components/ui/tooltip';
import { cn } from '@/common/helpers/cn';

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: appConfig.title,
    template: '%s | ' + appConfig.title,
  },
  description: appConfig.description,
  authors: appConfig.authors,
  keywords: appConfig.keywords,
  openGraph: {
    type: 'website',
    title: appConfig.title,
    description: appConfig.description,
    url: appConfig.url,
    siteName: appConfig.name,
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: appConfig.title,
    description: appConfig.description,
    creator: appConfig.creator,
    images: [],
  },
  icons: [],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground relative flex min-h-dvh flex-col font-sans antialiased',
          fontSans.variable,
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
