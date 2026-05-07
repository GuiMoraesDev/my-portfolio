# Testing Patterns

**Analysis Date:** 2026-05-07

## Test Frameworks

**Unit / Integration — Jest:**
- Runner: Jest 30 via `next/jest` wrapper
- Config: `jest.config.ts`
- Environment: `jsdom`
- Assertion library: `@testing-library/jest-dom` (loaded in setup)
- Component rendering: `@testing-library/react`
- Mock utilities: `@jest/globals` — all Jest globals (`describe`, `it`, `expect`, `jest`, `beforeEach`, etc.) imported explicitly; `--injectGlobals false` is set so auto-injection is disabled

**E2E — Playwright:**
- Runner: Playwright
- Config: `playwright.config.ts`
- Browsers: Chromium (Desktop Chrome), Mobile Chrome (Galaxy S8)
- Base URL: `http://localhost:3000`
- Dev server auto-started: `npm run dev`

## Run Commands

```bash
npm run test:unit          # Run all Jest unit tests (--runInBand, no injected globals)
npm run test:e2e           # Run all Playwright E2E tests (headless)
npm run test:e2e:ui        # Run Playwright tests in interactive UI mode
```

There is no watch mode script defined; run `npx jest --watch` manually if needed.
Coverage is not configured with a threshold; run `npx jest --coverage` manually.

## Test File Organization

**Unit tests:**
- Co-located with the source file they test
- Same directory, same base name, `.test.tsx` (components) or `.test.ts` (hooks/logic)
- Examples:
  - `src/components/atoms/Icon/index.test.tsx` tests `src/components/atoms/Icon/index.tsx`
  - `src/hooks/useDetectClickOutside.test.tsx` tests `src/hooks/useDetectClickOutside.tsx`
  - `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.test.ts`
  - `src/components/organisms/TerminalContact/src/hooks/useTerminalInput.test.ts`
  - `src/components/organisms/TerminalContact/src/views/TerminalContact.test.tsx`

**E2E tests:**
- Live in `src/tests/` — completely separate from source
- Named with `.spec.ts` suffix
- Example: `src/tests/home.spec.ts`
- Jest is configured to ignore `src/tests/` via `modulePathIgnorePatterns`

## Test Suite Structure

**Unit tests use explicit imports from `@jest/globals`:**
```typescript
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
```

**Describe/it nesting pattern:**
```typescript
describe("ComponentName", () => {
  describe("feature group", () => {
    it("does the specific thing", () => { ... });
  });
});
```

**E2E tests use Playwright's `test` / `expect`:**
```typescript
import { test, expect } from "@playwright/test";

test.describe("Group", () => {
  test.use({ locale: "en-US" });   // per-suite config

  test("description", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#my-title")).toHaveText("...");
  });
});
```

## Setup Files

**`jest.setup.ts`** (loaded via `setupFilesAfterEnv`):
- Imports `@testing-library/jest-dom/jest-globals` for DOM matchers
- Polyfills `TextEncoder`/`TextDecoder`, `whatwg-fetch`
- Stubs `SVGElement.prototype.getTotalLength` (not in jsdom)
- Stubs `IntersectionObserver` (used by framer-motion)
- Manually calls `afterEach(cleanup)` because `--injectGlobals false` disables auto-cleanup

**`__mocks__/next-intl.ts`** (mapped in `jest.config.ts`):
- Mocks the `next-intl` package to avoid i18n runtime errors in unit tests

## Mocking Patterns

**Browser API stubs in `beforeEach`:**
```typescript
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = jest.fn<() => void>(function (this) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = jest.fn<() => void>(function (this) {
    this.removeAttribute("open");
  });
  Element.prototype.scrollIntoView = jest.fn<() => void>();
});
```

**`window.open` mock:**
```typescript
Object.defineProperty(window, "open", { value: jest.fn(), writable: true });
```

**Spy pattern:**
```typescript
const removeSpy = jest.spyOn(document, "removeEventListener");
```

**What to mock:** browser APIs missing from jsdom (`showModal`, `close`, `scrollIntoView`, `IntersectionObserver`), `window.open`, third-party modules with side effects (`next-intl`).

**What NOT to mock:** internal hooks and utilities — test them directly or via integration with `renderHook`.

## What Is Tested

**Unit-tested:**
- `src/components/atoms/Icon` — renders, size variants, rounded prop, className passthrough
- `src/hooks/useDetectClickOutside` — click-outside callback, click-inside no-op, listener cleanup on unmount
- `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine` — command parsing, history management, all built-in commands (`/help`, `whoami`, `/contact`, `echo`, `clear`, `/open`, typo suggestions), case-insensitivity
- `src/components/organisms/TerminalContact/src/hooks/useTerminalInput` — input state, Enter/ArrowUp/ArrowDown key handling, history navigation
- `src/components/organisms/TerminalContact/src/views/TerminalContact` — full component integration (trigger button, dialog open/close, input, line rendering, drag handle)

**E2E-tested (`src/tests/home.spec.ts`):**
- Locale detection (en-US, pt-BR, fallback to en) — HTML lang attribute and visible text
- Terminal component open/close/command flow via `data-testid` selectors
- Page-level structure (title, sections, header, footer visibility)

**Not tested:**
- Most molecules and organisms outside TerminalContact (no `.test.*` files found)
- Page-level components in `src/app/`
- i18n routing logic
- Provider wrappers

## Selectors Strategy

Unit tests use `screen.getByTestId(...)` — elements must have `data-testid` attributes.
E2E tests use `page.getByTestId(...)` and `page.locator("#id")` / `page.locator("html")`.
Do not use text-based selectors for structural assertions; prefer `data-testid`.

---

*Testing analysis: 2026-05-07*
