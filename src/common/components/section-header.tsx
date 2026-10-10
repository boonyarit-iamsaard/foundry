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
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-4xl tracking-tight">{title}</h2>
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
