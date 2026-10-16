import { expect, test } from '@playwright/test';

test.skip(
  () => test.info().project.name !== 'phone',
  'The menu button only shows at phone width',
);

test('the menu opens on tap and stays open', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Open menu' }).tap();

  const menu = page.getByRole('dialog');
  await expect(menu).toBeVisible();

  // The bug this guards: the drawer opened, then closed itself straight away.
  // Waiting is the point here, so give a self-close time to happen.
  await page.waitForTimeout(1000);

  await expect(menu).toBeVisible();
  await expect(menu.getByRole('link', { name: 'Articles' })).toBeVisible();
});
