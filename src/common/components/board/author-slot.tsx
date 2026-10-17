import Link from 'next/link';

import { ArrowRightIcon } from 'lucide-react';

import { Slot } from '@/common/components/board/slot';
import { ResumeDownloadButton } from '@/common/components/resume-download-button';
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
      </div>
      <div className="grid gap-3 sm:w-56">
        <Button asChild variant="tape">
          <Link href="/#contact">
            Write to me
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
        <ResumeDownloadButton />
      </div>
    </Slot>
  );
}
