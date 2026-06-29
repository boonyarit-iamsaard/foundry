import type { ComponentProps } from 'react';

import { cn } from '@/common/helpers/cn';

/**
 * A quiet line of monospace metadata — the "field notes" margin texture
 * (stack labels, tooling). Mono is for metadata only; never headings or body.
 */
export function FieldNote({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground mt-2 font-mono text-sm break-words',
        className,
      )}
      {...props}
    />
  );
}
