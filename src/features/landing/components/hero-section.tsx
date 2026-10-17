import type { CSSProperties } from 'react';

import Link from 'next/link';

import { ArrowDownIcon, DownloadIcon } from 'lucide-react';

import { appConfig } from '@/core/configs/app.config';
import { Slot } from '@/common/components/board/slot';
import { email, GitHubLink } from '@/common/components/social-links';
import { Button } from '@/common/components/ui/button';
import { ArticleCard } from '@/features/articles/components/article-card';
import { listedArticles } from '@/features/articles/visibility';
import { heroHeadingId } from '@/features/landing/hero';
import { ProjectCard } from '@/features/projects/components/project-card';

import { articles, projects } from '@/velite';

function byNewest<T extends { date: string }>(a: T, b: T): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function settleOrder(index: number): CSSProperties {
  return { '--settle-index': index } as CSSProperties;
}

export function HeroSection() {
  const latestProject = projects.toSorted(byNewest)[0];
  const latestArticles = listedArticles(articles)
    .toSorted(byNewest)
    .slice(0, 2);

  return (
    <section aria-labelledby={heroHeadingId}>
      <div className="container grid grid-cols-1 gap-x-6 gap-y-8 pt-10 pb-8 sm:grid-cols-2 lg:grid-cols-12 lg:pt-7">
        <Slot
          className="sm:col-span-2 lg:col-span-12"
          plateClassName="settle grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22.5rem] lg:gap-10"
          style={settleOrder(0)}
        >
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <h1 id={heroHeadingId} className="type-display">
                Boonyarit
                <br />
                Iamsa-ard
              </h1>
              <p className="font-medium text-lg text-muted-foreground">
                Software Engineer · Bangkok, Thailand
              </p>
            </div>
            <p className="max-w-[46ch] text-lg leading-snug sm:text-xl">
              I was an aircraft mechanic before I wrote code. In a hangar,
              nothing is released until every task is inspected and every tool
              is back on its board. Now I build software the same way, across
              the backend, the web and mobile.
            </p>
          </div>

          {/* Contact shares the name's plate, so the two never have to match
              heights; a rim rule divides them, across on a phone and down on
              a wide screen, with the actions level with the story's end. */}
          <div className="flex flex-col justify-end gap-6 border-rim border-t pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <h2 className="type-card-title">Want to talk?</h2>
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Button asChild variant="tape">
                  <Link href="#contact">
                    Write to me
                    <ArrowDownIcon aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={appConfig.resume} download>
                    <DownloadIcon aria-hidden="true" />
                    Download resume
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <a
                  href={`mailto:${email}`}
                  className="text-muted-foreground text-sm underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-(--link-line)"
                >
                  {email}
                </a>
                <GitHubLink />
              </div>
            </div>
          </div>
        </Slot>

        {latestProject ? (
          <ProjectCard
            project={latestProject}
            wide
            eager
            className="sm:col-span-2 lg:col-span-6"
            plateClassName="settle"
            style={settleOrder(1)}
          />
        ) : null}
        {latestArticles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            compact
            className="lg:col-span-3"
            plateClassName="settle"
            style={settleOrder(2 + index)}
          />
        ))}

        <div className="order-last flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:order-none sm:col-span-2 lg:col-span-12">
          <p className="max-w-[62ch] text-muted-foreground">
            Like a hangar tool board: every piece of work hangs in its own
            outlined place.
          </p>
          <div className="flex gap-6">
            <Link href="/projects" className="stamp tape-link text-xs">
              All projects
            </Link>
            <Link href="/articles" className="stamp tape-link text-xs">
              All articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
