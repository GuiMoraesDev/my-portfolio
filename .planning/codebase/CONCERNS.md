# Concerns & Technical Debt
> Last updated: 2026-05-07

## Critical

*(None — no security vulnerabilities, data leaks, or broken runtime features detected.)*

---

## High

### `isOpen` state desyncs when dialog is closed via Escape key
- Issue: `TerminalContact.tsx` calls `dialogRef.current?.showModal()` / `.close()` imperatively and keeps a separate `isOpen` React state in sync manually. The browser fires a native `close` event when the user presses Escape, but no handler listens for it — leaving `isOpen` stuck at `true` while the dialog is visually closed. The mascot consequently freezes in its "open" state.
- Files: `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`
- Impact: Mascot animation loop does not resume; reopening the terminal requires a second click.
- Fix approach: Add a `useEffect` that attaches a `close` event listener on the dialog element and calls `setIsOpen(false)`.

### Sentry DSN hardcoded in source
- Issue: The Sentry DSN is a string literal in `src/instrumentation-client.ts` (line 9) rather than sourced from an env var. The DSN itself is not a secret, but hardcoding it prevents per-environment configuration.
- Files: `src/instrumentation-client.ts`
- Impact: Local dev builds always report to the production Sentry project.
- Fix approach: Move DSN to `NEXT_PUBLIC_SENTRY_DSN` env var; reference `process.env.NEXT_PUBLIC_SENTRY_DSN`.

### `tracesSampleRate: 1` — 100% performance tracing in production
- Issue: `src/instrumentation-client.ts` sets `tracesSampleRate: 1`. The inline comment explicitly acknowledges this should be lowered for production.
- Files: `src/instrumentation-client.ts` (line 15)
- Impact: Unnecessarily high Sentry quota consumption at any real traffic level.
- Fix approach: Lower to `0.1` for production; gate on `process.env.NODE_ENV`.

### `framer-motion` imported but only `motion` declared as dependency
- Issue: `Mascot.tsx`, `TerminalWindow.tsx`, and `TerminalContact.tsx` import from `"framer-motion"`, but `package.json` lists `"motion": "^12.38.0"` — not `framer-motion`. This currently works because `motion` v12 ships `framer-motion` as an alias, but it is undeclared and fragile.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx`, `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`, `package.json`
- Impact: A `motion` version bump that removes the alias would silently break all animations.
- Fix approach: Either add `framer-motion` as an explicit dependency, or migrate all three import sites to `"motion"`.

### Nested `<footer>` inside `<footer>` — invalid HTML
- Issue: `src/app/[locale]/layout.tsx` (lines 94–131) has a `<footer id="footer">` whose direct child is another `<footer>` element.
- Files: `src/app/[locale]/layout.tsx`
- Impact: Invalid HTML per spec; screen reader and accessibility tree anomalies; potential SEO penalty.
- Fix approach: Replace the inner `<footer>` with `<div>` or `<section>`.

---

## Medium

### `QueryClient` instantiated at module level — shared across all server renders
- Issue: `src/provider/src/QueryProvider.tsx` creates `const queryClient = new QueryClient()` at module level (a singleton). In a Next.js app with SSR this causes the same QueryClient instance to be shared across all concurrent requests on the server, leaking user-specific cache between requests.
- Files: `src/provider/src/QueryProvider.tsx`
- Impact: Low risk today because no `useQuery` calls exist, but becomes a data-leak bug the moment any query is added.
- Fix approach: Move instantiation inside the component: `const [queryClient] = useState(() => new QueryClient())`.

### `@tanstack/react-query` installed but never used
- Issue: `QueryProvider` wraps the entire app but no source file outside the provider itself imports from `@tanstack/react-query`. There are no `useQuery`, `useMutation`, or `queryClient` usages anywhere.
- Files: `package.json`, `src/provider/src/QueryProvider.tsx`
- Impact: Dead dependency adds bundle weight (~50 KB) and the module-level singleton concern above.
- Fix approach: Remove `@tanstack/react-query` and `QueryProvider` until real data-fetching requirements arise.

### `lodash` listed as dependency but never imported
- Issue: `lodash` and `@types/lodash` appear in `package.json` but no source file imports them.
- Files: `package.json`
- Impact: ~70 KB minified added to production bundle for no reason.
- Fix approach: Remove `lodash` and `@types/lodash` from `package.json`.

### Unused Radix UI component packages
- Issue: `@radix-ui/react-label`, `@radix-ui/react-switch`, `@radix-ui/react-toast`, and `@radix-ui/react-tooltip` are listed as dependencies. Only `@radix-ui/react-icons` is actually imported anywhere in source.
- Files: `package.json`
- Impact: Extra bundle weight; unnecessary transitive dependencies.
- Fix approach: Remove unused Radix packages after confirming no planned immediate use.

### Stale SEO keywords referencing an unrelated product
- Issue: `metadata.keywords` in `src/app/[locale]/layout.tsx` (line 17) includes `"confer-all"` and `"Confer All"` — references to a different project copied from an earlier template.
- Files: `src/app/[locale]/layout.tsx`
- Impact: Incorrect SEO signals sent to search engines.
- Fix approach: Replace with portfolio-relevant keywords (e.g., `"portfolio"`, `"frontend engineer"`, `"TypeScript"`, `"React"`).

### Hardcoded copyright year
- Issue: Footer contains the static string `© 2024 Guilherme Moraes` in `src/app/[locale]/layout.tsx` (line 125).
- Files: `src/app/[locale]/layout.tsx`
- Impact: Becomes visibly wrong every year.
- Fix approach: Replace with `© {new Date().getFullYear()} Guilherme Moraes`.

### No `.env.example` file
- Issue: `CLAUDE.md` instructs developers to copy `.env.example` to `.env.local`, but no `.env.example` exists. Only `.env.sentry-build-plugin` is present and is not a template.
- Files: (missing) `.env.example`
- Impact: New contributors have no reference for required environment variables.
- Fix approach: Create `.env.example` listing all required vars with placeholder values.

### Terminal line list uses array index as React `key`
- Issue: `TerminalWindow.tsx` renders `lines.map((line, index) => <li key={index} ...>)`.
- Files: `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx` (line 73)
- Impact: Low risk today because lines are only appended; becomes a reconciliation bug if individual lines are ever removed or reordered (e.g., animated removal).
- Fix approach: Assign a stable `id` to each `TerminalLine` at creation time (incrementing counter or `crypto.randomUUID()`).

### Mascot component runs animations without `prefers-reduced-motion` guard
- Issue: `Mascot.tsx` has always-on Framer Motion loops (leg walking, eye blinking) and a recursive `setTimeout` message chain. No check against `useReducedMotion()` is present.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`
- Impact: Violates accessibility best practice for users with vestibular/motion sensitivity.
- Fix approach: Wrap `animate` props in a conditional using Framer Motion's `useReducedMotion()` hook.

### Duplicate mascot SVG — no shared abstraction
- Issue: The full mascot (300×300, `Mascot.tsx`) and a pixel version (40×52, `MascotPixel` in `TerminalWindow.tsx`) represent the same character but are completely separate, unshared SVG definitions.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx`
- Impact: Visual drift if the mascot design changes — only one copy gets updated.
- Fix approach: Move `MascotPixel` to a shared export in `Mascot.tsx` or a dedicated `src/components/atoms/Mascot/` directory.

---

## Low / Nice-to-have

### `proxy.ts` is a non-conventional name for Next.js middleware
- Issue: The i18n middleware lives at `src/proxy.ts` instead of the conventional `src/middleware.ts`.
- Files: `src/proxy.ts`
- Impact: Developer discoverability — the file is easy to miss when diagnosing routing issues.
- Fix approach: Rename to `src/middleware.ts` (Next.js resolves it by name convention).

### `window.open` called inside a logic hook
- Issue: `runCommand` in `useControlCommandLine.ts` calls `window.open(URL, "_blank", "noopener,noreferrer")` directly (lines 120–123). This couples a pure command-dispatch function to the browser environment.
- Files: `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Current mitigation: URLs are typed constants — no injection risk. `noopener,noreferrer` is correctly set.
- Fix approach: Accept an `onOpenUrl: (url: string) => void` callback so the hook is testable without browser globals.

### Terminal command set is a monolithic switch statement
- Issue: Adding any new command requires editing `useControlCommandLine.ts` directly. There is no registry or plugin pattern.
- Files: `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Current capacity: 8 named commands.
- Scaling path: Introduce a `commands/` map keyed by command name, each entry exporting `{ name, description, run }`. The hook becomes a pure dispatcher.

### Wave component is an 84-line file of hardcoded SVG paths
- Issue: `Wave.tsx` contains ~50 static `<path>` elements inlined as JSX. It is effectively a static asset rendered as code.
- Files: `src/components/molecules/Wave/Wave.tsx`
- Impact: No functional bug; adds avoidable DOM nodes and JS parse overhead.
- Fix approach: Export as a `.svg` file and reference it via `next/image` or a `public/` asset if no React-driven animation is needed.

---

## Test Coverage Gaps

### No unit tests for any molecule-level component
- What's not tested: `BentoCell` compound composition, `LanguageSwitcher` locale switching, `MenuWrapper` mobile menu open/close, `SocialMedia` link rendering, `Wave` rendering.
- Files: `src/components/molecules/BentoCell/`, `src/components/molecules/LanguageSwitcher/`, `src/components/molecules/MenuWrapper/`, `src/components/molecules/SocialMedia/`, `src/components/molecules/Wave/`
- Risk: Regressions only caught by E2E or manual review.
- Priority: Medium for `LanguageSwitcher` and `MenuWrapper` (interaction logic); Low for presentational ones.

### No unit tests for `Mascot` component
- What's not tested: Timer lifecycle, message sequencing, hover state transitions, Escape-key desync bug.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`
- Risk: Timer and animation bugs are invisible to CI.
- Priority: Medium.

### E2E suite covers Chromium and mobile Chrome only
- What's not tested: Safari / WebKit (most iOS browsers) and Firefox.
- Files: `playwright.config.ts`
- Risk: `<dialog>` native behaviour and CSS animation differences in WebKit ship silently.
- Priority: Medium.

### Stale E2E assertion — welcome message mismatch
- Issue: `src/tests/home.spec.ts` checks for `"Welcome. Type 'help' for available commands."` (no slash), but `useControlCommandLine.ts` outputs `"Welcome. Type '/help' for available commands."` (with slash prefix).
- Files: `src/tests/home.spec.ts`, `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Impact: The E2E terminal test will fail when run against the live app.
- Fix approach: Update the expected string in `home.spec.ts` to match `'/help'`.

---

*Concerns audit: 2026-05-07*
