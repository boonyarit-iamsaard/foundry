import type { Metadata } from 'next';

import Link from 'next/link';

import { EmptySlot } from '@/common/components/board/slot';
import { FilterByTags } from '@/common/components/filter-by-tags';
import { PageHeader } from '@/common/components/page-header';
import type { SearchParams } from '@/common/definitions/search-params';
import { buildMetadata } from '@/common/helpers/metadata';
import { filterByTags } from '@/common/helpers/tag';
import { ArticleCard } from '@/features/articles/components/article-card';
import { articlesListing } from '@/features/articles/listing';
import { listedArticles } from '@/features/articles/visibility';

import { articles, tags } from '@/velite';

const listed = listedArticles(articles);

type ArticlesPageProps = Readonly<{
  searchParams: SearchParams;
}>;

export const metadata: Metadata = buildMetadata({
  title: articlesListing.title,
  description: articlesListing.description,
  path: articlesListing.path,
});

export default async function Page({ searchParams }: ArticlesPageProps) {
  const { filteredResource, activeTags, resourceTags } = await filterByTags(
    listed,
    searchParams,
    tags,
    'articles',
  );

  return (
    <div>
      <PageHeader
        title={articlesListing.title}
        description={articlesListing.description}
      />
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
              <EmptySlot className="min-h-48">
                <div className="space-y-1 text-center">
                  <p className="font-bold font-display text-2xl uppercase">
                    Nothing in this slot
                  </p>
                  <p>
                    No articles match these tags.{' '}
                    <Link href="/articles" className="tape-link font-semibold">
                      Clear the filter
                    </Link>
                  </p>
                </div>
              </EmptySlot>
            ) : (
              filteredResource.map((article, index) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  eager={index === 0}
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
