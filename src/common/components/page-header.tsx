import type { ReactNode } from 'react';

import { cn } from '../helpers/cn';

type PageHeaderProps = Readonly<{
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}>;

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header
      className={cn('container space-y-5 pt-14 pb-10 sm:pt-20', className)}
    >
      <h1 className="type-display">{title}</h1>
      {description ? (
        <p className="max-w-[56ch] text-lg text-muted-foreground sm:text-xl">
          {description}
        </p>
      ) : null}
      {children}
    </header>
  );
}
