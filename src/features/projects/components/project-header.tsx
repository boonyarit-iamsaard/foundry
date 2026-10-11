import { ArrowUpRightIcon } from 'lucide-react';

import { Tag } from '@/common/components/tag';
import { formatDate } from '@/common/helpers/date';
import { slotCode } from '@/common/helpers/slot-code';
import { ProjectStatusLine } from '@/features/projects/status-line';

import type { Project } from '@/velite';
import { projects } from '@/velite';

type ProjectHeaderProps = Readonly<{
  project: Project;
}>;

const linkClassName =
  'stamp inline-flex items-center gap-1 text-xs underline decoration-2 decoration-tape underline-offset-[6px] hover:decoration-foreground';

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="space-y-6 pt-14 pb-10 sm:pt-20">
      <h1 className="font-display font-extrabold text-[clamp(2.75rem,6.4vw,5.5rem)] uppercase leading-[0.88]">
        {project.title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="tape">{slotCode('P', projects, project.slug)}</span>
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
    </header>
  );
}
