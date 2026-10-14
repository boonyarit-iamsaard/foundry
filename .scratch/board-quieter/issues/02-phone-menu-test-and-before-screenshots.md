# 02: Phone menu test and "before" screenshots

Status: ready-for-agent
Blocked by: None (can start immediately)

Spec: `.scratch/board-quieter/spec.md`

## What to build

Add the spec's one new test seam: Playwright tests against the running site at
phone (390px) and desktop (1280px) width. The first test covers the phone menu
bug that was live from June and that every automated check missed.

Use the same setup to save "before" screenshots, taken before any visual
change in this spec. Store them in this feature's scratch directory so ticket 08
can compare.

Find elements by role and visible text, not by class names or CSS values. Add
a package script to run the browser tests. It is separate from `pnpm test`,
which stays Vitest only.

## Acceptance criteria

- [ ] Playwright is installed and runs against a locally started site with one command
- [ ] At 390px, tapping the menu button opens the menu, and it is still open a moment later
- [ ] The test fails if the menu closes itself right after opening (check this by breaking it once)
- [ ] Before screenshots exist for `/`, `/articles`, one article, `/projects`, one project and `/about`, at 390px and 1280px, in day and night themes (24 images)
- [ ] `pnpm test`, `pnpm lint:check` and the build still pass
