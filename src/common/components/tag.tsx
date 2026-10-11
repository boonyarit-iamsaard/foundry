import Link from 'next/link';

import { cn } from '../helpers/cn';

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
    <Link
      href={href}
      scroll={false}
      aria-pressed={isActive}
      className={cn(
        'stamp relative z-20 inline-flex h-7 items-center rounded-[2px] border-[1.5px] px-2 text-xs transition-colors duration-200',
        isActive
          ? 'border-tape bg-tape text-tape-ink'
          : 'border-foreground/40 text-foreground hover:border-foreground',
      )}
    >
      {tag}
    </Link>
  );
}
