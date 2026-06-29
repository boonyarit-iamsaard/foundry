import { EvidenceTag } from '@/features/evidence/components/evidence-tag';

import type { EvidenceResource } from '@/features/evidence/catalog';
import type { Tag } from '@/velite';

type FilterByTagsProps = Readonly<{
  activeTags: string[];
  resource: EvidenceResource;
  resourceTags: Tag[];
}>;

export function FilterByTags({
  activeTags,
  resource,
  resourceTags,
}: FilterByTagsProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm leading-none font-medium">Filter by tags</h2>
      <div className="flex flex-wrap gap-1">
        {resourceTags.map((tag) => (
          <EvidenceTag
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
