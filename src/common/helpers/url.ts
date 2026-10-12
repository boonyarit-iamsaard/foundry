import { appConfig } from '@/core/configs/app.config';

/**
 * A site path as the full URL crawlers read. Home drops its trailing slash to
 * match the canonical link Next.js renders, so the canonical link, sitemap
 * and structured data all name one home URL.
 */
export function absoluteUrl(path: string): string {
  const url = new URL(path, appConfig.url);
  const isHome = url.pathname === '/' && !url.search && !url.hash;

  return isHome ? url.origin : url.toString();
}
