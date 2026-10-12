import { describe, expect, it } from 'vitest';

import { isCurrent } from './nav-items';

describe('isCurrent', () => {
  it('matches the item’s own page', () => {
    expect(isCurrent('/articles', '/articles')).toBe(true);
  });

  it('matches pages nested under the item', () => {
    expect(isCurrent('/articles/some-slug', '/articles')).toBe(true);
  });

  it('ignores paths that only share a prefix', () => {
    expect(isCurrent('/articles-archive', '/articles')).toBe(false);
  });

  it('ignores other sections', () => {
    expect(isCurrent('/', '/articles')).toBe(false);
    expect(isCurrent('/projects', '/articles')).toBe(false);
  });
});
