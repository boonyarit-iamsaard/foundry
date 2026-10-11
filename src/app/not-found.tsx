import type { Metadata } from 'next';

import Link from 'next/link';

import { EmptySlot } from '@/common/components/board/slot';
import { Button } from '@/common/components/ui/button';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="pegboard flex min-h-[calc(100dvh-4rem)] items-center py-16">
      <div className="container grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="type-display">This slot is empty</h1>
          <p className="max-w-[44ch] text-lg">
            There&apos;s an outline here but nothing in it. The page may have
            moved, or the link may be mistyped.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">Back to the board</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/articles">Browse articles</Link>
            </Button>
          </div>
        </div>
        <EmptySlot code="404" className="aspect-[4/3]">
          <span className="font-display font-extrabold text-[clamp(3.5rem,9vw,7rem)] uppercase leading-none tracking-[0.04em]">
            Missing
          </span>
        </EmptySlot>
      </div>
    </section>
  );
}
