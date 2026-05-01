import Link from 'next/link';

import { Button } from '@/common/components/ui/button';

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllLink?: string;
}

export function SectionHeader({
  title,
  description,
  viewAllLink,
}: Readonly<SectionHeaderProps>) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
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
