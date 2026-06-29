---
target: landing page (src/app/page.tsx)
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-06-29T03-54-43Z
slug: src-app-page-tsx
---

# Critique — Landing page (`src/app/page.tsx`)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                               |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 2         | Contact submit has no pending/disabled/loading state; success/failure only confirmed by a delayed toast |
| 2         | Match System / Real World       | 4         | Copy is plain, human, domain-true — "Aircraft mechanic turned software engineer"                        |
| 3         | User Control and Freedom        | 3         | Nav, theme toggle, drawer dismiss, clearable tag filters all fine                                       |
| 4         | Consistency and Standards       | 3         | Tag chip + card hover diverge from documented design system; "Latest Articles" vs "Projects" labels     |
| 5         | Error Prevention                | 2         | `form.reset()` on submit error destroys the user's typed message                                        |
| 6         | Recognition Rather Than Recall  | 4         | Labeled nav and fields, tooltips on icon-only card actions                                              |
| 7         | Flexibility and Efficiency      | 3         | Keyboard nav + focus rings; little to accelerate on a content site                                      |
| 8         | Aesthetic and Minimalist Design | 3         | Genuinely restrained and on-brand, dinged by footer credit + uniform section rhythm                     |
| 9         | Error Recovery                  | 1         | Generic "Failed to send message." AND the form is wiped on failure — worst path on the page             |
| 10        | Help and Documentation          | 3         | Largely n/a for a portfolio; contact path is clear                                                      |
| **Total** |                                 | **28/40** | **Good (low end)**                                                                                      |

## Anti-Patterns Verdict

**Does this look AI-generated? No — and that's the headline strength.** The deterministic detector returned `[]` (clean) over `src/features/landing` and `src/app/page.tsx`: no gradient text, no side-stripe borders, no uppercase eyebrows, no hero-metric template. The copy carries a real voice ("reliability over cleverness," "Have a system that needs steady hands?") and the design system is disciplined — flat-at-rest cards, terracotta as a single warm signal on cool paper, mono confined to metadata, a subtly masked notebook dot-grid in the hero. This passes the brand slop test on first read.

**Browser visualization: unavailable.** No Chromium/Playwright in this environment, so no live overlay was injected and no rendered screenshots were captured. Findings are from source review + the CLI detector only; nothing here rests on pixel inspection.

## Overall Impression

This is the rare portfolio that already knows what it is. The system is coherent and the voice is genuine — most of the work is done. What holds it at "good" rather than "excellent" is a cluster of substance-undermining details: a contact form that loses the user's message on failure, a footer that credits a theme generator, and a few places where the shipped UI quietly contradicts the design system it documents. The single biggest opportunity is to make the one interactive moment — the contact form — as trustworthy as the prose around it.

## What's Working

1. **Voice-led, claim-free content.** The hero, "How I build," and CTA all show rather than claim. "How I build" is prose + one mono stack line — it pointedly avoids the resume tech-matrix, which is exactly right for this brand.
2. **Disciplined design-system execution.** Cool-paper bg, terracotta restraint, mono-for-metadata (Role/Problem/Outcome labels, dates, reading time), hairline borders over resting shadows. The hero dot-grid is theme-aware and mask-faded — texture without spectacle.
3. **Honest structure.** Real projects with Role/Problem/Outcome, real articles with reading time and word count. Evidence-first, matching the product thesis.

## Priority Issues

### [P1] Contact form wipes the user's message on failure

**Why it matters:** `useContactForm`'s `onError` calls `form.reset()`, so a network/server failure deletes everything the visitor typed and shows only a generic "Failed to send message." For a portfolio whose entire job is to convert a stranger into someone who reaches out, the highest-intent action punishes the highest-intent user. They will not retype a paragraph.
**Fix:** Remove `form.reset()` from `onError` (keep it only on success). Make the error message recoverable and specific ("Something went wrong sending your message — your text is still here, try again or email me directly at …"). Offer the mailto as a fallback inline.
**Suggested command:** `/impeccable harden`

### [P1] No pending state on the contact submit

**Why it matters:** On submit the button stays "Message me" with no disabled/spinner/label change. During the network round-trip the user gets zero feedback, invites double-submits, and only learns the outcome when a toast fires. This is the page's only async action and it's silent.
**Fix:** Wire `form.formState.isSubmitting` (or the action's pending state) to disable the button and swap the label to "Sending…" with a spinner. Pair with the error fix above.
**Suggested command:** `/impeccable harden`

### [P1] Footer credits a theme generator — undercuts the brand thesis

**Why it matters:** "Awesome color theme from tweakcn.com" fails the brand on two axes. The word "Awesome" breaks the calm, quiet-authority voice; and on a site whose premise is "design is part of the product," telling recruiters and engineering peers the palette came from a theme tool actively erodes the credibility the rest of the page builds. It's the one line that says "template," in the footer where trust is supposed to settle.
**Fix:** Remove it. Attribution to a theme tool isn't required and isn't doing you any favors here. If you want a footer line, make it voice (a one-line colophon about the stack, or nothing).
**Suggested command:** `/impeccable clarify`

### [P2] Shipped UI contradicts the documented design system

**Why it matters:** DESIGN.md is specific, and two signature elements don't match it — which is a consistency tax and weakens the system as documentation. (a) **Tags**: documented as transparent hairline-border **mono** chips ("the canonical field-notes element"); shipped as rounded-full sans `secondary`/`bg-card` pill buttons (`#tag`). (b) **Card hover**: documented "interaction lift" is shadow + `translateY(-2px)`; shipped is `hover:ring-2 hover:ring-muted-foreground` — a heavy slate 2px ring that reads like a _selected_ state, with no lift. Either the doc or the code is wrong; right now they disagree.
**Fix:** Pick the source of truth. If the field-notes chip is the intent, render tags as mono hairline chips. Replace the muted-foreground ring with the documented shadow-lift + small translateY (and the terracotta focus ring for keyboard).
**Suggested command:** `/impeccable polish`

### [P2] Status badge color semantics + warm-signal budget

**Why it matters:** `statusVariants` maps `experimental → destructive` (red); a red badge reads as an _error/danger_, not "early-stage." And `active → default` paints the badge terracotta, so a 4-card grid can stamp four terracotta status chips plus terracotta links/labels/CTA — pushing past the "≤10% warm signal" rule the system sets for itself. The code even carries `// TODO: improve status colors`.
**Fix:** Give status its own quiet, non-alarming scale (neutral/outline variants, maybe one subtle dot), and keep terracotta for the single thing the eye should follow per card. Drop red from a non-error meaning.
**Suggested command:** `/impeccable colorize`

### [P2] Uniform section rhythm and questionable order

**Why it matters:** Projects and Articles are structurally identical (left `SectionHeader` + "View all" + grid), and the whole page is an even `space-y-16` march. It's clean but flat — no pacing, no art direction between sections. Separately, "How I build" (the proof-of-thinking narrative) sits _below_ the work lists, so the argument "story → how I think → the evidence" is delivered out of order.
**Fix:** Vary rhythm (a wider/quieter band for "How I build," tighter grouping elsewhere) and consider moving "How I build" up directly under the hero so the narrative leads the evidence.
**Suggested command:** `/impeccable layout`

## Persona Red Flags

**Jordan (First-Timer / cold recruiter):** Lands, reads the hero — clear and compelling. Fills out the contact form, hits send, sees nothing happen (no pending state), maybe clicks again. If it fails, the message vanishes and they get "Failed to send message." with no next step. First impression of "reliable engineer" undercut at the one moment they tried to engage.

**Riley (Stress Tester):** Submits the form with the network throttled or offline → message wiped, generic error, no recovery path, no inline mailto fallback. Files this as the page's clearest defect. Also notes "Latest Articles" vs plain "Projects" inconsistency and that hovering a card produces a hard gray ring rather than the lift the rest of the system implies.

**Sam (Accessibility):** Keyboard focus rings and semantics are largely solid. But `SocialLinks` sets `aria-label={link.href}` — the screen reader announces the raw URL ("https://github.com/boonyarit-iamsaard") instead of "GitHub." Three icon-only links, all announced as URLs. Easy, high-value fix.

## Minor Observations

- `SocialLinks` `aria-label` is the raw URL; give it a human label ("GitHub", "LinkedIn", "Email").
- "Latest Articles" vs "Projects" — align the heading voice.
- Section h2 (`text-3xl sm:text-4xl`) approaches the hero h1's clamp max at mid viewports; the display heading doesn't always assert dominance.
- No entrance motion anywhere. Defensible as restraint, but the brand register invites one quiet, well-orchestrated load reveal (with a `prefers-reduced-motion` fallback) — currently an unused opportunity, not a flaw.
- `AppHeader` carries two `// TODO`s about complexity/perf; not user-visible but worth tracking.

## Questions to Consider

- What would a visitor lose if the contact form failed right now — and does the page act like it cares?
- The design system is documented better than it's implemented in two places. Which is the truth: the doc or the code?
- "How I build" is your strongest differentiator. Why is it the fourth thing on the page?
- If you removed the tweakcn credit and added one quiet entrance reveal, would anything still say "template"?
