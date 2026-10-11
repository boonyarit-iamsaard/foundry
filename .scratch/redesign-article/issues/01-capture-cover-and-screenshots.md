# Capture the article cover and screenshots

Status: ready-for-agent

Spec: `.scratch/redesign-article/spec.md`

## What to build

Before and after images of the site for the article.

- **Before:** check out `8afb6ab` in a git worktree, install, and run it.
- **After:** run `a2c9cc9` (or `main`, if nothing visual has changed since).
- The contact form's env validation needs `MAIL_FROM_NAME`,
  `MAIL_FROM_ADDRESS` and `MAIL_TO_ADDRESS` set to dummy values for `next dev`
  to start.
- No image converter CLI is installed; `sharp` in `node_modules` converts PNG to
  WebP.

## Done when

- `cover.webp` at 1440×810: a day-theme split of the home first viewport,
  before on the left and after on the right, with no added text. It comes with
  a `cover.webp.json` provenance file in the existing shape (`prompt`,
  `createdAt`) that states how it was captured.
- Inline shots, each as WebP with its own provenance file:
  - the home first viewport by night (after);
  - a lifted card showing its painted code;
  - the 404 empty slot.
- Everything is saved in `content/articles/2026-10-11-shadow-board-redesign/`.
- No image shows a tech matrix or logo grid. The before shot's "Tools" section
  stays out of frame.
