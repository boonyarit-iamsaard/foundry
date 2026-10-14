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
    <section aria-labelledby={heroHeadingId} className="pegboard">
      <div className="container grid grid-cols-1 gap-x-6 gap-y-8 pt-10 pb-8 sm:grid-cols-2 lg:grid-cols-12 lg:pt-7">
        <Slot
          className="sm:col-span-2 lg:col-span-8"
          plateClassName="settle flex flex-col justify-between gap-8 p-6 sm:p-8"
          style={settleOrder(0)}
        >
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
          <div className="max-w-[46ch] space-y-3 text-lg leading-snug sm:text-xl">
            <p>
              I was an aircraft mechanic before I wrote code. In a hangar,
              nothing is released until every task is inspected and every tool
              is back on its board. I build software the same way.
            </p>
            {/* Draft copy: the owner approves the final wording. */}
            <p>Today I&apos;m a Software Engineer at Omise.</p>
          </div>
        </Slot>

        <div className="grid gap-y-8 sm:col-span-2 sm:grid-cols-2 sm:gap-x-6 lg:col-span-4 lg:grid-cols-1">
          <Slot
            plateClassName="settle flex h-full flex-col gap-4 p-5"
            style={settleOrder(1)}
          >
            {/* Draft copy: the owner approves the final wording. */}
            <h2 className="type-card-title">
              Hiring, or want to talk about something I wrote?
            </h2>
            <div className="mt-auto space-y-3">
              <Button asChild variant="tape" className="w-full">
                <Link href="#contact">
                  Write to me
                  <ArrowDownIcon aria-hidden="true" />
                </Link>
              </Button>
              <a
                href={`mailto:${email}`}
                className="relative z-20 block text-muted-foreground text-sm underline decoration-transparent underline-offset-4 hover:text-foreground hover:decoration-(--link-line)"
              >
                {email}
              </a>
            </div>
          </Slot>
          <Slot
            plateClassName="settle flex h-full flex-col gap-4 p-5"
            style={settleOrder(2)}
          >
            <div>
              <h2 className="font-bold font-display text-2xl uppercase leading-[0.95]">
                Resume
              </h2>
              <p className="text-muted-foreground text-sm">PDF</p>
            </div>
            <Button asChild variant="outline" className="mt-auto w-full">
              <a href={appConfig.resume} download>
                <DownloadIcon aria-hidden="true" />
                Download resume
              </a>
            </Button>
            <GitHubLink className="self-center" />
          </Slot>
        </div>

        {latestProject ? (
          <ProjectCard
            project={latestProject}
            wide
            eager
            className="sm:col-span-2 lg:col-span-6"
            plateClassName="settle"
            style={settleOrder(3)}
          />
        ) : null}
        {latestArticles.map((article, index) => (
          <ArticleCard
            key={article.slug}
            article={article}
            compact
            className="lg:col-span-3"
            plateClassName="settle"
            style={settleOrder(4 + index)}
          />
        ))}

        <div className="order-last flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:order-none sm:col-span-2 lg:col-span-12">
          {/* Draft copy: the owner approves the final wording. */}
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
