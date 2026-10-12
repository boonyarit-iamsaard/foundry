import type { MetadataRoute } from 'next';

import { appConfig } from '@/core/configs/app.config';
import type { Dated } from '@/common/helpers/date';
import { modifiedDate } from '@/common/helpers/date';
import { publishedArticles } from '@/features/articles/visibility';

import type { Article } from '@/velite';

type DatedPage = Dated & Readonly<{ permalink: string }>;

type SitemapContent = Readonly<{
  articles: (DatedPage & Pick<Article, 'status'>)[];
  projects: DatedPage[];
}>;

/**
 * Pages search engines should crawl. Archived articles keep their page and
 * stay indexable, but like drafts they are left out because nothing lists
 * them any more.
 */
export function sitemapEntries({
  articles,
  projects,
}: SitemapContent): MetadataRoute.Sitemap {
  const published = publishedArticles(articles);
  const pages = [...published, ...projects];

  // A list page changes when the newest thing it lists does; home and about
  // follow the newest content overall.
  const siteModified = latestModifiedDate(pages);

  return [
    entry('/', siteModified),
    entry('/about', siteModified),
    entry('/articles', latestModifiedDate(published)),
    entry('/projects', latestModifiedDate(projects)),
    ...pages.map((page) => entry(page.permalink, modifiedDate(page))),
  ];
}

function latestModifiedDate(content: Dated[]): string | undefined {
  return content
    .map(modifiedDate)
    .reduce<string | undefined>(
      (latest, date) => (latest === undefined || date > latest ? date : latest),
      undefined,
    );
}

function entry(path: string, lastModified: string | undefined) {
  return {
    url: new URL(path, appConfig.url).toString(),
    ...(lastModified ? { lastModified } : {}),
  };
}
