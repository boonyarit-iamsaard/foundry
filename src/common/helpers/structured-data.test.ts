import { describe, expect, it } from 'vitest';

import {
  blogPostingSchema,
  personSchema,
  websiteSchema,
} from './structured-data';

const photo = '/_next/static/media/profile.webp';

describe('personSchema', () => {
  it('describes who the site belongs to', () => {
    expect(personSchema({ photo })).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://boonyarit.me/#person',
      name: 'Boonyarit Iamsa-ard',
      jobTitle: 'Software Engineer',
      url: 'https://boonyarit.me/',
      image: 'https://boonyarit.me/_next/static/media/profile.webp',
      sameAs: [
        'https://github.com/boonyarit-iamsaard',
        'https://www.linkedin.com/in/boonyarit-iamsaard/',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bangkok',
        addressCountry: 'TH',
      },
    });
  });
});

describe('websiteSchema', () => {
  it('names the site and credits it to the person', () => {
    const website = websiteSchema();

    expect(website).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'boonyarit.me',
      url: 'https://boonyarit.me/',
      publisher: {
        '@type': 'Person',
        '@id': 'https://boonyarit.me/#person',
        name: 'Boonyarit Iamsa-ard',
        url: 'https://boonyarit.me/',
      },
    });
    expect(website.publisher['@id']).toBe(personSchema({ photo })['@id']);
  });
});

describe('blogPostingSchema', () => {
  const article = {
    title: 'Node.js Import Style Guide',
    description: 'How I import built-in modules.',
    cover: { src: '/static/cover-abc123.webp' },
    permalink: '/articles/node-import-style-guide',
    date: '2025-04-10T00:00:00.000Z',
  };

  it('describes an article and credits it to the person', () => {
    const posting = blogPostingSchema({
      ...article,
      updated: '2025-06-01T00:00:00.000Z',
    });

    expect(posting).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      image: 'https://boonyarit.me/static/cover-abc123.webp',
      datePublished: '2025-04-10T00:00:00.000Z',
      dateModified: '2025-06-01T00:00:00.000Z',
      url: 'https://boonyarit.me/articles/node-import-style-guide',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://boonyarit.me/articles/node-import-style-guide',
      },
      author: {
        '@type': 'Person',
        '@id': 'https://boonyarit.me/#person',
        name: 'Boonyarit Iamsa-ard',
        url: 'https://boonyarit.me/',
      },
    });
    expect(posting.author['@id']).toBe(personSchema({ photo })['@id']);
  });

  it('dates an unrevised article as modified when it was published', () => {
    expect(blogPostingSchema(article).dateModified).toBe(
      '2025-04-10T00:00:00.000Z',
    );
  });
});
