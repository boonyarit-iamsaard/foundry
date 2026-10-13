# Mobile LCP research: Lantern, next/font preload, client JS

Versions read: Lighthouse **v13.5.0** (tag commit `cb853a38`), whose Lantern code is the npm package **`@paulirish/trace_engine@0.0.65`** (pinned in Lighthouse's `package.json`), Next.js **16.4.0** (installed `node_modules/next`, Rust sources at tag `v16.4.0`), `@vercel/analytics@2.0.1`, `@vercel/speed-insights@2.0.0`. Read only. Nothing was built or measured.

## Summary

- **Q1 (Lantern):** FCP and LCP each run two graph simulations, optimistic and pessimistic, and average them 0.5/0.5. The **FCP** graphs keep only network requests that finished before the observed FCP **and** have "render-blocking priority": `VeryHigh` (CSS, documents, fonts found through CSS) or `High` scripts/documents. **Preloaded fonts (`High`, type Font) and `Low` async JS fail that test, so FCP ignores them.** The **LCP** graphs keep **every** request that finished before the observed LCP, except low-priority images. Lantern does nothing special for text or fonts. On localhost all ~485 KiB of fonts and JS finish before the ~100 ms paint. Lantern then replays them at 1.6 Mbps with bandwidth split evenly across requests, which adds roughly 2.4 s. That fits 4.3 s → 1.8 s when both are blocked.
- **Why `preload: false` raised FCP:** Chromium gives a font found through CSS `VeryHigh` priority, and a `<link rel=preload>` font `High`. `VeryHigh` counts as render-blocking in Lantern, so fonts that were no longer preloaded moved into the FCP graph.
- **Q2 (next/font):** `preload` is all-or-nothing **per `localFont()` call**. The Next docs say so, and both the webpack loader and the Turbopack Rust code apply one flag to every `src` file. No supported option preloads just one file of a multi-file family. Splitting Barlow across two calls that share one `font-family` (through `declarations`) is possible in principle but undocumented. The Next docs don't spell out the trade-offs of `preload: false`. `adjustFontFallback` (default `'Arial'` for local fonts) builds a metric-matched fallback from the file closest to 400/normal, whatever the preload setting.
- **Q3 (JS):** Next always runs a small (~1.4 KB) polyfill module in the App Router client (`app-globals.js`). Config can't remove it, and browserslist doesn't control it. Lighthouse sizes "legacy JS" from **core-js module sizes for each detected polyfill**, not the bytes actually present, so the ~14 KiB may overstate a ~1.4 KB file. Whether that file is the cause is still open. The Turbopack analyser for this version is `next analyze` (v16.1+). The levers are `next/dynamic` inside a Client Component and keeping heavy client trees, like the mobile drawer and the contact form, behind lazy boundaries. Vercel Analytics and Speed Insights already inject their scripts as `defer` from `useEffect`. Only their small wrappers ship in the layout chunk.
- **Q4 (is this known?):** The Lighthouse docs say simulated throttling "suffers from edge cases" and that the original trace won't match the metrics. No primary doc describes this exact case: everything finishing before the paint inflates LCP. It follows directly from the code above. PSI's Core Web Vitals verdict uses CrUX field data (p75, 28 days), not the lab number. Lab LCP is 25% of the Lighthouse performance score.
- **Decision (a), fonts:** Under Lantern a preloaded font counts toward **LCP only**. A non-preloaded font that is **used** before first paint counts toward **FCP and LCP**. A non-preloaded font that the first render **doesn't use** isn't fetched at all (CSS Fonts 4 lazy loading) and drops out of both. So: **keep preloading Barlow (the hero `<p>` font) and any family that renders above the fold on `/`. Set `preload: false` on families not used on the first render** (mono is used in MDX; check stencil, display and italic on `/`). Turning preload off for an above-the-fold family worsens FCP, as you measured.
- **Decision (b), JS:** Cutting JS that downloads before the observed paint is the bigger lever (−1.3 s simulated). Run `next analyze`, then lazy-load the client-only subtrees that the home page doesn't need at first paint. Don't count on browserslist to clear the legacy-JS flag. Check which code it actually matched first.

---

## 1. Lantern FCP/LCP simulation (Lighthouse 13.5.0)

**Where the code lives.** `core/lib/lantern/lantern.js` in Lighthouse v13.5.0 is only a re-export: `export * from '@paulirish/trace_engine/models/trace/lantern/lantern.js'` (https://github.com/GoogleChrome/lighthouse/blob/v13.5.0/core/lib/lantern/lantern.js). `package.json` pins `"@paulirish/trace_engine": "0.0.65"`. The wrapper `core/computed/metrics/lantern-largest-contentful-paint.js` computes Lantern FCP first and passes it in as `fcpResult`. The upstream TypeScript is `front_end/models/trace/lantern/` in ChromeDevTools/devtools-frontend. The paths below are in the published `@paulirish/trace_engine@0.0.65` package (`models/trace/lantern/...`).

**How the estimate is combined:** `metrics/Metric.js` `Metric.compute()` (L43ff). It builds `getOptimisticGraph()` and `getPessimisticGraph()`, runs `simulator.simulate()` on each, and calls `getEstimateFromSimulation()`. It then returns `intercept*m + optimistic*opt + pessimistic*pess`. FCP and LCP both use `{intercept: 0, optimistic: 0.5, pessimistic: 0.5}` (`FirstContentfulPaint.js` and `LargestContentfulPaint.js`, `coefficients`). For FCP the estimate is the simulation's `timeInMs`, the finish time of the whole graph (`Simulator.simulate()` returns `timeInMs: totalElapsedTime`). `LargestContentfulPaint.compute()` (L58) finally takes `max(lcp, fcp)`.

**Shared graph builder:** `FirstContentfulPaint.getFirstPaintBasedGraph()` (L93) clones the page dependency graph and keeps:

- **Network nodes** that did _not_ end after `cutoffTimestamp` (the main document is always kept). It also drops script URLs found to be "definitely not render-blocking", then applies the metric's `treatNodeAsRenderBlocking(node)` filter.
- **CPU nodes** that `getRenderBlockingNodeData()` (L20) chose: the EvaluateScript task of each script that ended before the cutoff and whose earliest evaluation _started_ by the cutoff, plus the first Layout, first Paint and first ParseHTML tasks, plus anything matched by `additionalCpuNodesToTreatAsRenderBlocking`. A script that loaded before the cutoff but first evaluated after it is excluded. That some of your async chunks were evidently kept (blocking JS cut LCP by 1.3 s) means their evaluation started by the observed paint, or no evaluation task was found for them (`if (!cpuNodeForUrl) continue;`, which leaves them in).

**FCP filters** (`FirstContentfulPaint.js` L120–134), cutoff = observed FCP:

- optimistic: `node.hasRenderBlockingPriority() && node.initiatorType !== 'script'`
- pessimistic: `node.hasRenderBlockingPriority()`

`NetworkNode.hasRenderBlockingPriority()` (`graph/NetworkNode.js` L68) returns `priority === 'VeryHigh' || (priority === 'High' && (Script || Document))`. So a **preloaded font (High, resourceType Font) and Low-priority JS never enter the FCP graph**. CSS (VeryHigh) does.

**LCP filters** (`LargestContentfulPaint.js` L19–47), cutoff = observed LCP:

- optimistic: `isNotLowPriorityImageNode`, i.e. every network node except `Image` at `Low`/`VeryLow`.
- pessimistic: `_ => true` (every network node), plus _all_ layout CPU nodes before the cutoff.
- `getEstimateFromSimulation()` (L49) takes the latest `endTime` among non-low-priority-image nodes.

**Fonts and text:** the lantern sources contain no font-specific handling. A text LCP element is treated like any other: everything that finished before the LCP timestamp is assumed necessary. Lantern does not model `font-display: swap`, even though the LCP spec reports a text element once, "for the first paint where the element is ... contentful (i.e. image resource or blocking fonts are sufficiently loaded)" (https://w3c.github.io/largest-contentful-paint/, §report LCP note). CSS Fonts 4 defines `swap` as "an extremely small block period (100ms or less is recommended)" (https://drafts.csswg.org/css-fonts-4/#font-display-desc). A real browser can paint the hero text in the fallback font without waiting for the font. Lantern assumes it waits for every font that finished before the paint.

**How the simulator spends bandwidth** (`simulation/Simulator.js`): the default is `mobileSlow4G` (`rttMs: 150`, `throughputKbps: 1.6*1024`, `cpuSlowdownMultiplier: 4`; `simulation/Constants.js`). `updateNetworkCapacity()` (L216) gives each in-flight connection `throughput / inFlight`, an equal share with no priority weighting. Priority only shifts a node's start ordering (`computeNodeStartPosition()` L443: `PriorityStartTimePenalty` VeryHigh 0 … Low 1). The concurrent-request cap is 10, and an HTTP/1.1 origin gets 6 connections (`ConnectionPool.js`, `CONNECTIONS_PER_ORIGIN = 6`, h2 handled separately). `next start` on localhost is HTTP/1.1, while production Vercel serves h2/h3.

**Why fonts and async JS inflate LCP but not FCP:** both are in the LCP graph (they finished before the ~100 ms observed LCP) and absent from the FCP graph (wrong priority or type). In the LCP simulation the hero paint waits on ~485 KiB sharing 1.6 Mbps (≈204.8 KiB/s): about 2.4 s of transfer. Your blocking experiments fit this:

- fonts (225 KiB ≈ 1.1 s) → −0.9 s
- JS (260 KiB ≈ 1.3 s) → −1.3 s
- both → −2.5 s

These figures are arithmetic from the constants above, not a re-simulation.

**Why `preload: false` raised FCP:** Chromium's `TypeToPriority()` gives `ResourceType::kFont` `kVeryHigh`. `ComputeLoadPriority()` then says "A preloaded font should not take precedence over critical CSS or parser-blocking scripts" and sets `kHigh` when `is_link_preload` (https://github.com/chromium/chromium/blob/b8b053081e8e43f0206130dc6c70d996343cffa2/third_party/blink/renderer/platform/loader/fetch/resource_fetcher.cc#L177-L182 and #L619-L623; main at the time of reading, not pinned to your Chrome build). Without preload, a font that the first render uses is fetched by CSS at `VeryHigh`. It then passes `hasRenderBlockingPriority()` and, having finished before the observed FCP, joins **both** FCP graphs: 0.9 → 1.7 s. Lantern's Speed Index pessimistic estimate is built from the FCP result (`SpeedIndex.js` L45–55, `fcpResult.pessimisticEstimate`), so SI rose with it.

## 2. next/font/local preload granularity (Next 16.4.0)

- **Docs** (installed `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`, `### preload`; https://nextjs.org/docs/app/api-reference/components/font#preload): "Every font file a call loads shares this setting, because they become a single group of `@font-face` rules with one `font-family`."
- **Turbopack (your build)**: `build_font_face_definitions()` loops over every `src` descriptor and writes `preload: options.preload` into each file's query (https://github.com/vercel/next.js/blob/v16.4.0/crates/next-core/src/next_font/local/stylesheet.rs). The import-map resolver in `local/mod.rs` adds `.p` to the emitted filename when `preload` is set. The family name is `options.font_family()` = `variable_name`, the exported constant (`local/options.rs` L41–43, `util.rs` `get_scoped_font_family`).
- **Webpack path** (same behaviour): `dist/compiled/@next/font/dist/local/loader.js` calls `emitFontFile(..., preload, ...)` with one `preload` for every `src`. `next-font-loader/index.js` names preloaded files `[hash].p.[ext]`, and `next-font-manifest-plugin.js` `getPreloadedFontFiles()` keeps only `.p.` files.
- **What gets emitted per route**: `dist/server/app-render/get-layer-assets.js` emits `preloadFont()` for the manifest's `.p.` files of the layout or page that imports the font. If that entry has fonts but none are preloadable, it emits `preconnect` instead (`get-preloadable-fonts.js`). The docs ("Preloading") confirm that a font is preloaded only on routes whose page or layout uses it, and on every route if the root layout does. The docs' "Using Multiple Fonts" pattern exports each font from a module so that it "is preloaded only when it's rendered".
- **Preloading one file of a family:** there is no supported option. An **undocumented** workaround: two calls, Barlow 400 with `preload: true` and the other four with `preload: false` plus `declarations: [{ prop: 'font-family', value: 'fontSans' }]`. The second call's `@font-face` rules would then join the first call's family. The docs only say that `declarations` `font-family` "replaces the name Next.js generates. Keep the value the same as the exported constant". Two unknowns: whether a call whose export is never applied still emits its CSS, and whether its own (unused) fallback face matters (see Open questions).
- **Trade-offs of `preload: false` with `swap`:** the Next docs give no explicit list. What the sources do establish:
  - `adjustFontFallback` defaults to `'Arial'` for local fonts "to reduce Cumulative Layout Shift" (font.md). It is computed from the file `pickFontFileForFallbackGeneration()` picks, the one closest to weight 400, preferring normal style (`dist/compiled/@next/font/dist/local/pick-font-file-for-fallback-generation.js`), whatever the preload setting.
  - With `swap` the fallback paints immediately and the font swaps in when it loads (CSS Fonts 4). Without preload the swap happens later, so any residual metric mismatch shows later. How much CLS that adds is not documented.
  - A font that isn't preloaded and isn't used isn't downloaded: "user agents must only download those fonts that are referred to within the style rules applicable to a given page" (https://drafts.csswg.org/css-fonts-4/#font-loading-guidelines).

## 3. Reducing JS before first paint (Next 16 App Router)

**Default targets and polyfills:** the supported-browsers doc (`dist/docs/03-architecture/supported-browsers.md`; https://nextjs.org/docs/architecture/supported-browsers) gives the default browserslist `["chrome 111", "edge 111", "firefox 111", "safari 16.4"]`, overridable in `package.json`. It says widely used polyfills are loaded "only ... for browsers that require them". Separately, the App Router client always runs `require("../build/polyfills/polyfill-module")`:

- `dist/client/app-globals.js`, which `app-index.js` L13 requires, which `app-next-turbopack.js` requires.
- That module is 1,380 bytes of guarded assignments: `trimStart`/`trimEnd`, `Symbol.prototype.description`, `Array.prototype.flat`/`flatMap`, `Promise.prototype.finally`, `Object.fromEntries`, `Array.prototype.at`, `Object.hasOwn`, `URL.canParse` (`dist/build/polyfills/polyfill-module.js`).
- No config option removes it, and browserslist doesn't control it.

**How Lighthouse sizes legacy JS:**

- The `LegacyJavaScript` insight (`@paulirish/trace_engine` `models/trace/insights/LegacyJavaScript.js`) calls `detectLegacyJavaScript()` from the `legacy-javascript` package (repo GoogleChrome/lighthouse; v0.0.3 read).
- Its `estimateWastedBytes()` adds up `graph.moduleSizes` for the **core-js modules** behind each detected polyfill name (capped at `graph.maxSize`), plus per-transform estimates, then scales by the compression ratio.
- A direct assignment such as `Array.prototype.at=` matches its `direct-assignment` pattern.
- So the reported ~14 KiB is a core-js-equivalent estimate, not the bytes in your chunk.
- If the matches are Next's `polyfill-module`, the flag can't be removed by config. If they come from a dependency, they can. Read the insight's match list to tell which.

**Bundle analysis with Turbopack:** `next analyze` (docs `01-app/02-guides/package-bundling.md`, "Available in v16.1 and later"; CLI ref `06-cli/next.md` `next analyze`, `--output`, and `next analyze export --snapshot` for JSONL; https://nextjs.org/docs/app/guides/package-bundling) shows client modules with import chains. `@next/bundle-analyzer` is documented as the webpack-only tool.

**Deferral levers (docs `01-app/02-guides/lazy-loading.md`; https://nextjs.org/docs/app/guides/lazy-loading):**

- Server Components are split automatically, and lazy loading applies to Client Components.
- `next/dynamic` / `React.lazy` defer a Client Component's code. `ssr: false` works only when the `dynamic()` call sits inside a Client Component.
- "When a Server Component dynamically imports a Client Component, automatic code splitting is currently **not** supported." So any `dynamic()` wrapper has to live in a `'use client'` file.

**Applied to this repo (candidates to confirm with `next analyze`, not measured):**

- `src/app/layout.tsx` renders these client boundaries on every route: `ThemeProvider` (next-themes), `TooltipProvider` (Radix tooltip), `AppLayout` → `AppHeader` (`'use client'`) → `MobileNav` (vaul drawer and Radix dialog, opened only on tap), `ThemeToggle`, `Toaster` (sonner, only needed once a toast fires), `<Analytics/>`, `<SpeedInsights/>`.
- The home page adds `ContactForm` (`'use client'`; react-hook-form, zod, next-safe-action) by way of `CallToActionSection`.
- The drawer body and the Toaster are natural `next/dynamic` targets from inside client files. The contact form sits below the fold, so it is another candidate.
- `@vercel/analytics/next` 2.0.1 and `@vercel/speed-insights/next` 2.0.0 (`dist/next/index.mjs`) are `"use client"` wrappers in `<Suspense fallback={null}>`. They call `inject()` in `useEffect`, which appends `<script defer src="/_vercel/insights/script.js">` (or `/_vercel/speed-insights/script.js`). The real tracker therefore loads after hydration. Only the wrapper (~7 KB unminified source each) is in the bundle.

## 4. Is this known Lantern behaviour? How it relates to field data

- **Lighthouse docs** (`docs/throttling.md` at v13.5.0; https://github.com/GoogleChrome/lighthouse/blob/v13.5.0/docs/throttling.md):
  - Simulated throttling is the default for the CLI and PSI. It is "roughly as accurate or better than DevTools throttling for most sites, [but] suffers from edge cases".
  - The original trace "will not match up with Lighthouse's metric results".
  - With DevTools throttling, the trace matches the reported numbers.
  - `docs/lantern.md` reports Lantern ~6–13% less accurate than DevTools throttling, on a corpus that is now old.
  - `docs/variability.md` recommends localhost for stability. It says nothing about how localhost, by making everything finish before the paint, interacts with Lantern's "finished before LCP" rule.
- **No primary doc names this inflation pattern.** It is a direct consequence of `LargestContentfulPaint.getOptimisticGraph`/`getPessimisticGraph` (§1). The default throttling config is `throttlingMethod: 'simulate'`, `mobileSlow4G` (`core/config/constants.js` L62–63). Running `--throttling-method=devtools` measures a real throttled load instead of a replay.
- **PSI and CrUX** (https://developers.google.com/speed/docs/insights/v5/about):
  - Field data comes from CrUX over "the previous 28-day collection period", reported at the 75th percentile.
  - The Core Web Vitals assessment passes "if the 75th percentiles of all three metrics are Good", with fallback to origin-level data and then to none.
  - Lab data "is based on a simulated load of a page on a single device and fixed set of network conditions. As a result, the values may differ", and "having good lab data does not necessarily mean real-user experiences will also be good".
  - In the Lighthouse score, LCP weighs 25, TBT 30, CLS 25, FCP 10, SI 10 (`core/config/default-config.js` L419–423).

## Open questions

- **Root cause of the `preload: false` LCP figure.** With all preloads off, LCP fell to 3.4 s, exactly the "fonts blocked" figure. The trace would show whether the CSS-discovered fonts finished after the observed LCP or were never fetched. Lantern's per-node timings (`Simulator.allNodeTimings` / Lighthouse `--save-assets` lantern debug data) would settle it.
- **Splitting Barlow across two calls via `declarations`.** Not documented. Unknowns: whether Turbopack emits CSS for a font object whose `className`/`variable` is never used, and whether the second call's `fontSansRest Fallback` face matters. Only a build and an inspection of the CSS can verify this.
- **Source of the ~14 KiB legacy JS.** Next's `polyfill-module` or a dependency? It depends on the insight's match list. Whether Turbopack transpiles `node_modules` to the browserslist targets was not established from docs.
- **Which families render above the fold on `/`.** Display is used in the header and hero `h2`, stencil through `code-stencil` in `board/slot.tsx`, mono in MDX, italic unknown. This governs decision (a) and was not checked in a rendered page.
- **Chromium priority logic.** Read from Chromium `main`, not the Chrome build Lighthouse ran. The font preload `kHigh` rule is long-standing, but it was not checked against that exact version.
- **Lantern accuracy for text LCP with `swap`.** No primary source quantifies it. The Lighthouse accuracy doc predates LCP.
