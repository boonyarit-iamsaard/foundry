type Tagged = { tags: string[] };

type TagEntry = {
  name: string;
  slug: string;
  count: { total: number; articles: number; projects: number };
};

function countTagged(items: Tagged[], name: string): number {
  return items.filter((item) => item.tags.includes(name)).length;
}

/**
 * Derives every tag from the content that uses it, counting articles and
 * projects separately so a shared tag belongs to both.
 */
export function buildTags(articles: Tagged[], projects: Tagged[]): TagEntry[] {
  const names = new Set(
    [...articles, ...projects].flatMap((item) => item.tags),
  );

  return Array.from(names, (name) => {
    const articleCount = countTagged(articles, name);
    const projectCount = countTagged(projects, name);

    return {
      name,
      slug: name,
      count: {
        total: articleCount + projectCount,
        articles: articleCount,
        projects: projectCount,
      },
    };
  });
}
