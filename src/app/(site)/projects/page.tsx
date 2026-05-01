import type { Metadata } from 'next';

import { FilterByTags } from '@/common/components/filter-by-tags';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/common/components/page-header';
import { filterByTags } from '@/common/helpers/tag';
import { ProjectCard } from '@/features/projects/components/project-card';

import type { SearchParams } from '@/common/definitions/search-params';
import { projects, tags } from '@/velite';

interface ProjectsPageProps {
  searchParams: SearchParams;
}

// TODO: explicitly define keywords
const keywords = Array.from(
  new Set(
    projects
      .flatMap((project) => project.keywords)
      .filter((k) => k !== undefined),
  ),
);

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my projects and work.',
  keywords,
};

export default async function Page({
  searchParams,
}: Readonly<ProjectsPageProps>) {
  const { filteredResource, activeTags, resourceTags } = await filterByTags(
    projects,
    searchParams,
    tags,
    'projects',
  );

  // TODO: add pagination
  return (
    <div className="py-16">
      <PageHeader>
        <PageHeaderHeading>Projects</PageHeaderHeading>
        <PageHeaderDescription>
          A showcase of my projects and work.
        </PageHeaderDescription>
      </PageHeader>
      <section className="container space-y-8 sm:space-y-12">
        <FilterByTags
          resourceTags={resourceTags}
          activeTags={activeTags}
          resource="projects"
        />
        <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
          {filteredResource.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              activeTags={activeTags}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
