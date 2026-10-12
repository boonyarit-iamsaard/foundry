# Preview images

Status: ready-for-agent

Blocked by: 01

## Problem

Pages without a cover show no **preview image** when shared, even though
`twitter:card` is `summary_large_image`. The root layout sets
`openGraph.images` and `twitter.images` to empty arrays.

## Scope

- Article and project detail pages keep their cover as the preview image,
  passed through the builder from 01 with width, height, and alt text.
- Home, `/about`, `/articles`, `/projects`, and not-found get a generated card
  built with `next/og` (`opengraph-image.tsx`, 1200×630).
- One shared card template takes a title and a subtitle. It uses the board's
  visual language from `DESIGN.md` (stencil display type and the board
  palette), shows "Boonyarit Iamsa-ard · Software Engineer", and is always
  rendered in the light theme.
- Load fonts from `src/core/assets/fonts/`.

## Done when

- Every page's built HTML has an `og:image` and `twitter:image` with absolute
  URLs and dimensions.
- The generated card renders legibly at 1200×630 and at small thumbnail size.
- Each page type has been checked in a share-preview debugger after deploy.

## Comments

### Implementation notes

- The card is `renderPreviewImage` in `src/common/components/preview-image.tsx`. It
  takes a position code as well as a title and subtitle, since the tape and
  its stencilled code are what make it read as a slot. Home is B-00, About
  L-02, Articles W-00, Projects P-00, matching the codes already on those
  pages.
- The title is in Big Shoulders 800, not the stencil face: DESIGN.md's "The
  Stencil Is For Codes Rule" outranks this issue's "stencil display type".
- Satori reads neither WOFF2 nor variable fonts. The card uses static WOFF
  instances cut from the site's own files with fontTools
  (`varLib.instancer` at wght 800 and 700, and a WOFF re-wrap of Barlow 500):
  `big-shoulders-latin-800.woff`, `big-shoulders-latin-700.woff`,
  `big-shoulders-stencil-latin-700.woff`,
  `barlow-latin-500.woff`.
- `buildMetadata` leaves `images` unset, not `undefined`, without a preview
  image. Next skips a route's `opengraph-image` file when the page's
  `openGraph` has an own `images` key.
- `twitter:image` is filled from the Open Graph image by Next, so no
  `twitter-image` files are needed.
- Checked by rendering the cards at 1200×630 and scaled to 400×210: the
  title, code and name line stay legible; the home subtitle (the 139-character
  site description) is small but readable at that size.
- Not-found has no route segment of its own and inherits the root (home)
  card.

### Check after deploy

- Article and project covers are WebP, and the Node.js import article's cover
  is square (1000×1000), so `summary_large_image` crops it. Confirm both in
  the LinkedIn Post Inspector; if LinkedIn drops WebP, the covers need a
  PNG or JPEG variant.
