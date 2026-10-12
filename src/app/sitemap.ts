import type { MetadataRoute } from 'next';

import { sitemapEntries } from '@/common/helpers/sitemap';

import { articles, projects } from '@/velite';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries({ articles, projects });
}
