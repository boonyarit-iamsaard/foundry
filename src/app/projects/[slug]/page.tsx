import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import {
  getProjectBySlug,
  getProjectStaticParams,
} from '@/features/evidence/catalog';
import { EvidenceDetailPage } from '@/features/evidence/detail-page';
import { createProjectMetadata } from '@/features/evidence/metadata';
import { ProjectHeader } from '@/features/projects/components/project-header';

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) {
    return {};
  }

  return createProjectMetadata(project);
}

export function generateStaticParams() {
  return getProjectStaticParams();
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = getProjectBySlug(slug);
  if (!project) {
    return notFound();
  }

  return (
    <EvidenceDetailPage
      item={project}
      header={<ProjectHeader project={project} />}
    />
  );
}
