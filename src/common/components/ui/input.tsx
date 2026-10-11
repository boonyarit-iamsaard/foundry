import type * as React from 'react';

import { cn } from '@/common/helpers/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-sm border-2 border-input bg-plate px-3 py-2 text-base text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-foreground/70 focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
