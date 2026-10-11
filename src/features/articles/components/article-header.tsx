import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';

import type { Article } from '@/velite';

type ArticleHeaderProps = Readonly<{
  article: Article;
}>;

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="space-y-6 pt-14 pb-10 sm:pt-20">
      <h1 className="type-headline text-balance">{article.title}</h1>
      <p className="flex flex-wrap gap-x-3 text-muted-foreground text-sm tabular-nums">
        <time dateTime={new Date(article.date).toISOString()}>
          {formatDate(article.date)}
        </time>
        <span>{article.metadata.readingTime} min read</span>
        <span>{article.metadata.wordCount.toLocaleString('en-US')} words</span>
      </p>
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
