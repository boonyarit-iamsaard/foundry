import Image from 'next/image';
import Link from 'next/link';

import { ClockIcon, FileSearch, FileTextIcon } from 'lucide-react'; // Import new icons

import { Tag } from '@/common/components/tag';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { formatDate } from '@/common/helpers/date';

import type { Article } from '@/velite';

interface ArticleCardProps {
  article: Article;
  activeTags?: string[];
}

export function ArticleCard({
  article,
  activeTags,
}: Readonly<ArticleCardProps>) {
  return (
    <Card className="group hover:ring-muted-foreground grid gap-0 overflow-hidden p-0 transition-all hover:ring-2 md:grid-cols-4">
      <div className="bg-muted relative aspect-video md:col-span-1 md:aspect-auto md:h-full">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw"
          className="object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
          priority={false}
          quality={85}
        />
      </div>
      <div className="flex flex-col p-6 md:col-span-3">
        <CardHeader className="mb-2 p-0">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-lg font-bold">
              <Link href={article.permalink} className="hover:text-primary">
                {article.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <time>{formatDate(article.date)}</time>
              <span className="flex items-center gap-1">
                <ClockIcon className="inline-block size-4" />
                {article.metadata.readingTime} min read
              </span>
              <span className="flex items-center gap-1">
                <FileTextIcon className="inline-block size-4" />
                {article.metadata.wordCount} words
              </span>
              {article.status === 'draft' ? <Badge>draft</Badge> : null}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-muted-foreground mb-4 line-clamp-2 justify-start p-0 text-sm">
          {article.description}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-0">
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                activeTags={activeTags}
                resource="articles"
              />
            ))}
          </div>
          <Button variant="link" asChild className="px-0">
            <Link href={article.permalink}>Read more</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export function ArticleCardPlaceholder() {
  return (
    <Card className="items-center py-8">
      <CardContent className="text-center">
        <FileSearch className="text-muted-foreground mx-auto mb-4 size-12" />
        <CardTitle className="text-xl">No articles found</CardTitle>
        <CardDescription className="mt-1">
          Try removing some filters or check back later
        </CardDescription>
      </CardContent>
    </Card>
  );
}
