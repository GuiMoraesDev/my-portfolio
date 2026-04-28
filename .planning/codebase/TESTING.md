# Testing

**Analysis Date:** 2026-04-28

## Test Frameworks

| Framework | Purpose | Config file |
|-----------|---------|-------------|
| **Jest 30** | Unit tests | `jest.config.ts` |
| **Playwright 1.57** | E2E tests | `playwright.config.ts` |

## Running Tests

```bash
# All tests (unit + e2e in parallel)
npm test

# Unit tests only
npm run test:unit

# E2E tests only
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## Unit Tests (Jest)

**Config highlights (`jest.config.ts`):**
- Built on `next/jest` — handles Next.js transforms automatically
- `moduleNameMapper`: `@/*` → `<rootDir>/src/*` (mirrors tsconfig alias)
- `modulePathIgnorePatterns`: excludes `src/tests/` (Playwright tests)
- `clearMocks: true` — mocks reset between tests
- `setupFilesAfterEnv`: `jest.setup.ts`
- `extensionsToTreatAsEsm: ['.ts']`
- Coverage provider: `v8`

**Test file location:** co-located with the module they test
- Pattern: `src/**/*.spec.ts`
- Example: `src/schemas/generateMessage/test.spec.ts`

**What's tested:**
- Zod schemas (input validation)
- Pure utility functions

**Coverage level:** Very low — only 1 known unit test file covering the Zod schema.

## E2E Tests (Playwright)

**Config highlights (`playwright.config.ts`):**
- Test directory: `src/tests/`
- Fully parallel execution
- Retries: 2 on CI, 0 locally
- Workers: 1 on CI, unlimited locally
- Reporter: HTML
- Base URL: `http://localhost:3000`
- Trace: `on-first-retry`

**Browsers tested:**
- Desktop Chrome (chromium)
- Mobile Chrome (Galaxy S8)

**Test file location:** `src/tests/`
- Pattern: `src/tests/*.spec.ts`
- Current file: `src/tests/home.spec.ts`

**What's tested:**
- Locale detection and routing
- Page section visibility
- Form interactions (NOTE: contact form tests are stale — form was removed)

**Known issue:** `playwright.config.ts` `webServer.command` references `pnpm dev:app` which no longer exists after npm migration. Needs updating to `npm run dev`.

## CI Integration

Tests run in GitHub Actions (`.github/workflows/ci.yaml`) on PRs to `homolog` and `main`:

| Job | Command | Notes |
|-----|---------|-------|
| `Type-And-Lint` | `tsc --noEmit` + `eslint .` | Also runs via pre-commit hook |
| `Unit-test` | `npm run test:unit` | Jest |
| `E2E-test` | `npm run test:e2e` | Playwright; uploads HTML report as artifact |

**Known CI issues:**
- CI workflow uses `npm run/action-setup` (incorrect action name — should be `pnpm/action-setup` or removed entirely since migrating to npm)
- E2E tests will fail due to stale contact form assertions

## Test Coverage Summary

| Type | Files | Coverage |
|------|-------|----------|
| Unit (Jest) | 1 file | Schema validation only — very low |
| E2E (Playwright) | 1 file | Home page smoke test — partially stale |
| Integration | None | Not present |

## Gaps

- No unit tests for service layer (`src/services/api/`)
- No unit tests for custom hooks (`src/hooks/`)
- No unit tests for utility functions (`src/util/`)
- E2E coverage limited to a single page
- No visual regression tests
- No accessibility automated tests

---

*Testing analysis: 2026-04-28*
