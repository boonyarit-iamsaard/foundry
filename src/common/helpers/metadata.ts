import type { Metadata } from 'next';

import { appConfig } from '@/core/configs/app.config';

export const defaultTitle = `${appConfig.title} · Software Engineer`;

export const titleTemplate = `%s | ${appConfig.title}`;

type PageMetadata = Readonly<{
  title?: string;
  description?: string;
  /** The page's own path, which becomes its canonical URL. */
  path?: string;
  previewImage?: string;
  type?: 'website' | 'article';
}>;

/**
 * Next.js merges metadata one key deep, so a page that sets `openGraph` or
 * `twitter` replaces the layout's whole object. Every page builds through here
 * so each of those objects carries the site-wide defaults.
 */
export function buildMetadata({
  title,
  description = appConfig.description,
  path,
  previewImage,
  type = 'website',
}: PageMetadata = {}): Metadata {
  const url = path ? canonicalUrl(path) : undefined;
  const shareTitle = title ?? defaultTitle;
  const images = previewImage ? [{ url: previewImage }] : undefined;

  return {
    // Left unset without a page title, so the layout's default applies
    // instead of being run through the title template.
    ...(title ? { title } : {}),
    description,
    authors: appConfig.authors,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type,
      siteName: appConfig.name,
      url,
      title: shareTitle,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images,
    },
  };
}

// Filtered views such as `/articles?tags=node` share the unfiltered page's
// canonical URL, so search engines see one page rather than one per filter.
function canonicalUrl(path: string) {
  const url = new URL(path, appConfig.url);
  url.search = '';
  url.hash = '';

  return url.toString();
}
