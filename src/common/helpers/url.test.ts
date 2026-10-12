import { describe, expect, it } from 'vitest';

import { absoluteUrl } from './url';

describe('absoluteUrl', () => {
  it('resolves a path against the site URL', () => {
    expect(absoluteUrl('/articles/node-import-style-guide')).toBe(
      'https://boonyarit.me/articles/node-import-style-guide',
    );
  });

  it('writes home without a trailing slash', () => {
    expect(absoluteUrl('/')).toBe('https://boonyarit.me');
  });

  it('keeps the slash before a fragment on home', () => {
    expect(absoluteUrl('/#person')).toBe('https://boonyarit.me/#person');
  });
});
