# Shared metadata builder, default preview image, and icons

Status: needs-triage

## Problem

Each page assembles its own Next.js `Metadata` object. The article and project
detail pages repeat the same Open Graph and Twitter shape by hand, so a change
to the site-wide defaults has to be copied to every page.

The site also has no preview image or app icons. The root layout sets
`openGraph.images`, `twitter.images`, and `icons` to empty arrays, and the only
icon file in `src/app` is `favicon.ico`. Links shared to social platforms show
no image, despite `twitter.card` being `summary_large_image`.

## Current state

- Pages with metadata: `src/app/layout.tsx`, `about/page.tsx`,
  `articles/page.tsx`, `articles/[slug]/page.tsx`, `projects/page.tsx`,
  `projects/[slug]/page.tsx`.
- Site-wide values live in `src/core/configs/app.config.ts`.
- Article and project detail pages already use their cover as the Open Graph
  image.

## Done when

- Pages build their metadata through one shared helper that applies the
  site-wide defaults from `app.config.ts`, so a page passes only what differs.
- A default preview image exists for pages without a cover.
- The site has an Apple touch icon alongside `favicon.ico`.
