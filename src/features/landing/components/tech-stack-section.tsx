import { SectionHeader } from '@/common/components/section-header';

export function TechStackSection() {
  return (
    <section className="container space-y-6">
      <SectionHeader title="How I build" />
      <div className="max-w-prose space-y-4 text-lg leading-relaxed text-pretty">
        <p className="text-muted-foreground">
          For nineteen years I kept aircraft airworthy, where a careless fix
          grounds a plane. I build software the same way —{' '}
          <span className="text-foreground font-medium">
            reliability over cleverness
          </span>
          , an instinct I earned long before I wrote a line of code.
        </p>
        <p className="text-muted-foreground">
          <span className="text-foreground font-medium">
            Serious internals, simple externals.
          </span>{' '}
          Explicit structure, clear boundaries, transactional integrity —
          complexity only when it earns its place. The tools are just where that
          thinking lands, and it travels: deepest in TypeScript — React and Next
          on the front, Node behind it — and these days just as at home in Java
          and Spring, building services inside a large insurer&apos;s systems. I
          reach for SQL when the data has to be dependable.
        </p>
      </div>
      <p className="text-muted-foreground font-mono text-sm">
        TypeScript · Node · React / Next · Spring Boot · Java · PostgreSQL
      </p>
    </section>
  );
}
