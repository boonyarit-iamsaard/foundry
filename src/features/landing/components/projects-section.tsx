import { SectionHeader } from '@/common/components/section-header';
import { ProjectCard } from '@/features/projects/components/project-card';

import { projects } from '@/velite';

export function ProjectsSection() {
  const latestProjects = projects.slice(0, 4);

  return (
    <section className="container space-y-8">
      <SectionHeader
        title="Projects"
        description="Systems I've designed, built, and shipped end to end."
        viewAllLink="/projects"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {latestProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
