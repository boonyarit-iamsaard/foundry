import { CalendarIcon } from 'lucide-react';

import { Badge } from '@/common/components/ui/badge';
import { formatDate } from '@/common/helpers/date';
import { EvidenceTag } from '@/features/evidence/components/evidence-tag';

import type { Project } from '@/velite';

type ProjectHeaderProps = Readonly<{
  project: Project;
}>;

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <CalendarIcon className="inline-block size-4" />
        <p>Since {formatDate(project.date)}</p>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <Badge>{project.status}</Badge>
      </div>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <EvidenceTag key={tag} tag={tag} resource="projects" />
        ))}
      </div>
    </div>
  );
}
