# 08: "After" screenshots and the update note

Status: ready-for-human
Blocked by: 03, 04, 05, 06, 07

Spec: `.scratch/board-quieter/spec.md`

## What to build

Show the change, and keep the published redesign story honest.

- Take the "after" screenshots with the setup from ticket 02: the same 6
  pages, 2 widths and 2 themes. Put them beside the before set so the owner can
  compare, and use them in the pull request.
- Add a short dated update note at the end of the redesign article. It says the
  board was made quieter after the design review. An agent may draft it. The
  owner writes the final words.

## Acceptance criteria

- [ ] 24 after screenshots match the before set one to one
- [ ] The owner has reviewed before and after and is happy with the result
- [ ] The redesign article ends with a dated update note in the owner's words
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
