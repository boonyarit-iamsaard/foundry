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

## Comments

### Implementation notes

- The builder is `buildMetadata` in `src/common/helpers/metadata.ts`. The root
  layout spreads it and adds `metadataBase` and the title template.
- `not-found` has no canonical link. It answers any missing URL, so it has no
  path of its own, and 404 responses are not indexed anyway.
- `appConfig.openGraph` and `appConfig.twitter` held only empty `images`
  arrays and nothing read them, so they went too. Issue 04 adds the default
  preview image through the builder.

### Descriptions to rewrite

These read weakly as search snippets. Boonyarit to rewrite; no copy was
changed here.

- `content/articles/2025-04-04-conventional-commit-types-guide/index.mdx`
  (171 chars): over the ~155 limit, so it gets cut off. It also reads as
  generic marketing ("helping you write more meaningful commit messages")
  rather than first person.
- `content/articles/2025-04-10-node-import-style-guide/index.mdx` (120
  chars): length is fine, but "A practical guide to…" is impersonal, unlike
  the first-person voice elsewhere.
- `content/projects/portfolio/index.mdx` (95 chars): ends with "(this site)"
  and no full stop. The parenthetical makes sense on the site but not in a
  search result.
- `content/about.mdx` (64 chars): good voice, but short. It never names
  Boonyarit or Bangkok, which a search for the name would want to see.

The `/articles` (62) and `/projects` (55) descriptions are short but in voice.
They can stay. The site-wide default (139 chars), which home and not-found
use, and `2026-10-11-shadow-board-redesign` (111) read fine.
