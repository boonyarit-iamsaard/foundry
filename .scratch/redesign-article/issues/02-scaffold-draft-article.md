# Scaffold the draft article

Status: ready-for-agent

Blocked by: 01

Spec: `.scratch/redesign-article/spec.md`

## What to build

The article's `index.mdx` with frontmatter and empty sections, ready for
Boonyarit to write into.

- Copy the frontmatter shape from
  `content/articles/2025-04-10-node-import-style-guide/index.mdx`.
- Title: plain and descriptive, like the existing articles. It's a placeholder
  he will replace.
- Article status: `draft`. Drafts render only in development.
- One heading per outline section in the spec. Under each heading, an MDX
  comment lists the raw-material bullets for that section from the spec. No
  prose.
- Reference the inline shots from 01 where the outline uses them.

## Done when

- `content/articles/2026-10-11-shadow-board-redesign/index.mdx` exists and
  renders at `/articles/<slug>` under `pnpm dev`.
- The page doesn't appear on the production build.
- `pnpm format:check` and the Velite build pass.
- No link to PR #26 anywhere.
