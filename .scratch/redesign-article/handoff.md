# Handoff: article on the shadow board redesign

Status: ready-for-human

Temporary. Delete this directory once the article ships.

## Goal

Boonyarit wants to write an article showing how he thought through and iterated on the site redesign with the Impeccable design skill. The article should be about his decisions. The tool stays in the background.

He writes the prose himself, in his own voice. The agent supplies raw material, structure and pushback, not the finished copy.

## Agreed angle

- The subject is his judgment, not the tool. A "how I used Impeccable" walkthrough reads like a product demo and suggests the AI designed the site.
- It follows `PRODUCT.md` principles: "Show the work, don't claim it", "Tell the truth about scale", and "Writing has to stand on its own" (readers land on `/articles/[slug]` directly).
- Be clear about who did what: which parts the AI produced, and which he directed, rejected or corrected.
- Paraphrase private conversations; never quote them. A private chat quote was already scrubbed from the surface brief in 0b64b52. The original still exists in commit 0a33585 and must not be copied out of it.
- Keep it tight: three or four decisions with real tension, not a full build log.

## Draft outline (not yet confirmed with the user)

1. **The old site:** what felt off, a generic portfolio with a tech list.
2. **The direction:** why a tool shadow board, and what it encodes. Every piece of work has a place, and project status is shown by the outline's line style.
3. **Constraints set before building:** no skill inventories, keep the mechanic story, keep both themes.
4. **Where he overrode the build:**
   - He reduced his portrait to the header avatar.
   - A categorized tool list crept back into "What I build" despite his own rule, and was rewritten as prose.
5. **Review before shipping:** a two-axis code review (standards and spec) caught several regressions, and he fixed them before merging:
   - focus rings removed from buttons and fields;
   - static slots that lifted on hover;
   - code type and the chain-line dash drifting from `DESIGN.md`;
   - a Sonar CSS issue.

   He also turned off Next's auto-managed `AGENTS.md` block (`agentRules: false`).

6. **What he'd do differently.**

## Raw material (read these; don't re-derive)

- **[`fact-sheet.md`](fact-sheet.md): start here.** It is self-contained, because the session that produced it ran on another machine, and its memory and transcript don't travel with the repo. It covers the timeline, before vs after, the author's decisions, every review finding with its fix, the Sonar issue, and how the fixes were verified.

- **Commits on `feat/shadow-board-redesign`** (no upstream yet):
  - `0a33585`: the redesign itself
  - `af0219b`: ignore impeccable session artifacts
  - `0b64b52`: review fixes
  - `47a87e0`: `agentRules: false`
- **Before state:** `8afb6ab` (main before the redesign). Run it in a git worktree to capture before screenshots.
- **Direction and decisions:**
  - `.impeccable/surfaces/src-app-page-tsx.md`: thesis, first viewport, signature interaction, amendments
  - `DESIGN.md` and `.impeccable/design.json`: the design system as shipped
  - `PRODUCT.md`: audience, voice, hard lines
- **After screenshot:** `content/projects/portfolio/cover.webp` (home board, day theme).
- **Gap:** the design session that produced 0a33585 ran in an earlier conversation and is not recorded here. Ask him for the moments he remembers: candidates he rejected, his first reactions, and what changed his mind.

## Article mechanics

- Location: `content/articles/<YYYY-MM-DD>-<slug>/index.mdx`, with `cover.webp` and a `cover.webp.json` provenance file. Copy the frontmatter shape from `content/articles/2025-04-10-node-import-style-guide/index.mdx`.
- Article status: start as `draft`. Drafts render only in development; Velite strips them in production.
- Prettier checks `.mdx`, so run `pnpm format:check` before committing.
- No image converter CLI is installed, but `sharp` in `node_modules` works for PNG to WebP.

## Repo conventions to respect

- Commits: a single lowercase conventional subject line plus the `Co-Authored-By` trailer, with no body. Run the `commit-message` skill first.
- `AGENTS.md` is hand-written by the user. Don't let tooling write into it.
- Say "article status" or "project status", never a bare "status" (`GLOSSARY.md`).
- No resume-style tech matrices or logo grids, in the article or anywhere else.

## Suggested skills

- `grilling`: stress-test the outline and his account of the decisions before drafting.
- `run`: launch the site at `8afb6ab` and at HEAD for before and after screenshots.
- `commit-message`: before every commit.
- `impeccable`: only if the article needs custom MDX components or layout changes to the reading plate.
