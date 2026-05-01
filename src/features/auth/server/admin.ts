import { notFound } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { env } from '@/core/configs/env.config';

function getAdminUserIds() {
  return new Set(
    (env.ADMIN_CLERK_USER_IDS ?? '')
      .split(',')
      .map((userId) => userId.trim())
      .filter(Boolean),
  );
}

export function isAdminUserId(userId: string | null | undefined) {
  if (!userId) {
    return false;
  }

  return getAdminUserIds().has(userId);
}

export async function requireAdminUser() {
  const session = await auth.protect({ unauthenticatedUrl: '/login' });

  if (!isAdminUserId(session.userId)) {
    notFound();
  }

  return session;
}
