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
    <div className="flex flex-wrap items-center gap-3">
      <h2 className="stamp text-muted-foreground text-xs">Filter by tag</h2>
      <div className="flex flex-wrap gap-1.5">
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
