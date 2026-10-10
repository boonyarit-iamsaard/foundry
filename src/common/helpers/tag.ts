import type { Tag } from '@/velite';
import type { SearchParams } from '../definitions/search-params';
import { tagsParamSchema } from '../validators/tag';

type BaseResource = {
  date: string;
  tags: string[];
};

type FilteredResource<T extends BaseResource> = {
  filteredResource: T[];
  activeTags: string[];
  resourceTags: Tag[];
};

type ResourceType = 'articles' | 'projects';

const getTagsFromParams = (params: Awaited<SearchParams>): string[] => {
  const selectedTags: string[] = [];
  const parsedTags = tagsParamSchema.safeParse(params);
  if (parsedTags.success && parsedTags.data.tags) {
    selectedTags.push(
      ...(Array.isArray(parsedTags.data.tags)
        ? parsedTags.data.tags
        : parsedTags.data.tags.split(',')),
    );
  }

  return selectedTags;
};

const getActiveResourceTags = (
  resource: 'articles' | 'projects',
  selectedTags: string[],
  tags: Tag[],
): { activeTags: string[]; resourceTags: Tag[] } => {
  const resourceTags = tags.filter((tag) => tag.resource === resource);
  const activeTags = selectedTags.filter((tag) =>
    resourceTags.some((t) => t.name === tag),
  );

  return {
    activeTags,
    resourceTags,
  };
};

export async function filterByTags<T extends BaseResource>(
  resource: T[],
  searchParams: SearchParams,
  tags: Tag[],
  type: ResourceType,
): Promise<FilteredResource<T>> {
  const params = await searchParams;

  const selectedTags = getTagsFromParams(params);
  const { activeTags, resourceTags } = getActiveResourceTags(
    type,
    selectedTags,
    tags,
  );

  const filteredResource = resource
    .filter(
      (item) =>
        activeTags.length === 0 ||
        item.tags.some((tag) => activeTags.includes(tag)),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    activeTags,
    filteredResource,
    resourceTags,
  };
}
