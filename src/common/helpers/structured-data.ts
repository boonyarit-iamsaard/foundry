import { appConfig } from '@/core/configs/app.config';
import type { Dated } from '@/common/helpers/date';
import { modifiedDate } from '@/common/helpers/date';
import { absoluteUrl } from '@/common/helpers/url';

import type { Article } from '@/velite';

const context = 'https://schema.org' as const;

// The one Person node every other entity points at, so search engines join
// them into a single person rather than one per page.
const personId = absoluteUrl('/#person');

type PersonReference = Readonly<{
  '@type': 'Person';
  '@id': string;
  name: string;
  url: string;
}>;

// Article pages don't carry the full Person node, so the reference repeats the
// name search engines need to show an author.
const personReference: PersonReference = {
  '@type': 'Person',
  '@id': personId,
  name: appConfig.title,
  url: absoluteUrl('/'),
};

type Schema = Readonly<{ '@context': typeof context }>;

/** The full Person node: who the site belongs to. */
export type PersonSchema = Schema &
  PersonReference &
  Readonly<{
    jobTitle: string;
    image: string;
    sameAs: readonly string[];
    address: Readonly<{
      '@type': 'PostalAddress';
      addressLocality: string;
      addressCountry: string;
    }>;
  }>;

/** The site itself, published by its owner. */
export type WebsiteSchema = Schema &
  Readonly<{
    '@type': 'WebSite';
    name: string;
    url: string;
    publisher: PersonReference;
  }>;

/** One article, written by the site owner. */
export type BlogPostingSchema = Schema &
  Readonly<{
    '@type': 'BlogPosting';
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    url: string;
    mainEntityOfPage: Readonly<{ '@type': 'WebPage'; '@id': string }>;
    author: PersonReference;
  }>;

/** The site owner, for the home page. */
export function personSchema({
  photo,
}: Readonly<{ photo: string }>): PersonSchema {
  return {
    '@context': context,
    ...personReference,
    jobTitle: 'Software Engineer',
    image: absoluteUrl(photo),
    sameAs: [appConfig.links.github, appConfig.links.linkedIn],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'TH',
    },
  };
}

/** The site itself, for the home page. */
export function websiteSchema(): WebsiteSchema {
  return {
    '@context': context,
    '@type': 'WebSite',
    name: appConfig.name,
    url: absoluteUrl('/'),
    publisher: personReference,
  };
}

type BlogPostingSource = Dated &
  Pick<Article, 'title' | 'description' | 'permalink'> &
  Readonly<{ cover: Pick<Article['cover'], 'src'> }>;

/** One article, for its own page. */
export function blogPostingSchema(
  article: BlogPostingSource,
): BlogPostingSchema {
  const url = absoluteUrl(article.permalink);

  return {
    '@context': context,
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.cover.src),
    datePublished: article.date,
    dateModified: modifiedDate(article),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: personReference,
  };
}
