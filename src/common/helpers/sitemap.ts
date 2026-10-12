import type { MetadataRoute } from 'next';

import type { Dated } from '@/common/helpers/date';
import { modifiedDate } from '@/common/helpers/date';
import { absoluteUrl } from '@/common/helpers/url';
import { articlesListing } from '@/features/articles/listing';
import { publishedArticles } from '@/features/articles/visibility';
import { projectsListing } from '@/features/projects/listing';

import type { Article } from '@/velite';

type DatedPage = Dated & Readonly<{ permalink: string }>;

type SitemapContent = Readonly<{
  articles: readonly (DatedPage & Pick<Article, 'status'>)[];
  projects: readonly DatedPage[];
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
    entry(articlesListing.path, latestModifiedDate(published)),
    entry(projectsListing.path, latestModifiedDate(projects)),
    ...pages.map((page) => entry(page.permalink, modifiedDate(page))),
  ];
}

function latestModifiedDate(content: readonly Dated[]): string | undefined {
  return content
    .map(modifiedDate)
    .reduce<string | undefined>(
      (latest, date) => (latest === undefined || date > latest ? date : latest),
      undefined,
    );
}

function entry(path: string, lastModified: string | undefined) {
  return {
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
  };
}
