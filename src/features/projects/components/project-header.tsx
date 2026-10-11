import { ArrowUpRightIcon } from 'lucide-react';

import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';
import { ProjectStatusLine } from '@/features/projects/components/project-status-line';

import type { Project } from '@/velite';

type ProjectHeaderProps = Readonly<{
  project: Project;
}>;

const linkClassName = 'stamp tape-link inline-flex items-center gap-1 text-xs';

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6 pt-14 pb-10 sm:pt-20">
      <h1 className="type-headline">{project.title}</h1>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <ProjectStatusLine status={project.status} />
        <p className="text-muted-foreground text-sm tabular-nums">
          Since {formatDate(project.date)}
        </p>
      </div>
      <p className="text-lg text-muted-foreground sm:text-xl">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tag={tag} resource="projects" />
          ))}
        </div>
        <div className="flex gap-6">
          {project.preview ? (
            <a
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Live site
              <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Source
              <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}
