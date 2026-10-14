# Design review research: audience, the Shadow Board, readability

What was checked, on 2026-10-14: the repo at `main` (`a0841d3`), which was read only. No site code was changed. The site ran locally (`next dev`) and was opened in headless Chromium (Playwright, cached Chromium 1243) at 1280×900 (desktop) and 390×844 (phone), in the day and night themes. Pages: `/`, `/articles`, `/articles/shadow-board-redesign`, `/projects`, `/projects/portfolio`, `/about`. The same scripts measured three reference pages live: `ui.shadcn.com/docs`, `vercel.com/docs/getting-started-with-vercel` and `laravel-news.com/laravel-12`.

How measurements were taken: computed styles from the browser, characters per line counted from rendered line boxes (median over every paragraph longer than 120 characters), and WCAG contrast computed from the `oklch` tokens in `src/core/styles/globals.css`. **Measured** marks numbers from these runs. **Judgement** marks my opinion.

## Summary

- **Verdict:** The body text is **not** the problem. Size, line height, line length and contrast are all within guidance and close to the reference sites. What makes the site feel harder to read is **everything around the text**. Every block sits inside a 2px near-black outline, the outlines have the same contrast as the text (12:1), there are many yellow tape codes and uppercase condensed labels, and the page background is grey. The Shadow Board can stay, but it needs to be **much quieter**. Draw the board lightly, and let the words be the darkest thing on the page.
- **Concern 1 (audience):** Your assumption is **mostly right**. Freelance demand for coding work fell after generative AI. Weak ties and referrals measurably help people change jobs, especially in digital industries. There are two corrections. First, a website does not _create_ connections. It is where people land after they meet you somewhere else (LinkedIn, GitHub, an article someone shared). Second, you are not job hunting, so most real visitors will be **engineers reading articles**, not recruiters. That makes article readability the top priority.
- **Concern 2 (the concept):** It **does not come across without context**. The home page shows six position codes (B-00, C-01, R-01, P-01, W-03, W-02), a "Board check: 6 of 6 slots filled" line and outline line types. None of them is explained on the home page. The full explanation exists only inside the `/projects/portfolio` page and the redesign article. A visitor sees the board's _look_, not its _meaning_.
- **Concern 3 (does it serve the goal):** Only partly. The site shows real work (good), but a hiring visitor cannot quickly confirm the basics: **where you work now, what you work on, and for how long**. The contact copy and `PRODUCT.md` still treat freelance clients as a primary audience.
- **Concern 4 (readability):** The main causes, in order: (1) decoration drawn at text contrast, (2) a frame inside a frame around the article text, (3) uppercase condensed lettering used for article _titles_, which are full sentences, (4) a grey page background with dots, and (5) unexplained codes that pull the eye. Colour count is **not** a cause.

---

## 1. Audience: hiring teams and developers, not freelance clients

**Your assumption:** personal branding and connections help career growth more than freelance work, so the site should aim at hiring teams and developers.

### Evidence that supports it

- **Freelance demand for coding work dropped.** On a large global freelancing platform, job posts for "automation-prone" work in writing and coding fell **21%** within eight months of ChatGPT's release, compared with manual-skill jobs. The remaining jobs were more complex and paid more, and there was more competition per job (Demirci, Hannane & Zhu, "Who Is AI Replacing? The Impact of Generative AI on Online Freelancing Platforms", _Management Science_ 71(10), 2025, doi:10.1287/mnsc.2024.05420; record: https://pubsonline.informs.org/doi/suppl/10.1287/mnsc.2024.05420, https://spiral.imperial.ac.uk/entities/publication/88113a91-b994-4717-8526-dadac657f1cb). The authors say this is a short-term effect. The data is not specific to Thailand.
- **Freelancers are a minority of developers.** In the Stack Overflow Developer Survey 2025, 69.8% of respondents were employed and **13.9%** were "independent contractor, freelancer, or self-employed" (48,178 responses; https://survey.stackoverflow.co/2025/work).
- **Weak ties cause job mobility.** In randomized experiments on LinkedIn's "People You May Know" feature, covering more than 20 million people over 5 years and 600,000 new jobs, moderately weak ties produced the most job mobility. The effect was stronger in **more digital industries** (Rajkumar, Saint-Jacques, Bojinov, Brynjolfsson & Aral, "A causal test of the strength of weak ties", _Science_ 377(6612):1304–1310, 2022; https://digitaleconomy.stanford.edu/publication/a-causal-test-of-the-strength-of-weak-ties). Software is a digital industry, so this supports investing in connections.
- **Referrals help you get hired.** Across nine large firms, including high-tech, referred applicants were more likely to be hired and to accept offers, even with similar skill measures. They also quit less and earned slightly more (Burks, Cowgill, Hoffman & Housman, "The Value of Hiring through Employee Referrals", _Quarterly Journal of Economics_ 130(2):805–839, 2015; https://experts.umn.edu/en/publications/the-value-of-hiring-through-employee-referrals/).

### Corrections

1. **A site does not create connections. It converts them.** `PRODUCT.md` itself says visitors "usually arrive from a job application, a LinkedIn or GitHub profile, a referral, or a search hit on an article". The ties in the studies above form on LinkedIn and through people. The site's job is to make a good impression on someone who already clicked. _Judgement_, based on the studies above and your own operating context.
2. **Your real audience today is mostly engineers.** Your role is secure, so you are not applying for jobs. Recruiters will mostly arrive by chance. Developers who read an article and then follow you are the "weak ties" the Rajkumar study measures. So **the article page is your most important page**, more than the home board. _Judgement._
3. **Freelance work is not worthless for a career.** It can produce real, visible projects, which are the kind of evidence engineers trust (see §3). But you do not need to _aim the site_ at clients to get that benefit. _Judgement; the evidence on freelance-to-career effects is thin and I found no primary study._

**Conclusion:** Keep the plan. Rank the audiences as (1) developers who read your writing, (2) hiring teams who need to verify you quickly. Then remove freelance clients as a primary audience in `PRODUCT.md` and in the copy (see changes 6 and 7).

---

## 2. Does the Shadow Board come across without context?

### Measured facts (home page, 1280px, day)

- On first load, the visible board shows **8 yellow tape codes**, **14 outlined boxes** and **35 uppercase text items** (nav, labels, buttons, titles, codes).
- The codes B-00, C-01, R-01, P-01, W-03 and W-02 are not explained anywhere on `/`, `/articles` or `/about`. The DESIGN.md logic (B = board, C = contact, R = resume, L = long-form, P = project, W = writing) is not shown to visitors.
- "Board check: 6 of 6 slots filled" (`src/features/landing/components/hero-section.tsx`) is shown with no explanation.
- The only on-page hint is the hero sentence: "every tool is back on its board". The full explanation ("On a shadow board every tool has its own painted outline…") appears only in `content/projects/portfolio/index.mdx` and in the redesign article.
- Project status is shown as the outline's line type. A key appears on `/projects` (inside the cover image), but not on the home page, where the P-01 slot shows "Active" as a short line and a word.

### What the research says about first impressions

- People judge a page's visual appeal in **50 ms**, and those judgements match their judgements after longer viewing (Lindgaard, Fernandes, Dudek & Brown, "Attention web designers: You have 50 milliseconds to make a good first impression!", _Behaviour & Information Technology_ 25(2):115–126, 2006). So the _look_ of the board does reach visitors. Its _meaning_ needs words, and they have no time to find them.
- Users often leave pages in **10–20 seconds** unless the value is clear early (NN/g, Nielsen, "How Long Do Users Stay on Web Pages?", based on Liu, White & Dumais, Microsoft Research, 2010; https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/).
- People find attractive designs more usable, and this can **hide real problems** in testing (NN/g, Moran, "The Aesthetic-Usability Effect", 2024; https://www.nngroup.com/articles/aesthetic-usability-effect/). Your own redesign article says something similar: the review checked the build "against a description of itself".

### Judgement

- To you, the board means _accountability_: nothing is missing, so it is safe to release. To a visitor with no hangar experience, it reads as an **industrial / signage style**, with codes that look like decoration. The style gives a feeling (careful, mechanical, a bit loud), but the idea itself does not come through.
- The codes are the weakest part. They look important (bright yellow, stencil type, top-left of every block), so visitors look at them first. Then they find nothing they can use. That costs attention without giving anything back.
- The strongest parts are the ones that need no explanation: the outlined slots as clear groups, the hero sentence about the hangar, and the 404 "empty slot". The 404 is the one place where the metaphor explains itself.
- **Cheap test (method suggestion):** Show the home page for 5 seconds to 3–5 developers who don't know you. Ask: "What is this person's job? What were the yellow labels for? What would you click?" If most cannot answer the second question, the codes are decoration.

---

## 3. Does the site serve hiring teams and engineers?

### What the evidence says they look for, and how fast

- **Recruiters triage fast, and clutter hurts.** In Ladders' 2018 eye-tracking study, the first screen of a resume took **7.4 seconds** on average. Resumes with simple layouts, clear sections and headings held attention best. Cluttered layouts, little white space and multiple columns did worst. (Reported by HR Dive, https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/; the original Ladders PDF was not reachable: the copy at csuglobal.edu returned 404.) This is about resumes, not websites. Use it as an analogy only. _Evidence is indirect._
- **Engineers trust traces of real work more than claims.** In interviews with employers who used GitHub to hire, profile cues were "seen as more reliable indicators of technical abilities and motivation than information provided on a resume". Employers preferred signals that were **"easy to verify quickly"**. Side projects signalled "passion for coding", and good commit messages, comments and code style signalled competence (Marlow & Dabbish, "Activity Traces and Signals in Software Developer Recruitment and Hiring", CSCW 2013, CMU; https://www.cs.cmu.edu/~xia/resources/Documents/Marlow-cscw13.pdf). Limits: 7 employers and 6 job seekers, US, GitHub only, 2013.
- **Readers scan in an F-shape.** They read the first lines and the left edge, so put key points first and make headings stand out from body text (NN/g, Pernice, "F-Shaped Pattern of Reading on the Web", 2017; https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/).
- **Most attention goes to the first screens.** About 57% of viewing time is above the fold, and 74% is in the first two screenfuls (NN/g, Fessenden, "Scrolling and Attention", 2018; 120 participants, 130,000+ fixations; https://www.nngroup.com/articles/scrolling-and-attention/).

### How the site matches (measured from source and screenshots)

| What visitors need                      | What the site shows                                                                                                                                                  | Fit                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Who you are and your job title          | Name, "Software Engineer · Bangkok, Thailand", hangar sentence                                                                                                       | Good                                               |
| Where you work now and what you work on | **Missing.** `PRODUCT.md` lists employer names as absent. The About page says "I work as a Software Engineer across the backend, the web and mobile" with no company | Weak                                               |
| How long you have done this             | Not shown on the site (only in the resume PDF)                                                                                                                       | Weak                                               |
| Evidence that is quick to verify        | 1 project (this site), 3 articles, GitHub link in contact and footer                                                                                                 | Fair. Honest, but thin, and GitHub is a small link |
| One step to contact or resume           | Yes: hero, end of every article, footer                                                                                                                              | Good                                               |
| Message aimed at the right people       | "Hiring, or have something to build?" and "If you have a project, tell me what it should do and when you need it"                                                    | Still aimed at freelance clients                   |

### Judgement

- The "show, don't claim" approach matches the Marlow & Dabbish findings well. The writing and the code are the proof. Keep it.
- The biggest content gap is the **current role**. You can say it in one plain sentence in your own voice, with no logos and no matrix. For example: "I'm a software engineer at Omise, a payments company in Bangkok, where I work on …". Naming the employer is your choice, and your employer's public-profile policy may matter. Without it, a hiring visitor has to open the PDF to learn the basics.
- For engineers, the article page matters most. That is where §4 matters most too.

---

## 4. Readability and visual craft

### 4.1 Measured: body text (article page `/articles/shadow-board-redesign`)

|                                  | **Foundry**                     | shadcn/ui docs        | Vercel docs               | Laravel News article      |
| -------------------------------- | ------------------------------- | --------------------- | ------------------------- | ------------------------- |
| Body font                        | Barlow 400                      | Geist                 | Geist Sans                | Scandia                   |
| Size (desktop)                   | **18px**                        | 15px                  | 16px                      | 18px                      |
| Line height                      | **1.625** (29.25px)             | 1.75                  | 1.70                      | 1.78                      |
| Text column (desktop)            | 576px                           | 640px                 | 649px                     | 851px                     |
| Chars per line, median (desktop) | **72** (p25–p75: 70–76)         | 89                    | 85                        | 94                        |
| Size / column (phone 390px)      | 18px / 287px*                   | 18.9px / 342px        | 16px / 327px              | 16px / 350px              |
| Chars per line, median (phone)   | **35**                          | 37                    | 40                        | 42                        |
| Body text contrast               | **16.2:1** (#16191c on #f3f5f4) | 21:1 (black on white) | 17.9:1 (#171717 on white) | 10.3:1 (#374151 on white) |
| x-height, in px at body size     | **9.2px**                       | 8.0px                 | 8.5px                     | 8.8px                     |
| Average letter width (em)        | **0.433**                       | 0.47                  | 0.47                      | 0.489                     |

\*Headless Chromium reserves a 15px scrollbar gutter (`scrollbar-gutter: stable` in `globals.css`). On a phone with overlay scrollbars, the column is about 302px: 390 − 2×16 container padding − 2×8 slot outline and inset − 2×20 plate padding.

**Against guidance:**

- Size: Butterick recommends **15–25px** body text on the web (https://practicaltypography.com/point-size.html). 18px passes.
- Line length: Butterick says **45–90 characters** (https://practicaltypography.com/line-length.html). Baymard says **50–75** (https://baymard.com/blog/line-length-readability). WCAG 2.2 SC 1.4.8 (AAA) says **no more than 80** (https://www.w3.org/TR/WCAG22/). 72 on desktop passes all three. The reference sites are _longer_ (85–94). On phones, every site is under 45, and Foundry is close to the others.
- Line height: WCAG 1.4.8 asks for at least 1.5. Butterick suggests 120–145% (https://practicaltypography.com/line-spacing.html). 1.625 is a little looser than Butterick, and similar to the reference sites. Fine.
- Contrast: WCAG 2.2 SC 1.4.3 requires **4.5:1** (https://www.w3.org/TR/WCAG22/). Body text is 16.2:1. The lowest-contrast text measured on the page (muted text on the board) is **5.75:1**, which passes.

**Conclusion: the body text is fine. The cause of the "harder to read" feeling is elsewhere.**

### 4.2 Measured: decoration, surfaces and hierarchy

**Borders.** All border edges tallied on the home page at 1280px, compared with the reference pages:

|                 | Most common borders                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Foundry `/`** | **48 edges of 2px solid near-black** (`--paint`), 12 of 2px grey, 12 of 1px at 40% ink, 5 of **3px** near-black |
| shadcn/ui docs  | Almost none visible: a few 1px very light greys                                                                 |
| Vercel docs     | 59 edges of 1px `rgb(235,235,235)`, 34 of 1px `rgba(0,0,0,0.08)`                                                |
| Laravel News    | 40 edges of 1px `rgb(236,238,245)`, 14 of 1px `rgb(211,214,223)`                                                |

Contrast of those borders against the page:

| Pair                                  | Contrast                                   |
| ------------------------------------- | ------------------------------------------ |
| Foundry day: paint outline on board   | **12.05:1**, the same as text on the board |
| Foundry night: yellow outline on foam | **11.15:1**                                |
| Vercel `rgb(235,235,235)` on white    | about 1.2:1                                |
| Laravel `rgb(236,238,245)` on white   | about 1.15:1                               |

WCAG 2.2 SC 1.4.11 asks 3:1 only for graphics "required to understand the content". Purely decorative borders do not need to meet it (https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). So the outlines could be much lighter and still pass.

**First screen, counts (1280px):**

|                 | Outlined boxes | Uppercase text items | Typefaces                                        | Text colours |
| --------------- | -------------- | -------------------- | ------------------------------------------------ | ------------ |
| Foundry `/`     | **14**         | **35**               | 3 (Barlow, Big Shoulders, Big Shoulders Stencil) | 4            |
| Foundry article | 6              | 9                    | 3                                                | 4            |
| shadcn/ui docs  | 2              | 0                    | 1                                                | 5            |
| Vercel docs     | 7              | 0                    | 2                                                | 7            |
| Laravel News    | 6              | 9                    | 1                                                | 4            |

**Surfaces (day):** The page background is `--board` = #d2d6d4, a mid-light grey, with 2px dots on a 28px grid. Plates are #f3f5f4. Plate against board is only 1.34:1, so the plates read as "slightly lighter grey on grey", not as a clean page. All three references use white or #fafafa.

**Accent colour:** Foundry uses one accent (safety yellow) and four text colours, which is the same count as the references. **Colour count is not the problem.** The problem is how often the accent appears: 8 bright tapes on the home board, and at night every outline is yellow too.

**Article page structure:**

- The prose sits on a plate (`px-5 py-8 sm:px-10 sm:py-12`), inside a slot (2px outline plus a 6px painted gap), inside a 46rem column (`detail-body.tsx`, `globals.css`). That is a frame inside a frame around the text you most want people to read.
- On a phone, 88px of the 390px width goes to padding and frames, against about 48px on shadcn/ui.
- The first paragraph starts at **838px** on a 900px-tall desktop screen, and at 690px on an 844px phone. Before it come the title, meta, description, tag and a framed cover. (Laravel News also puts a cover first, so this alone is common.)

**Hierarchy:**

- Article titles (`type-headline`, Big Shoulders 800, uppercase, line height 0.9) and card titles (uppercase, line height 0.98) are full sentences, for example "REDESIGNING MY SITE WITH AN AI DESIGN TOOL".
- You already moved in-article h2/h3 to Barlow sentence case because "Longer headings in a real article looked like shouting". The same reason applies to the article `h1` and to card titles, but they were not changed.
- Butterick: "At standard body text sizes, capital letters … are harder to read than normal lowercase text". Caps suit "headings shorter than one line" and labels (https://practicaltypography.com/all-caps.html).

**Fonts:**

- Barlow is described as a "slightly rounded, low-contrast, grotesk" family inspired by California licence plates and highway signs (https://github.com/jpt/barlow).
- Big Shoulders is "a superfamily of condensed American Gothic" fonts made for the Chicago Design System (https://github.com/xotypeco/big_shoulders).
- Both come from signage. Measured: Barlow's letters are about **8% narrower** than Geist's (0.433em against 0.47em average). Its x-height at 18px (9.2px) is _larger_ than the references' at their sizes, so letter size is not a problem.

### 4.3 Why it feels harder to read (judgement, ranked)

1. **The frames are as loud as the words.** Outlines at 12:1 (day) or bright yellow at 11:1 (night) compete with text at 12–16:1. On the reference sites, borders are around 1.2:1, so text is clearly the darkest and strongest thing. In Foundry, the eye keeps landing on frames, tapes and codes. This matches the Ladders finding that clutter loses attention (indirect evidence, §3).
2. **Too many signals at once.** 35 uppercase items and 8 tapes on the first screen, against 0 on shadcn/Vercel and 9 on Laravel News. Each one is small, but together they make the page feel "busy". You told the design tool that "too much visual noise" would feel wrong. That is now the case.
3. **Sentence-length titles in condensed caps.** They are fine as a poster, but slow to read as a sentence. The card titles on the home page and `/articles` are exactly what a scanning visitor reads first (NN/g F-pattern).
4. **Grey on grey.** The low step from board to plate (1.34:1), plus the dots, makes the page look dimmer and less "clean" than white pages, even though text contrast is high.
5. **Night theme is the loudest version.** Every outline, link underline, primary button and focus ring is saturated yellow. Text is light on charcoal. _Judgement:_ the night theme needs the most calming.
6. **Not causes:** body size, line height, line length, text contrast, and number of colours. These are all in range (§4.1).

---

## 5. Prioritized changes

Each change is marked **Keep** (keeps the Shadow Board, made calmer) or **Replace** (removes a part of it). None needs new tools or linters. Changing these will also mean updating DESIGN.md rules such as "The Night Paint Rule" and "Every Big Shoulders setting is uppercase".

1. **Draw the board lightly. [Keep]**
   - Change slot outlines from 2px `--paint` (12:1) to **1px** in a mid grey, around 2–3:1 against the board. That is still visible, still painted, and far below the text.
   - Keep the 6px gap and the painted shadow, which only appears when a plate lifts. The lift on hover still reveals the code, so the idea stays.
   - At night, use a grey rim for outlines (for example `foam-rim`) and keep yellow only for tape, the main button and the focus ring.
   - Status line types still work at 1px or 1.5px (dashed, chain). Keep "heavy" as the one thicker line.
   - Expected effect: the biggest drop in visual noise for the least work.
2. **Take the frame off the article text. [Keep, but only around the text]**
   - On `/articles/[slug]`, `/projects/[slug]` and `/about`, put the prose directly on a near-white page, or a single plate with no slot outline. Keep the slot only on the cover (it carries the code) and on the C-01 author slot at the end.
   - This adds about 16–40px of text width on phones and removes one frame layer around long reading.
   - The board appears at the start and end of the article. The middle is just reading.
3. **Use sentence case Barlow for article and project titles. [Keep]**
   - Apply your own article-heading rule to the article `h1`, and to article and project card titles on the home page, `/articles` and `/projects`.
   - Keep Big Shoulders uppercase for the name, short section headings ("Write to me", "Resume") and nav. These are short labels, which Butterick says suit caps.
4. **Make each code earn its place, or remove it. [Keep partly / Replace partly]**
   - Option A (keep): add one plain line near the board, such as "Like a hangar tool board: every piece of work hangs in its own outlined place." Show the codes only on content (P-nn, W-nn), not on fixtures (B-00, C-01, R-01).
   - Option B (replace): remove the codes from tape and show them only on the painted shadow when a card lifts. The tape strip then becomes optional.
   - Either way, remove "Board check: 6 of 6 slots filled" or link it to the explanation. On its own, it is an inside joke.
5. **Lighten the day board. [Keep]**
   - Raise `--board` from L 0.872 toward about 0.94–0.95, or keep the grey only for the home board and use the plate colour as the page background on reading and listing pages.
   - Keep the dots on the home board only.
6. **Say the current role in one sentence. [Neutral; content only]**
   - In the hero paragraph and on About, in your own voice, say where you work and what you work on. For example: "I'm a software engineer at Omise in Bangkok, working on …" (only if you are comfortable naming them).
   - This is prose, not a resume block, so it fits your "show, don't claim" rule. It answers the first question every hiring visitor has (§3).
7. **Aim the copy at hiring teams and engineers. [Neutral; content only]**
   - Change "Hiring, or have something to build?" and "If you have a project, tell me what it should do and when you need it" to fit hiring teams and peers. For example: "Hiring, or want to talk about something I wrote?"
   - Update `PRODUCT.md` "Users" so the order is developers (readers), then hiring teams, and freelance clients are no longer primary.
8. **Reduce uppercase labels. [Keep]**
   - Use Barlow sentence case for metadata, tags and form labels. Keep uppercase stamps for nav and buttons only.
   - Target: no more than about 10 uppercase items on the first screen (Laravel News has 9).
9. **Make GitHub easier to find. [Neutral]**
   - Engineers trust code they can check quickly (Marlow & Dabbish). Put a visible GitHub link next to the resume in the hero.
   - Over time, add one or two more projects with source. This adds evidence, not claims.
10. **Test with real people before and after. [Neutral]**
    - Run the 5-second test from §2 with 3–5 developers. Also ask one person to read a full article on a phone and say where they got tired.
    - This is the outside check that your redesign article said was missing.

**Not recommended (judgement):** Changing the body font first. Barlow's measured size, x-height and line length are fine. If the site still feels dense after changes 1–5, try a slightly wider text face for body text only, and keep Big Shoulders for the board lettering.

---

## Open questions and limits

- **Ladders 2018** was read only through HR Dive's report. The original PDF link (csuglobal.edu) returned 404, and theladders.com was not checked directly. It measures resumes, not personal sites.
- **Marlow & Dabbish** is small (13 interviews), from 2013, and about GitHub. No newer primary study of how engineers judge _personal websites_ was found.
- **Demirci et al.** covers one global platform over a short period. Nothing specific to Thailand was found.
- **Reference sites** were measured on one page each, live on 2026-10-14. Their CSS can change. Laravel News was measured on an article page, and shadcn/ui and Vercel on docs pages, which are a different kind of page from a personal blog.
- **Phone column width** was measured in headless Chromium with a 15px scrollbar gutter. Real phones with overlay scrollbars give about 15px more.
- **The "does the concept come across" findings** are my reading of the page. They are not tested with real visitors. Change 10 would answer this properly.
