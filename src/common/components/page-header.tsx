import type { HTMLAttributes } from 'react';

import { cn } from '../helpers/cn';

export function PageHeader({
  children,
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLDivElement>>) {
  return (
    <section className={cn('container', className)} {...props}>
      <div className="flex flex-col items-start gap-2 py-8 sm:py-12">
        {children}
      </div>
    </section>
  );
}

export function PageHeaderHeading({
  className,
  children,
  ...props
}: Readonly<HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h1
      className={cn(
        'text-2xl leading-tight font-bold tracking-tighter sm:text-4xl',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function PageHeaderDescription({
  className,
  ...props
}: Readonly<HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={cn(
        'text-foreground line-clamp-1 text-base font-light text-balance sm:text-lg',
        className,
      )}
      {...props}
    />
  );
}
