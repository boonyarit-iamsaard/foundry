---
target: overall design (landing page)
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-06-29T01-13-30Z
slug: src-app-page-tsx
---

# Critique — boonyarit.me landing page (overall design)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                              |
| --------- | ------------------------------- | --------- | ---------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Header scroll state + theme toggle work; fine for a static surface     |
| 2         | Match System / Real World       | 3         | Plain language, but "Tools" is a flat label and the tagline is generic |
| 3         | User Control and Freedom        | 3         | Nav, drawer, theme toggle all present                                  |
| 4         | Consistency and Standards       | 3         | Hero H1 scale diverges from SectionHeader; otherwise consistent shadcn |
| 5         | Error Prevention                | 3         | n/a for landing (contact form not in scope)                            |
| 6         | Recognition Rather Than Recall  | 3         | Nav labeled; mobile logo icon-only but has aria-label                  |
| 7         | Flexibility and Efficiency      | 3         | n/a for a portfolio                                                    |
| 8         | Aesthetic and Minimalist Design | 2         | Generic template hero + identical card grid + redundant badges         |
| 9         | Error Recovery                  | 3         | n/a in scope                                                           |
| 10        | Help and Documentation          | 3         | n/a for a portfolio                                                    |
| **Total** |                                 | **29/40** | **Good — usable and clean, but undistinctive**                         |

## Anti-Patterns Verdict

**LLM assessment:** The page is clean, accessible, and on-token (cool paper + terracotta is a genuinely nice, non-cliché palette). But it reads as **generic template portfolio** — the exact thing PRODUCT.md lists as an anti-reference. Three tells: (1) the full-viewport centered hero with a big circular avatar, "Hi, I'm", name, "A Full Stack Developer", and a generic one-liner; (2) the "Tools" section is an **identical card grid** (icon + title + repeated group badge) — a named absolute ban; (3) the logo uses a terminal-square glyph, brushing the "hacker-terminal gimmick" anti-reference.

**Deterministic scan:** `detect.mjs` over `src/features/landing` and `src/common/components/layout` returned **clean (0 findings)**. No gradient text, side-stripes, eyebrows, or glass. The problems here are compositional/brand-distinctiveness, not the mechanical slop the detector catches.

**Visual overlays:** No dev server was running; review was source + token based. No browser overlay this run.

## Overall Impression

The foundation is good: restrained palette, solid tokens, accessible scaffolding. What's missing is **the brand's own thesis**. PRODUCT.md is explicit that the hook is the story — an aircraft mechanic who taught himself to ship production software — and that story appears nowhere above the fold. The hero spends a full viewport on a decorative face and a tagline that any developer could write, then pushes the actual evidence (projects, articles) below the fold. For a "credibility through substance" site, the most valuable real estate is selling nothing.

Single biggest opportunity: **make the hero say who you are in one distinctive sentence, demote the avatar to the header, and get real work closer to the top.**

## What's Working

1. **Palette and tokens.** Cool paper (`oklch(0.94 0 236.5)`) with a single warm terracotta is a deliberate, non-default choice that dodges the cream-sand AI monoculture. Dark mode is properly tuned. This is the strongest part of the system.
2. **Accessibility hygiene.** aria-labels, sr-only text, semantic headings, keyboard-reachable nav, reduced-motion-friendly (almost no motion to begin with).
3. **Header behavior.** The scroll-aware backdrop-blur transition is a tasteful, quiet touch.

## Priority Issues

- **[P1] Hero carries no brand thesis and wastes the fold.** The full-`min-h-dvh` hero leads with a decorative avatar and "A Full Stack Developer" — generic, and the story (the actual hook per PRODUCT.md) is absent. **Fix:** Rewrite the hero around one distinctive sentence that names the aircraft-mechanic→engineer path; drop the giant avatar; shorten the vertical so projects peek above the fold. _Command: /impeccable shape or craft_
- **[P1] "Tools" section is an identical card grid (absolute ban).** 8 same-size cards, each icon + title + a badge that repeats the group name — the badge is pure redundant noise, and the equal-weight grid is the canonical AI tell. "Tools" is also a weak title. **Fix:** Replace with grouped rows (Languages / Frameworks / Databases as headings, items inline beneath) or a single typeset wordmark list; kill the per-card badge. _Command: /impeccable layout_
- **[P2] Avatar placement is decoration, not identity.** A 128px centered circle is the focal point but conveys nothing. Moving it to the header (Milan-style: small avatar beside the name) makes it functional identity and reclaims hero space. **Fix:** Small (28–32px) avatar in `AppHeader` next to the wordmark, replacing or joining the terminal glyph. _Command: /impeccable craft_
- **[P2] Terminal-square logo brushes an anti-reference.** `TerminalSquareIcon` leans on the "hacker-terminal costume" the brand explicitly rejects. **Fix:** Use the avatar and/or a monogram/wordmark as the mark instead. _Command: /impeccable craft_
- **[P3] Hero H1 scale is timid and off-system.** `text-2xl sm:text-4xl` (max ~2.25rem) under-commits for a brand hero and diverges from SectionHeader's `text-4xl`. **Fix:** Give the hero a clear top of the type scale with `clamp()`. _Command: /impeccable typeset_

## Persona Red Flags

**Jordan (First-Timer / cold recruiter):** Lands on "Hi, I'm Boonyarit, A Full Stack Developer" — indistinguishable from thousands of portfolios. Nothing in the first screen answers "why this person?" Must scroll past a full empty viewport to reach any evidence. High bounce risk for the exact audience the site is built to convert.

**Riley (Stress Tester / skeptical peer):** Sees the terminal-glyph logo and an identical tool-card grid and pattern-matches "template." The redundant group badge on every card reads as filler. Wants depth signals near the top; finds decoration.

**Casey (Mobile):** Full-viewport hero means a thumb-scroll of nothing-but-intro before any work appears; on mobile the empty fold is even more costly. Avatar at 96px on mobile eats the screen for zero information.

## Minor Observations

- `SectionHeader` "Tools" has no description or "view all" — it sits flatter than the Projects/Articles sections, making it feel like an afterthought.
- Hero `space-y-8` + `gap-8` + `min-h-dvh` stack a lot of vertical air around little content.
- `hover:scale-105` on tool cards is the reflex hover; if cards go away this goes with them.

## Questions to Consider

- What's the one sentence that only you can say? (The mechanic→engineer line is right there.)
- Does the homepage need a full-screen intro at all, or should it open on proof?
- Should "Tools" be a section, or a quiet typeset strip that doesn't pretend to be a feature grid?
