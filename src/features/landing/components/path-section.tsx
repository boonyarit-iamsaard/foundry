import { Slot } from '@/common/components/board/slot';

const capabilities = [
  {
    term: 'Backend',
    detail:
      'APIs and services in Node.js, Nest.js, Express and Spring Boot, on PostgreSQL, MySQL or MongoDB.',
  },
  {
    term: 'Web',
    detail:
      'Product interfaces in React and Next.js, typed end to end in TypeScript.',
  },
  {
    term: 'Mobile',
    detail: 'Apps in React Native.',
  },
  {
    term: 'Practice',
    detail:
      'Unit and end-to-end tests, CI/CD on GitHub Actions, and Docker for what ships.',
  },
];

export function PathSection() {
  return (
    <section
      aria-labelledby="path-heading"
      className="container py-20 sm:py-28"
    >
      <Slot code="L-01" plateClassName="grid lg:grid-cols-12">
        <div className="space-y-6 p-6 sm:p-10 lg:col-span-7">
          <h2
            id="path-heading"
            className="font-display font-extrabold text-[clamp(2.25rem,4.4vw,3.75rem)] uppercase leading-[0.9]"
          >
            From the hangar floor to the codebase
          </h2>
          <div className="max-w-[62ch] space-y-4 text-lg leading-relaxed">
            <p>
              For years I worked as an aircraft mechanic. The work runs on
              checklists, torque values and signatures. You don&apos;t release
              an aircraft until every task has been inspected.
            </p>
            <p>
              When the pandemic changed everything, I taught myself full-stack
              development. While I was still in the hangar, I built an internal
              system for my department in Next.js and TypeScript, and solving
              problems with code stuck with me.
            </p>
            <p>
              Now I work as a software engineer across backend, web and mobile.
              The habits came with me: small steps I can verify, work that is
              easy to inspect, and nothing shipped that I wouldn&apos;t put my
              name to.
            </p>
          </div>
        </div>
        <div className="border-paint border-t-2 p-6 sm:p-10 lg:col-span-5 lg:border-t-0 lg:border-l-2">
          <h3 className="stamp mb-6 text-muted-foreground">What I build</h3>
          <dl className="divide-y-2 divide-foreground/15">
            {capabilities.map((item) => (
              <div
                key={item.term}
                className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-4"
              >
                <dt className="stamp pt-0.5">{item.term}</dt>
                <dd className="text-muted-foreground">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Slot>
    </section>
  );
}
