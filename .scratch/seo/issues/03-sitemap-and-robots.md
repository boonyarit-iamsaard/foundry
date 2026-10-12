# Sitemap and robots

Status: ready-for-agent

Blocked by: 02

## Problem

The site has no `sitemap.xml` or `robots.txt`, so search engines discover
pages only by following links.

## Scope

- Add `src/app/sitemap.ts` listing home, `/about`, `/articles`, `/projects`,
  every Published article, and every project.
- **Archived** articles are left out because they are "no longer listed
  anywhere". They are not marked `noindex`, so existing links keep their
  value. **Drafts** never appear.
- `lastModified` uses the effective modified date from 02. For list pages it
  is the newest entry they list, and for home and about it is the newest
  content overall.
- Add `src/app/robots.ts` allowing all crawlers and pointing to the sitemap.
- Put the entry selection in a pure function so it can be tested.

## Done when

- `/sitemap.xml` and `/robots.txt` are served from the build with absolute
  URLs based on `appConfig.url`.
- Vitest covers entry selection: Published articles are included, and Archived
  and Draft articles are excluded.
- `## Comments` notes the manual step for Boonyarit: verify the domain in
  Search Console through DNS, then submit the sitemap.
