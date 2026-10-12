import type { Metadata } from 'next';

import { appConfig } from '@/core/configs/app.config';
import { absoluteUrl } from '@/common/helpers/url';

export const defaultTitle = `${appConfig.title} · Software Engineer`;

export const titleTemplate = `%s | ${appConfig.title}`;

/** An image a link preview shows, with the size and alt text crawlers read. */
export type PreviewImage = Readonly<{
  url: string;
  width: number;
  height: number;
  alt: string;
}>;

type Covered = Readonly<{
  title: string;
  cover: Readonly<{ src: string; width: number; height: number }>;
}>;

/** An article's or project's cover as its preview image. */
export function coverPreviewImage({ title, cover }: Covered): PreviewImage {
  return {
    url: cover.src,
    width: cover.width,
    height: cover.height,
    alt: title,
  };
}

// X crops a large preview to 2:1, so an image much narrower than that, like a
// square cover, is shown whole as a small summary preview instead.
const largePreviewMinAspectRatio = 1.5;

function twitterCard(previewImage: PreviewImage | undefined) {
  const isNarrow =
    previewImage !== undefined &&
    previewImage.width / previewImage.height < largePreviewMinAspectRatio;

  return isNarrow ? 'summary' : 'summary_large_image';
}

type PageMetadata = Readonly<{
  title?: string;
  description?: string;
  /** The page's own path, which becomes its canonical URL. */
  path?: string;
  /** Without one, the route's generated `opengraph-image` is used. */
  previewImage?: PreviewImage;
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
  // An own `images` key, even an undefined one, stops Next from filling it
  // from the route's `opengraph-image` file.
  const imagesField = previewImage ? { images: [previewImage] } : {};

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
      ...imagesField,
    },
    twitter: {
      card: twitterCard(previewImage),
      title: shareTitle,
      description,
      ...imagesField,
    },
  };
}

// Filtered views such as `/articles?tags=node` share the unfiltered page's
// canonical URL, so search engines see one page rather than one per filter.
function canonicalUrl(path: string) {
  const { pathname } = new URL(path, appConfig.url);

  return absoluteUrl(pathname);
}
