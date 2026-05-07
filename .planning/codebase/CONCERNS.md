# Codebase Concerns

**Analysis Date:** 2026-05-07

## Tech Debt

**QueryClient instantiated on every render:**
- Issue: `QueryProvider` creates a `new QueryClient()` directly inside the function body, not inside a `useState` or `useRef`. This causes a fresh QueryClient — and an empty cache — to be created on every re-render of the provider.
- Files: `src/provider/src/QueryProvider.tsx`
- Impact: Any React Query data is lost on re-render; the client is also never shared correctly with devtools.
- Fix approach: Wrap instantiation in `useState(() => new QueryClient())` or `useRef`.

**Nested `<footer>` inside `<footer>`:**
- Issue: `src/app/[locale]/layout.tsx` (line 94–131) wraps a `<footer id="footer">` element that itself contains another `<footer>` element as its direct child. This is invalid HTML.
- Files: `src/app/[locale]/layout.tsx`
- Impact: Screen readers and accessibility tree parse errors; potential SEO penalty.
- Fix approach: Replace the inner `<footer>` with a `<div>` or `<section>`.

**Duplicate mascot SVG definition:**
- Issue: The full mascot SVG (300×300, ~250 lines of paths) lives in `Mascot.tsx`, and a pixel-art version (40×52) duplicates the same shape logic inline inside `TerminalWindow.tsx` as a local `MascotPixel` component. There is no shared abstraction.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx`
- Impact: Visual drift if the mascot design changes — only one copy gets updated.
- Fix approach: Export `MascotPixel` from `Mascot.tsx` or a shared `src/components/atoms/Mascot/` atom.

**`src/posts/` directory is inert:**
- Issue: `src/posts/draft/` contains one `.md` draft article and `src/posts/templates/` has five template files. None are consumed by any code. There is no blog rendering infrastructure.
- Files: `src/posts/draft/How I debugged a working solution.md`, `src/posts/templates/`
- Impact: The directory signals planned work that is not implemented; new developers will not know its purpose.
- Fix approach: Either implement a blog listing page or move the content out of `src/` (e.g., into a `content/` directory) to avoid confusion.

**Stale copyright year in footer:**
- Issue: `src/app/[locale]/layout.tsx` (line 123) hard-codes `© 2024 Guilherme Moraes`.
- Files: `src/app/[locale]/layout.tsx`
- Fix approach: Replace with `new Date().getFullYear()` or update to the current year.

**`lodash` imported as full bundle:**
- Issue: `lodash` is listed as a production dependency but no named subpath imports (`lodash/get`, etc.) were found. Full `lodash` adds ~70 KB minified.
- Files: `package.json`
- Impact: Unnecessary bundle weight for a small portfolio site.
- Fix approach: Audit actual usage and switch to `lodash-es` subpath imports or replace with native equivalents.

## Known Bugs

**E2E test asserts stale welcome message text:**
- Symptoms: `src/tests/home.spec.ts` (line 92) checks for `"Welcome. Type 'help' for available commands."` (without slash before `help`), but the actual welcome line in `useControlCommandLine.ts` (line 35) reads `"Welcome. Type '/help' for available commands."`.
- Files: `src/tests/home.spec.ts`, `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Impact: The E2E test will always fail when run against the live app.
- Fix approach: Update the expected string in `home.spec.ts` to `'/help'`.

## Security Considerations

**`window.open` called from a hook:**
- Risk: `useControlCommandLine.ts` calls `window.open(URL, "_blank", "noopener,noreferrer")` directly. URLs are hard-coded constants, so injection is not currently possible, but the pattern is fragile if URLs are ever made dynamic.
- Files: `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Current mitigation: `noopener,noreferrer` is correctly set. URLs are string literals.
- Recommendations: Keep URLs as typed constants; never interpolate user input into `window.open` calls.

**SEO metadata keywords reference an unrelated product:**
- Risk: `src/app/[locale]/layout.tsx` (line 17) includes `"confer-all"` and `"Confer All"` in the keywords array — these appear to be from a different project.
- Files: `src/app/[locale]/layout.tsx`
- Fix approach: Remove or replace with relevant portfolio keywords.

## Performance Bottlenecks

**Mascot component runs multiple concurrent `setInterval`-equivalent timers:**
- Problem: `Mascot.tsx` runs a recursive `setTimeout` chain (showNextMessage) that is reset and restarted every time `isInView`, `isHovered`, or `isOpen` changes. Combined with three simultaneous Framer Motion `animate` loops (leg animations, eye blinking), this creates constant background work even when the mascot is partially off-screen.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`
- Cause: No `reduce-motion` media query check; `useInView` only stops the message loop, not the CSS animation loops.
- Improvement path: Wrap `animate` props in a check against `useReducedMotion()` from Framer Motion. Pause leg/eye animations when `isOpen` is true.

**Wave component contains 84 static SVG path elements:**
- Problem: `Wave.tsx` renders dozens of nearly-identical `<path>` elements hard-coded as JSX. No Framer Motion or CSS animation, but it still adds significant DOM nodes on every page load.
- Files: `src/components/molecules/Wave/Wave.tsx`
- Cause: Path generation was done manually and inlined.
- Improvement path: Low priority for a portfolio, but could be replaced with a single animatable `<path>` and CSS gradient if bundle size becomes a concern.

## Fragile Areas

**`TerminalContact` uses `<dialog>` with manual open/close via ref:**
- Files: `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`
- Why fragile: `dialogRef.current?.showModal()` and `dialogRef.current?.close()` are called imperatively. `isOpen` React state is a separate boolean that must be kept in sync manually. If the dialog is closed by pressing Escape (native browser behaviour), `isOpen` state is never updated — leaving the mascot in a "closed" visual state while `isOpen` remains `true`.
- Safe modification: Listen to the `close` event on the dialog element and call `setIsOpen(false)` inside a `useEffect`.
- Test coverage: The unit tests mock `showModal`/`close` so they do not catch this Escape-key desync.

**Levenshtein matrix allocated on every suggestion lookup:**
- Files: `src/components/organisms/TerminalContact/src/utils/suggestion.ts`
- Why fragile: `levenshtein` allocates a full `rows × cols` 2D array on every call with no memoisation. Acceptable for the current tiny command set (6 commands), but would degrade with larger command lists.
- Safe modification: No change needed at current scale; note before expanding the command set.

## Test Coverage Gaps

**No unit tests for `LanguageSwitcher`:**
- What's not tested: locale switching logic, active locale highlighting, keyboard interaction.
- Files: `src/components/molecules/LanguageSwitcher/LanguageSwitcher.tsx`
- Risk: Regression when i18n routing changes.
- Priority: Medium

**No unit tests for `BentoCell`, `SocialMedia`, or `MenuWrapper`:**
- What's not tested: Compound component composition (BentoCell), external link rendering (SocialMedia), mobile menu open/close (MenuWrapper).
- Files: `src/components/molecules/BentoCell/BentoCell.tsx`, `src/components/molecules/SocialMedia/SocialMedia.tsx`, `src/components/molecules/MenuWrapper/MenuWrapper.tsx`
- Risk: Regressions go undetected; currently only caught if an E2E test happens to render them.
- Priority: Low (presentational components) to Medium (MenuWrapper has interaction logic).

**No tests for `Mascot` component:**
- What's not tested: Timer lifecycle, message sequencing, hover state transitions.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`
- Risk: Timer bugs (like the Escape-key desync described above) are invisible.
- Priority: Medium

**E2E tests run on Chromium and mobile Chrome only:**
- What's not tested: Safari / WebKit (relevant for iOS users), Firefox.
- Files: `playwright.config.ts`
- Risk: WebKit-specific `<dialog>` or CSS animation bugs ship silently.
- Priority: Medium

## Scaling Limits

**Terminal command set is a monolithic switch statement:**
- Current capacity: 8 named commands in `useControlCommandLine.ts`.
- Limit: Adding more commands requires editing the hook directly. No plugin or registry pattern exists.
- Scaling path: Introduce a `commands/` map keyed by command name, each entry exporting `{ name, description, run }`. The hook becomes a dispatcher.

---

*Concerns audit: 2026-05-07*
