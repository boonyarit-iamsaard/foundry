import Image from 'next/image';
import Link from 'next/link';

import { CalendarIcon, MonitorIcon } from 'lucide-react';

import { Icons } from '@/common/components/icons';
import { Tag } from '@/common/components/tag';
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
import { ProjectStatusBadge } from '@/features/projects/components/project-status-badge';

import type { Project } from '@/velite';

type ProjectCardProps = Readonly<{
  project: Project;
  activeTags?: string[];
}>;

export function ProjectCard({ project, activeTags }: ProjectCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden p-0 transition-all hover:ring-2 hover:ring-muted-foreground">
      <div className="relative aspect-video bg-muted">
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
            <CardTitle className="flex items-center gap-2 font-bold text-xl">
              <Link href={project.permalink} className="hover:text-primary">
                {project.title}
              </Link>
              <ProjectStatusBadge status={project.status} />
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CalendarIcon className="inline-block size-4" />
              <time>Since {formatDate(project.date)}</time>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-0 text-muted-foreground text-sm">
          <p className="line-clamp-2">{project.description}</p>
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
                      aria-label="Live preview"
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
                      aria-label="GitHub"
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
