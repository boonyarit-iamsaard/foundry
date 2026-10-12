import type { Metadata } from 'next';

import Link from 'next/link';

import { EmptySlot } from '@/common/components/board/slot';
import { FilterByTags } from '@/common/components/filter-by-tags';
import { PageHeader } from '@/common/components/page-header';
import type { SearchParams } from '@/common/definitions/search-params';
import { buildMetadata } from '@/common/helpers/metadata';
import { filterByTags } from '@/common/helpers/tag';
import { ProjectCard } from '@/features/projects/components/project-card';
import { ProjectStatusKey } from '@/features/projects/components/project-status-line';
import { projectsListing } from '@/features/projects/listing';

import { projects, tags } from '@/velite';

type ProjectsPageProps = Readonly<{
  searchParams: SearchParams;
}>;

// The status key and tag filter earn their place once there is more than one
// thing to tell apart.
const hasSeveralStatuses =
  new Set(projects.map((project) => project.status)).size > 1;
const hasSeveralProjects = projects.length > 1;

export const metadata: Metadata = buildMetadata({
  title: projectsListing.title,
  description: projectsListing.description,
  path: projectsListing.path,
});

export default async function Page({ searchParams }: ProjectsPageProps) {
  const { filteredResource, activeTags, resourceTags } = await filterByTags(
    projects,
    searchParams,
    tags,
    'projects',
  );

  return (
    <div>
      <PageHeader
        title={projectsListing.title}
        description={projectsListing.description}
      >
        {hasSeveralStatuses ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
            <span className="stamp text-muted-foreground text-xs">
              Outline shows project status
            </span>
            <ProjectStatusKey />
          </div>
        ) : null}
      </PageHeader>
      <section
        aria-label="Projects"
        className="pegboard border-paint border-t-2"
      >
        <div className="container space-y-10 pt-10 pb-20">
          {hasSeveralProjects ? (
            <FilterByTags
              resourceTags={resourceTags}
              activeTags={activeTags}
              resource="projects"
            />
          ) : null}
          {filteredResource.length === 0 ? (
            <EmptySlot code={projectsListing.code} className="min-h-48">
              <div className="space-y-1 text-center">
                <p className="font-bold font-display text-2xl uppercase">
                  Nothing in this slot
                </p>
                <p>
                  No projects match these tags.{' '}
                  <Link href="/projects" className="tape-link font-semibold">
                    Clear the filter
                  </Link>
                </p>
              </div>
            </EmptySlot>
          ) : (
            <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
              {filteredResource.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  eager={index === 0}
                  activeTags={activeTags}
                  wide={filteredResource.length === 1}
                  className={
                    filteredResource.length === 1 ? 'md:col-span-2' : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
