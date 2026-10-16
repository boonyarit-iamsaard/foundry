import { join } from 'node:path';

import { test } from '@playwright/test';

import { articlesListing } from '@/features/articles/listing';
import { projectsListing } from '@/features/projects/listing';

import { desktopViewport, phoneViewport } from './viewports';

// Saves full-page captures of the main pages for the owner to compare by eye.
// Nothing is asserted: visual decisions are judged from the images.
// Run with `SCREENSHOTS_DIR=<dir> pnpm test:screenshots`.

const pages = [
  { name: 'home', path: '/' },
  { name: 'articles', path: articlesListing.path },
  { name: 'article', path: '/articles/conventional-commit-types-guide' },
  { name: 'projects', path: projectsListing.path },
  { name: 'project', path: '/projects/portfolio' },
  { name: 'about', path: '/about' },
];

const viewports = [phoneViewport, desktopViewport];

// The site follows the system theme by default, so emulating the colour
// scheme is how a visitor gets each theme.
const themes = [
  { name: 'day', colorScheme: 'light' },
  { name: 'night', colorScheme: 'dark' },
] as const;

const outputDir = process.env.SCREENSHOTS_DIR;

if (!outputDir) {
  throw new Error('Set SCREENSHOTS_DIR to the folder the screenshots go in');
}

for (const { name, path } of pages) {
  for (const viewport of viewports) {
    for (const theme of themes) {
      const fileName = `${name}-${viewport.width}-${theme.name}.png`;

      test(fileName, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.emulateMedia({
          colorScheme: theme.colorScheme,
          reducedMotion: 'reduce',
        });
        await page.goto(path);

        // Lazy images only load once scrolled near, so walk the page first.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 100));
          }
          scrollTo(0, 0);
          await document.fonts.ready;
        });
        await page.waitForLoadState('networkidle');

        await page.screenshot({
          path: join(outputDir, fileName),
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  }
}
