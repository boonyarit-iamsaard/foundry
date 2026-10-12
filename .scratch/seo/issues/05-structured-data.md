# Structured data

Status: ready-for-agent

Blocked by: 01, 02

## Problem

Search engines have no structured description of who the site belongs to or
what an article is, so name searches and article results get no rich
presentation.

## Scope

- Home page: JSON-LD `Person` with a stable `@id` (such as
  `https://boonyarit.me/#person`), name "Boonyarit Iamsa-ard", `jobTitle`
  "Software Engineer", `url`, `image` (profile photo), `sameAs` (GitHub and
  LinkedIn from `appConfig.links`), and `address` (Bangkok, TH). Leave out
  `knowsAbout`, because that would be a skill list.
- Home page: `WebSite` with name, url, and `publisher` referencing the Person
  `@id`.
- Article pages: `BlogPosting` with headline, description, image (cover),
  `datePublished` (`date`), `dateModified` (effective modified date from 02),
  `url`, `mainEntityOfPage`, and `author` referencing the Person `@id`.
- No schema for projects.
- Build the objects with pure functions and render them through one small
  `<script type="application/ld+json">` component.

## Done when

- Home and every article page pass Google's Rich Results Test with no errors.
- Vitest covers the shape of each object, including the shared Person `@id`
  reference.
