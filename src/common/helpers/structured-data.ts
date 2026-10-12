import { appConfig } from '@/core/configs/app.config';
import type { Dated } from '@/common/helpers/date';
import { modifiedDate } from '@/common/helpers/date';

import type { Article } from '@/velite';

const context = 'https://schema.org';

// The one Person node every other entity points at, so search engines join
// them into a single person rather than one per page.
const personId = new URL('/#person', appConfig.url).toString();

// Article pages don't carry the full Person node, so the reference repeats the
// name search engines need to show an author.
const personReference = {
  '@type': 'Person',
  '@id': personId,
  name: appConfig.title,
  url: appConfig.url.toString(),
};

/** The site owner, for the home page. */
export function personSchema({ photo }: Readonly<{ photo: string }>) {
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
export function websiteSchema() {
  return {
    '@context': context,
    '@type': 'WebSite',
    name: appConfig.name,
    url: appConfig.url.toString(),
    publisher: personReference,
  };
}

type BlogPostingSource = Dated &
  Pick<Article, 'title' | 'description' | 'permalink'> &
  Readonly<{ cover: Pick<Article['cover'], 'src'> }>;

/** One article, for its own page. */
export function blogPostingSchema(article: BlogPostingSource) {
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

function absoluteUrl(path: string) {
  return new URL(path, appConfig.url).toString();
}
