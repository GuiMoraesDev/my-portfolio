# Codebase Concerns

_Last updated: 2026-04-30_

---

## Performance Concerns

- [HIGH] `QueryClient` recreated on every render — should be lifted outside component or use `useState`
- [HIGH] `getMessages()` missing `await` — silent failure in i18n message loading
- [MEDIUM] Dead dev.to API route still in codebase — fetches external API that is no longer used
- [MEDIUM] 5 always-on CSS animations running regardless of viewport visibility — consider `IntersectionObserver` triggers
- [MEDIUM] Blog post HTML strings bloating the JS bundle — raw HTML stored inline rather than fetched on demand

---

## Security Concerns

- [HIGH] `dangerouslySetInnerHTML` used with no sanitization — blog post HTML content rendered directly; XSS risk if content source is ever untrusted
- [MEDIUM] Raw error object leaked from API route — `catch (e) { return Response.json({ error: e })` exposes stack traces
- [LOW] API proxy route has no rate limiting — unprotected endpoint could be abused
- [LOW] Email address hardcoded in client component — exposed in bundle; consider obfuscation or server-side rendering

---

## Code Quality Concerns

- [MEDIUM] `ArticlesSkeleton` component defined but disconnected — not used anywhere in the current render tree
- [MEDIUM] Duplicate social media URLs — defined in multiple places; should be a single source of truth
- [MEDIUM] `children` rendered twice in `MenuWrapper` — likely a copy-paste bug causing double rendering
- [LOW] Module-level mutable `lineId` counter — shared mutable state at module scope risks incorrect IDs across renders
- [LOW] Wrong `aria-label` on `LanguageSwitcher` — accessibility label does not match the control's actual function

---

## Architecture Concerns

- [MEDIUM] Blog content layer has no abstraction — raw file reads and HTML parsing scattered across route handlers
- [MEDIUM] `src/posts/` directory appears unused — posts data may have moved elsewhere, leaving dead directory
- [LOW] `SessionWrapper` not extracted as a named component — anonymous wrapper makes debugging and testing harder
- [LOW] `TerminalContact` mounted globally in root layout — loaded on every page even when not visible

---

## Maintainability Concerns

- [MEDIUM] 3 unused Radix UI packages in `package.json` — increases install time and audit surface with no benefit
- [LOW] Lodash imported for a single `pick` call — heavy dependency for trivial operation; replace with native destructuring
- [LOW] Copyright year hardcoded as `2024` — will become stale; use `new Date().getFullYear()`
- [LOW] SEO keywords appear stale — meta keywords don't reflect current portfolio focus areas
- [LOW] `metadataBase` set as a string, not a `URL` object — Next.js expects `new URL(...)` for correct OG/sitemap resolution

---

## Test Coverage Gaps

- [HIGH] E2E test uses `#header` selector that doesn't exist in the DOM — test is silently passing a broken assertion
- [MEDIUM] Page title mismatch: E2E expects `"Frontend"` but rendered title says `"Software engineer"` — stale assertion
- [MEDIUM] Blog pages (list + detail) have zero test coverage — new feature with no tests
- [LOW] `TerminalContact` component has no test coverage — complex interactive component untested

---

## Opportunities

- **MDX pipeline**: Replace raw HTML string blog posts with MDX for syntax highlighting, component embedding, and type safety
- **Delete dead API layer**: Remove the unused dev.to API route and any related fetcher code to reduce confusion
- **Fix 2 failing E2E tests**: `#header` selector and title mismatch are likely causing silent CI failures — fix assertions
- **Extract `SessionWrapper`**: Named component improves React DevTools clarity and enables isolated testing
- **Remove 3 unused Radix packages**: Audit and remove `@radix-ui/*` entries not referenced anywhere in the codebase
