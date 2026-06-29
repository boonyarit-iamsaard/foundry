import Link from 'next/link';

import { Button } from '@/common/components/ui/button';

type SectionHeaderProps = Readonly<{
  title: string;
  description?: string;
  viewAllLink?: string;
}>;

export function SectionHeader({
  title,
  description,
  viewAllLink,
}: SectionHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {viewAllLink ? (
          <Button variant="link" asChild>
            <Link href={viewAllLink}>View all</Link>
          </Button>
        ) : null}
      </div>
      {description ? (
        <p className="text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
