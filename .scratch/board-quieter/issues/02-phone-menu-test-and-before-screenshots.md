# 02: Phone menu test and "before" screenshots

Status: ready-for-agent
Progress: resolved
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

- [x] Playwright is installed and runs against a locally started site with one command
- [x] At 390px, tapping the menu button opens the menu, and it is still open a moment later
- [x] The test fails if the menu closes itself right after opening (check this by breaking it once)
- [x] Before screenshots exist for `/`, `/articles`, one article, `/projects`, one project and `/about`, at 390px and 1280px, in day and night themes (24 images)
- [x] `pnpm test`, `pnpm lint:check` and the build still pass

## Usage

- `pnpm test:e2e` builds the site, starts it on port 3200 and runs the browser
  tests at 390px (`phone`) and 1280px (`desktop`). A server already on that
  port is reused outside CI.
- `SCREENSHOTS_DIR=<dir> pnpm test:screenshots` saves the 24 captures to
  `<dir>`. The before set is in `.scratch/board-quieter/screenshots/before/`,
  named `<page>-<width>-<day|night>.png`. Ticket 08 uses `.../after/`.
