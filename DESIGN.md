---
name: Boonyarit Iamsa-ard
description: The personal site of a software engineer who came from aircraft maintenance, laid out as a tool-control shadow board.
colors:
  board: 'oklch(0.872 0.005 165)'
  board-perforation: 'oklch(0.8 0.006 165)'
  plate: 'oklch(0.968 0.003 165)'
  plate-recess: 'oklch(0.92 0.004 165)'
  ink-paint: 'oklch(0.21 0.008 250)'
  ink-muted: 'oklch(0.42 0.01 250)'
  rim-grey: 'oklch(0.62 0.008 220)'
  field-edge: 'oklch(0.55 0.01 220)'
  safety-yellow: 'oklch(0.86 0.17 92)'
  tape-ink: 'oklch(0.2 0.01 250)'
  fault-red: 'oklch(0.5 0.19 27)'
  foam: 'oklch(0.225 0.002 90)'
  foam-plate: 'oklch(0.29 0.003 90)'
  foam-recess: 'oklch(0.33 0.003 90)'
  foam-text: 'oklch(0.94 0.004 165)'
  foam-muted: 'oklch(0.76 0.003 90)'
  foam-rim: 'oklch(0.48 0.003 90)'
  foam-field-edge: 'oklch(0.55 0.003 90)'
  foam-fault: 'oklch(0.7 0.17 30)'
typography:
  display:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: 'clamp(3.25rem, 6.6vw, 6rem)'
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: '0.005em'
  headline:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)'
    fontWeight: 800
    lineHeight: 0.9
  title:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: '1.875rem'
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: '0.01em'
  body:
    fontFamily: 'Barlow, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: 'Big Shoulders, ui-sans-serif, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '0.1em'
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
    typography: '{typography.label}'
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

The site is a hangar tool-control board. Every piece of work (a project, an article, the contact form, the resume) hangs as an enamel plate inside its own painted outline, labelled with a yellow tape strip carrying a stencilled position code. A visitor reads the board the way a mechanic reads a tool board at shift change: everything has a place, and every place is accounted for. The home board closes with an inventory line ("Board check: 6 of 6 slots filled") that makes the claim literal.

Day and night are two materials, not one palette inverted. Day is a cool grey powder-coated board with a faint perforation, plates in near-white enamel, outlines painted ink-black. Night is charcoal tool foam: no perforation, plates in a lighter charcoal, and the painted outlines turn safety yellow, as if the foam's under-layer shows through the cut-outs. Yellow label tape is the only chromatic accent in both.

Density is moderate and structured: a 12-column board on desktop, slots of unequal size, generous section breaks. Type is condensed, uppercase, and industrial for display and labels; body copy stays in a plain, readable sans in the owner's first-person voice. Motion is limited to two authored behaviours: plates settle into their outlines on arrival, and linked plates lift off their painted shadow on hover or focus.

**Key Characteristics:**

- Every unit of content is a slot: painted outline, 6px gap, plate inside.
- Position codes (B-00, C-nn, R-01, L-nn, P-nn, W-nn) on yellow stencil tape at each slot's top-left: C-01 is the home contact call and C-02 the contact form; L-01 is the home path story and L-02 the About body.
- Project status is drawn as the outline's line type, never as colour.
- Painted shadow is ink-black by day and safety yellow by night.
- Condensed uppercase display (Big Shoulders) over a plain humanist body (Barlow).
- Flat at rest; the only shadow belongs to a lifted plate.

## Colors

A near-neutral industrial palette with one safety-yellow accent; neutrals lean faintly green-grey by day and warm charcoal by night.

### Primary

- **Safety Yellow** (`safety-yellow`): label tape behind position codes, the tape button ("Write to me"), the current nav item, active filter tags, link underlines, text selection, and (by night) the painted outlines, primary buttons and focus ring. It is the board's only chroma.
- **Paint Ink** (`ink-paint`): by day, the painted outline and shadow of every slot, the primary button fill, body text, and the focus ring. It is the same value as the text colour, so outlines read as part of the lettering, not as decoration.

### Neutral

- **Powder-Coat Board** (`board`): page background by day; also the inline-code chip and the sticky header.
- **Perforation Grey** (`board-perforation`): 2px peg holes on a 28px pitch across open board areas, day only.
- **Enamel Plate** (`plate`): every plate surface and form-field fill by day.
- **Plate Recess** (`plate-recess`): secondary/muted fills by day.
- **Stamped Grey** (`ink-muted`): secondary text: dates, reading time, descriptions, muted stamps.
- **Rim Grey** (`rim-grey`) and **Field Edge** (`field-edge`): generic hairline borders and the 2px input stroke.
- **Tape Ink** (`tape-ink`): text on yellow, in both modes.
- **Tool Foam** (`foam`), **Foam Plate** (`foam-plate`), **Foam Recess** (`foam-recess`): night board, night plates, night muted fills.
- **Foam Text** (`foam-text`), **Foam Muted** (`foam-muted`), **Foam Rim** (`foam-rim`), **Foam Field Edge** (`foam-field-edge`): night text, secondary text, hairlines and the 2px input stroke.

### Status

- **Fault Red** (`fault-red`, night `foam-fault`): form errors, invalid fields and the article Draft stamp only.

### Named Rules

**The One Tape Rule.** Safety yellow is the only accent. No second hue enters the board; red is reserved for faults.

**The Night Paint Rule.** The painted outline and shadow swap from ink to yellow at night, and the code on the painted shadow swaps to dark ink. Anything drawn "in paint" (slot rims, the theme-toggle rim, header and footer rules, section dividers, cover borders) follows the swap through the `paint` token, never a fixed colour.

## Typography

**Display Font:** Big Shoulders (variable, with ui-sans-serif)
**Body Font:** Barlow (400, 400 italic, 500, 600, 700, with system-ui)
**Code Font:** Big Shoulders Stencil (position codes only)
**Mono Font:** JetBrains Mono (code in articles)

**Character:** Big Shoulders is the board's painted lettering: condensed, uppercase, set tight. Barlow is the plain voice underneath it, low-contrast and quiet, so the owner's sentences read as speech rather than signage.

### Hierarchy

- **Display** (800, clamp(3.25rem, 6.6vw, 6rem), 0.86, uppercase): the home name plate and page titles (page titles use clamp(3rem, 7vw, 6rem)).
- **Headline** (800, clamp(2.25rem, 4.4vw, 3.75rem) to clamp(2.5rem, 5vw, 4.25rem), 0.88–0.9, uppercase): section headings on the home board and detail-page titles.
- **Title** (700, 1.875rem, 0.95, uppercase): project and article titles on plates; 1.5rem in compact slots and for in-article h3; 2rem for in-article h2.
- **Body** (400, 1.125rem, 1.625): running prose, capped at 62–68ch; 1rem for card descriptions; 1.25rem for lead lines.
- **Label / Stamp** (700, 0.875rem or 0.75rem, 0.1em tracking, uppercase, Big Shoulders): metadata labels, nav items, tags, form labels, inline links in utility rows, the status line name, table headers.
- **Code** (Big Shoulders Stencil 700, 0.8125rem, 0.08em, uppercase, tabular): position codes on tape and on the painted shadow. Nothing else.

### Named Rules

**The Stencil Is For Codes Rule.** Big Shoulders Stencil sets position codes (B-00, P-01, W-02, 404) and nothing else. Words never go on the stencilled tape strip.

**The Uppercase Lettering Rule.** Every Big Shoulders setting is uppercase; Barlow is never uppercase. If it shouts, it is lettering on the board; if it speaks, it is Barlow.

## Layout

Two containers: the board (max 80rem, 1rem side padding, 2rem from 40rem up) and the reading column (max 46rem, same padding) used for article, project and About bodies.

The home board is a 12-column grid on large screens (two columns at sm, one on mobile) with a 24px column gutter and 32px row gap so tape strips have room above each slot. Slots are deliberately unequal: the name plate spans 8 columns, contact and resume stack in the remaining 4, then a 6-column project slot beside two 3-column article slots. Listing pages use a two-column slot grid (one wide slot when only one item exists). Sections break with 80px (112px from sm) vertical padding and a 2px painted rule between pegboard and plain board.

Slot rhythm: outline, 6px inset, plate; plate padding 20px for cards, 24–32px for feature plates, 20–40px horizontal and 32–48px vertical for reading plates. Perforated pegboard covers open board areas: the home board, the contact section, listings, the About body band, the 404 page and the mobile drawer. Long-form reading text always sits on a plate, never directly on the perforation.

## Elevation & Depth

Flat at rest. Depth comes from the slot construction itself: a plate sits over a solid painted shadow that is inset 6px inside the outline, so the outline, gap, and paint read as a recess the plate belongs in. Real shadow appears only when a plate leaves its recess.

### Shadow Vocabulary

- **Lift** (day `0 14px 24px -10px oklch(0.2 0.01 250 / 0.35), 0 3px 6px -2px oklch(0.2 0.01 250 / 0.2)`; night `0 16px 28px -10px oklch(0 0 0 / 0.6), 0 3px 6px -2px oklch(0 0 0 / 0.4)`): a linked plate on hover or focus, translated 4px left and 8px up over 500ms, revealing the painted shadow and its stencil code beneath; and the first frame of the arrival settle.

### Named Rules

**The Lift Reveals Rule.** A plate lifts only when the whole slot is a link. Lifting must expose something true: the painted shadow and its code. Static slots (name plate, contact form, path, reading plates) never lift.

**The One Arrival Rule.** On load, home plates settle into their outlines in sequence (800ms, 80ms stagger, ease-lift `cubic-bezier(0.16, 1, 0.3, 1)`), visible from the first frame. Both motions respect reduced motion.

## Shapes

Small, machined corners. Slot outlines round at 8px, plates and code blocks at 6px, buttons, inputs, nav items and the theme toggle at 4px, tags at 2px, tape at 1px, the header avatar at 3px. Nothing is pill-shaped or fully round.

Borders are painted, not hairline: 2px is the standard stroke for outlines, section rules, cover separators, inputs and outline buttons; tags use 1.5px. Outline line type is semantic (see Slot below). Covers sit flush inside plates and are divided from text by a 2px painted rule.

## Components

### Slot (signature)

The board's unit. An outline, a 6px gap, and a plate.

- **Outline:** 8px radius, painted (`paint`). Line type: solid 2px (default, Stable), dashed 2px (Experimental), heavy 3.5px (Active), chain line 2.5px drawn as an SVG long-dash-dot `12 4 2.5 4` (Maintenance).
- **Painted shadow:** fills the inside at 6px inset, 6px radius, with the stencil code bottom-right in `paint-ink`.
- **Tape:** optional, 12px above the top edge and 16px from the left; a slot without a code is plain fixture.
- **Plate:** enamel (`plate`), 6px radius, sits above the paint. Link slots lift (see Elevation); the whole plate is the hit area via the title link.
- **Focus:** when the slot's own title link (marked `data-slot-link`) is keyboard-focused, the slot shows a 2px ring 4px out and the plate lifts. Other links inside (tags, Live, Source) take the global focus ring on themselves.
- **Empty slot:** outline and painted shadow with no plate, used on the 404 page ("Missing").

### Status Line

Project status as a 24px line sample in the slot's own line type, followed by the status name as a stamp. Projects pages carry a key of all four.

### Buttons

- **Shape:** 4px radius; Big Shoulders 700 uppercase at 0.9375rem, 0.08em tracking; heights 32/40/48px.
- **Primary:** paint ink fill with enamel text by day, yellow with dark ink by night; hover drops to 88% opacity, press nudges 1px down.
- **Tape:** safety yellow with tape ink; the home contact call.
- **Outline:** 2px foreground stroke, transparent; hover fills with foreground and inverts text. Secondary actions (resume beside the form, 404 second action).
- **Ghost / Link:** ghost tints 8% foreground on hover (mobile menu trigger); link is a 2px yellow underline at 6px offset turning ink on hover.

### Tags

- **Style:** stamp lettering at 0.75rem, 28px tall, 2px radius, 1.5px stroke at 40% foreground.
- **State:** hover strengthens the stroke to full foreground; active (selected filter) fills with safety yellow and tape ink.

### Cards / Containers

Cards are slots. Project and article cards put a 16:9 cover on top (or beside it in wide/listing layouts) divided by a 2px painted rule, then 20px padding holding meta (Barlow, muted, tabular), a title, a muted description and tags or utility links. Compact article slots on the home board drop cover and tags and clamp the description to three lines.

### Inputs / Fields

- **Style:** 44px tall (textarea min 128–160px), 2px `field-edge` stroke, enamel fill, 4px radius, Barlow 1rem.
- **Hover / Focus:** stroke rises to 70% foreground on hover and full foreground on focus, plus the global 2px focus ring.
- **Labels:** stamps at 0.75rem above the field. **Error:** fault-red stroke and message.

### Navigation

- **Header:** sticky 64px rail on board colour; 32px avatar in a 2px painted frame, the name in Big Shoulders 800 at 1.375rem, a muted "Software Engineer" stamp on large screens. A 2px painted bottom rule appears only after scrolling.
- **Links:** stamps in 36px-tall cells with 4px radius; hover 8% tint; current page fills with safety yellow.
- **Theme toggle:** three 32px radio cells (Day, Night, Match system) inside a 2px painted frame; the selected cell fills with paint.
- **Mobile:** a left drawer on pegboard with 2px painted right edge; each link is a full-width bordered plate, current one yellow.
- **Footer:** board colour under a 2px painted rule; name in display lettering, muted copyright line, social links as stamps with icons and a yellow underline on hover.

### Reading Plate

Article, project and About bodies sit on one plate in the reading column, under a cover slot carrying the item's code. Prose is Barlow 1.125rem at 1.625, h2/h3 in Big Shoulders uppercase, links underlined in yellow, square list markers, code blocks with a 2px painted frame and 6px radius, tables with a painted header rule.

## Do's and Don'ts

### Do:

- **Do** put every unit of content in a slot: painted outline, 6px gap, plate.
- **Do** give each slot a position code on tape (prefix by kind: B board, C contact, R resume, L long-form, P project, W writing) and number content oldest-first so codes stay stable.
- **Do** encode project status with the outline's line type (solid, dashed, heavy, chain) and show the key wherever several statuses appear together.
- **Do** route every painted element through the `paint` token so it turns yellow at night.
- **Do** keep long-form text on a plate in the 46rem reading column, capped at about 68ch.
- **Do** keep the face to the 32px header avatar only.

### Don't:

- **Don't** put words on the stencilled tape strip, or use Big Shoulders Stencil for anything but codes.
- **Don't** signal project status with colour, badges or pills.
- **Don't** introduce a second accent hue; red is for faults only.
- **Don't** add shadows at rest or lift a slot that is not a link.
- **Don't** round anything beyond 8px or make pill and circle shapes.
- **Don't** set long-form reading text directly on the perforated pegboard.
- **Don't** reintroduce a portrait slot or a large photo of the owner on any page.
