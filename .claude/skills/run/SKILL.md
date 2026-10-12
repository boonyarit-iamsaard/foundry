---
name: run
description: Run this site's dev server and drive it in headless Chromium. Use when checking a change in the running app, taking a screenshot, or starting or stopping the dev server.
---

Every command below uses `$S`, the session's scratchpad directory.

## 1. Start

Run `next` directly under `setsid`, so the server and every worker it spawns
share one session that step 4 stops as a unit:

```bash
setsid node_modules/.bin/next dev --turbopack >"$S/dev.log" 2>&1 </dev/null &
echo $! >"$S/dev.sid"
timeout 90 bash -c 'until curl -sf -o /dev/null http://localhost:3000; do sleep 1; done'
```

The server is up when the `curl` loop exits 0. Server errors land in
`$S/dev.log`.

## 2. Install the driver

Install `playwright-core` into the scratchpad, never into the repo, and use
the browser Playwright already cached:

```bash
mkdir -p "$S/pw" && npm i --prefix "$S/pw" playwright-core@1.56.1
ls -d ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome | tail -1
```

## 3. Drive

Write the check as an `.mjs` script in `$S/pw` and run it from there:

```js
import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: '<chrome path from step 2>',
  args: ['--no-sandbox'],
});
const page = await (
  await browser.newContext({ viewport: { width: 390, height: 844 } })
).newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
// Waits two frames, long enough for an IntersectionObserver callback to land.
const frames = () =>
  page.evaluate(
    () =>
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
  );

await page.goto('http://localhost:3000/');
await page.waitForLoadState('networkidle');
// ...checks...
console.log('errors', errors);
await browser.close();
```

390px wide is mobile, where the header shows the drawer. 1280px shows the
desktop nav.

Two gotchas make a working change look broken:

- **Assert classes, not computed colours.** The header border fades over
  200ms and the wordmark over 300ms, so `getComputedStyle` read mid-fade still
  shows the old colour. Check `classList.contains('border-paint')`, or the
  wordmark's `aria-hidden`.
- **Warm a route before clicking a link to it.** The dev server compiles a
  route on its first request, so the first navigation to it lags by a second
  or more. Load the route once in another page first, then click.

## 4. Stop

Stop the whole session, then confirm the port is free:

```bash
pkill -s "$(cat "$S/dev.sid")"
timeout 10 bash -c "while pgrep -s $(cat "$S/dev.sid") >/dev/null; do sleep 0.5; done"
lsof -iTCP:3000 -sTCP:LISTEN || echo 'port free'
```

The server is stopped when this prints `port free`.
