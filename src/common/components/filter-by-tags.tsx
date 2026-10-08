import { Tag as TagComponent } from '@/common/components/tag';

import type { Tag } from '@/velite';

interface FilterByTagsProps {
  resourceTags: Tag[];
  activeTags: string[];
  resource: 'articles' | 'projects';
}

export function FilterByTags({
  resourceTags,
  activeTags,
  resource,
}: Readonly<FilterByTagsProps>) {
  return (
    <div className="space-y-2">
      <h2 className="font-medium text-sm leading-none">Filter by tags</h2>
      <div className="flex flex-wrap gap-1">
        {resourceTags.map((tag) => (
          <TagComponent
            key={tag.name}
            tag={tag.name}
            activeTags={activeTags}
            resource={resource}
          />
        ))}
      </div>
    </div>
  );
}
