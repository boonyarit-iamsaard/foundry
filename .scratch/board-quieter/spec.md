# A quieter board

Status: ready-for-agent

## Problem Statement

The Shadow Board redesign shipped, but Boonyarit is not happy with it. The site
feels harder to read than clean sites such as the shadcn/ui docs, the Vercel
docs or Laravel News.

The design review (`.scratch/design-review/research.md`) measured why. The
body text is fine: its size, line height, line length and contrast are all
within guidance. The problem is everything around the text:

- Every slot outline is a 2px near-black line with the same contrast as the
  text (about 12:1). At night every outline is bright yellow.
- Long reading text sits in a frame inside a frame.
- Article and card titles are full sentences set in condensed uppercase.
- The first screen of the home page shows 8 yellow tapes and 35 uppercase
  items.
- The day background is a mid grey with dots, so plates look like light grey
  on grey.

The board's meaning also does not reach a new visitor. The home page shows
position codes (B-00, C-01, R-01, P-01, W-03) and "Board check: 6 of 6 slots
filled" with no explanation.

The site also aims at the wrong people. `PRODUCT.md` treats freelance clients
as a primary audience. But Boonyarit is not looking for clients, and his role
is secure. His real visitors are mostly developers who arrive through an
article, and hiring teams who need to confirm who he is quickly. A hiring
visitor cannot see where he works now, and GitHub is hard to find.

## Solution

Keep the Shadow Board, and make it much quieter. The words become the darkest,
strongest thing on every page. The board is drawn lightly around them.

- Outlines become thin and light. Yellow becomes rare.
- Long text sits directly on the page, with no frame.
- Long titles use normal sentence case.
- One plain line explains the board. Position codes stay only on articles and
  projects, where they mean something.
- The day background becomes close to white.
- The audience changes to developers first and hiring teams second. The copy,
  the About page and the hero now say where Boonyarit works, and they point to
  GitHub.

A browser test checks what a visitor sees at phone and desktop width,
starting with the phone menu bug that no review caught.

## User Stories

### Developers reading articles

1. As a developer who lands on an article from a shared link, I want the text
   to be the darkest thing on the page, so that my eyes stay on the words and
   not on the frames.
2. As a developer reading on a phone, I want the article text to sit directly
   on the page without a frame, so that the text column is wider and the page
   feels calm.
3. As a developer scanning the article list, I want titles in normal sentence
   case, so that I can read them as sentences quickly.
4. As a developer reading at night, I want links underlined in the text
   colour, not bright yellow, so that a paragraph with many links does not
   look busy.
5. As a developer reading at night, I want the outlines drawn in grey, so that
   the page is not covered in yellow lines.
6. As a developer reading in the day theme, I want a near-white page
   background, so that the page looks as clean as the docs I read every day.
7. As a developer who finishes an article, I want a short note about the
   author with a link to write to him, so that I can get in touch if the
   article helped me.
8. As a developer who finishes an article, I want to find his GitHub easily,
   so that I can check his code for myself.
9. As a developer, I want article dates, reading time and tags in normal case,
   so that small details do not compete with the title.
10. As a developer who read the redesign story, I want a short dated note at
    the end saying the board was made quieter afterwards, so that the
    screenshots in the article do not mislead me.

### Hiring teams

11. As a recruiter or engineering manager opening the home page, I want to see
    his name, his current role and his employer in the first screen, so that I
    can confirm the basics in a few seconds.
12. As a hiring visitor, I want the resume and GitHub next to each other in the
    hero, so that I can download one and check the other without searching.
13. As a hiring visitor, I want the contact copy to speak to me, not to people
    with a project to build, so that I know this is the right place to reach
    him.
14. As a hiring visitor, I want the About page to describe what he works on now
    in a few sentences of his own voice, not a list of tools, so that I learn
    how he thinks.
15. As a hiring visitor, I want the About page to show his current title,
    Software Engineer, so that it matches his resume and LinkedIn.

### First-time visitors and the board

16. As a first-time visitor, I want one plain sentence near the board that
    explains it, so that the outlines and codes make sense.
17. As a first-time visitor, I want position codes only on articles and
    projects, so that every code I see points to a piece of work.
18. As a first-time visitor, I do not want a "Board check" line I cannot
    understand, so that the page has no inside jokes.
19. As a first-time visitor, I want the board's pegboard dots only on the home
    page, so that other pages are plain and easy to read.
20. As a first-time visitor, I want far fewer uppercase labels on the first
    screen, so that the page does not feel like it is shouting.
21. As a first-time visitor, I want short labels such as the name, the nav and
    short section headings to keep the board's lettering, so that the site
    still has its identity.
22. As a first-time visitor, I want a project's outline line type to still show
    its project status, so that the board keeps its meaning.
23. As a first-time visitor, I want a card to still lift off its painted shadow
    on hover and show its position code, so that the board's one moment of
    play stays.

### Phone visitors

24. As a phone visitor, I want the menu to open and stay open when I tap it,
    so that I can move around the site.
25. As a phone visitor, I want the text column to use most of the screen width,
    so that lines are not short and broken.

### People sharing links

26. As someone sharing the home page or About on LinkedIn, I want the preview
    image to match the quieter board, so that the preview and the site look
    the same.
27. As someone sharing the home page or About, I want the preview image to have
    no fixture code, so that it matches the page.

### Boonyarit as the owner

28. As the owner, I want `PRODUCT.md` to list developers first, hiring teams
    second, and no freelance clients, so that future design work aims at the
    right people.
29. As the owner, I want `PRODUCT.md` to define success as "a developer reads
    an article to the end and then follows or gets in touch, and a hiring team
    can see who I am, where I work and what I build within 10 seconds", so
    that I can judge changes against it.
30. As the owner, I want `PRODUCT.md` to allow my employer's name, so that
    future work does not remove it.
31. As the owner, I want `DESIGN.md` and the style comments to describe the
    quieter board as it ships, so that the next design session starts from the
    truth.
32. As the owner, I want a browser test that catches the phone menu bug, so
    that the bug cannot come back silently.
33. As the owner, I want before and after screenshots of each page at phone
    and desktop width in both themes, so that I can see the change and use it
    in the pull request and the update note.
34. As the owner, I want to write the final contact copy, the employer sentence
    and the update note myself, so that the site keeps my voice.
35. As the owner, I want body text to stay in Barlow for now, so that I only
    change the font if the site still feels heavy after these changes.

## Implementation Decisions

### Audience and product docs

- `PRODUCT.md` Users: 1. developers who read the writing, 2. hiring teams.
  Freelance clients are removed as a target. The contact form still accepts
  any message.
- `PRODUCT.md` Product Purpose: success is the new definition in story 29.
- `PRODUCT.md`: the employer name (Omise) moves from _Absent_ to evidence on
  hand. Testimonials, metrics and client logos stay absent.
- Principle "Make contact effortless for the people who matter" now names
  developers and hiring teams.

### Outlines and colour

- Slot outlines become 1px in a mid grey, around 2–3:1 against the board.
  This is decoration, so WCAG 1.4.11's 3:1 rule does not apply. Text stays
  the strongest contrast on the page.
- Project status line types stay readable at the thinner weight: dashed and
  dash-dot become about 1–1.5px. "Heavy" stays the only clearly thicker line.
  Project status still never depends on colour.
- The 6px gap between outline and plate stays. The painted shadow stays, and it
  shows only when a plate lifts.
- Night: outlines use a grey rim, not yellow. Yellow is kept for tape, the main
  button and the focus ring only.
- Link underlines use the text colour (muted) in both themes. Yellow is allowed
  on hover only.
- The day board token becomes much lighter, close to white (about L 0.94–0.95
  in oklch). Plates stay slightly lighter or white so they still read as
  plates.
- Pegboard dots appear on the home page only.

### Long text

- On article, project and About pages, the body text is no longer inside a
  slot. It sits on the page in the same reading column, capped at about 68ch.
- The cover image keeps its slot and its position code.
- The author slot at the end of articles and projects keeps its outline.

### Typography

- Article titles (`h1` on article and project pages) and card titles on the
  home page, `/articles` and `/projects` use Barlow in sentence case.
- Big Shoulders uppercase stays for the name plate, short section headings
  (for example "Write to me", "Resume") and the nav. Buttons stay uppercase.
- Dates, reading time, tags and form labels use Barlow in normal case.
- Target: about 10 uppercase items on the home page's first screen at 1280px,
  down from 35.
- Body text stays Barlow at its current size and line height.

### Position codes and the board explanation

- Position codes exist only for content: P-nn for projects and W-nn for
  articles. The code helper's prefix type narrows to these two kinds. The
  fixture codes (B, C, R, L) are removed everywhere, including the fixture
  code definitions and the author slot's "C-01".
- A slot without a code is plain: outline and plate, no tape.
- One plain line near the home board explains the board. Draft: "Like a hangar
  tool board: every piece of work hangs in its own outlined place." The owner
  approves the final wording.
- "Board check: N of N slots filled" is removed.

### Content and copy

- Hero: one sentence names the current role and employer, in the owner's
  voice, next to the existing mechanic story.
- Hero: a visible GitHub link sits next to the resume download.
- Contact copy is rewritten for hiring teams and developers in the hero
  contact slot, the author slot and the contact section. Draft: "Hiring, or
  want to talk about something I wrote?" The owner writes the final wording.
- About: "Current Focus" and "Skills" are rewritten as short prose with the
  Software Engineer title and the employer sentence. No skill lists, tool
  logos or badge grids.
- Redesign article: a short dated update note at the end. The owner writes the
  final wording.

### Preview images

- The generated preview images for home and About drop the fixture code and
  its tape.
- They use the new board colours and a thin outline, so they match the page.
  The preview image's hex colour copies of the tokens are updated with the
  tokens.

### Design system docs

- `DESIGN.md` is updated to match what ships, including the named rules that
  change: the night paint rule (yellow outlines), "every Big Shoulders setting
  is uppercase", position codes on every slot, and the rule that long-form text
  always sits on a plate.
- Style token comments describe the new outline and link colours.
- `GLOSSARY.md` already defines **Position code**. The code may keep the
  `slotCode` name.

## Testing Decisions

- A good test checks what a visitor can see or do, not how the page is built.
  It finds things by role and text, not by class names or CSS values.
- **New seam: page-level browser tests with Playwright** against the running
  site, at phone width (390px) and desktop width (1280px). This is the only
  new seam. It covers:
  - The phone menu opens on tap and is still open afterwards (the June bug).
  - Position codes appear on article and project cards and covers, and on no
    other slot.
  - The board explanation line is visible on the home page, and "Board check"
    is not.
  - A GitHub link is next to the resume download in the hero.
  - Article body text is not inside a slot.
- The same Playwright setup saves screenshots of `/`, `/articles`, one article,
  `/projects`, one project and `/about`, at both widths and in both themes.
  The first run is the "before" set, taken before any visual change. Visual
  decisions (line weight, grey values, lightness, sentence case) are checked
  by the owner from these screenshots, not by assertions.
- **Existing seam: Vitest unit tests.** The position code helper's test changes
  to cover only P and W. Prior art: the helper tests next to each helper,
  for example the navigation and slot code tests.
- `pnpm test`, `pnpm lint:check` and the build must pass. No new linters or
  analysers.

## Out of Scope

- Replacing the Shadow Board or choosing a new design direction.
- Changing the body font. This will be decided again after the "after" user
  test.
- New pages, new projects or new articles.
- Changing the contact form's behaviour, validation or email sending.
- Testimonials, metrics, client logos or any claim the owner has not given.
- The 5-second user test with 3–5 developers. The owner runs it outside this
  build, before and after.
- A follow-up article about these changes. The owner decides later.
- Visual regression testing with stored golden images.

## Further Notes

- Source research: `.scratch/design-review/research.md`. Decisions came from a
  grilling session on 2026-10-14.
- Order: the browser test and the "before" screenshots come first, so every
  later change has a before image.
- Three pieces need the owner's own words: the employer sentence, the contact
  copy and the update note. An agent can draft them and must mark them as
  drafts. Those tickets should be `ready-for-human` or end with an owner
  review step.
- The owner told a LinkedIn commenter the phone menu test is the next step.
  Shipping it first keeps that promise.
- Refinement, not redesign: keep the fonts, the yellow tape, the lift, the
  status line types and the mechanic story. Everything outside this spec stays
  as it is.
