import rehypeShiki from '@shikijs/rehype';
import { defineCollection, defineConfig, s } from 'velite';

import { buildTags } from './src/common/helpers/build-tags';
import {
  listedArticles,
  visibleArticles,
} from './src/features/articles/visibility';

const count = s
  .object({ total: s.number(), articles: s.number(), projects: s.number() })
  .default({ total: 0, articles: 0, projects: 0 });

const keywords = s.array(s.string()).optional();

const tag = s
  .string()
  .toLowerCase()
  .transform((tag) => tag.replace(/\s/g, ''));

const about = defineCollection({
  name: 'About',
  single: true,
  pattern: 'about.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(255),
      slug: s.slug('about'),
      date: s.isodate(),
      metadata: s.metadata(),
      content: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/about`,
    })),
});

const articles = defineCollection({
  name: 'Article',
  pattern: 'articles/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(255),
      cover: s.image(),
      slug: s.slug('article'),
      tags: s.array(tag),
      keywords,
      date: s.isodate(),
      metadata: s.metadata(),
      content: s.mdx(),
      status: s.union([
        s.literal('draft'),
        s.literal('published'),
        s.literal('archived'),
      ]),
    })
    .transform((data) => ({
      ...data,
      permalink: `/articles/${data.slug}`,
    })),
});

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(255),
      cover: s.image(),
      slug: s.slug('project'),
      tags: s.array(tag),
      keywords,
      github: s.string().url().optional(),
      preview: s.string().url().optional(),
      date: s.isodate(),
      metadata: s.metadata(),
      content: s.mdx(),
      status: s.union([
        s.literal('active'),
        s.literal('stable'),
        s.literal('maintenance'),
        s.literal('experimental'),
      ]),
    })
    .transform((data) => ({
      ...data,
      permalink: `/projects/${data.slug}`,
    })),
});

const tags = defineCollection({
  name: 'Tag',
  pattern: 'tags/tags.json',
  schema: s.object({
    name: s.string().max(20),
    slug: s.slug('global'),
    count,
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: {
    about,
    articles,
    projects,
    tags,
  },
  mdx: {
    rehypePlugins: [
      [
        rehypeShiki,
        {
          theme: 'dracula',
        },
      ],
    ],
  },
  prepare({ articles, projects, tags }) {
    articles.splice(
      0,
      articles.length,
      ...visibleArticles(articles, process.env.NODE_ENV),
    );
    // Tags are derived from content, not listed in tags.json, and follow what
    // readers can browse to.
    tags.splice(
      0,
      tags.length,
      ...buildTags(listedArticles(articles), projects),
    );
  },
});
