# Optional updated date

Status: ready-for-agent

## Problem

Articles and projects have only a `date`. The sitemap's `lastModified` and
`BlogPosting.dateModified` both need a real "last updated" date, and readers
cannot tell when an article was revised.

## Scope

- Add an optional `updated` ISO date to the article and project schemas in
  `velite.config.ts`. It falls back to `date` when absent.
- When `updated` is present and differs from `date`, show it on the article
  page in `article-header.tsx`, styled like the existing date line.
- Do not derive the date from git history, because Vercel's shallow clones make
  that unreliable.

## Done when

- Content without `updated` builds unchanged.
- An article with `updated` shows the updated date to readers.
- A single helper resolves the effective modified date (`updated ?? date`),
  and Vitest covers it.

## Comments

### Implementation notes

- The helper is `modifiedDate` in `src/common/helpers/date.ts`. The schema
  leaves `updated` absent when it isn't set, so issues 03 and 05 must call
  `modifiedDate` rather than read `updated` directly.
- The article header shows "Updated" only when `updated` falls on a different
  calendar day from `date`. A same-day revision would repeat the publish date.
- Projects accept `updated` but show nothing yet; the spec asks for the
  article page only.
