import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';
import { slotCode } from '@/common/helpers/slot-code';

import type { Article } from '@/velite';
import { articles } from '@/velite';

type ArticleHeaderProps = Readonly<{
  article: Article;
}>;

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="space-y-6 pt-14 pb-10 sm:pt-20">
      <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.6vw,4.75rem)] uppercase leading-[0.9]">
        {article.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="tape">{slotCode('W', articles, article.slug)}</span>
        <p className="flex flex-wrap gap-x-3 text-muted-foreground text-sm tabular-nums">
          <time dateTime={new Date(article.date).toISOString()}>
            {formatDate(article.date)}
          </time>
          <span>{article.metadata.readingTime} min read</span>
          <span>
            {article.metadata.wordCount.toLocaleString('en-US')} words
          </span>
        </p>
      </div>
      <p className="text-lg text-muted-foreground sm:text-xl">
        {article.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {article.tags.map((tag) => (
          <Tag key={tag} tag={tag} resource="articles" />
        ))}
      </div>
    </header>
  );
}
