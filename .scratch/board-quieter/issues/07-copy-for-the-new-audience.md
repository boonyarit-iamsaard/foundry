# 07: Hero, contact copy and About for the new audience

Status: ready-for-human
Blocked by: 01, 02

Spec: `.scratch/board-quieter/spec.md`

## What to build

The site speaks to developers and hiring teams, in Boonyarit's own voice. An
agent may draft the words, but each draft must be marked as a draft, and the
owner writes the final wording. No Impeccable: this is voice, not design.

- Hero: one sentence that names the current role and employer (Omise), next to
  the mechanic story.
- Hero: a visible GitHub link next to the resume download.
- Contact copy for hiring teams and developers in the hero contact slot, the
  author slot and the contact section. Draft: "Hiring, or want to talk about
  something I wrote?"
- About: rewrite "Current Focus" and "Skills" as short prose with the Software
  Engineer title and the employer sentence. No skill lists, tool logos or badge
  grids.

## Acceptance criteria

- [ ] Browser test: the hero has a GitHub link next to the resume download
- [ ] No page still asks "have something to build?" or talks about a project to build
- [ ] The home page and About name the role and Omise in one sentence each
- [ ] About has no list of tools or skills
- [ ] The owner has approved every sentence
- [ ] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass
