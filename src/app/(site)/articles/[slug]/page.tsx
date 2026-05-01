import type { Metadata } from 'next';

import Image from 'next/image';
import { notFound } from 'next/navigation';

import { appConfig } from '@/core/configs/app.config';
import { Mdx } from '@/common/components/mdx';
import { PageHeader } from '@/common/components/page-header';
import { ArticleHeader } from '@/features/articles/components/article-header';

import { articles } from '@/velite';

interface PageProps {
  params: Promise<{ slug: string }>;
}

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

  // TODO: define SEO configuration in 'core/configs/app.config.ts'
  return {
    title: article.title,
    description: article.description,
    authors: appConfig.authors,
    keywords: article.keywords,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      siteName: appConfig.name,
      url: `${appConfig.url}/articles/${article.slug}`,
      images: [
        {
          url: article.cover.src,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      creator: appConfig.creator,
      images: [
        {
          url: article.cover.src,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export default async function Page({ params }: Readonly<PageProps>) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);
  if (!article) {
    return notFound();
  }

  return (
    <div className="py-16">
      <PageHeader className="container-content">
        <ArticleHeader article={article} />
      </PageHeader>
      <div className="container-content">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            // TODO: improve sizes property
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="bg-muted rounded-b-lg p-4 sm:px-16 sm:py-8">
          <Mdx content={article.content} />
        </div>
      </div>
    </div>
  );
}
