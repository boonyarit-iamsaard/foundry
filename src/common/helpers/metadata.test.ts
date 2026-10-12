import { describe, expect, it } from 'vitest';

import { buildMetadata } from './metadata';

describe('buildMetadata', () => {
  it('applies the site-wide defaults', () => {
    const metadata = buildMetadata();

    expect(metadata.title).toBeUndefined();
    expect(metadata.description).toBe(
      'Software engineer in Bangkok, Thailand. Former aircraft mechanic building backend, web and mobile software that is checked before it ships.',
    );
    expect(metadata.openGraph).toMatchObject({
      type: 'website',
      siteName: 'boonyarit.me',
      title: 'Boonyarit Iamsa-ard · Software Engineer',
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Boonyarit Iamsa-ard · Software Engineer',
    });
  });

  it('lets a page override the defaults', () => {
    const metadata = buildMetadata({
      title: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      previewImage: '/static/cover-abc123.png',
      type: 'article',
    });

    expect(metadata.title).toBe('Node.js Import Style Guide');
    expect(metadata.description).toBe('How I import built-in modules.');
    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      siteName: 'boonyarit.me',
      title: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      images: [{ url: '/static/cover-abc123.png' }],
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      images: [{ url: '/static/cover-abc123.png' }],
    });
  });

  it('resolves the canonical URL against the site URL', () => {
    const metadata = buildMetadata({ path: '/articles/node-import' });

    expect(metadata.alternates?.canonical).toBe(
      'https://boonyarit.me/articles/node-import',
    );
    expect(metadata.openGraph?.url).toBe(
      'https://boonyarit.me/articles/node-import',
    );
  });

  it('drops the query from the canonical URL', () => {
    const metadata = buildMetadata({ path: '/articles?tags=node' });

    expect(metadata.alternates?.canonical).toBe(
      'https://boonyarit.me/articles',
    );
  });

  it('sets no canonical URL without a path', () => {
    expect(buildMetadata().alternates).toBeUndefined();
  });
});
