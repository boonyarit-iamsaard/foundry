---
name: Boonyarit Iamsa-ard
description: The personal site of a software engineer who came from aircraft maintenance, laid out as a tool-control shadow board.
colors:
  board: 'oklch(0.945 0.004 165)'
  board-perforation: 'oklch(0.88 0.005 165)'
  plate: 'oklch(0.99 0.002 165)'
  plate-recess: 'oklch(0.92 0.004 165)'
  ink-paint: 'oklch(0.21 0.008 250)'
  ink-muted: 'oklch(0.42 0.01 250)'
  rim-grey: 'oklch(0.7 0.006 220)'
  field-edge: 'oklch(0.55 0.01 220)'
  safety-yellow: 'oklch(0.86 0.17 92)'
  tape-ink: 'oklch(0.2 0.01 250)'
  fault-red: 'oklch(0.5 0.19 27)'
  foam: 'oklch(0.225 0.002 90)'
  foam-plate: 'oklch(0.29 0.003 90)'
  foam-recess: 'oklch(0.33 0.003 90)'
  foam-text: 'oklch(0.94 0.004 165)'
  foam-muted: 'oklch(0.76 0.003 90)'
  foam-rim: 'oklch(0.5 0.003 90)'
  foam-paint: 'oklch(0.17 0.002 90)'
  foam-field-edge: 'oklch(0.55 0.003 90)'
  foam-fault: 'oklch(0.7 0.17 30)'
typography:
  display:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: 'clamp(2.75rem, 5vw, 4.5rem)'
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: '0.005em'
  headline:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: 'clamp(2.25rem, 3.6vw, 3.25rem)'
    fontWeight: 800
    lineHeight: 0.9
  title:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(2.25rem, 4vw, 3rem)'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  card-title:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  prose-heading:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '2rem'
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: '-0.01em'
  prose-subheading:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.375rem'
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.625
  meta:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.1em'
  button:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.08em'
  code-stencil:
    fontFamily: 'Big Shoulders Stencil, ui-sans-serif, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.08em'
    fontFeature: 'tnum'
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.625
rounded:
  tape: '1px'
  tag: '2px'
  sm: '4px'
  md: '6px'
  lg: '8px'
spacing:
  slot-inset: '6px'
  plate-sm: '20px'
  plate-md: '24px'
  plate-lg: '32px'
  gutter: '24px'
  row-gap: '32px'
  peg-pitch: '28px'
  section: '80px'
  section-lg: '112px'
components:
  button-primary:
    backgroundColor: '{colors.ink-paint}'
    textColor: '{colors.plate}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '40px'
  button-tape:
    backgroundColor: '{colors.safety-yellow}'
    textColor: '{colors.tape-ink}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '40px'
  button-outline:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-paint}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '40px'
  input:
    backgroundColor: '{colors.plate}'
    textColor: '{colors.ink-paint}'
    rounded: '{rounded.sm}'
    padding: '8px 12px'
    height: '44px'
  tag:
    backgroundColor: 'transparent'
    textColor: '{colors.ink-paint}'
    typography: '{typography.meta}'
    rounded: '{rounded.tag}'
    padding: '0 8px'
    height: '28px'
  tag-active:
    backgroundColor: '{colors.safety-yellow}'
    textColor: '{colors.tape-ink}'
  tape-code:
    backgroundColor: '{colors.safety-yellow}'
    textColor: '{colors.tape-ink}'
    typography: '{typography.code-stencil}'
    rounded: '{rounded.tape}'
    padding: '2px 8px 1px'
  slot-plate:
    backgroundColor: '{colors.plate}'
    textColor: '{colors.ink-paint}'
    rounded: '{rounded.md}'
    padding: '20px'
  nav-link:
    textColor: '{colors.ink-paint}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0 12px'
    height: '36px'
  nav-link-current:
    backgroundColor: '{colors.safety-yellow}'
    textColor: '{colors.tape-ink}'
---

# Design System: Boonyarit Iamsa-ard

## Overview

**Creative North Star: "The Shadow Board"**

The site is a hangar tool-control board. Every unit of content (a project, an article, the contact form, the resume) hangs as an enamel plate inside its own outlined place. Articles and projects, the work itself, are labelled with a yellow tape strip carrying a stencilled position code. A visitor reads the board the way a mechanic reads a tool board at shift change: everything has a place, and every place is accounted for. The home board closes with one plain line that says so for a visitor who has never seen a tool board ("Like a hangar tool board: every piece of work hangs in its own outlined place.").

Day and night are two materials, not one palette inverted. Day is a near-white powder-coated board, plates in white enamel, outlines drawn thin in a mid grey. Night is charcoal tool foam: plates in a lighter charcoal, outlines in a grey rim. In both the board is drawn lightly around the words, so the text is always the darkest, strongest thing on the page. Yellow label tape is the only chromatic accent in both. The pegboard perforation appears on the home page only.

Density is moderate and structured: a 12-column board on desktop, slots of unequal size, generous section breaks. Short lettering (the name, the nav, short headings, buttons) is condensed, uppercase and industrial; everything that reads as a sentence, from article titles to dates and tags, stays in a plain, readable sans in the owner's first-person voice. Motion is limited to two authored behaviours: plates settle into their outlines on arrival, and linked plates lift off their painted shadow on hover or focus.

**Key Characteristics:**

- Every unit of content is a slot: a thin grey outline, 6px gap, plate inside. Long reading text is the one exception: it sits straight on the plain board.
- Position codes on yellow stencil tape at the top-left of work slots only: P-nn for projects and W-nn for articles. Every other slot (the name plate, contact, resume, the path story, the author slot) is plain: outline and plate, no tape.
- Project status is drawn as the outline's line type, never as colour.
- The painted shadow under a plate shows only when the plate lifts: ink-black by day, a hole darker than the foam by night.
- Condensed uppercase lettering (Big Shoulders) for short labels only; titles, metadata and body in a plain humanist sans (Barlow), sentence case.
- Flat at rest; the only shadow belongs to a lifted plate.

## Colors

A near-neutral industrial palette with one safety-yellow accent; neutrals lean faintly green-grey by day and warm charcoal by night.

### Primary

- **Safety Yellow** (`safety-yellow`): label tape (behind position codes, and as the state marker on the current nav item, active filter tags and the skip link), the tape button ("Write to me"), text selection, and link underlines on hover. By night it is also the primary button fill and the focus ring. It is the board's only chroma, and never an outline or a resting underline.
- **Paint Ink** (`ink-paint`): by day, body text, the primary button fill, the focus ring and the painted shadow under each plate. Outlines never use it: the text keeps this contrast to itself.

### Neutral

- **Powder-Coat Board** (`board`): page background by day, close to white; also the inline-code chip and the sticky header.
- **Perforation Grey** (`board-perforation`): 2px peg holes on a 28px pitch, on the home page only, day only.
- **Enamel Plate** (`plate`): every plate surface and form-field fill by day. A shade lighter than the board; the outline does the rest of the work of making it read as a plate.
- **Plate Recess** (`plate-recess`): secondary/muted fills by day.
- **Stamped Grey** (`ink-muted`): secondary text: dates, reading time, descriptions, muted labels.
- **Rim Grey** (`rim-grey`, token `rim`): every slot outline and painted rule (section dividers, header and footer rules, cover separators, code-block frames, the theme-toggle frame, the avatar frame), 1px. About 2.3:1 against the board and 2.6:1 against a plate: decoration, kept well below the text.
- **Field Edge** (`field-edge`): the 2px input stroke. Inputs are controls, so their edge keeps 3:1.
- **Tape Ink** (`tape-ink`): text on yellow, in both modes.
- **Tape Edge** (`tape-edge`): by day yellow barely separates from the light board, so wherever tape marks a state (current nav item, active tag, skip link) it carries a 2px ink edge. At night the edge is yellow and disappears into the fill.
- **Tool Foam** (`foam`), **Foam Plate** (`foam-plate`), **Foam Recess** (`foam-recess`): night board, night plates, night muted fills.
- **Foam Text** (`foam-text`), **Foam Muted** (`foam-muted`), **Foam Field Edge** (`foam-field-edge`): night text, secondary text and the 2px input stroke.
- **Foam Rim** (`foam-rim`): the night outline and rule colour, 1px; about 2.9:1 against the foam and 2.4:1 against a plate.
- **Foam Paint** (`foam-paint`): the night painted shadow, cut deeper than the foam, carrying its code in Foam Muted (about 9:1), seen only when a plate lifts.

### Status

- **Fault Red** (`fault-red`, night `foam-fault`): form errors, invalid fields and the article Draft marker only.

### Named Rules

**The One Tape Rule.** Safety yellow is the only accent. No second hue enters the board; red is reserved for faults. Code highlighting follows it too: tokens are drawn from the board's own neutrals through the `--shiki-*` variables (keywords in ink, strings and constants as faint tints of the board and ink hues), never a bundled editor theme.

**The Quiet Rim Rule.** Outlines and rules are drawn in grey in both themes, through the `rim` token, never in ink and never in yellow. Anything drawn as part of the board (slot outlines, the theme-toggle frame, header and footer rules, section dividers, cover borders, code-block frames) uses it at 1px, so it frames the words without competing with them. At night yellow stays on tape, the primary button, the focus ring, text selection and hovered link underlines.

**The Muted Link Rule.** Link underlines are the muted text colour in both themes. Yellow appears on an underline only on hover.

## Typography

**Display Font:** Big Shoulders (variable, with ui-sans-serif)
**Body Font:** Barlow (400, 400 italic, 500, 600, 700, with system-ui)
**Code Font:** Big Shoulders Stencil (position codes only)
**Mono Font:** JetBrains Mono (code in articles)

**Character:** Big Shoulders is the board's painted lettering: condensed, uppercase, set tight, and kept to a few words at a time. Barlow is the plain voice underneath it, low-contrast and quiet, so the owner's sentences, and every title that is a sentence, read as speech rather than signage.

### Hierarchy

- **Display** (`type-display`: 800, clamp(2.75rem, 5vw, 4.5rem), 0.86, uppercase): every page title at one size: the home name plate, About, the Projects and Articles indexes, and the 404 title.
- **Headline** (`type-headline`: 800, clamp(2.25rem, 3.6vw, 3.25rem), 0.9, uppercase): short section headings on the home board and the contact section. It stays about 1.4x below Display so the two roles never read as one.
- **Title** (`type-title`: Barlow 700, clamp(2.25rem, 4vw, 3rem), 1.1, -0.02em, sentence case, balanced): the article and project detail `h1`. It sits 1.5x above the 2rem prose h2 beneath it.
- **Card Title** (`type-card-title`: Barlow 700, 1.5rem, 1.2, -0.01em, sentence case, balanced): article and project titles on plates, 1.25rem in compact home slots, and the hero contact question. Short plate headings ("Resume", "Written by…", "Message sent") stay in Big Shoulders 700 uppercase at 1.5–1.875rem.
- **Prose Heading** (Barlow 700, sentence case): in-article h2 at 1.5rem (2rem from sm) with 1.15–1.2 leading and -0.01em tracking; h3 at 1.375rem, 1.3 leading. Article headings are often full sentences, so they speak in Barlow rather than shout in lettering.
- **Body** (400, 1.125rem, 1.625): running prose, capped at 36rem (about 70 characters a line); 1rem for card descriptions; 1.25rem for lead lines.
- **Meta** (Barlow 500–600, 0.875rem, muted, tabular where numeric, normal case): dates, reading time, word counts, the role line under the name, the project status name on a status line, tags, form labels, the Draft marker, and Live/Source links on work.
- **Label / Stamp** (`stamp`: Big Shoulders 700, 0.875rem or 0.75rem, 0.1em tracking, uppercase): a few words at most, for example nav items, the skip link, social links, the "Filter by tag" and "Theme" labels, short sub-headings such as "What I build", footer and "All projects"/"All articles" utility links, table headers.
- **Code** (Big Shoulders Stencil 700, 0.8125rem, 0.08em, uppercase, tabular): position codes on tape and on the painted shadow. Nothing else.

### Named Rules

**The Stencil Is For Codes Rule.** Big Shoulders Stencil sets position codes (P-01, W-02, 404) and nothing else. Words never go on the stencilled tape strip.

**The Short Lettering Rule.** Big Shoulders is always uppercase, so it is kept to a few words: the name, the nav, short headings, buttons and stamps. Anything that reads as a sentence (an article or project title, a question, a role line) or as data (dates, reading time, tags, form labels) is Barlow in its authored case. Barlow is never uppercase. On the home page's first screen at 1280px, uppercase stays at about ten items.

## Layout

Two containers: the board (max 80rem, 1rem side padding, 2rem from 40rem up) and the reading column (max 46rem, same padding) used for article, project and About pages. Long text inside it is capped at 36rem, about 70 characters per line in Barlow at 18px (CSS `68ch` would run near 90 in this narrow face); on a phone it fills the column to the 16px gutters.

The home board is a 12-column grid on large screens (two columns at sm, one on mobile) with a 24px column gutter and 32px row gap so tape strips have room above each slot. Slots are deliberately unequal: the name plate spans 8 columns, contact and resume stack in the remaining 4, then a 6-column project slot beside two 3-column article slots. Listing pages use a two-column slot grid (one wide slot when only one item exists). Sections break with 80px (112px from sm) vertical padding and a 1px rim rule.

Slot rhythm: outline, 6px inset, plate; plate padding 20px for cards, 24–32px for feature plates. Perforated pegboard covers the home page's open board only (the home board and the contact section); every other page, and the mobile drawer, is plain board. Long-form reading text sits directly on the plain board, never in a slot and never on the perforation.

## Elevation & Depth

Flat at rest. Depth comes from the slot construction itself: a thin outline, a 6px gap of board, and the plate, so the outline reads as the place the plate belongs in. Under the plate, inset 6px inside the outline, sits a solid painted shadow (ink by day, darker than the foam by night) carrying the stencil code. It stays hidden until the plate lifts; the one exception is the empty slot on the 404 page, whose plate is missing. Real shadow appears only when a plate leaves its recess.

### Shadow Vocabulary

- **Lift** (day `0 14px 24px -10px oklch(0.2 0.01 250 / 0.35), 0 3px 6px -2px oklch(0.2 0.01 250 / 0.2)`; night `0 16px 28px -10px oklch(0 0 0 / 0.6), 0 3px 6px -2px oklch(0 0 0 / 0.4)`): a linked plate on hover or focus, translated 4px left and 20px up over 500ms, far enough to uncover the stencil code beneath. The arrival settle starts from the same shadow but a shorter rise (4px left, 10px up).

### Named Rules

**The Lift Reveals Rule.** A plate lifts only when the whole slot is a link. Lifting must expose something true: the painted shadow and its code. Static slots (name plate, contact form, path, cover, author slot) never lift.

**The One Arrival Rule.** On load, home plates settle into their outlines in sequence (800ms, 80ms stagger, ease-lift `cubic-bezier(0.16, 1, 0.3, 1)`), visible from the first frame. Both motions respect reduced motion.

## Shapes

Small, machined corners. Slot outlines round at 8px, plates and code blocks at 6px, buttons, inputs, nav items and the theme toggle at 4px, tags at 2px, tape at 1px, the header avatar at 3px. Nothing is pill-shaped or fully round.

Board lines are thin: 1px in rim grey for outlines, section rules, cover separators and frames. Controls keep a firmer stroke: 2px for inputs and outline buttons, 1.5px for tags. Outline line type is semantic (see Slot below). Covers sit flush inside plates and are divided from text by a 1px rim rule.

## Components

### Slot (signature)

The board's unit. An outline, a 6px gap, and a plate.

- **Outline:** 8px radius, rim grey (`rim`). Line type: solid 1px (default, Stable), dashed 1.5px (Experimental), heavy 3px (Active, the one clearly thicker line), chain line 1.5px drawn as an SVG long-dash-dot `12 4 1.5 4` (Maintenance). Dashed and chain lines get the extra half pixel so their breaks still read at 1x.
- **Painted shadow:** fills the inside at 6px inset, 6px radius, with the stencil code bottom-right in `paint-ink`, 2px off the bottom so a lifted plate uncovers it.
- **Tape:** optional, 12px above the top edge and 16px from the left; only article and project slots carry a code. A slot without one is plain: outline and plate, no tape.
- **Plate:** enamel (`plate`), 6px radius, sits above the painted shadow. Link slots lift (see Elevation); the whole plate is the hit area via the title link.
- **Focus:** when the slot's own title link (marked `data-slot-link`) is keyboard-focused, the slot shows a 2px ring 4px out and the plate lifts. Other links inside (tags, Live, Source) take the global focus ring on themselves.
- **Empty slot:** outline and painted shadow with no plate, used on the 404 page ("Missing"). It is the one place the painted shadow shows at rest, because showing the missing item is the page's whole message.

### Status Line

Project status as a 24px line sample in the slot's own line type, followed by the status name in Barlow 500 (meta). Projects pages carry a key of all four.

### Buttons

- **Shape:** 4px radius; Big Shoulders 700 uppercase at 0.9375rem (`button`), 0.08em tracking; heights 32/40/48px.
- **Primary:** paint ink fill with enamel text by day, yellow with dark ink by night; hover drops to 88% opacity, press nudges 1px down.
- **Tape:** safety yellow with tape ink; the home contact call.
- **Outline:** 2px foreground stroke, transparent; hover fills with foreground and inverts text. The resume download everywhere it appears (so the tape button stays the one filled call at night too), and the 404 second action.
- **Ghost / Link:** ghost tints 8% foreground on hover (mobile menu trigger); link is a 2px underline at 6px offset in the muted text colour, turning yellow on hover, in both themes.

### Tags

- **Style:** Barlow 500 at 0.875rem in the tag's authored case, 28px tall, 2px radius, 1.5px stroke at 40% foreground.
- **State:** hover strengthens the stroke to full foreground; active (selected filter) fills with safety yellow and tape ink inside a `tape-edge` stroke. On coarse pointers the hit area extends 8px above and below.

### Cards / Containers

Cards are slots. Project and article cards put a 16:9 cover on top (or beside it in wide/listing layouts) divided by a 1px rim rule, then 20px padding holding meta (Barlow, muted, tabular), a Barlow card title in sentence case, a muted description and tags or utility links. Compact article slots on the home board drop cover and tags and clamp the description to three lines.

### Inputs / Fields

- **Style:** 44px tall (textarea min 128–160px), 2px `field-edge` stroke, enamel fill, 4px radius, Barlow 1rem.
- **Hover / Focus:** stroke rises to 70% foreground on hover and full foreground on focus, plus the global 2px focus ring.
- **Labels:** Barlow 600 at 0.875rem above the field. **Error:** fault-red stroke and message.

### Navigation

- **Header:** sticky 64px rail on board colour; 32px avatar in a 1px rim frame, the name in Big Shoulders 800 at 1.375rem, a muted "Software Engineer" in Barlow 0.875rem on large screens. A 1px rim bottom rule appears only after scrolling.
- **Links:** stamps in 36px-tall cells with 4px radius; hover 8% tint; current page fills with safety yellow inside a 2px `tape-edge` stroke.
- **Theme toggle:** three 32px radio cells (Day, Night, Match system) inside a 1px rim frame; the selected cell fills with the text colour.
- **Mobile:** a left drawer on plain board with a 1px rim right edge; each link is a full-width plate in a 1px rim, current one yellow. Below the links hang "Write to me" (tape) and "Download resume" (outline).
- **Footer:** board colour under a 1px rim rule; name in display lettering, muted copyright line, "Write to me" and "Download resume" as stamps with a muted underline, then social links as stamps with icons and a muted underline on hover.
- **Skip link:** "Skip to content" as a yellow stamp cell with a `tape-edge` stroke, hidden above the rail until focused.

### Reading Column

Article, project and About bodies sit directly on the plain board in the reading column, with no outline or plate: the board frames the work, not the words. On articles and projects they sit under a cover slot carrying the item's code, and they end at the author slot, which keeps its outline. Prose is Barlow 1.125rem at 1.625, h2/h3 as Barlow 700 sentence-case prose headings, links underlined in the muted text colour, square list markers, inline code and code blocks on the muted recess (blocks with a 1px rim frame and 6px radius), tables with a 1px rim header rule. The cover slot is a 2:1 strip (21:9 from sm) so prose starts early, and it alone carries the item's code; the page header shows no second tape.

### Author Slot

Every article and project ends with the contact call, a plain slot with no code: "Written by" or "Built by Boonyarit Iamsa-ard", one sentence of the mechanic story, then "Write to me" (tape, to `/#contact`) and "Download resume" (outline). A reader who lands deep is one step from both.

### Contact Confirmation

A sent message replaces the contact form in place: a check, "Message sent", the address the reply goes to, and an outline "Send another". Focus moves to the heading. Failures stay a toast and keep the input.

## Do's and Don'ts

### Do:

- **Do** put every unit of content in a slot: thin outline, 6px gap, plate. Long reading text is the exception.
- **Do** give each article and project a position code on tape (P project, W writing) and number them oldest-first so codes stay stable. No other slot carries a code.
- **Do** encode project status with the outline's line type (solid, dashed, heavy, chain) and show the key wherever several statuses appear together.
- **Do** draw every outline and rule through the `rim` token at 1px, so the text stays the strongest thing on the page.
- **Do** keep the pegboard perforation to the home page.
- **Do** set long-form text directly on the plain board in the 46rem reading column, capped at 36rem (about 70 characters a line).
- **Do** keep the face to the 32px header avatar only.

### Don't:

- **Don't** put words on the stencilled tape strip, or use Big Shoulders Stencil for anything but codes.
- **Don't** give a slot that holds no article or project a position code; a code must point to a piece of work.
- **Don't** signal project status with colour, badges or pills.
- **Don't** introduce a second accent hue; red is for faults only.
- **Don't** draw an outline, a rule or a resting link underline in yellow or in the text colour.
- **Don't** add shadows at rest or lift a slot that is not a link.
- **Don't** round anything beyond 8px or make pill and circle shapes.
- **Don't** put long-form reading text in a slot or on the perforated pegboard.
- **Don't** reintroduce a portrait slot or a large photo of the owner on any page.
