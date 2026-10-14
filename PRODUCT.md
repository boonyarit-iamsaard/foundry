# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Developers**: engineers who arrive through an article, usually from a shared link or a search, and read it for its practical guidance. They may follow Boonyarit or get in touch once they finish.
2. **Hiring teams**: recruiters and engineering managers confirming who Boonyarit is. They skim, judge craft and judgment quickly, and want his role, employer and work within seconds, then leave with a message sent or a resume downloaded.

When these pull in different directions, developers win on article pages and hiring teams win on the home page's first screen. The contact form still accepts any message.

## Product Purpose

The personal site of Boonyarit Iamsa-ard (boonyarit.me; the repository is called Foundry): the articles he writes and the projects he builds, plus a way to get in touch. Success is a developer reading an article to the end and then following Boonyarit or getting in touch, and a hiring team seeing who he is, where he works and what he builds within 10 seconds.

## Positioning

A software engineer who came to code from aircraft maintenance. Years of precise, checklist-driven mechanical work came before self-taught full-stack development, and he built an internal department system in Next.js and TypeScript while still working as a mechanic. No neighboring developer portfolio can truthfully tell that story. The site should let his judgment show through his work instead of listing claims.

## Operating Context

- Developers usually arrive through a shared link or a search hit on an article, and land deep on `/articles/[slug]`, not on the home page.
- Hiring visitors arrive from a job application, a LinkedIn or GitHub profile, or a referral. They decide fast and often look at more than one candidate in a sitting.

## Capabilities and Constraints

- Routes: home (`/`), `/articles` and `/articles/[slug]`, `/projects` and `/projects/[slug]`, `/about`, and a not-found page.
- Content is MDX built by Velite from `content/` (articles, projects, about, tags). Each article and project has a cover image.
- Articles carry an **article status** (Draft, Published, Archived). Projects carry a **project status** (Experimental, Active, Stable, Maintenance). The two are separate, so always name which one is meant (see `GLOSSARY.md`).
- Contact form: a server action validated with zod and sent by email (Resend or nodemailer, with React Email templates). It must keep working.
- Resume download: `public/assets/boonyarit-iamsaard-2026-10-13.pdf`.
- Light and dark themes with a toggle (next-themes) must both be kept.
- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, Radix and shadcn-style primitives, deployed on Vercel with Analytics and Speed Insights.
- Social links: GitHub (`boonyarit-iamsaard`), LinkedIn (`boonyarit-iamsaard`), and email.

## Brand Commitments

- Name: Boonyarit Iamsa-ard. Current title: **Software Engineer**, no longer "Backend Engineer" and not "Full Stack Developer".
- Professional stack: TypeScript (strongest and favorite), Node.js, Nest.js, Express, **Spring Boot**, React, Next.js, **React Native**, PostgreSQL, MySQL, MongoDB, Docker, GitHub Actions CI/CD, unit and E2E testing.
- Voice: plain and first-person, showing judgment over self-praise.
- The aircraft-mechanic-to-engineer story is a defining part of the identity and must be kept.
- Hard line: no enumerated skill inventories, tech logos, badge grids, or bare keyword dumps. A capability-framed layer that says what he does (not which tools he knows) is acceptable when paired with prose in his voice.

## Evidence on Hand

- Profile photo: `src/core/assets/images/profile.webp` (and `.png`).
- Articles: "Conventional commit types – a rule of thumb guide" (2025-04-04), "Node.js import style guide" (2025-04-10) and "Redesigning my site with an AI design tool" (2026-10-11), each with a cover image.
- Projects: one, this site (`content/projects/portfolio`).
- About copy: `content/about.mdx`. The "Current Focus" and "Skills" sections still describe the old Backend Engineer title and stack and need updating.
- Employer: Omise (current). It may be named on the site.
- Absent: testimonials, client logos, metrics, and case-study results. Future work must not invent them.

## Product Principles

1. **Show the work, don't claim it.** Articles and projects are the proof. Adjectives about himself are not.
2. **Make contact effortless for the people who matter.** Developers and hiring teams should always be one step from the contact form, GitHub or the resume.
3. **Let the unusual path be an asset.** The mechanic's precision is the through-line, told plainly and not as a gimmick.
4. **Writing has to stand on its own.** An article page should serve a reader who never sees the home page.
5. **Tell the truth about scale.** A small body of work, presented honestly, beats padding.
