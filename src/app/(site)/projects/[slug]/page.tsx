import type { Metadata } from 'next';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Mdx } from '@/common/components/mdx';
import { PageHeader } from '@/common/components/page-header';
import { ProjectHeader } from '@/features/projects/components/project-header';

import { projects } from '@/velite';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  // TODO: define SEO configuration in 'core/configs/app.config.ts'
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

export default async function Page({ params }: Readonly<PageProps>) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) {
    return notFound();
  }

  return (
    <div className="py-16">
      <PageHeader className="container-content">
        <ProjectHeader project={project} />
      </PageHeader>
      <div className="container-content">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="bg-muted rounded-b-lg p-4 sm:px-16 sm:py-8">
          <Mdx content={project.content} />
        </div>
      </div>
    </div>
  );
}
