# Fact sheet: shadow board redesign

Raw material for the article. Everything here is checked against the repo or the session that produced the fixes. Some of it is recorded nowhere else; the git history holds only the diffs. Delete this file together with `handoff.md` once the article ships.

## Timeline

| Date       | Commit    | What happened                                                                                               |
| ---------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| 2026-10-10 | `8afb6ab` | Last commit before the redesign (a dependency bump). This is the "before" state.                            |
| 2026-10-11 | `0a33585` | Redesign: every route rebuilt as a tool shadow board; `PRODUCT.md`, `DESIGN.md` and the design brief added. |
| 2026-10-11 | `af0219b` | `.gitignore` the design tool's session artifacts (`.impeccable/questions/`, `.impeccable/review/`).         |
| 2026-10-11 | `0b64b52` | Fixes for every finding from the two-axis review, plus a Sonar fix.                                         |
| 2026-10-11 | `47a87e0` | `agentRules: false` in `next.config.ts`, so `next dev` stops writing into `AGENTS.md`.                      |
| 2026-10-11 | `bfa9221` | Article handoff added (this folder).                                                                        |

The 0a33585 design session itself ran in an earlier conversation and was not recorded. Ask the author about the moments he remembers.

## Before (`8afb6ab`)

- **Home page:** a stack of generic sections, in this order:
  - **Hero:** a large round portrait; "Hi, I'm Boonyarit Iamsa-ard"; "A Full Stack Developer"; "I focus on building scalable and maintainable web applications."; "Contact me" and "Resume" buttons.
  - **Projects** and **Articles** sections, both as equal cards.
  - A **"Tools"** section: a logo grid of JavaScript, TypeScript, React, Next.js, Node.js, Express.js, Nest.js and PostgreSQL.
  - **Call to action.**
- **Fonts:** Inter for body, JetBrains Mono for code.
- **Project status:** shown as a shadcn badge, with a different variant and colour per status.
- **Title:** "Full Stack Developer" in the hero. The About page still said "Backend Engineer".

## After (HEAD)

- **Metaphor:** a hangar tool-control shadow board. Every piece of work hangs as a plate inside a painted outline, with a yellow tape code (B-00 board, C contact, R-01 resume, L long-form, P projects, W writing). Codes are numbered oldest first, so they stay stable as new work is added.
- **Board check:** the home board ends with an inventory line, "Board check: N of N slots filled".
- **Project status** is drawn as the outline's line style, never as colour: solid for Stable, dashed for Experimental, heavy for Active, chain line (long dash, dot) for Maintenance.
- **Themes are two materials:**
  - Day: grey powder-coated pegboard with outlines painted ink-black.
  - Night: charcoal tool foam, where the outlines show through as safety yellow.
  - Yellow tape is the only accent colour in both themes.
- **Fonts:** Big Shoulders for display, Big Shoulders Stencil for codes only, Barlow for body text.
- **Motion:** two authored moments.
  - Plates settle into their outlines on load.
  - Linked plates lift on hover or focus, showing the painted shadow and the code underneath.
- **404 page:** an empty outline whose item is missing.
- **Title:** now "Software Engineer". The aircraft-mechanic story leads the hero and the "From the hangar floor to the codebase" section.
- **Full spec:** `DESIGN.md`. Intent and audience: `PRODUCT.md`. Direction: `.impeccable/surfaces/src-app-page-tsx.md`.

## Decisions the author made or overrode

- **Portrait:** removed from the home board and the About page at his request during the build. His face now appears only as the 32px header avatar. (Paraphrased; don't quote the original chat.)
- **No skill inventories:** a hard line he set in `PRODUCT.md` before the build: no logo grids, badge grids or keyword dumps. The build still shipped a "What I build" list grouped by area (Backend, Web, Mobile, Practice), each entry a list of tool names. Both review axes flagged it. It was rewritten as three short first-person paragraphs that keep the facts and drop the tool names.
- **`AGENTS.md` is his:** Next 16.4 adds a managed block to `AGENTS.md` whenever `next dev` detects an AI agent. He chose to turn that off rather than commit the block.
- **Commit messages:** he rejected a commit with an explanatory body. The repo convention is a single lowercase conventional subject plus the trailer. The commit was amended.

## The two-axis review (after `0a33585`)

**Setup:**

- Two sub-agents ran in parallel, each blind to the other's context:
  - **Standards:** repo docs, `GLOSSARY.md`, `DESIGN.md` rules and Fowler's code smells.
  - **Spec:** does the code match `PRODUCT.md`, `DESIGN.md` and the design brief?
- There was no tracker issue, so the design docs committed with the redesign served as the spec. The caveat: those docs may have been partly derived from the build itself.
- `pnpm lint:check` and `pnpm type-check` passed throughout. Everything the review found was invisible to tooling.

### Findings, and how each was fixed in `0b64b52`

**Accessibility**

| Finding                                                                                                                                                                                                                                       | Fix                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Buttons, inputs and textareas carried `outline-none`, which overrode the global `:focus-visible` ring. The contact form's submit button showed no keyboard focus at all. `DESIGN.md` promises "the global 2px focus ring". Confirmed by hand. | Removed `outline-none`. Verified in a headless browser: the ring shows in ink by day and yellow by night.                                  |
| The card's focus ring lit up when any link inside was focused (tags, "Live"), so the focused element was unclear.                                                                                                                             | Ring and lift now trigger only from the card's own title link, marked `data-slot-link`. Other links get their own ring. Verified visually. |

**Design spec drift**

| Finding                                                                                                                                 | Fix                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| The C-01 (contact) and R-01 (resume) slots lifted on hover, but `DESIGN.md` says "Static slots never lift"; only whole-card links lift. | Removed `lift` from both.                                                         |
| Code text on the painted shadow used `text-xs tracking-[0.12em]`; the spec says 0.8125rem and 0.08em.                                   | Added a shared `code-stencil` utility, used by both the tape and the shadow code. |
| The Maintenance line sample used dash `8 3 2 3`; the spec says `12 4 2.5 4`.                                                            | Matched it to the spec.                                                           |
| C-02 (contact form) and L-02 (About body) shipped but weren't documented.                                                               | Documented them in `DESIGN.md` and `design.json`.                                 |
| The night input border `oklch(0.55 0.003 90)` had no design token.                                                                      | Added a `foam-field-edge` token.                                                  |

**Copy and vocabulary**

| Finding                                                                      | Fix                                        |
| ---------------------------------------------------------------------------- | ------------------------------------------ |
| "What I build" was a categorized tool list.                                  | Rewritten as prose (see Decisions).        |
| "Outline shows status" broke the `GLOSSARY.md` rule against a bare "status". | Changed to "Outline shows project status". |

**Images**

| Finding                                                                                                            | Fix                                                         |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| The portfolio cover went from a 9.6KB WebP to a 205KB PNG with no provenance file.                                 | Re-encoded to an 87KB WebP with `cover.webp.json`.          |
| `profile.png` was re-encoded although nothing imports it.                                                          | Restored the original bytes.                                |
| The design brief contained session notes ("#1 of my seven grounded candidates…, seed …") and a private chat quote. | Scrubbed both. The quote still exists in 0a33585's history. |

**Code**

| Finding                                                                                                        | Fix                                                                                          |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Dead logo icons (Node, Postgres, Next, JS, TS, React, Express, Nest) left over from the deleted Tools section. | Removed.                                                                                     |
| `slotCode` took any string prefix and returned `P-00` without warning for an unknown slug. It had no test.     | Prefix typed to the six code letters; an unknown slug now throws an error; four tests added. |
| `slotCode('P'\|'W', list, slug)` was repeated in six places.                                                   | Replaced with `projectCode()` and `articleCode()` helpers.                                   |
| The yellow-underline link classes were repeated.                                                               | Shared `tape-link` utility.                                                                  |
| `status-line.tsx` sat outside `components/`.                                                                   | Moved to `features/projects/components/project-status-line.tsx`.                             |
| A magic `3` in the board count.                                                                                | Named `fixtureSlots`.                                                                        |

### A reviewer worry that was wrong

The reviewer thought `slotCode('W', articles…)` counted drafts, which would leave gaps in the numbering on the live site. It doesn't: `velite.config.ts` `prepare` already strips drafts in production. No change was made. This is a good example of checking a finding before acting on it.

### Sonar

- After the fixes, `pnpm sonar:scan` found one bug: `css:S8776`, "Nesting selectors should have a scoping root". The cause was `&:hover` nested inside the new `tape-link` `@utility`, which Sonar doesn't recognise as a parent selector.
- **Fix:** Tailwind's `@variant hover { … }`. The compiled CSS also gained `@media (hover:hover)`, matching every other `hover:` class.
- **Rescan:** 0 issues, 0 hotspots. The first rescan attempt failed with a transient local-server error; the retry succeeded.

## How the fixes were verified

- Lint, type-check, the Vitest suite (16 tests), Prettier and the Velite build all passed.
- A headless Chromium driven over the DevTools protocol (no Playwright installed) captured:
  - day and night themes;
  - desktop (1440px) and mobile (390px) widths;
  - keyboard focus on the title link, on a tag inside a card, on the C-01 button, on the submit button and on an input.
- One gotcha: programmatic `focus()` doesn't trigger `:focus-visible` in headless Chrome until focus emulation is enabled and a real Tab key is sent first.

## Before/after screenshots to capture

- **Before:** check out `8afb6ab` in a git worktree, then `pnpm install && pnpm dev`.
- **After:** HEAD. `content/projects/portfolio/cover.webp` is already a 1440×810 day-theme capture of the home board.
- **Worth capturing:**
  - home, first viewport (both themes);
  - a lifted card showing its painted code;
  - the `/projects` status-outline key;
  - the 404 empty slot.
