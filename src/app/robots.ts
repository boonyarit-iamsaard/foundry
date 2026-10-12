import type { MetadataRoute } from 'next';

import { appConfig } from '@/core/configs/app.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', appConfig.url).toString(),
  };
}
