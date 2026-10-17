import { expect, test } from '@playwright/test';

test('the hero has GitHub next to the resume download', async ({ page }) => {
  await page.goto('/');
  const hero = page.getByRole('region', { name: 'Boonyarit Iamsa-ard' });
  // The contact column on the name plate: the innermost element holding both
  // its heading and the resume download, so "next to" means that column, not
  // anywhere on the plate.
  const contact = hero
    .locator('div')
    .filter({ has: page.getByRole('heading', { name: 'Want to talk?' }) })
    .filter({ has: page.getByRole('link', { name: 'Download resume' }) })
    .last();
  const resume = contact.getByRole('link', { name: 'Download resume' });
  const gitHub = contact.getByRole('link', { name: 'GitHub' });

  await expect(gitHub).toBeVisible();

  // Close enough to read as one group: GitHub starts below the resume
  // button, within 48px of its bottom edge.
  const resumeBox = await resume.boundingBox();
  const gitHubBox = await gitHub.boundingBox();
  expect(resumeBox).not.toBeNull();
  expect(gitHubBox).not.toBeNull();
  if (resumeBox && gitHubBox) {
    const gap = gitHubBox.y - (resumeBox.y + resumeBox.height);
    expect(gap).toBeGreaterThanOrEqual(0);
    expect(gap).toBeLessThan(48);
  }
});
