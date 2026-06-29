import type { Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/common/components/page-header';
import {
  ArticleCard,
  ArticleCardPlaceholder,
} from '@/features/articles/components/article-card';
import {
  getArticleKeywords,
  getFilteredArticles,
} from '@/features/evidence/catalog';
import { FilterByTags } from '@/features/evidence/components/filter-by-tags';

import type { SearchParams } from '@/common/definitions/search-params';

type ArticlesPageProps = Readonly<{
  searchParams: SearchParams;
}>;

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Insights, tutorials, and thoughts on web development.',
  keywords: getArticleKeywords(),
};

export default async function Page({ searchParams }: ArticlesPageProps) {
  const { activeTags, items, resourceTags } =
    await getFilteredArticles(searchParams);

  // TODO: add pagination
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
          {items.length === 0 ? (
            <ArticleCardPlaceholder />
          ) : (
            items.map((article) => (
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
