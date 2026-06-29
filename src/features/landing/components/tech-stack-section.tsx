import { Fragment } from 'react';

import { SectionHeader } from '@/common/components/section-header';

type Capability = {
  label: string;
  items: string;
};

const capabilities: Capability[] = [
  {
    label: 'Core',
    items: 'TypeScript · React · Next.js · Node.js · PostgreSQL',
  },
  {
    label: 'Backend',
    items: 'REST APIs · authentication · background jobs · Express · Nest.js',
  },
  {
    label: 'Frontend',
    items: 'component systems · forms · accessibility · performance',
  },
  {
    label: 'Practice',
    items:
      'maintainable architecture · tested flows · refactoring · production deploys',
  },
];

export function TechStackSection() {
  return (
    <section className="container space-y-6">
      <SectionHeader title="How I build" />
      <p className="text-muted-foreground max-w-prose text-lg leading-relaxed text-pretty">
        I keep my toolkit small and well-worn. Most of what I ship is{' '}
        <span className="text-foreground font-medium">TypeScript</span> end to
        end — <span className="text-foreground font-medium">React</span> and{' '}
        <span className="text-foreground font-medium">Next.js</span> on the
        front, <span className="text-foreground font-medium">Node.js</span> with{' '}
        <span className="text-foreground font-medium">Express</span> and{' '}
        <span className="text-foreground font-medium">Nest.js</span> behind it,
        and <span className="text-foreground font-medium">PostgreSQL</span> when
        the data needs to be dependable. I&apos;d rather go deep on a few tools
        that keep a system simple than chase new ones.
      </p>
      <dl className="grid gap-x-8 gap-y-4 pt-2 sm:grid-cols-[7rem_1fr]">
        {capabilities.map((capability) => (
          <Fragment key={capability.label}>
            <dt className="text-muted-foreground font-mono text-sm sm:pt-px">
              {capability.label}
            </dt>
            <dd className="text-foreground/90 leading-relaxed">
              {capability.items}
            </dd>
          </Fragment>
        ))}
      </dl>
    </section>
  );
}
