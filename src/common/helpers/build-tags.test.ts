import { describe, expect, it } from 'vitest';

import { buildTags } from './build-tags';

describe('buildTags', () => {
  it('counts a tag shared by articles and projects under both', () => {
    const tags = buildTags(
      [{ tags: ['nextjs', 'git'] }, { tags: ['git'] }],
      [{ tags: ['nextjs'] }],
    );

    expect(tags).toEqual([
      {
        name: 'nextjs',
        slug: 'nextjs',
        count: { total: 2, articles: 1, projects: 1 },
      },
      {
        name: 'git',
        slug: 'git',
        count: { total: 2, articles: 2, projects: 0 },
      },
    ]);
  });

  it('returns no tags when nothing is tagged', () => {
    expect(buildTags([], [])).toEqual([]);
  });
});
