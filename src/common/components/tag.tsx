import Link from 'next/link';

import { cn } from '../helpers/cn';
import { Button } from './ui/button';

type TagProps = Readonly<{
  tag: string;
  resource: 'articles' | 'projects';
  activeTags?: string[];
}>;

export function Tag({ tag, resource, activeTags = [] }: TagProps) {
  const isActive = activeTags.includes(tag);
  const tagsFilter = isActive
    ? activeTags.filter((t) => t !== tag)
    : activeTags.concat(tag);
  const href =
    tagsFilter.length === 0
      ? `/${resource}`
      : `/${resource}?tags=${tagsFilter.join(',')}`;

  return (
    <Button
      asChild
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'h-auto rounded-md border px-2 py-0.5 font-mono text-xs font-medium tracking-wide shadow-none',
        isActive
          ? 'border-transparent'
          : 'border-border text-foreground bg-transparent',
      )}
    >
      <Link href={href} scroll={false}>
        #{tag}
      </Link>
    </Button>
  );
}
