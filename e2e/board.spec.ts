import { expect, test } from '@playwright/test';

import { articlesListing } from '@/features/articles/listing';
import { projectsListing } from '@/features/projects/listing';

// Any code-shaped label a visitor could read on tape, such as W-03 or a stray
// C-01.
const anyCode = /^[A-Z]-\d{2}$/;
// Only articles (W) and projects (P) carry one.
const workCode = /^[PW]-\d{2}$/;

for (const path of ['/', articlesListing.path, projectsListing.path]) {
  test(`every position code on ${path} marks a piece of work`, async ({
    page,
  }) => {
    await page.goto(path);
    const main = page.getByRole('main');

    const codes = new Set(await main.getByText(anyCode).allTextContents());
    const work = new Set(
      await main
        .locator('a[href^="/articles/"], a[href^="/projects/"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href'))),
    );

    for (const code of codes) {
      expect(code).toMatch(workCode);
    }
    // One code per article or project, and no code on any other slot.
    expect(codes.size).toBe(work.size);
  });
}

test('the home board explains itself', async ({ page }) => {
  await page.goto('/');
  const main = page.getByRole('main');

  await expect(main.getByText(/hangar tool board/i)).toBeVisible();
  await expect(main.getByText(/board check/i)).toHaveCount(0);
});
