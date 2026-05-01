import type { VariantProps } from 'class-variance-authority';

import Image from 'next/image';
import Link from 'next/link';

import { CalendarIcon, MonitorIcon } from 'lucide-react';

import { Icons } from '@/common/components/icons';
import { Tag } from '@/common/components/tag';
import { Badge } from '@/common/components/ui/badge';
import { Button, buttonVariants } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { formatDate } from '@/common/helpers/date';

import type { badgeVariants } from '@/common/components/ui/badge';
import type { Project } from '@/velite';

interface ProjectCardProps {
  project: Project;
  activeTags?: string[];
}

export function ProjectCard({
  project,
  activeTags,
}: Readonly<ProjectCardProps>) {
  const GitHubIcon = Icons.gitHub;

  // TODO: improve status colors
  const statusVariants: Record<
    Project['status'],
    VariantProps<typeof badgeVariants>['variant']
  > = {
    active: 'default',
    stable: 'secondary',
    maintenance: 'outline',
    experimental: 'destructive',
  };

  return (
    <Card className="group hover:ring-muted-foreground gap-0 overflow-hidden p-0 transition-all hover:ring-2">
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
        <CardContent className="text-muted-foreground space-y-4 p-0 text-sm">
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
              <a
                href={project.preview}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live preview"
                title="Live preview"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <MonitorIcon className="size-5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <GitHubIcon className="size-5" />
              </a>
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
