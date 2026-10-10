import type { Metadata } from 'next';

import { FilterByTags } from '@/common/components/filter-by-tags';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/common/components/page-header';
import type { SearchParams } from '@/common/definitions/search-params';
import { filterByTags } from '@/common/helpers/tag';
import {
  ArticleCard,
  ArticleCardPlaceholder,
} from '@/features/articles/components/article-card';
import { listedArticles } from '@/features/articles/visibility';

import { articles, tags } from '@/velite';

const listed = listedArticles(articles);

type ArticlesPageProps = Readonly<{
  searchParams: SearchParams;
}>;

const keywords = Array.from(
  new Set(
    listed
      .flatMap((article) => article.keywords)
      .filter((k) => k !== undefined),
  ),
);

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Insights, tutorials, and thoughts on web development.',
  keywords,
};

export default async function Page({ searchParams }: ArticlesPageProps) {
  const { filteredResource, activeTags, resourceTags } = await filterByTags(
    listed,
    searchParams,
    tags,
    'articles',
  );

  return (
    <div className="py-16">
      <PageHeader>
        <PageHeaderHeading>Articles</PageHeaderHeading>
        <PageHeaderDescription>
          Insights, tutorials, and thoughts on web development.
        </PageHeaderDescription>
      </PageHeader>
      <section className="container space-y-8 sm:space-y-12">
        <FilterByTags
          resourceTags={resourceTags}
          activeTags={activeTags}
          resource="articles"
        />
        <div className="grid gap-4 sm:gap-8">
          {filteredResource.length === 0 ? (
            <ArticleCardPlaceholder />
          ) : (
            filteredResource.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                activeTags={activeTags}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
