import type { Metadata } from 'next';

import { FilterByTags } from '@/common/components/filter-by-tags';
import { PageHeader } from '@/common/components/page-header';
import type { SearchParams } from '@/common/definitions/search-params';
import { filterByTags } from '@/common/helpers/tag';
import { ProjectCard } from '@/features/projects/components/project-card';
import { ProjectStatusKey } from '@/features/projects/components/project-status-line';

import { projects, tags } from '@/velite';

type ProjectsPageProps = Readonly<{
  searchParams: SearchParams;
}>;

const keywords = Array.from(
  new Set(
    projects
      .flatMap((project) => project.keywords)
      .filter((k) => k !== undefined),
  ),
);

const description = 'Things I have built, and where each one is in its life.';

export const metadata: Metadata = {
  title: 'Projects',
  description,
  keywords,
};

export default async function Page({ searchParams }: ProjectsPageProps) {
  const { filteredResource, activeTags, resourceTags } = await filterByTags(
    projects,
    searchParams,
    tags,
    'projects',
  );

  return (
    <div>
      <PageHeader title="Projects" description={description}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          <span className="stamp text-muted-foreground text-xs">
            Outline shows project status
          </span>
          <ProjectStatusKey />
        </div>
      </PageHeader>
      <section
        aria-label="Projects"
        className="pegboard border-paint border-t-2"
      >
        <div className="container space-y-10 pt-10 pb-20">
          <FilterByTags
            resourceTags={resourceTags}
            activeTags={activeTags}
            resource="projects"
          />
          <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
            {filteredResource.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                activeTags={activeTags}
                wide={filteredResource.length === 1}
                className={
                  filteredResource.length === 1 ? 'md:col-span-2' : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
