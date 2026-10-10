import { CalendarIcon } from 'lucide-react';

import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';
import { ProjectStatusBadge } from '@/features/projects/components/project-status-badge';

import type { Project } from '@/velite';

type ProjectHeaderProps = Readonly<{
  project: Project;
}>;

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <CalendarIcon className="inline-block size-4" />
        <p>Since {formatDate(project.date)}</p>
      </div>
      <div className="flex items-center gap-2">
        <h1 className="font-black text-2xl tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <ProjectStatusBadge status={project.status} />
      </div>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <Tag key={tag} tag={tag} resource="projects" />
        ))}
      </div>
    </div>
  );
}
