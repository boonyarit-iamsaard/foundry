import type { Metadata } from 'next';

import { appConfig } from '@/core/configs/app.config';

import type { Article, Project } from '@/velite';

export function createArticleMetadata(article: Article): Metadata {
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

export function createProjectMetadata(project: Project): Metadata {
  return {
    title: project.title,
    description: project.description,
    authors: appConfig.authors,
    keywords: project.keywords,
    openGraph: {
      type: 'website',
      title: project.title,
      description: project.description,
      siteName: appConfig.name,
      url: `${appConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: project.cover.src,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      creator: appConfig.creator,
      images: [
        {
          url: project.cover.src,
        },
      ],
    },
  };
}
