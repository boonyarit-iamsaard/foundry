import type { Article } from '@/velite';

type WithStatus = Pick<Article, 'status'>;

/**
 * Articles that get a page. Drafts are visible only while developing locally,
 * so they can be previewed but never reach the live site.
 */
export function visibleArticles<T extends WithStatus>(
  articles: T[],
  nodeEnv: string | undefined,
): T[] {
  if (nodeEnv === 'development') {
    return articles;
  }

  return articles.filter((article) => article.status !== 'draft');
}

/**
 * Articles shown in lists. Archived articles keep their page, so existing
 * links still work, but are no longer listed.
 */
export function listedArticles<T extends WithStatus>(articles: T[]): T[] {
  return articles.filter((article) => article.status !== 'archived');
}
