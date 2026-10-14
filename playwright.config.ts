import { defineConfig, devices } from '@playwright/test';

import { desktopViewport, phoneViewport } from './e2e/viewports';

const port = 3200;

// Browser tests run against a production build: the mobile drawer is a
// lazy-loaded chunk, and the dev server's first-request compile lag makes
// timing checks flaky.
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'phone',
      testIgnore: 'screenshots.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: phoneViewport,
        hasTouch: true,
        isMobile: true,
      },
    },
    {
      name: 'desktop',
      testIgnore: 'screenshots.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        viewport: desktopViewport,
      },
    },
    // Not a test: saves full-page captures for the owner to compare by eye.
    // It sets its own widths and themes, so it runs once.
    {
      name: 'screenshots',
      testMatch: 'screenshots.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `pnpm build && pnpm exec next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
