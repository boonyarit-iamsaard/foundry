import { describe, expect, it } from 'vitest';

import { buildMetadata, coverPreviewImage } from './metadata';

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
      previewImage: {
        url: '/static/cover-abc123.png',
        width: 1600,
        height: 900,
        alt: 'Node.js Import Style Guide',
      },
      type: 'article',
    });

    expect(metadata.title).toBe('Node.js Import Style Guide');
    expect(metadata.description).toBe('How I import built-in modules.');
    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      siteName: 'boonyarit.me',
      title: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      images: [
        {
          url: '/static/cover-abc123.png',
          width: 1600,
          height: 900,
          alt: 'Node.js Import Style Guide',
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      title: 'Node.js Import Style Guide',
      description: 'How I import built-in modules.',
      images: [
        {
          url: '/static/cover-abc123.png',
          width: 1600,
          height: 900,
          alt: 'Node.js Import Style Guide',
        },
      ],
    });
  });

  it('shows a square preview image whole as a summary preview', () => {
    const metadata = buildMetadata({
      previewImage: { url: '/cover.webp', width: 1000, height: 1000, alt: '' },
    });

    expect(metadata.twitter).toMatchObject({ card: 'summary' });
  });

  it('leaves images unset without a preview image', () => {
    // An own `images` key, even undefined, stops Next from using the
    // route's generated opengraph-image.
    const metadata = buildMetadata();

    expect(metadata.openGraph).not.toHaveProperty('images');
    expect(metadata.twitter).not.toHaveProperty('images');
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

  it('writes the home canonical URL without a trailing slash', () => {
    expect(buildMetadata({ path: '/' }).alternates?.canonical).toBe(
      'https://boonyarit.me',
    );
  });

  it('sets no canonical URL without a path', () => {
    expect(buildMetadata().alternates).toBeUndefined();
  });
});

describe('coverPreviewImage', () => {
  it('uses the cover with the title as alt text', () => {
    expect(
      coverPreviewImage({
        title: 'Portfolio',
        cover: { src: '/static/cover.webp', width: 1600, height: 900 },
      }),
    ).toEqual({
      url: '/static/cover.webp',
      width: 1600,
      height: 900,
      alt: 'Portfolio',
    });
  });
});
