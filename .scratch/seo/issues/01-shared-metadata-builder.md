# Shared metadata builder

Status: ready-for-agent

## Problem

Each page assembles its own Next.js `Metadata` object. The article and project
detail pages repeat the Open Graph and Twitter shape by hand. The project page
hardcodes `https://boonyarit.me` and `boonyarit.me` and has no `twitter`
block. No page sets a canonical URL. A site-wide `keywords` list of about 30
phrases goes on every page, and most of those phrases describe nothing on the
site.

## Scope

- One helper builds `Metadata` from the site-wide defaults in
  `src/core/configs/app.config.ts`, so a page passes only what differs (title,
  description, path, preview image, Open Graph type).
- Every page sets `alternates.canonical` to its own path. `/articles` and
  `/projects` use the unfiltered path, so `?tags=` views do not create
  duplicates.
- Remove `keywords` from `app.config.ts`, from the Velite schemas
  (`velite.config.ts`), from content frontmatter, and from every page.
- Drop `creator` from `app.config.ts` and `twitter:creator` from the
  metadata.
- Migrate every page with metadata: `layout.tsx`, `page.tsx` (home),
  `about`, `articles`, `articles/[slug]`, `projects`, `projects/[slug]`, and
  `not-found`.
- Review each page's `description` as a search snippet: about 155 characters
  at most, in Boonyarit's plain first-person voice. List weak ones under
  `## Comments` for Boonyarit to rewrite. Do not invent copy.

## Done when

- No page builds Open Graph or Twitter objects by hand, and no URL is
  hardcoded outside `app.config.ts`.
- Every page's built HTML has one canonical link, and filtered list views
  point it at the unfiltered path.
- No `keywords` meta tag or `twitter:creator` tag appears in the built HTML,
  and `keywords` no longer exists in config, schema, or content.
- Vitest covers the builder: defaults are applied, page values override them,
  and the canonical URL is resolved.
- The old `.scratch/site-metadata` issue is marked `wontfix`, with a pointer
  here.
