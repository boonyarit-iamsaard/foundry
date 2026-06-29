import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { ArticleHeader } from '@/features/articles/components/article-header';
import {
  getArticleBySlug,
  getArticleStaticParams,
} from '@/features/evidence/catalog';
import { EvidenceDetailPage } from '@/features/evidence/detail-page';
import { createArticleMetadata } from '@/features/evidence/metadata';

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }

  return createArticleMetadata(article);
}

export function generateStaticParams() {
  return getArticleStaticParams();
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }

  return (
    <EvidenceDetailPage
      item={article}
      header={<ArticleHeader article={article} />}
    />
  );
}
