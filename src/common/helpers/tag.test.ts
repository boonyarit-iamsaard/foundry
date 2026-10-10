import { describe, expect, it } from 'vitest';

import { filterByTags } from './tag';

const tags = [
  {
    name: 'nextjs',
    slug: 'nextjs',
    count: { total: 2, articles: 1, projects: 1 },
  },
  { name: 'git', slug: 'git', count: { total: 1, articles: 1, projects: 0 } },
];

const projects = [{ slug: 'portfolio', date: '2025-01-01', tags: ['nextjs'] }];

describe('filterByTags', () => {
  it('offers a tag shared with articles on the projects page', async () => {
    const { resourceTags } = await filterByTags(
      projects,
      Promise.resolve({}),
      tags,
      'projects',
    );

    expect(resourceTags.map((tag) => tag.name)).toEqual(['nextjs']);
  });

  it('filters projects by a tag shared with articles', async () => {
    const { activeTags, filteredResource } = await filterByTags(
      projects,
      Promise.resolve({ tags: 'nextjs' }),
      tags,
      'projects',
    );

    expect(activeTags).toEqual(['nextjs']);
    expect(filteredResource).toEqual(projects);
  });
});
