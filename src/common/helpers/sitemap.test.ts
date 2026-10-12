import { describe, expect, it } from 'vitest';

import { sitemapEntries } from './sitemap';

const article = (
  slug: string,
  status: 'published' | 'archived' | 'draft',
  date = '2025-04-04T00:00:00.000Z',
) => ({ permalink: `/articles/${slug}`, status, date });

describe('sitemapEntries', () => {
  it('lists published articles and leaves out archived and draft ones', () => {
    const urls = sitemapEntries({
      articles: [
        article('published-article', 'published'),
        article('archived-article', 'archived'),
        article('draft-article', 'draft'),
      ],
      projects: [],
    }).map((entry) => entry.url);

    expect(urls).toContain('https://boonyarit.me/articles/published-article');
    expect(urls).not.toContain(
      'https://boonyarit.me/articles/archived-article',
    );
    expect(urls).not.toContain('https://boonyarit.me/articles/draft-article');
  });

  it('dates each page by when its content last changed', () => {
    const entries = sitemapEntries({
      articles: [
        {
          ...article('revised-article', 'published'),
          updated: '2025-06-01T00:00:00.000Z',
        },
        // Newer, but not listed anywhere, so it dates nothing.
        article('archived-article', 'archived', '2026-01-01T00:00:00.000Z'),
      ],
      projects: [
        { permalink: '/projects/portfolio', date: '2025-05-01T00:00:00.000Z' },
      ],
    });

    expect(entries).toEqual([
      {
        url: 'https://boonyarit.me/',
        lastModified: '2025-06-01T00:00:00.000Z',
      },
      {
        url: 'https://boonyarit.me/about',
        lastModified: '2025-06-01T00:00:00.000Z',
      },
      {
        url: 'https://boonyarit.me/articles',
        lastModified: '2025-06-01T00:00:00.000Z',
      },
      {
        url: 'https://boonyarit.me/projects',
        lastModified: '2025-05-01T00:00:00.000Z',
      },
      {
        url: 'https://boonyarit.me/articles/revised-article',
        lastModified: '2025-06-01T00:00:00.000Z',
      },
      {
        url: 'https://boonyarit.me/projects/portfolio',
        lastModified: '2025-05-01T00:00:00.000Z',
      },
    ]);
  });
});
