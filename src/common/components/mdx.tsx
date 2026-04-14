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
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn('mb-4 text-2xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn('mb-4 text-xl font-bold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('mb-4', className)} {...props} />
  ),
  a: ({ className, ...props }: ComponentProps<'a'>) => (
    <a
      className={cn(
        'text-primary font-medium underline underline-offset-4',
        className,
      )}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol
      className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn(
        'text-muted-foreground mt-6 border-l-2 pl-6 italic',
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps<'code'>) => (
    <code
      className={cn(
        'not-[pre>code]:bg-accent not-[pre>code]:text-accent-foreground relative rounded font-mono not-[pre>code]:px-1 not-[pre>code]:py-0.5 not-[pre>code]:transition-colors not-[pre>code]:duration-500',
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <pre
      className={cn('my-4 overflow-x-auto rounded-lg p-4 font-mono', className)}
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
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={{ ...sharedComponents, ...components }} />;
};
