import type { IconComponent } from '@/common/components/icons';
import { Icons } from '@/common/components/icons';
import { SectionHeader } from '@/common/components/section-header';
import { Badge } from '@/common/components/ui/badge';

type Tool = {
  title: string;
  icon: IconComponent;
  group: string;
};

const tools: Tool[] = [
  {
    title: 'JavaScript',
    icon: 'javascript',
    group: 'Languages',
  },
  {
    title: 'TypeScript',
    icon: 'typescript',
    group: 'Languages',
  },
  {
    title: 'React',
    icon: 'react',
    group: 'Frameworks',
  },
  {
    title: 'Next.js',
    icon: 'nextJs',
    group: 'Frameworks',
  },
  {
    title: 'Node.js',
    icon: 'nodeJs',
    group: 'Frameworks',
  },
  {
    title: 'Express.js',
    icon: 'express',
    group: 'Frameworks',
  },
  {
    title: 'Nest.js',
    icon: 'nestJs',
    group: 'Frameworks',
  },
  {
    title: 'PostgreSQL',
    icon: 'postgres',
    group: 'Databases',
  },
];

export function TechStackSection() {
  return (
    <section className="container space-y-8">
      <SectionHeader title="Tools" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
        {tools.map((tool) => {
          const IconComponent: IconComponent =
            typeof tool.icon === 'string' ? Icons[tool.icon] : tool.icon;

          return (
            <div
              key={tool.title}
              className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted p-2 font-medium transition-all hover:scale-105 md:p-4"
            >
              <div className="flex items-center justify-center">
                <IconComponent className="size-8 md:size-12" />
              </div>
              <div className="font-medium text-muted-foreground">
                {tool.title}
              </div>
              <Badge variant="secondary">{tool.group}</Badge>
            </div>
          );
        })}
      </div>
    </section>
  );
}
