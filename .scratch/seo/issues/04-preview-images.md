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
