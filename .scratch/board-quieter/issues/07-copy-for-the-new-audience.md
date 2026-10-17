# 07: Hero, contact copy and About for the new audience

Status: ready-for-human
Progress: resolved
Blocked by: 01, 02

Spec: `.scratch/board-quieter/spec.md`

## What to build

The site speaks to developers and hiring teams, in Boonyarit's own voice. An
agent may draft the words, but each draft must be marked as a draft, and the
owner writes the final wording. No Impeccable: this is voice, not design.

- Hero: one sentence that says what he works on now, without naming the
  employer (changed 2026-10-16, see the spec's Audience and product docs), next to
  the mechanic story.
- Hero: a visible GitHub link next to the resume download.
- Contact copy for hiring teams and developers in the hero contact slot, the
  author slot and the contact section. Draft: "Hiring, or want to talk about
  something I wrote?"
- About: rewrite "Current Focus" and "Skills" as short prose with the Software
  Engineer title and the role sentence. No skill lists, tool logos or badge
  grids.

## Acceptance criteria

- [x] Browser test: the hero has a GitHub link next to the resume download
- [x] No page still asks "have something to build?" or talks about a project to build
- [x] The home page and About say what he works on in one sentence each, and
      no page names the employer
- [x] About has no list of tools or skills
- [x] The owner has approved every sentence
- [x] `pnpm test`, `pnpm lint:check`, the browser tests and the build pass

## Comments

- Agent draft in place, each marked `Draft copy` in the source: the role
  sentence in the hero and About, the contact line in the hero and author
  slot, and the contact section paragraph. About had no "Skills" section left;
  "Current Focus" is now prose with no tool names. The redesign article still
  quotes the old "have something to build?" line as history; ticket 08's
  update note is the place to address it. Waiting on the owner's wording.
- 2026-10-16: the owner approved every sentence, including the board line
  from ticket 03. The `Draft copy` markers are removed.
- 2026-10-17: superseded for the contact copy. The owner decided the site
  should not name its audience: the hero asks "Want to talk?", the author slot
  drops its contact line, the contact section keeps only "The message comes
  straight to my inbox.", and the message box has no placeholder. The hero's
  contact call now sits on the name plate, with GitHub under the resume
  download. See `PRODUCT.md`, principle 2.
