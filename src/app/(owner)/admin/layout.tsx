import type { ReactNode } from 'react';

import { AdminShell } from '@/features/admin/components/admin-shell';
import { requireAdminUser } from '@/features/auth/server/admin';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  await requireAdminUser();

  return <AdminShell>{children}</AdminShell>;
}
