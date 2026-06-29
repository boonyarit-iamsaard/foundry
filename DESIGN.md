---
name: boonyarit.me
description: The personal portfolio of a full-stack developer — content-first, calm, credibility-led.
colors:
  terracotta: 'oklch(0.64 0.17 36.44)'
  terracotta-foreground: 'oklch(1 0 0)'
  cool-paper: 'oklch(0.94 0 236.5)'
  card-white: 'oklch(1 0 0)'
  ink: 'oklch(0.32 0 0)'
  muted-slate: 'oklch(0.5 0.02 264.36)'
  secondary-mist: 'oklch(0.97 0 264.54)'
  accent-haze: 'oklch(0.91 0.02 243.82)'
  accent-ink: 'oklch(0.38 0.14 265.52)'
  border-mist: 'oklch(0.9 0.01 247.88)'
  destructive-red: 'oklch(0.64 0.21 25.33)'
  midnight-bg: 'oklch(0.26 0.03 262.67)'
  midnight-card: 'oklch(0.31 0.03 268.64)'
  midnight-ink: 'oklch(0.92 0 0)'
typography:
  display:
    fontFamily: "'Inter Variable', sans-serif"
    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)'
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: '-0.025em'
  headline:
    fontFamily: "'Inter Variable', sans-serif"
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  title:
    fontFamily: "'Inter Variable', sans-serif"
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 'normal'
  body:
    fontFamily: "'Inter Variable', sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 'normal'
  label:
    fontFamily: "'JetBrains Mono Variable', monospace"
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: '0.02em'
rounded:
  sm: '8px'
  md: '10px'
  lg: '12px'
  xl: '16px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '32px'
  xl: '64px'
components:
  button-primary:
    backgroundColor: '{colors.terracotta}'
    textColor: '{colors.terracotta-foreground}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    padding: '8px 16px'
    height: '36px'
  button-primary-hover:
    backgroundColor: 'oklch(0.64 0.17 36.44 / 0.9)'
    textColor: '{colors.terracotta-foreground}'
  button-secondary:
    backgroundColor: '{colors.secondary-mist}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '8px 16px'
    height: '36px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '8px 16px'
    height: '36px'
  badge-default:
    backgroundColor: '{colors.terracotta}'
    textColor: '{colors.terracotta-foreground}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '2px 8px'
  badge-tag:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    typography: '{typography.label}'
    rounded: '{rounded.md}'
    padding: '2px 8px'
  card:
    backgroundColor: '{colors.card-white}'
    textColor: '{colors.ink}'
    rounded: '{rounded.xl}'
    padding: '24px'
  input:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '4px 12px'
    height: '36px'
---

# Design System: boonyarit.me

## 1. Overview

**Creative North Star: "The Engineer's Field Notes"**

This is the working notebook of someone who builds and ships — precise, written
by a real person, and confident enough to stay quiet. The system serves three
things in order: the person, the work, and the writing. Design never performs;
it clears the way for substance. Where a peer, a recruiter, a client, or a reader
lands, the page should read as _honest evidence of competence_, not a pitch.

The character is calm and warm. A single warm terracotta carries identity and
marks what matters; everything around it is cool-tinted near-paper and clear ink.
A monospace voice (JetBrains Mono) surfaces only in the margins — dates, tags,
reading time, stack labels — a quiet technical texture that says "engineer" the
way a field notebook's gridlines do, without ever becoming a costume. Surfaces
are flat at rest; depth is reserved for interaction, so motion and elevation
_mean_ something when they appear.

This system explicitly rejects four things, carried straight from the product
brief: **flashy "creative developer" spectacle** (scroll-jacking, WebGL, cursor
trails) that undercuts credibility; **AI-slop SaaS landing scaffolding** (gradient
heroes, uppercase eyebrows on every section, identical three-card grids, the
hero-metric template); the **hacker-terminal gimmick** where dark "matrix" styling
stands in for substance; and the **generic template look** that makes one developer
indistinguishable from ten thousand others. Restraint here is a point of view, not
an absence of one.

**Key Characteristics:**

- One warm accent (terracotta) against cool, quiet neutrals — identity through rarity
- Mono used only for metadata; the field-notes texture, never the whole page
- Flat at rest, elevation on interaction — depth is earned
- Editorial hierarchy and whitespace carry confidence, not density or decoration
- Content-first: the work and the writing are always the loudest element

## 2. Colors

A cool, quiet neutral field with one warm signal. The warmth lives in the accent,
not in the background — the page reads as calm paper, not as a tinted "cream."

### Primary

- **Terracotta** (`oklch(0.64 0.17 36.44)`): The single identity color. Primary
  buttons, links, focus rings, selection, the default badge, and the one mark
  the eye should follow. Warm and grounded — the "ink stamp" of the field notes.
  Used sparingly; its scarcity is what gives it weight.

### Secondary

- **Accent Haze** (`oklch(0.91 0.02 243.82)`, ink `oklch(0.38 0.14 265.52)`): A
  cool, low-chroma blue-grey for hover surfaces and quiet emphasis (ghost/nav
  hover, subtle highlights). Never competes with terracotta for attention.

### Neutral

- **Cool Paper** (`oklch(0.94 0 236.5)`): The light-mode page background. A true
  cool near-white — deliberately _not_ warm/cream, to keep terracotta the only
  source of warmth.
- **Card White** (`oklch(1 0 0)`): Pure white surfaces that lift content off the
  cool-paper field. This tonal contrast (not shadow) is the primary separation.
- **Ink** (`oklch(0.32 0 0)`): Primary text. Near-black, neutral, high-contrast.
- **Muted Slate** (`oklch(0.55 0.02 264.36)`): Secondary text, metadata,
  placeholders. Verified ≥4.5:1 on cool-paper and card-white — muted, never washed.
- **Border Mist** (`oklch(0.9 0.01 247.88)`): Hairline 1px borders and dividers
  that define structure in place of shadows.

### Dark Mode

- **Midnight** background (`oklch(0.26 0.03 262.67)`) and card
  (`oklch(0.31 0.03 268.64)`): cool deep blue-grey, ink `oklch(0.92 0 0)`.
  Terracotta is unchanged across modes — the constant identity signal.

### Named Rules

**The One Warm Signal Rule.** Terracotta is the _only_ warm color in the system
and appears on ≤10% of any screen. If two things are terracotta, one of them is
wrong. Warmth is a signal, not a wash.

**The Cool-Paper Rule.** The light background is cool and neutral, never a warm
cream/sand/parchment. If the body bg looks "cozy," it has drifted; pull it back
toward `oklch(0.94 0 236.5)`.

## 3. Typography

**Display / Body Font:** Inter Variable (with `sans-serif` fallback)
**Label / Mono Font:** JetBrains Mono Variable (with `monospace` fallback)

**Character:** One humanist-leaning sans does the heavy lifting across display and
body, varied by weight rather than family — quiet and unified. The monospace is
the contrast axis: it appears only in the margins as the field-notebook texture
(dates, tags, reading time, stack labels), giving an engineer's signature without
turning the page into a terminal.

### Hierarchy

- **Display** (Inter, 900, `clamp(1.5rem, 4vw, 2.25rem)`, lh 1.1, tracking
  -0.025em): The name in the hero and top-level page titles. Heavy weight, tight
  tracking. Use `text-wrap: balance`.
- **Headline** (Inter, 700, `clamp(1.125rem, 3vw, 1.5rem)`, lh 1.2): Section
  headings and the hero's role line ("A Full Stack Developer").
- **Title** (Inter, 600, 1.125rem, lh 1.3): Card titles, article/project names.
- **Body** (Inter, 400, 1rem, lh 1.6): Prose and descriptions. Cap measure at
  65–75ch; use `text-wrap: pretty` on long-form MDX.
- **Label** (JetBrains Mono, 500, 0.75rem, tracking 0.02em): Metadata only —
  dates, tags, reading time, tech-stack chips. The field-notes voice.

### Named Rules

**The Mono-In-The-Margins Rule.** JetBrains Mono is for metadata only. It never
sets a heading, a paragraph, or a CTA. The moment mono carries primary content,
the page tips from "engineer's notes" into "terminal gimmick" — forbidden.

**The Weight-Not-Family Rule.** Hierarchy in running text comes from Inter's
weight (400 → 600 → 700 → 900), not from introducing a second sans. Never pair
Inter with another humanist or geometric sans.

## 4. Elevation

Flat by default. Surfaces are separated by tonal contrast (card-white lifting off
cool-paper) and 1px Border-Mist hairlines, not by resting shadows. Depth is a
_response to interaction_ — it appears on hover and focus, and its appearance
carries meaning. This is the editorial, confident reading of the shadcn base,
and it deliberately removes the resting `shadow-sm` that makes default component
kits read as generic.

### Shadow Vocabulary

- **Interaction lift** (`box-shadow: 0px 1px 3px 0px hsl(0 0% 0% / 0.1), 0px 2px 4px -1px hsl(0 0% 0% / 0.1)`):
  Applied on hover/focus for cards and interactive surfaces. Pairs with a small
  `translateY(-2px)`. The only place a shadow belongs.
- **Focus ring** (3px `ring` in terracotta at ~50% alpha): The accessibility
  signal on every focusable control. Always present on `:focus-visible`.

### Named Rules

**The Flat-At-Rest Rule.** No element carries a drop shadow at rest. Cards, badges,
inputs, and buttons sit flat on the page until hovered or focused. If a card has
a resting shadow, delete it and lean on the border + tonal contrast. Shadow is the
reward for interaction, never the default.

## 5. Components

Built on shadcn/ui (new-york), refined toward restraint. Soft 0.75rem corners,
hairline borders, quiet hover. The distinctive layer is mono metadata, not extra
chrome.

### Buttons

- **Shape:** Soft corners (10px, `rounded-md`).
- **Primary:** Terracotta background, white text, `8px 16px` padding, 36px tall
  (lg = 40px, `h-10`, for hero CTAs). Flat at rest.
- **Hover / Focus:** Background to terracotta at 90% alpha; `:focus-visible` shows
  the 3px terracotta ring. Smooth `transition-all`.
- **Secondary:** Secondary-Mist surface, ink text — the quiet companion to the
  primary CTA (e.g. the "Resume" button beside "Contact me").
- **Ghost:** Transparent, with Accent-Haze background on hover. For nav and
  low-emphasis actions.
- **Link:** Terracotta text, underline on hover.

### Chips / Tags / Badges

- **Default badge:** Terracotta background, white text, mono label — use sparingly
  for true emphasis.
- **Tag chip:** Transparent with hairline border, ink text, **mono label** (0.75rem,
  tracking 0.02em). The canonical field-notes element: post tags, stack labels,
  filters. Hover adds Accent-Haze.

### Cards / Containers

- **Corner Style:** Generously soft (12–16px, `rounded-xl`).
- **Background:** Card-White lifting off the Cool-Paper page.
- **Shadow Strategy:** Flat at rest (see Elevation). Interaction lift on hover only.
- **Border:** 1px Border-Mist — the primary separator, doing the work shadows don't.
- **Internal Padding:** 24px (`p-6`). Never nest a card inside a card.

### Inputs / Fields

- **Style:** Transparent background, 1px Border-Mist, 10px radius, 36px tall.
  Placeholder uses Muted-Slate (verified ≥4.5:1).
- **Focus:** Border shifts to terracotta `ring`, 3px ring at ~50% alpha. No glow.
- **Error:** `aria-invalid` drives a destructive-red ring and border; never color
  alone — pair with a text message.

### Navigation

- **Style:** Inter 500, 0.875rem. Transparent at rest; Accent-Haze background and
  accent-ink text on hover/active. 3px focus ring for keyboard users.
- **Mobile:** Collapses to a drawer (vaul). Active route is marked, not just hover.

## 6. Do's and Don'ts

### Do

- **Do** keep terracotta to ≤10% of any screen — it's the one warm signal.
- **Do** keep the page background cool and neutral (`oklch(0.94 0 236.5)`); carry
  warmth through the accent, type, and imagery instead.
- **Do** use JetBrains Mono _only_ for metadata (dates, tags, reading time, stack).
- **Do** keep surfaces flat at rest; reserve shadow + a small lift for hover/focus.
- **Do** separate surfaces with Card-White tonal contrast and 1px Border-Mist.
- **Do** verify body, muted, and placeholder text at ≥4.5:1; bump toward Ink if close.
- **Do** cap prose at 65–75ch and use `text-wrap: balance` on h1–h3.
- **Do** give every animation a `prefers-reduced-motion` alternative.

### Don't

- **Don't** build flashy "creative developer" spectacle — no scroll-jacking, WebGL,
  or cursor trails. Spectacle undercuts engineering credibility.
- **Don't** ship AI-slop SaaS scaffolding: no gradient-text heroes, no uppercase
  tracked eyebrow above every section, no identical three-card feature grids, no
  hero-metric template.
- **Don't** turn mono into a hacker-terminal gimmick — mono never sets headings,
  body, or CTAs.
- **Don't** let it read as a generic off-the-shelf template; the mono metadata and
  flat-at-rest cards are what carry personal voice — keep them.
- **Don't** add resting drop shadows to cards, badges, or inputs.
- **Don't** warm the background into cream/sand/parchment.
- **Don't** use a `border-left`/`border-right` colored stripe as an accent on cards,
  callouts, or alerts.
- **Don't** introduce a second sans alongside Inter, or convey meaning by color alone.
