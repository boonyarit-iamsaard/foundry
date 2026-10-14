# 05: Long text off the board

Status: ready-for-agent
Blocked by: 03, 04

Spec: `.scratch/board-quieter/spec.md`

## What to build

Run `/impeccable quieter` on the reading pages. **This is a refinement, not a
redesign.**

On article, project and About pages, the body text no longer sits inside a
slot. It sits directly on the page, in the same reading column, capped at about
68ch. This needs ticket 04's plain background, so text never sits on the dots.

- The cover image keeps its slot and its position code.
- The author slot at the end of articles and projects keeps its outline.
- On a phone, the text column gets wider because the frame's padding is gone.
- Update the `DESIGN.md` rules about the reading plate and long-form text.

## Acceptance criteria

- [ ] Browser test: on an article page, the body text is not inside a slot, and the cover is
- [ ] The same is true on a project page and on `/about`
- [ ] At 390px, the text column is wider than in the before screenshots
- [ ] The line length stays at about 68ch or less at 1280px
- [ ] `DESIGN.md` describes long text on the page, not on a plate
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
