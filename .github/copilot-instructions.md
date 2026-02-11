<!-- .github/copilot-instructions.md -->
# Copilot / AI Agent Instructions — Automation

Purpose
- Help an AI coding agent become productive quickly in this repository: a small Playwright test suite for https://provider.mantracare.com.

Quick summary
- Test framework: Playwright tests written in plain JavaScript under the `tests/` directory. See [playwright.config.js](playwright.config.js).
- Primary workflows: run tests (`npx playwright test`), view HTML report in `playwright-report/index.html`, debug locally with headed Chromium (config uses a `chromium` project).
- This repo exercises a remote app (provider.mantracare.com); tests interact with live pages and rely on network stability and geolocation mocking.

Key files
- Tests: [tests](tests) — each test file is a single Playwright spec (e.g. [tests/register.spec.js](tests/register.spec.js)).
- Config: [playwright.config.js](playwright.config.js) — sets `testDir`, `reporter: 'html'`, `trace: 'on-first-retry'` and a `chromium` project with `headless: false`, `video`/`screenshot`/`trace` enabled.
- Package script: [package.json](package.json) contains a `test` script that runs a single spec by filename.

Project-specific conventions & patterns
- Locator style: tests use absolute XPath expressions heavily (see `tests/register.spec.js`). Expect long XPath locators instead of data-testids.
- Helper functions: several tests define small helpers for reliable interactions, e.g. `waitAndClick(selector, opts)` and `waitAndType(selector, text, typeOpts)` which call `locator.waitFor({state:'visible'})` before acting — prefer using them when adding tests.
- Timeouts: tests set global timeouts in places (`test.setTimeout(300000)`, `page.setDefaultTimeout(120000)`) — follow existing timeout usage for new tests.
- Visibility-first interactions: existing code favors `locator.waitFor({state:'visible'})` then `fill()`/`click()` rather than blind clicks. Use `locator.fill()` directly instead of `click()` + `type()` where possible.
- Flaky-element handling: examples use `{ force: true }` for `.check()` and keyboard selection for autosuggest (ArrowDown + Enter) — when elements are overlaid or invisible, prefer targeting the real `input` and use `check({ force: true })`.
- File uploads: use `locator.setInputFiles(path)` as demonstrated for profile picture uploads.
- Geolocation: tests create a context with `geolocation` and `permissions: ['geolocation']` when needed.

How to run and debug locally (concrete)
- Run the whole suite (uses Playwright):

```bash
npx playwright test
```

- Run a single spec (example from package.json):

```bash
npx playwright test 'tests/emotional wellbeing assessments.spec.js'
```

- Run headed Chromium (match config):

```bash
npx playwright test --project=chromium --headed
```

- View HTML report: open `playwright-report/index.html` in the browser or run:

```bash
npx playwright show-report
```

- Open trace for a failing test (trace files created on first retry):

```bash
npx playwright show-trace <path-to-trace.zip-or-dir>
```

Recommended edits and examples (copyable)
- Use helper functions already present, e.g. from `tests/register.spec.js`:

```javascript
async function waitAndClick(selector, opts) {
  const l = page.locator(selector);
  await l.waitFor({ state: 'visible', timeout: 120000 });
  await l.click(opts);
}

async function waitAndType(selector, text, typeOpts) {
  const l = page.locator(selector);
  await l.waitFor({ state: 'visible', timeout: 120000 });
  await l.fill('');
  if (typeOpts) await l.type(text, typeOpts); else await l.fill(text);
}
```

- Fix flaky autosuggests by sending keyboard events (example used in repo):

```javascript
await location.type('Paschim', { delay: 50 });
await page.waitForTimeout(500);
await page.keyboard.press('ArrowDown');
await page.keyboard.press('Enter');
```

- Prefer waiting + fill for textareas instead of click then type (pattern applied in repo):

```javascript
const desc = page.locator('//textarea-xpath');
await desc.waitFor({ state: 'visible', timeout: 120000 });
await desc.fill('long description...');
```

Points to watch / gotchas discovered in repo
- Tests target a remote, third-party site — network latency, auth, or rate limiting will cause flakiness; increase timeouts or stub external calls if you convert to unit tests.
- Many locators are brittle absolute XPaths; prefer adding stable selectors (data-testids) if you can change the AUT. Otherwise, centralize fragile locators into helper variables so they are easy to update.
- Playwright config runs headed Chromium by default; CI should set `CI=true` and rely on retries/workers settings already present in `playwright.config.js`.

If you need more
- Tell me which area to expand: run/debug recipes, converting XPath locators to stable selectors, or adding a small example test fixture. I can iterate the doc.

-- End of instructions
