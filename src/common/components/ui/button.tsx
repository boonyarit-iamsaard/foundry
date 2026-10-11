import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/common/helpers/cn';

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-sm font-bold font-display text-[0.9375rem] uppercase tracking-[0.08em] outline-none transition-[background-color,color,translate] duration-200 ease-lift disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/88 active:translate-y-px',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/70',
        tape: 'bg-tape text-tape-ink hover:bg-tape/85 active:translate-y-px',
        ghost: 'hover:bg-foreground/8',
        link: 'h-auto px-0 text-foreground underline decoration-2 decoration-tape underline-offset-[6px] hover:decoration-foreground',
      },
      size: {
        default: 'h-10 px-4 has-[>svg]:px-3.5',
        sm: 'h-8 gap-1.5 px-3 text-[0.8125rem] has-[>svg]:px-2.5',
        lg: 'h-12 px-6 has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
