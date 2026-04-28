# Codebase Concerns

**Analysis Date:** 2026-04-28

## High Severity

### 1. NEXT_PUBLIC_* prefix on API keys in `.env.example`
- **Issue:** `NEXT_PUBLIC_*` prefixed env vars are embedded into the browser bundle — any key using this prefix is publicly exposed
- **File:** `.env.example`
- **Action:** Remove `NEXT_PUBLIC_` prefix from any secrets; only use it for intentionally public values

### 2. Articles API route leaks raw error objects
- **Issue:** Route returns raw `error` object in the response, potentially leaking stack traces or internal details
- **File:** `src/app/api/articles/list/route.ts`
- **Action:** Return generic error messages; log details server-side only

### 3. Middleware named `src/proxy.ts` instead of `src/middleware.ts`
- **Issue:** Next.js only loads middleware from `src/middleware.ts` (or `middleware.ts`). Current `proxy.ts` name means Next.js ignores it — locale detection cookie (`domain-origin`) is never set, and locale-based API calls will break
- **File:** `src/proxy.ts`
- **Action:** Rename to `src/middleware.ts` or ensure Next.js config points to the correct path

### 4. CI pipeline broken after npm migration
- **Issue:** `.github/workflows/ci.yaml` still uses pnpm actions/commands after the project migrated to npm
- **File:** `.github/workflows/ci.yaml`
- **Action:** Update workflow to use `npm ci` / `npm run` commands

### 5. E2E tests assert removed contact form
- **Issue:** `home.spec.ts` still asserts `#contact` is visible and fills form fields that were removed — E2E suite fails
- **File:** `src/tests/home.spec.ts`
- **Action:** Remove or update contact form assertions

---

## Medium Severity

### 6. Missing `rel="noopener noreferrer"` on external links
- **Issue:** Testimonials LinkedIn links open in new tab without security attributes
- **Action:** Add `rel="noopener noreferrer"` to all `target="_blank"` links

### 7. Sentry example page/API live in production
- **Issue:** `src/app/sentry-example-page/` and `src/app/api/sentry-example-api/` are demo routes exposed in production
- **Action:** Remove or gate behind an env check

### 8. Playwright config references non-existent npm script
- **Issue:** `playwright.config.ts` references `pnpm dev:app` which doesn't exist after migration
- **File:** `playwright.config.ts`
- **Action:** Update to correct `npm run dev` command

### 9. Nav `#projects` link has no target section
- **Issue:** Projects navigation item links to `#projects` but no section with that ID exists on the page
- **Action:** Add section ID or remove the nav link

### 10. Orphaned dependencies after contact form removal
- **Issue:** Several packages remain in `package.json` that were only used by the contact form: `openai`, `resend`, `tiptap` editor, `react-hook-form`, and related packages
- **Action:** Audit and remove unused dependencies

### 11. Profile image `sizes="100%"` causes oversized downloads
- **Issue:** `sizes="100%"` tells the browser to download the full-viewport-width image regardless of rendered size
- **Action:** Use accurate responsive sizes (e.g., `sizes="(max-width: 768px) 100vw, 300px"`)

### 12. SVG icons shipped as oversized inline JS
- **Issue:** Three SVG icon files are 1,300–4,300 lines of inline `<rect>` elements bundled as JavaScript
- **Action:** Convert to static SVG files or use sprite sheets

### 13. Invalid `aria-description` attribute
- **Issue:** `aria-description` is not a valid ARIA attribute — screen readers ignore it
- **Action:** Replace with `aria-label` or `aria-describedby`

### 14. Hamburger and flag buttons missing `aria-label`
- **Issue:** Interactive buttons have no accessible name for screen readers
- **Action:** Add descriptive `aria-label` attributes

---

## Low Severity

### 15. Draft locale files committed
- **Issue:** `en_new.json` and `pt_new.json` are uncommitted draft files left in the repo
- **File:** `src/i18n/locales/`
- **Action:** Delete or merge into canonical locale files

### 16. Copyright year hardcoded as 2024
- **Issue:** Footer shows `© 2024` — will be stale each year
- **Action:** Use `new Date().getFullYear()` dynamically

### 17. Font classNames applied incorrectly to `<body>`
- **Issue:** Both font `className` values applied to `<body>` simultaneously instead of using CSS variable mode
- **Action:** Use `variable` option and apply via CSS custom properties

### 18. Decorative elements missing `aria-hidden`
- **Issue:** `<Spheres>` and other decorative spans not hidden from accessibility tree
- **Action:** Add `aria-hidden="true"` to decorative elements

### 19. No skip-navigation link
- **Issue:** Keyboard users must tab through the entire header on every page load
- **Action:** Add a visually-hidden skip-to-main-content link

### 20. ESLint config version mismatch
- **Issue:** `eslint-config-next` version does not match the installed `next` version
- **Action:** Align versions in `package.json`

---

## Summary

| Severity | Count |
|----------|-------|
| High     | 5     |
| Medium   | 9     |
| Low      | 6     |
| **Total**| **20**|

Most critical items are the broken CI pipeline (#4), failing E2E tests (#5), and the middleware naming issue (#3) which could cause production routing failures.

---

*Concerns analysis: 2026-04-28*
