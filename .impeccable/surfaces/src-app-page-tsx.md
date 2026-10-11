---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/projects","src/app/articles","src/app/about","src/app/not-found.tsx"]
---

# Surface: whole site (home leads)

Scope: overall redesign of every route (home, projects, project detail, articles, article detail, about, not-found, header, footer). Home is Persuade; article and project detail pages are Read.

Audience and job: hiring teams and freelance clients, equal weight. Hiring teams want proof of care, then the resume or a message. Clients want proof he can build their thing, then a project inquiry through the same form. Engineers who land on an article come second.

Constraints: keep the contact form, resume download, light and dark themes, and the aircraft-mechanic story. No skill inventories or logo grids. Not gimmicky, generic, loud, or sparse.

## Direction contract

THESIS: The site is a tool-control shadow board. Every piece of work hangs in its own painted outline, so a visitor sees at a glance that everything is accounted for. It refuses the centered-avatar hero over a row of equal cards.

OWN-WORLD: Day mode is a cool grey powder-coated board with a faint pegboard perforation; night mode is charcoal tool foam. Items are enamel plates set inside a painted shadow rim: ink-black by day, safety yellow by night (the foam under-layer). Yellow label tape carries stencil position codes (P-01, W-01). Big Shoulders sets display, Big Shoulders Stencil sets codes only, and Barlow sets body. A slot's outline line type encodes project status: solid is Stable, dashed is Experimental, heavy is Active, dash-dot (an SVG chain line) is Maintenance. Tape carries position codes only (B-00, C-nn, R-01, L-nn, P-nn, W-nn); words never go on tape.

STORY: The visitor sees an engineer whose work is organized and complete. They read the path from aircraft mechanic to software engineer, then download the resume (hiring) or send a message or project inquiry (clients).

FIRST VIEWPORT: A header rail styled as the board's placard, carrying a 32px avatar in a small painted outline beside the name. A name plate (B-00) spans two-thirds of the width at display scale, with one plain line in his voice and the role line under it. Beside it, a contact slot (C-01: "Hiring, or have something to build?" leading to the form) and a resume slot (R-01: direct PDF download). Below: latest project slot with cover, then two article slots. No portrait slot (see Amendments). An inventory line under the board counts slots, all accounted for. The primary actions are the resume and contact slots, inside the first viewport.

SIGNATURE INTERACTION: On hover or focus, an item lifts off its board and reveals the painted shadow and stencil code beneath. On the 404 page the outline remains with its item missing.

FORM: The Shadow Board.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Amendments

- Portrait removed from the home board and the About page at the owner's request during the build. The face appears only as the header avatar.
