import { CalendarIcon, ClockIcon, FileTextIcon } from 'lucide-react';

import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';

import type { Article } from '@/velite';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: Readonly<ArticleHeaderProps>) {
  return (
    <div className="space-y-2">
      <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        <div className="flex items-center gap-1">
          <CalendarIcon className="inline-block size-4" />
          <span>Published on {formatDate(article.date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <ClockIcon className="inline-block size-4" />
          <span>{article.metadata.readingTime} min read</span>
        </div>
        <div className="flex items-center gap-1">
          <FileTextIcon className="inline-block size-4" />
          <span>{article.metadata.wordCount} words</span>
        </div>
      </div>
      <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
        {article.title}
      </h1>
      <div className="flex flex-wrap gap-1">
        {article.tags.map((tag) => (
          <Tag key={tag} tag={tag} resource="articles" />
        ))}
      </div>
    </div>
  );
}
