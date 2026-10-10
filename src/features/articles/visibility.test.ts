import { describe, expect, it } from 'vitest';

import { listedArticles, visibleArticles } from './visibility';

const published = { slug: 'published-article', status: 'published' as const };
const archived = { slug: 'archived-article', status: 'archived' as const };
const draft = { slug: 'draft-article', status: 'draft' as const };
const articles = [published, archived, draft];

describe('visibleArticles', () => {
  it('drops drafts outside development', () => {
    expect(visibleArticles(articles, 'production')).toEqual([
      published,
      archived,
    ]);
    expect(visibleArticles(articles, undefined)).toEqual([published, archived]);
  });

  it('keeps drafts in development so they can be previewed', () => {
    expect(visibleArticles(articles, 'development')).toEqual(articles);
  });
});

describe('listedArticles', () => {
  it('leaves archived articles out of lists', () => {
    expect(listedArticles(articles)).toEqual([published, draft]);
  });
});
