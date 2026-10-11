import type { MDXComponents, MDXContent } from 'mdx/types';
import type { ComponentProps, ComponentType } from 'react';

import { useMemo } from 'react';
import * as runtime from 'react/jsx-runtime';
import Image from 'next/image';

import { runSync } from '@mdx-js/mdx';

import { cn } from '@/common/helpers/cn';

type MDXProps = {
  content: string;
  components?: Record<string, ComponentType>;
};

const sharedComponents: MDXComponents = {
  h2: ({ className, children, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-14 mb-4 font-bold font-display text-[2rem] uppercase leading-[0.95] first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn(
        'mt-10 mb-3 font-bold font-display text-2xl uppercase leading-none',
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p
      className={cn('mb-5 max-w-[68ch] text-lg leading-relaxed', className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentProps<'a'>) => (
    <a
      className={cn(
        'font-medium underline decoration-2 decoration-tape underline-offset-4 hover:decoration-foreground',
        className,
      )}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  strong: ({ className, ...props }: ComponentProps<'strong'>) => (
    <strong className={cn('font-bold', className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
      className={cn(
        'my-6 ml-6 max-w-[66ch] text-lg leading-relaxed [list-style-type:square] marker:text-foreground/60 [&>li]:mt-2 [&>li]:pl-1',
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol
      className={cn(
        'my-6 ml-6 max-w-[66ch] list-decimal text-lg leading-relaxed marker:font-semibold marker:tabular-nums [&>li]:mt-2 [&>li]:pl-1',
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('', className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentProps<'hr'>) => (
    <hr
      className={cn('my-12 border-0 border-paint border-t-2', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'my-8 border-foreground/40 border-l pl-6 text-muted-foreground italic [&>p]:mb-2',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'not-[pre>code]:rounded-[3px] not-[pre>code]:bg-board not-[pre>code]:px-1.5 not-[pre>code]:py-0.5 font-mono not-[pre>code]:text-[0.875em]',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre
      className={cn(
        'my-6 overflow-x-auto rounded-md border-2 border-paint p-5 font-mono text-sm leading-relaxed',
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table
        className={cn(
          'w-full border-collapse text-left tabular-nums',
          className,
        )}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'stamp border-paint border-b-2 py-2 pr-4 text-xs',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td
      className={cn(
        'border-foreground/15 border-b py-2 pr-4 align-top',
        className,
      )}
      {...props}
    />
  ),
  Image,
};

function useMDXComponent(content: string): MDXContent {
  return useMemo(() => {
    const { default: Component } = runSync(content, {
      ...runtime,
      baseUrl: import.meta.url,
    });

    return Component;
  }, [content]);
}

export const MDX = ({ content, components }: MDXProps) => {
  const Component = useMDXComponent(content);

  // Compiled MDX is memoized by content, so this is stable across renders.
  return <Component components={{ ...sharedComponents, ...components }} />;
};
