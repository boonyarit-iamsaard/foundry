# 04: Quiet outlines and a lighter board

Status: ready-for-agent
Progress: resolved
Blocked by: 01, 02

Spec: `.scratch/board-quieter/spec.md`

## What to build

Run `/impeccable quieter` across the board. **This is a refinement, not a
redesign:** keep the Shadow Board, its fonts, the yellow tape, the lift and the
status line types. The goal is that text is the darkest, strongest thing on
every page.

- Slot outlines become 1px in mid grey, about 2–3:1 against the board.
  Dashed and dash-dot lines are about 1–1.5px and still clearly different.
  "Heavy" stays the one thicker line. Project status never depends on colour.
- Keep the 6px gap and the painted shadow that shows when a plate lifts.
- Night: outlines use a grey rim. Yellow is only for tape, the main button and
  the focus ring.
- Link underlines use the muted text colour in both themes. Yellow only on
  hover.
- The day board becomes close to white (about L 0.94–0.95 in oklch). Plates
  still read as plates.
- No page has pegboard dots (changed 2026-10-16: on wide screens the dots filled the margins like wallpaper, so they were removed after a design critique).
- The preview image's hex copies of the tokens and its outline match the new
  board.
- Update `DESIGN.md` (colours, elevation, the night paint rule) and the style
  token comments.

## Acceptance criteria

- [x] Outline contrast is between about 2:1 and 3:1, and body text contrast still meets WCAG AA in both themes
- [x] The four project status line types are still distinguishable at both widths
- [x] At night, no outline or link underline is yellow, and tape, the main button and focus still are
- [x] No page shows pegboard dots
- [x] Preview images use the new colours and a thin outline
- [x] `DESIGN.md` and token comments match what ships
- [x] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass

## Comments

- 2026-10-16: checked in the production build at 390px and 1280px in both
  themes. Slot outlines measure 2.29:1 by day and 2.84:1 at night. The weakest
  body text measures 7.19:1 by day and 6.6:1 at night. The four line types,
  drawn with the slot's own classes, are still distinct; the live site shows
  only one, because all projects are active. At night the only yellow edges
  are the current nav cell and the skip link, which are tape cells.
  Underlines are not yellow at rest. Tape, the main button and the focus ring
  are yellow. Only `/` has dots. The preview image's hex values match the
  tokens to within one step of rounding.
- 2026-10-16: the owner found the day outline too faint, like a hairline. The
  day rim is now `oklch(0.64 0.006 220)`, about 2.9:1 on the board, the same
  weight as the night rim. It is still 1px and still inside 2–3:1.
- 2026-10-16: the owner disliked the day dots, which filled the margins of a
  wide screen. A critique agreed, so the dots are gone in both themes, the
  `pegboard` utility and the perforation token are removed, and the preview
  image is a plain board. Spec and ticket text are updated.
