import type * as React from 'react';

import { cn } from '@/common/helpers/cn';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content flex min-h-32 w-full rounded-sm border-2 border-input bg-plate px-3 py-2.5 text-base text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-foreground/70 focus-visible:border-foreground disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
