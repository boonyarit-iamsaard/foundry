import type { CSSProperties } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from 'lucide-react';

import { Slot } from '@/common/components/board/slot';
import { Tag } from '@/common/components/tag';
import { cn } from '@/common/helpers/cn';
import { formatDate } from '@/common/helpers/date';
import { slotCode } from '@/common/helpers/slot-code';
import {
  ProjectStatusLine,
  projectStatusLine,
} from '@/features/projects/status-line';

import type { Project } from '@/velite';
import { projects } from '@/velite';

type ProjectCardProps = Readonly<{
  project: Project;
  activeTags?: string[];
  /** Lay the cover beside the text instead of above it. */
  wide?: boolean;
  className?: string;
  plateClassName?: string;
  style?: CSSProperties;
}>;

export function ProjectCard({
  project,
  activeTags,
  wide = false,
  className,
  plateClassName,
  style,
}: ProjectCardProps) {
  return (
    <Slot
      code={slotCode('P', projects, project.slug)}
      line={projectStatusLine[project.status]}
      lift
      className={className}
      style={style}
      plateClassName={cn(
        'grid overflow-hidden',
        wide && 'sm:grid-cols-2',
        plateClassName,
      )}
    >
      <div
        className={cn(
          'relative aspect-[16/9] border-paint border-b-2',
          wide && 'sm:aspect-auto sm:border-r-2 sm:border-b-0',
        )}
      >
        <Image
          src={project.cover}
          alt=""
          fill
          sizes={
            wide
              ? '(max-width: 640px) 100vw, 40vw'
              : '(max-width: 768px) 100vw, 33vw'
          }
          className="object-cover object-left-top"
          quality={85}
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ProjectStatusLine status={project.status} />
          <span className="text-muted-foreground text-sm tabular-nums">
            Since {formatDate(project.date)}
          </span>
        </div>
        <h3 className="font-bold font-display text-3xl uppercase leading-[0.95] tracking-[0.01em]">
          <Link
            href={project.permalink}
            className="after:absolute after:inset-0 after:z-10 focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                resource="projects"
                activeTags={activeTags}
              />
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            {project.preview ? (
              <a
                href={project.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="stamp relative z-20 inline-flex items-center gap-1 text-xs underline decoration-2 decoration-tape underline-offset-[6px]"
              >
                Live
                <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="stamp relative z-20 inline-flex items-center gap-1 text-xs underline decoration-2 decoration-tape underline-offset-[6px]"
              >
                Source
                <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </Slot>
  );
}
