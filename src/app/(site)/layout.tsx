import type { ReactNode } from 'react';

import { AppLayout } from '@/common/components/layout/app-layout';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: Readonly<SiteLayoutProps>) {
  return <AppLayout>{children}</AppLayout>;
}
