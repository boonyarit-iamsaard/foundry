import rehypeShiki from '@shikijs/rehype';
import { defineCollection, defineConfig, s } from 'velite';

import type { Article, Project, Tag } from '@/velite';

// TODO: reconsider refactoring this configuration again

function getTags(collection: { tags: string[] }[], tags: Tag[]): string[] {
  const collectionTags = new Set(collection.flatMap((item) => item.tags));
  const existingTags = new Set(tags.map((tag) => tag.name));

  return Array.from(collectionTags).filter((tag) => !existingTags.has(tag));
}

function updateTagCounts(
  tags: Tag[],
  articles: Article[],
  projects: Project[],
): void {
  for (const tag of tags) {
    tag.count.articles = articles.filter((a) =>
      a.tags.includes(tag.name),
    ).length;
    tag.count.projects = projects.filter((p) =>
      p.tags.includes(tag.name),
    ).length;
    tag.count.total = tag.count.articles + tag.count.projects;
  }
}

const count = s
  .object({ total: s.number(), articles: s.number(), projects: s.number() })
  .default({ total: 0, articles: 0, projects: 0 });

const keywords = s.array(s.string()).optional();

const resource = s.union([s.literal('articles'), s.literal('projects')]);

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
      // Case-note fields (optional): surfaced on project cards as evidence.
      role: s.string().max(80).optional(),
      problem: s.string().max(280).optional(),
      outcome: s.string().max(280).optional(),
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
    resource,
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
        rehypeShiki as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        {
          theme: 'dracula',
        },
      ],
    ],
  },
  prepare({ articles, projects, tags }) {
    const tagsFromArticles = getTags(articles, tags);
    const tagsFromProjects = getTags(projects, tags);

    const allTags: Array<{ name: string; resource: 'articles' | 'projects' }> =
      [];
    tagsFromArticles.forEach((name) => {
      allTags.push({ name, resource: 'articles' });
    });
    tagsFromProjects.forEach((name) => {
      if (!allTags.find((t) => t.name === name)) {
        allTags.push({ name, resource: 'projects' });
      }
    });

    allTags.forEach(({ name, resource }) => {
      tags.push({
        name,
        slug: name,
        resource,
        count: { total: 0, articles: 0, projects: 0 },
      });
    });

    updateTagCounts(tags, articles, projects);
  },
});
