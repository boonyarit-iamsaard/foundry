import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Admin</h1>
        <p className="text-muted-foreground mt-2">
          Protected area &mdash; only authenticated users can see this.
        </p>
      </div>
    </div>
  );
}
