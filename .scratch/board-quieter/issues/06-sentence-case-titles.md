# 06: Sentence-case titles and fewer uppercase labels

Status: ready-for-agent
Blocked by: 01, 02

Spec: `.scratch/board-quieter/spec.md`

## What to build

Run `/impeccable typeset`. **This is a refinement, not a redesign:** keep both
fonts, and keep body text in Barlow at its current size.

- Article and project page titles, and card titles on `/`, `/articles` and
  `/projects`, use Barlow in sentence case. These are full sentences, and the
  in-article headings already work this way.
- Big Shoulders in uppercase stays for the name plate, short section headings
  (for example "Write to me", "Resume") and the nav. Buttons stay uppercase.
- Dates, reading time, tags and form labels use Barlow in normal case.
- Target: about 10 uppercase items on the first screen of `/` at 1280px, down
  from 35.
- Update the `DESIGN.md` typography rules, including "every Big Shoulders
  setting is uppercase".

## Acceptance criteria

- [ ] Article and card titles read in sentence case at both widths
- [ ] The name, nav, short headings and buttons keep their lettering
- [ ] About 10 or fewer uppercase items on the first screen of `/` at 1280px
- [ ] The heading order and titles stay the same for screen readers
- [ ] `DESIGN.md` typography matches what ships
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
