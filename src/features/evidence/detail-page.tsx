import type { ReactNode } from 'react';

import Image from 'next/image';

import { MDX } from '@/common/components/mdx';
import { PageHeader } from '@/common/components/page-header';

import type { Article, Project } from '@/velite';

type EvidenceDetail = Article | Project;

type EvidenceDetailPageProps = Readonly<{
  header: ReactNode;
  item: EvidenceDetail;
}>;

export function EvidenceDetailPage({ header, item }: EvidenceDetailPageProps) {
  return (
    <div className="py-16">
      <PageHeader className="container-content">{header}</PageHeader>
      <div className="container-content">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={item.cover}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="bg-muted rounded-b-lg p-4 sm:px-16 sm:py-8">
          <MDX content={item.content} />
        </div>
      </div>
    </div>
  );
}
