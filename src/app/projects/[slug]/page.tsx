import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { AuthorSlot } from '@/common/components/board/author-slot';
import { DetailBody } from '@/common/components/detail-body';
import { MDX } from '@/common/components/mdx';
import { projectCode } from '@/features/projects/code';
import { ProjectHeader } from '@/features/projects/components/project-header';

import { projects } from '@/velite';

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    authors: [
      {
        name: 'Boonyarit Iamsa-ard',
        url: 'https://boonyarit.me',
      },
    ],
    keywords: project.keywords,
    openGraph: {
      siteName: 'boonyarit.me',
      url: `https://boonyarit.me/projects/${project.slug}`,
      images: [
        {
          url: project.cover.src,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) {
    return notFound();
  }

  return (
    <article className="container-content pb-24">
      <ProjectHeader project={project} />
      <DetailBody code={projectCode(project.slug)} cover={project.cover}>
        <MDX content={project.content} />
      </DetailBody>
      <AuthorSlot heading="Built by Boonyarit Iamsa-ard" className="mt-14" />
    </article>
  );
}
