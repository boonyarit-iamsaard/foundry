import { tagsParamSchema } from '@/common/validators/tag';

import type { SearchParams } from '@/common/definitions/search-params';
import type { Article, Project, Tag } from '@/velite';
import { articles, projects, tags } from '@/velite';

export type EvidenceResource = 'articles' | 'projects';

type BaseEvidence = {
  date: string;
  keywords?: string[];
  slug: string;
  tags: string[];
};

type FilteredEvidence<T extends BaseEvidence> = {
  activeTags: string[];
  items: T[];
  resourceTags: Tag[];
};

const compareNewestFirst = (a: BaseEvidence, b: BaseEvidence) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const getTagsFromParams = (params: Awaited<SearchParams>): string[] => {
  const parsedTags = tagsParamSchema.safeParse(params);
  if (!parsedTags.success || !parsedTags.data.tags) {
    return [];
  }

  return Array.isArray(parsedTags.data.tags)
    ? parsedTags.data.tags
    : parsedTags.data.tags.split(',');
};

function getActiveResourceTags(
  resource: EvidenceResource,
  selectedTags: string[],
): { activeTags: string[]; resourceTags: Tag[] } {
  const resourceTags = tags.filter((tag) => tag.resource === resource);
  const activeTags = selectedTags.filter((tag) =>
    resourceTags.some((resourceTag) => resourceTag.name === tag),
  );

  return {
    activeTags,
    resourceTags,
  };
}

function uniqueKeywords(items: BaseEvidence[]): string[] {
  return Array.from(
    new Set(
      items
        .flatMap((item) => item.keywords)
        .filter((keyword): keyword is string => keyword !== undefined),
    ),
  );
}

async function filterEvidence<T extends BaseEvidence>(
  items: T[],
  searchParams: SearchParams,
  resource: EvidenceResource,
): Promise<FilteredEvidence<T>> {
  const params = await searchParams;
  const selectedTags = getTagsFromParams(params);
  const { activeTags, resourceTags } = getActiveResourceTags(
    resource,
    selectedTags,
  );

  const filteredItems = items
    .filter(
      (item) =>
        activeTags.length === 0 ||
        item.tags.some((tag) => activeTags.includes(tag)),
    )
    .sort(compareNewestFirst);

  return {
    activeTags,
    items: filteredItems,
    resourceTags,
  };
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getArticleStaticParams(): Array<{ slug: string }> {
  return articles.map((article) => ({ slug: article.slug }));
}

export function getProjectStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export function getArticleKeywords(): string[] {
  return uniqueKeywords(articles);
}

export function getProjectKeywords(): string[] {
  return uniqueKeywords(projects);
}

export function getLatestArticles(limit: number): Article[] {
  return [...articles].sort(compareNewestFirst).slice(0, limit);
}

export function getLatestProjects(limit: number): Project[] {
  return [...projects].sort(compareNewestFirst).slice(0, limit);
}

export async function getFilteredArticles(
  searchParams: SearchParams,
): Promise<FilteredEvidence<Article>> {
  return filterEvidence(articles, searchParams, 'articles');
}

export async function getFilteredProjects(
  searchParams: SearchParams,
): Promise<FilteredEvidence<Project>> {
  return filterEvidence(projects, searchParams, 'projects');
}

export function getTagFilterHref({
  activeTags,
  resource,
  tag,
}: {
  activeTags: string[];
  resource: EvidenceResource;
  tag: string;
}): string {
  const isActive = activeTags.includes(tag);
  const tagsFilter = isActive
    ? activeTags.filter((activeTag) => activeTag !== tag)
    : activeTags.concat(tag);

  return tagsFilter.length === 0
    ? `/${resource}`
    : `/${resource}?tags=${tagsFilter.join(',')}`;
}
