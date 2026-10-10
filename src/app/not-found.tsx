import Link from 'next/link';

import { FileQuestion } from 'lucide-react';

import { Button } from '@/common/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <FileQuestion className="size-12 text-muted-foreground" />
      <h1 className="font-semibold text-2xl tracking-tight">Page Not Found</h1>
      <p className="text-lg text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
