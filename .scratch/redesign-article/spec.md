# Spec: article on the shadow board redesign

Temporary. Delete this directory once the article ships.

## Goal

An article on how Boonyarit worked with the Impeccable design tool to redesign
the site. He writes the prose himself, in his own voice. Agents supply raw
material, structure, scaffolding and images, never the finished copy.

## Angle

Visual design is a skill he was never trained in. An AI design tool covered
that gap: it proposed, and he judged. He accepted most of what it offered
because the reasoning held up, not blindly, and the article has to show that
rather than claim it.

- Describe the weakness as a skill gap ("visual design is the part I've never
  been trained in"). Never call him a backend engineer: the redesign dropped
  that title for Software Engineer.
- Be plain about who did what (see Attribution). Don't dress acceptance up as
  curation.
- Follow `PRODUCT.md`: "Show the work, don't claim it", "Tell the truth about
  scale", and "Writing has to stand on its own" (readers land on
  `/articles/[slug]` directly).

## Backbone

Of eight directions, he picked the tool's own pick, the Shadow Board, over the
random roll, the Drawing Set, because a shadow board is the hangar wall he
actually worked at. The tool's risk line warned that the direction tends to
drift into a tool inventory. It did: the build shipped a "What I build" list
grouped by area. Review caught it, and a rule he had already set, after
rejecting a resume-style tech grid in an earlier session, decided the fix:
three short first-person paragraphs.

## Outline

1. **The old site.** A generic stack of sections: a large round portrait, equal
   cards, a "Tools" logo grid. The site was out of date and showed two past
   titles: "Full Stack Developer" in the hero (the title he searched for and
   was hired under in his first role) and "Backend Engineer" on About (his
   title at a later company). Software Engineer is his current title, not a
   new label he picked for the redesign.
2. **What I told it at init.** Six questions in about five minutes:
   - the title change, plus Spring Boot and React Native, with the resume as a
     placeholder;
   - audiences: all of them, with hiring teams and freelance clients winning
     when they conflict;
   - keep the contact form, the resume, both themes and the mechanic story;
   - the first impression to give: careful, reliable;
   - what would feel wrong: gimmicky, generic, loud and sparse, all four;
   - scope: the whole site.

   The no-inventories rule came from the earlier rejection, not from init.

3. **The directions, and why the Shadow Board.** See Raw material. Mention that
   each declined direction donated one idea; project status shown by line
   pattern came from a declined patch-bay direction.
4. **Where I agreed, and why.** He accepted the later critique and polish pass
   as proposed. Show the reasoning on at least one item instead of asserting
   agreement.
5. **Where I overrode it.**
   - **Audience balance:** mid-build he stopped it, because the build leaned
     toward hiring teams while freelance clients had equal weight.
   - **Portrait:** he asked for his face to matter much less, then suggested
     the header avatar. When the finish reviewer wanted the portrait back
     because the original plan had it, his request held and the brief was
     amended.
   - **Prose headings:** the approved system set article headings in uppercase
     Big Shoulders. Seeing a real article, he moved them to Barlow in sentence
     case, because full-sentence headings shouted.
6. **Layered review.** Each layer caught what the others couldn't.
   - **Him, on a phone.** Reviewing the PR preview, he screen-recorded the
     mobile drawer closing right after it opened. The bug had been live since
     June 28: a dependency-modernization commit added the drawer's own open
     state to a route-change effect to satisfy the exhaustive-deps lint rule,
     so opening the drawer scheduled its close. Lint, types, tests and every
     review agent had passed over it. Be honest that it predates the
     redesign; the redesign's review is what surfaced it.
   - **The two-axis agent review** (standards and spec, in parallel): focus
     rings removed from buttons and fields, and the tool list.
   - **The critique and polish pass:** the contact call hung at the end of
     every article and project (the author slot).
   - **CodeRabbit:** `aria-pressed` on a link.
   - **Cut after review:** the declined finding below raised a question the
     article couldn't answer and pointed at private material. The
     draft-numbering check carries the "verify before acting" lesson instead.
   - **(Cut) Closer:** the CodeRabbit finding he declined. It asked for the branch
     history to be rewritten to remove a private chat quote. The agent worked
     out why that wouldn't help (squash merges keep the commit out of `main`;
     GitHub keeps PR refs anyway). He checked the reasoning and declined.
     Present it as his call on the agent's reasoning, not as his own argument.
     Don't say what the quote was.
7. **What I'd do differently.** Get an independent spec before the build.
   `DESIGN.md` was written from the finished build, so the spec half of the
   agent review was partly checking the build against itself. His own phone
   and CodeRabbit had no such blind spot.

## Rules

- **Source of truth:** PR #26 (all 18 commits and its review threads). The
  squash merge `a2c9cc9` on `main` is the shipped result.
- **Links:** only the live site. Never link PR #26, which exposes the commit
  that still holds the private quote. The `a2c9cc9` commit is out too: its
  message `(#26)` links to the PR automatically.
- Paraphrase private conversations; never quote them.
- No resume-style tech matrices or logo grids, in the article or its images.
- Say "article status" or "project status", never a bare "status"
  (`GLOSSARY.md`).

## Attribution

| Who               | What                                                                                                                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Impeccable (init) | Interview, `PRODUCT.md`, eight directions, the build, the finish review, `DESIGN.md`                                                                                                                                 |
| Boonyarit         | Init answers, picking the Shadow Board, audience correction, portrait, header alignment, scrollbar gutter, finding the drawer bug, Barlow prose headings                                                             |
| Two-axis review   | Findings in the table below                                                                                                                                                                                          |
| Critique / polish | Type scale, name once per screen, author slot, contact confirmation, tape edge, code colours, outline resume button, "Write to me", emoji removal, favicon, drawn portfolio cover, conditional status key and filter |
| CodeRabbit        | Empty filter state, `aria-current`, required fields, refocus after "Send another", the declined history rewrite                                                                                                      |
| Cloud agent       | The drawer fix and its before/after Playwright check                                                                                                                                                                 |

## Raw material

### The directions

The roll assigned **The Drawing Set**: engineering drawing sheets, each page a
numbered sheet, its risk a blueprint costume. The tool's own pick was **The
Shadow Board**, with the inventory-drift and costume risk above. Six
challengers were declined: Normalled Jackfield (patch bay; gave line pattern
for state), Teletext Service (gave durable page addresses), Camcorder
Viewfinder, Timetable Slide Rack (airline nostalgia, the costume he ruled out),
Paper Automata, and Rain-night Cityscape. He chose in about 90 seconds.

### First agent review findings (recorded nowhere else)

Run after the redesign commit, standards and spec axes in parallel. Lint and
type-check passed throughout; everything below was invisible to tooling.

- **Accessibility:** `outline-none` on buttons, inputs and textareas overrode
  the global focus ring, so the submit button showed no keyboard focus. The
  card's ring lit up when any link inside it was focused.
- **Spec drift:** static slots (contact, resume) lifted on hover; code type and
  the Maintenance chain-line dash drifted from `DESIGN.md`; two slots and a
  night input border were undocumented.
- **Copy:** the categorized tool list; a bare "status".
- **Images:** a 205KB PNG cover with no provenance; session notes and a private
  quote in the design brief (scrubbed).
- **Code:** dead logo icons, an untested `slotCode` that silently returned
  `P-00`, repeated helpers.
- **A worry that was wrong:** the reviewer thought drafts would leave gaps in
  slot numbering. Velite already strips drafts in production, so nothing
  changed. Checked before acting.
- **Sonar** then flagged `&:hover` nested in a Tailwind `@utility`; fixed with
  `@variant hover`.

### Sources

- `.impeccable/surfaces/src-app-page-tsx.md`: thesis, first viewport, signature
  interaction, the portrait amendment.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`: as shipped.
- Before state: `8afb6ab`. After state: `a2c9cc9`.
- `content/projects/portfolio/cover.webp` is a drawn spec sheet, not a
  screenshot.
