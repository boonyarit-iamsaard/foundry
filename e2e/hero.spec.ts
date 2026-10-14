import { expect, test } from '@playwright/test';

test('the hero has GitHub next to the resume download', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('region', { name: 'Boonyarit Iamsa-ard' });
  // The slot that holds the resume download, so "next to" means the same
  // slot, not anywhere on the page.
  const resumeSlot = hero.locator('[data-slot="slot"]', {
    has: page.getByRole('link', { name: 'Download resume' }),
  });

  await expect(resumeSlot.getByRole('link', { name: 'GitHub' })).toBeVisible();
});
