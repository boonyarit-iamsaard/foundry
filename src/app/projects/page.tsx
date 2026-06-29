import type { Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/common/components/page-header';
import {
  getFilteredProjects,
  getProjectKeywords,
} from '@/features/evidence/catalog';
import { FilterByTags } from '@/features/evidence/components/filter-by-tags';
import { ProjectCard } from '@/features/projects/components/project-card';

import type { SearchParams } from '@/common/definitions/search-params';

type ProjectsPageProps = Readonly<{
  searchParams: SearchParams;
}>;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my projects and work.',
  keywords: getProjectKeywords(),
};

export default async function Page({ searchParams }: ProjectsPageProps) {
  const { activeTags, items, resourceTags } =
    await getFilteredProjects(searchParams);

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
          {items.map((project) => (
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
