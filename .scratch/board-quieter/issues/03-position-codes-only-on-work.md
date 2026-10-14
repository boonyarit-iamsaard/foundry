# 03: Position codes only on work, and explain the board

Status: ready-for-agent
Blocked by: 01, 02

Spec: `.scratch/board-quieter/spec.md`

## What to build

Run `/impeccable clarify` on the home board. **This is a refinement, not a
redesign:** keep the Shadow Board, its fonts, tape, lift and status line types.

- A **position code** (see `GLOSSARY.md`) exists only for content: P-nn for
  projects and W-nn for articles. The code helper's prefix type narrows to
  these two kinds.
- Remove the fixture codes (B, C, R, L) everywhere: the hero slots, the contact
  and resume slots, the author slot's "C-01", the About body, and the fixture
  code definitions. A slot without a code is plain: outline and plate, no tape.
- The preview images for home and About drop the code and its tape.
- Remove "Board check: N of N slots filled".
- Add one plain line near the home board that explains it. Draft: "Like a
  hangar tool board: every piece of work hangs in its own outlined place."
  Mark it as a draft for the owner to approve.
- Update the position code rules in `DESIGN.md`.

## Acceptance criteria

- [ ] Browser test: on `/`, `/articles` and `/projects`, every position code shown belongs to an article or project, and no other slot shows a code
- [ ] Browser test: the explanation line is visible on `/`, and "Board check" is not on the page
- [ ] The unit test for the position code helper covers only P and W
- [ ] The home and About preview images have no tape or code
- [ ] A card still lifts on hover and shows its code on the painted shadow
- [ ] `DESIGN.md` describes codes on content only
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
