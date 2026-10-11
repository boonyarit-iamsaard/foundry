import type { Metadata } from 'next';

import { EmptySlot } from '@/common/components/board/slot';
import { FilterByTags } from '@/common/components/filter-by-tags';
import { PageHeader } from '@/common/components/page-header';
import type { SearchParams } from '@/common/definitions/search-params';
import { filterByTags } from '@/common/helpers/tag';
import { ArticleCard } from '@/features/articles/components/article-card';
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

const description =
  'Practical notes from the work: the conventions I use, and why.';

export const metadata: Metadata = {
  title: 'Articles',
  description,
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
    <div>
      <PageHeader title="Articles" description={description} />
      <section
        aria-label="Articles"
        className="pegboard border-paint border-t-2"
      >
        <div className="container space-y-10 pt-10 pb-20">
          <FilterByTags
            resourceTags={resourceTags}
            activeTags={activeTags}
            resource="articles"
          />
          <div className="grid gap-y-10">
            {filteredResource.length === 0 ? (
              <EmptySlot code="W-00" className="min-h-48">
                <div className="space-y-1 text-center">
                  <p className="font-bold font-display text-2xl uppercase">
                    Nothing in this slot
                  </p>
                  <p>No articles match these tags. Remove a tag to see more.</p>
                </div>
              </EmptySlot>
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
        </div>
      </section>
    </div>
  );
}
