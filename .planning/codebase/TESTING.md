# Testing

**Analysis Date:** 2026-05-08

## Strategy

Two-tier approach: unit/integration tests with Jest (co-located with source) and E2E tests with Playwright (in a separate `src/tests/` directory). Unit tests cover hooks and components in isolation; E2E tests verify real browser behavior including locale detection, terminal interaction, and page structure.

## Test Types

**Unit / Integration (Jest + jsdom):**
- Hooks tested via `renderHook` from `@testing-library/react`
- Components tested via `render` + `screen` queries
- Browser APIs missing from jsdom are stubbed per-test in `beforeEach`
- Scope: individual hooks, atoms, and the TerminalContact organism (full integration within its own tree)

**E2E (Playwright):**
- Full browser tests against a running Next.js dev server (`http://localhost:3000`)
- Tests locale detection, terminal open/close/command flow, page-level structure
- Runs on Desktop Chrome and Mobile Chrome (Galaxy S8)

## Libraries & Tools

**Unit:**
- `jest` 30 — test runner, via `next/jest` wrapper (`jest.config.ts`)
- `jest-environment-jsdom` 30 — DOM environment
- `@jest/globals` 30 — all globals (`describe`, `it`, `expect`, `jest`, `beforeEach`, etc.) imported explicitly; never rely on auto-injected globals
- `@testing-library/react` 16 — `render`, `screen`, `fireEvent`, `renderHook`, `act`
- `@testing-library/jest-dom` 6 — DOM matchers loaded via `jest.setup.ts`

**E2E:**
- `@playwright/test` 1.59 — `test`, `expect`, `page` fixture
- Browsers: Chromium (Desktop Chrome), Mobile Chrome (Galaxy S8)
- Config: `playwright.config.ts`

## Running Tests

```bash
npm run test:unit              # Run all Jest unit tests
npm run test:unit -- --testPathPattern=<filename>   # Run a single test file
npm run test:e2e               # Run all Playwright E2E tests (headless)
npm run test:e2e:ui            # Playwright interactive UI mode
```

No watch mode script is defined — run `npx jest --watch` manually if needed.
No coverage threshold is configured — run `npx jest --coverage` manually.

E2E tests require `TEST_ENV=true` and a running server; `playwright.config.ts` auto-starts `npm run dev` when not in CI.

## File Organization

**Unit tests — co-located with source:**
```
src/
  components/
    atoms/
      Icon/
        index.tsx
        index.test.tsx                  ← tests Icon component
  hooks/
    useDetectClickOutside.tsx
    useDetectClickOutside.test.tsx      ← tests the hook
  components/
    organisms/
      TerminalContact/
        src/
          hooks/
            useControlCommandLine.ts
            useControlCommandLine.test.ts
            useTerminalInput.ts
            useTerminalInput.test.ts
          views/
            TerminalContact.tsx
            TerminalContact.test.tsx
```

**E2E tests — separate directory:**
```
src/
  tests/
    home.spec.ts                        ← Playwright specs
```

Jest excludes `src/tests/` via `modulePathIgnorePatterns: ["<rootDir>/src/tests"]`.

**Naming conventions:**
- Unit: `<source-file>.test.tsx` (components) or `<source-file>.test.ts` (hooks/logic)
- E2E: `<feature>.spec.ts`

## Test Structure

**Unit test suite pattern:**
```typescript
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ComponentOrHookName", () => {
  describe("feature group", () => {
    it("does the specific thing", () => {
      // ...
    });
  });
});
```

**Hook test pattern using `renderHook` + `act`:**
```typescript
import { act, renderHook } from "@testing-library/react";

it("appends the typed command to history", () => {
  const { result } = renderHook(() => useControlCommandLine());

  act(() => {
    result.current.onSubmitCommand("/help");
  });

  expect(result.current.history).toEqual(["/help"]);
});
```

**E2E test pattern:**
```typescript
import { test, expect } from "@playwright/test";

test.describe("Group", () => {
  test.use({ locale: "en-US" });  // per-suite browser config

  test("description", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#my-title")).toHaveText("...");
  });
});
```

## Setup Files

**`jest.setup.ts`** (loaded via `setupFilesAfterEnv`):
- Imports `@testing-library/jest-dom/jest-globals` for DOM matchers
- Polyfills `TextEncoder` / `TextDecoder` and `whatwg-fetch`
- Stubs `SVGElement.prototype.getTotalLength` (not implemented in jsdom)
- Stubs `IntersectionObserver` (used by framer-motion's `useInView`)
- Manually calls `afterEach(cleanup)` — required because `--injectGlobals false` disables auto-cleanup

**`jest.config.ts` module name mapper:**
- `"^next-intl$"` → `"<rootDir>/__mocks__/next-intl.ts"` — mocks i18n to avoid runtime errors in unit tests
- `"@/(.*)"` → `"<rootDir>/src/$1"` — resolves the `@/` path alias

## Mocking

**All Jest imports are explicit — never rely on injected globals:**
```typescript
import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
```

**Stubbing missing jsdom APIs in `beforeEach`:**
```typescript
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = jest.fn<() => void>(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = jest.fn<() => void>(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
  Element.prototype.scrollIntoView = jest.fn<() => void>();
});
```

**`window.open` mock via `Object.defineProperty`:**
```typescript
Object.defineProperty(window, "open", { value: jest.fn(), writable: true });
```

**Spy pattern for listener cleanup assertions:**
```typescript
const removeSpy = jest.spyOn(document, "removeEventListener");
// ... unmount ...
expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
```

**What to mock:** browser APIs missing from jsdom (`showModal`, `close`, `scrollIntoView`, `IntersectionObserver`, `getTotalLength`), `window.open`, third-party modules with side effects (`next-intl`).

**What NOT to mock:** internal hooks and utilities — test them directly or via `renderHook` integration.

## Selectors Strategy

**Unit tests:** `screen.getByTestId(...)` and `screen.getAllByTestId(...)` — elements must carry `data-testid` attributes in production JSX.

**E2E tests:** `page.getByTestId(...)` for interactive elements; `page.locator("#id")` for landmark sections; `page.locator("html")` for lang attribute checks.

Do not use text-content selectors for structural assertions — prefer `data-testid`.

## What Is Tested

**Unit-tested:**
- `src/components/atoms/Icon/index.tsx` — renders, size variants, rounded prop, className passthrough, parametrized icon names
- `src/hooks/useDetectClickOutside.tsx` — click-outside callback fires, click-inside is a no-op, listener removed on unmount
- `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` — initial state, history management, all commands (`/help`, `whoami`, `/contact`, `echo`, `clear`, `/open`), typo suggestion, case-insensitivity
- `src/components/organisms/TerminalContact/src/hooks/useTerminalInput.ts` — input state, Enter/ArrowUp/ArrowDown key handling, history traversal
- `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx` — full component integration (trigger, dialog open/close, input, line rendering, drag handle)

**E2E-tested (`src/tests/home.spec.ts`):**
- Locale detection for en-US, pt-BR, and fallback (zh-CN → en) — HTML `lang` attribute and visible text
- Terminal open/close/command execution via `data-testid` selectors
- Page-level structure: title, `#presentation`, `#about-me`, `#header`, `#footer` visibility

**Not currently tested:**
- Molecules outside TerminalContact (no `.test.*` files found)
- Page components in `src/app/`
- i18n routing logic (`src/i18n/routing.ts`)
- Provider wrappers (`src/provider/`)

---

*Testing analysis: 2026-05-08*
