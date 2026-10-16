import Link from 'next/link';

import { ArrowRightIcon, DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { Slot } from '@/common/components/board/slot';
import { Button } from '@/common/components/ui/button';

/**
 * The contact call, hung at the end of the reading text so a visitor who
 * landed deep on an article or project is still one step from the form and
 * the resume.
 */
export function AuthorSlot({
  heading,
  className,
}: Readonly<{ heading: string; className?: string }>) {
  return (
    <Slot
      className={className}
      plateClassName="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8"
    >
      <div className="space-y-3">
        <h2 className="font-bold font-display text-[1.875rem] uppercase leading-[0.95]">
          {heading}
        </h2>
        <p className="max-w-[52ch] text-lg leading-snug">
          I was an aircraft mechanic before I wrote code. Now I build backend,
          web and mobile software, and check it before it ships.
        </p>
        <p className="text-muted-foreground">
          Hiring, or want to talk about something I wrote?
        </p>
      </div>
      <div className="grid gap-3 sm:w-56">
        <Button asChild variant="tape">
          <Link href="/#contact">
            Write to me
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={appConfig.resume} download>
            <DownloadIcon aria-hidden="true" />
            Download resume
          </a>
        </Button>
      </div>
    </Slot>
  );
}
