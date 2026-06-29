import Link from 'next/link';

import { Button } from '@/common/components/ui/button';
import { cn } from '@/common/helpers/cn';
import { getTagFilterHref } from '@/features/evidence/catalog';

import type { EvidenceResource } from '@/features/evidence/catalog';

type EvidenceTagProps = Readonly<{
  activeTags?: string[];
  resource: EvidenceResource;
  tag: string;
}>;

export function EvidenceTag({
  activeTags = [],
  resource,
  tag,
}: EvidenceTagProps) {
  const isActive = activeTags.includes(tag);
  const href = getTagFilterHref({ activeTags, resource, tag });

  return (
    <Button
      asChild
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'h-auto rounded-md border px-2 py-0.5 font-mono text-xs font-medium tracking-wide shadow-none',
        isActive
          ? 'border-transparent'
          : 'border-border text-foreground bg-transparent',
      )}
    >
      <Link href={href} scroll={false}>
        #{tag}
      </Link>
    </Button>
  );
}
