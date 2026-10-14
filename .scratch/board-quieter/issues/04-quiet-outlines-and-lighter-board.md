# 04: Quiet outlines and a lighter board

Status: ready-for-agent
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
- Pegboard dots appear on the home page only.
- The preview image's hex copies of the tokens and its outline match the new
  board.
- Update `DESIGN.md` (colours, elevation, the night paint rule) and the style
  token comments.

## Acceptance criteria

- [ ] Outline contrast is between about 2:1 and 3:1, and body text contrast still meets WCAG AA in both themes
- [ ] The four project status line types are still distinguishable at both widths
- [ ] At night, no outline or link underline is yellow, and tape, the main button and focus still are
- [ ] Dots show on `/` and on no other page
- [ ] Preview images use the new colours and a thin outline
- [ ] `DESIGN.md` and token comments match what ships
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
