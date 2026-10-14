import type { Locator } from '@playwright/test';

import { expect, test } from '@playwright/test';

// One reading page of each kind, each with a heading from early in its body.
const readingPages = [
  {
    path: '/articles/conventional-commit-types-guide',
    bodyHeading: /A new feature for the user/,
    hasCover: true,
  },
  { path: '/projects/portfolio', bodyHeading: 'Overview', hasCover: true },
  { path: '/about', bodyHeading: 'My Journey', hasCover: false },
];

// The page's side gutter at phone width.
const phoneGutter = 16;
// A comfortable reading length, in characters per line, averaged so short
// last lines count.
const maxCharactersPerLine = 68;

// Average characters per rendered line over a page's long paragraphs.
function charactersPerLine(main: Locator) {
  return main.getByRole('paragraph').evaluateAll((paragraphs) => {
    let characters = 0;
    let lines = 0;
    for (const paragraph of paragraphs) {
      const text = paragraph.textContent ?? '';
      if (text.length < 200) {
        continue;
      }
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      const lineTops = new Set(
        [...range.getClientRects()].map((rect) => Math.round(rect.top)),
      );
      characters += text.length;
      lines += lineTops.size;
    }
    return lines === 0 ? null : characters / lines;
  });
}

// Slots have no role a visitor could name, so the board marks its own.
function isInSlot(locator: Locator) {
  return locator.evaluate(
    (node) => node.closest('[data-slot="slot"]') !== null,
  );
}

for (const { path, bodyHeading, hasCover } of readingPages) {
  test.describe(path, () => {
    test('the body text sits on the page, not in a slot', async ({ page }) => {
      await page.goto(path);
      const heading = page
        .getByRole('main')
        .getByRole('heading', { name: bodyHeading });

      await expect(heading).toBeVisible();
      expect(await isInSlot(heading)).toBe(false);
    });

    if (hasCover) {
      test('the cover keeps its slot', async ({ page }) => {
        await page.goto(path);
        // The cover is decorative (empty alt), so it has no img role.
        const cover = page.getByRole('main').locator('img').first();

        expect(await isInSlot(cover)).toBe(true);
      });
    }

    test('on a phone the text uses the screen width', async ({ page }) => {
      test.skip(test.info().project.name !== 'phone', 'Phone width only');
      await page.goto(path);
      const heading = page
        .getByRole('main')
        .getByRole('heading', { name: bodyHeading });
      const viewport = page.viewportSize();
      const box = await heading.boundingBox();

      expect(box?.width).toBeGreaterThanOrEqual(
        (viewport?.width ?? 0) - 2 * phoneGutter - 1,
      );
    });

    test('on a wide screen lines stay a comfortable length', async ({
      page,
    }) => {
      test.skip(test.info().project.name !== 'desktop', 'Desktop width only');
      await page.goto(path);

      const length = await charactersPerLine(page.getByRole('main'));

      expect(length, 'no long paragraph on the page').not.toBeNull();
      expect(length).toBeLessThanOrEqual(maxCharactersPerLine);
    });
  });
}
