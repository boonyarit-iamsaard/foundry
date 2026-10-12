import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { AuthorSlot } from '@/common/components/board/author-slot';
import { DetailBody } from '@/common/components/detail-body';
import { MDX } from '@/common/components/mdx';
import { buildMetadata } from '@/common/helpers/metadata';
import { articleCode } from '@/features/articles/code';
import { ArticleHeader } from '@/features/articles/components/article-header';

import { articles } from '@/velite';

type PageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: article.permalink,
    previewImage: article.cover.src,
    type: 'article',
  });
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }

  return (
    <article className="container-content pb-24">
      <ArticleHeader article={article} />
      <DetailBody code={articleCode(article.slug)} cover={article.cover}>
        <MDX content={article.content} />
      </DetailBody>
      <AuthorSlot heading="Written by Boonyarit Iamsa-ard" className="mt-14" />
    </article>
  );
}
