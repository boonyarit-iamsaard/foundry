import type { CSSProperties } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Slot } from '@/common/components/board/slot';
import { Tag } from '@/common/components/tag';
import { cn } from '@/common/helpers/cn';
import { formatDate } from '@/common/helpers/date';
import { slotCode } from '@/common/helpers/slot-code';

import type { Article } from '@/velite';
import { articles } from '@/velite';

type ArticleCardProps = Readonly<{
  article: Article;
  activeTags?: string[];
  /** Drop the cover and tags for a tight slot on the home board. */
  compact?: boolean;
  className?: string;
  plateClassName?: string;
  style?: CSSProperties;
}>;

export function ArticleCard({
  article,
  activeTags,
  compact = false,
  className,
  plateClassName,
  style,
}: ArticleCardProps) {
  const meta = (
    <p className="flex flex-wrap gap-x-3 text-muted-foreground text-sm tabular-nums">
      <time dateTime={new Date(article.date).toISOString()}>
        {formatDate(article.date)}
      </time>
      <span>{article.metadata.readingTime} min read</span>
      {article.status === 'draft' ? (
        <span className="stamp text-destructive text-xs">Draft</span>
      ) : null}
    </p>
  );

  const title = (
    <h3
      className={cn(
        'font-bold font-display uppercase leading-[0.98] tracking-[0.01em]',
        compact ? 'text-2xl' : 'text-3xl',
      )}
    >
      <Link
        href={article.permalink}
        className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none"
      >
        {article.title}
      </Link>
    </h3>
  );

  return (
    <Slot
      code={slotCode('W', articles, article.slug)}
      lift
      className={className}
      style={style}
      plateClassName={cn(
        'grid overflow-hidden',
        !compact && 'sm:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]',
        plateClassName,
      )}
    >
      {compact ? null : (
        <div className="relative aspect-[16/9] border-paint border-b-2 sm:aspect-auto sm:border-r-2 sm:border-b-0">
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 30vw"
            className="object-cover"
            quality={85}
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-5">
        {meta}
        {title}
        <p
          className={cn(
            'text-muted-foreground',
            compact ? 'line-clamp-3' : 'max-w-[62ch]',
          )}
        >
          {article.description}
        </p>
        {compact ? null : (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {article.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                activeTags={activeTags}
                resource="articles"
              />
            ))}
          </div>
        )}
      </div>
    </Slot>
  );
}
