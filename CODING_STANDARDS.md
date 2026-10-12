# Coding standards

Read during review. These are the judgement calls no lint rule can make;
mechanical rules live in `biome.json` and `biome-plugins/`, and anything they
enforce is out of scope here.

The TypeScript house style is the default. This file overrides it where the
two disagree.

## Types

- Props are a `type` named `[ComponentName]Props`, wrapped in `Readonly<{…}>`,
  not an `interface`. This overrides the house style.

## Vocabulary

- Comments, docs, and user-facing copy use `GLOSSARY.md`'s term for a concept,
  never a word its _Avoid_ line lists. Identifiers that name a UI component
  (`ArticleCard`) are names, not vocabulary, and stay as they are.

## One source per fact

A value that two places must agree on is read from one module, never written
twice as a literal:

- A page's path and position code, shared by the page, its preview image, and
  the sitemap: `src/features/*/listing.ts` for list pages, `fixtureCodes` in
  `src/common/definitions/fixture-codes.ts` for fixed slots.
- Titles and descriptions a page header and its preview image both show: the
  same `listing.ts` objects.
- Full site URLs: `absoluteUrl` in `src/common/helpers/url.ts` (lint-enforced).
