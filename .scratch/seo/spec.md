# SEO overhaul

## Goal

In priority order:

1. Links shared to LinkedIn, Slack, or a job application show a correct title,
   description, and **preview image**.
2. A search for "Boonyarit Iamsa-ard" lands on the site with a rich result.
3. Engineers find articles through search.

## Decisions

- **Keywords are removed** everywhere: the `keywords` list in
  `src/core/configs/app.config.ts`, the `keywords` frontmatter field on
  articles and projects, and the `keywords` meta tag. Search engines ignore
  them, and the list breaks the "no bare keyword dumps" brand line.
- **`twitter:creator` is dropped.** The `@boonyarit_iam` handle is not used.
  The `twitter:card` tags stay, because X still reads them for previews.
- **Every page sets a self-referencing canonical URL**, except not-found,
  which answers any missing URL and so has no path of its own. Filtered list
  views such as `/articles?tags=node` use the unfiltered path as their
  canonical. Home is written `https://boonyarit.me`, with no trailing slash,
  in the canonical link, sitemap, and structured data alike.
- **Preview image**: detail pages use their cover. Home, about, `/articles`,
  `/projects`, and not-found use one generated image (`next/og`) in the
  board's visual language, rendered in the light theme only. A cover much
  narrower than 2:1 gets X's `summary` preview, so it is shown whole rather
  than cropped.
- **Sitemap and robots**: drafts never appear. Archived articles are left out
  of the sitemap but stay indexable (no `noindex`), so existing links keep
  their value. `lastModified` is `updated ?? date`.
- **Optional `updated` date** on articles and projects, falling back to
  `date`. The article page shows it when present.
- **Structured data (JSON-LD)**: `Person` and `WebSite` on the home page,
  `BlogPosting` on each article. `Person` has a stable `@id` that the other
  entities reference. It carries name, `jobTitle` "Software Engineer", url,
  profile photo, `sameAs` (GitHub and LinkedIn), and an address of Bangkok,
  TH. It has no `knowsAbout`, because that would be a skill list. Projects get
  no schema.
- **Search Console is verified through a DNS TXT record**, so no
  `verification` meta tag goes in the code. Submitting the sitemap is a manual
  step for Boonyarit after deploy.

## Out of scope

- RSS or Atom feed (separate follow-up).
- Rewriting page descriptions. Weak ones are flagged for Boonyarit to rewrite.
- No ADR: none of these decisions is hard to reverse.

## Issues

1. `01-shared-metadata-builder.md`
2. `02-updated-date.md`
3. `03-sitemap-and-robots.md`
4. `04-preview-images.md`
5. `05-structured-data.md`

Supersedes `.scratch/site-metadata/issues/01-shared-metadata-builder-preview-image-and-icons.md`.

## Verification (every issue)

- Vitest unit tests cover the issue's pure logic.
- Check the built HTML `<head>` by hand.
- After deploy, check with Google's Rich Results Test and a share-preview
  debugger (LinkedIn Post Inspector, opengraph.xyz).
