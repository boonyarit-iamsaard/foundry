import type { VariantProps } from 'class-variance-authority';

import type { badgeVariants } from '@/common/components/ui/badge';
import { Badge } from '@/common/components/ui/badge';

import type { Project } from '@/velite';

type ProjectStatusBadgeProps = Readonly<{
  status: Project['status'];
}>;

// Emphasis follows the project's life: strongest while active, calmer once
// stable, faintest in maintenance. A dashed border marks experiments as
// tentative without reading as an error.
const statusStyles: Record<
  Project['status'],
  {
    variant: VariantProps<typeof badgeVariants>['variant'];
    className?: string;
  }
> = {
  experimental: { variant: 'outline', className: 'border-dashed' },
  active: { variant: 'default' },
  stable: { variant: 'secondary' },
  maintenance: { variant: 'outline' },
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const { variant, className } = statusStyles[status];

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}
