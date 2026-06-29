import type { VariantProps } from 'class-variance-authority';

import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CalendarIcon, MonitorIcon } from 'lucide-react';

import { Icons } from '@/common/components/icons';
import { Tag } from '@/common/components/tag';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/common/components/ui/tooltip';
import { formatDate } from '@/common/helpers/date';

import type { badgeVariants } from '@/common/components/ui/badge';
import type { Project } from '@/velite';

type ProjectCardProps = Readonly<{
  project: Project;
  activeTags?: string[];
}>;

export function ProjectCard({ project, activeTags }: ProjectCardProps) {
  // Quiet, non-alarming status scale: solid for the live/proven projects,
  // outline for the lower-key ones. No red (it reads as an error) and no
  // terracotta (reserved as the single warm signal), and the label text
  // carries the meaning, not the color alone.
  const statusVariants: Record<
    Project['status'],
    VariantProps<typeof badgeVariants>['variant']
  > = {
    active: 'secondary',
    stable: 'secondary',
    maintenance: 'outline',
    experimental: 'outline',
  };

  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="bg-muted relative aspect-video">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw"
          className="object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
          priority={false}
          quality={85}
        />
      </div>
      <div className="space-y-4 px-6 py-4">
        <CardHeader className="p-0">
          <div className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Link href={project.permalink} className="hover:text-primary">
                {project.title}
              </Link>
              <Badge variant={statusVariants[project.status]}>
                {project.status}
              </Badge>
            </CardTitle>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <CalendarIcon className="inline-block size-4" />
              <time>Since {formatDate(project.date)}</time>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-0 text-sm">
          {project.role || project.problem || project.outcome ? (
            <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-2 border-t pt-4">
              {project.role ? (
                <Fragment>
                  <dt className="text-muted-foreground font-mono text-xs">
                    Role
                  </dt>
                  <dd className="text-foreground/90">{project.role}</dd>
                </Fragment>
              ) : null}
              {project.problem ? (
                <Fragment>
                  <dt className="text-muted-foreground font-mono text-xs">
                    Problem
                  </dt>
                  <dd className="text-muted-foreground line-clamp-2">
                    {project.problem}
                  </dd>
                </Fragment>
              ) : null}
              {project.outcome ? (
                <Fragment>
                  <dt className="text-primary font-mono text-xs">Outcome</dt>
                  <dd className="text-foreground/90 line-clamp-2">
                    {project.outcome}
                  </dd>
                </Fragment>
              ) : null}
            </dl>
          ) : (
            <p className="text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-1">
            {project.tags.map((tag) => (
              <Tag
                key={tag}
                tag={tag}
                resource="projects"
                activeTags={activeTags}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-0">
          <div className="flex items-center gap-2">
            {project.preview && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MonitorIcon className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Live preview</p>
                </TooltipContent>
              </Tooltip>
            )}
            {project.github && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icons.gitHub className="size-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button variant="link" asChild className="px-0">
            <Link href={project.permalink}>Read more</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
