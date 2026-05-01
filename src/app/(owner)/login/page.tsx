import { notFound, redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { LoginForm } from '@/features/auth/components/login-form';
import { isAdminUserId } from '@/features/auth/server/admin';

export default async function LoginPage() {
  const { userId } = await auth();

  if (isAdminUserId(userId)) {
    redirect('/admin');
  }

  if (userId) {
    notFound();
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
