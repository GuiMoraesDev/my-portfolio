# Technical Concerns

**Analysis Date:** 2026-05-08

---

## Technical Debt

**Sentry DSN hardcoded in source:**
- Issue: The Sentry DSN is a string literal in `src/instrumentation-client.ts` (line 9) rather than sourced from an env var. The DSN is not itself secret, but hardcoding it prevents per-environment configuration and forces every fork/clone to use the production Sentry project.
- Files: `src/instrumentation-client.ts`
- Impact: Local dev builds always report to the production Sentry project. No per-env isolation possible without a code change.
- Fix approach: Move to `NEXT_PUBLIC_SENTRY_DSN` env var and reference `process.env.NEXT_PUBLIC_SENTRY_DSN`.

**`proxy.ts` — non-conventional name for Next.js middleware:**
- Issue: The i18n middleware lives at `src/proxy.ts` instead of the standard `src/middleware.ts`. Next.js resolves middleware by filename convention.
- Files: `src/proxy.ts`
- Impact: Easy to miss during routing debug; no functional defect today but violates framework expectations.
- Fix approach: Rename to `src/middleware.ts`.

**Terminal command set is a monolithic switch statement:**
- Issue: `runCommand` in `useControlCommandLine.ts` is a hard-coded switch. Adding any new command requires editing this file directly.
- Files: `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Current capacity: 8 named commands before the switch becomes unwieldy.
- Scaling path: Replace with a `Record<string, CommandHandler>` map keyed by command name. Each entry exports `{ name, description, run }`.

**Duplicate mascot SVG — no shared abstraction:**
- Issue: The full mascot (300×300, `Mascot.tsx`) and a pixel version (`MascotPixel` in `TerminalWindow.tsx`) are completely separate, unshared SVG definitions of the same character.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx`
- Impact: Visual drift if the mascot design changes — only one copy gets updated.
- Fix approach: Move `MascotPixel` to a shared export in `Mascot.tsx` or a dedicated `src/components/atoms/Mascot/` directory.

**Wave component is 84 lines of hardcoded SVG paths:**
- Issue: `Wave.tsx` contains ~50 static `<path>` elements inlined as JSX with no React-driven animation. It is effectively a static asset rendered as code.
- Files: `src/components/molecules/Wave/Wave.tsx`
- Impact: Adds avoidable DOM nodes and JS parse overhead for every page load.
- Fix approach: Export as a `.svg` file and reference via `next/image` or a `public/` asset.

---

## Performance Concerns

**Wave SVG uses an undefined filter reference (`#tealGlow`):**
- Issue: `Wave.tsx` line 76 applies `filter="url(#tealGlow)"` but no `<filter id="tealGlow">` is defined anywhere in the SVG. Only `#glow` is defined.
- Files: `src/components/molecules/Wave/Wave.tsx`
- Impact: The browser silently ignores the unknown filter. The teal-glow circles render without the intended visual effect. No perf cost but indicates stale/broken SVG.
- Fix approach: Either define the `tealGlow` filter or remove the `filter` attribute from the three `<circle>` elements.

**`MascotPixel` animations lack `prefers-reduced-motion` guard:**
- Issue: The pixel mascot inside `TerminalWindow.tsx` runs three `motion.rect` eye-blinking animations unconditionally. Unlike the main `Mascot.tsx` (which reads `useReducedMotion()`), `MascotPixel` has no motion guard.
- Files: `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx` (lines 148–189)
- Impact: Violates accessibility best practice for users with vestibular/motion sensitivity. The terminal header animates even when the user has opted out of motion.
- Fix approach: Pass `reducedMotion` prop down to `MascotPixel`, or call `useReducedMotion()` inside it and gate `animate` props.

---

## Security Gaps

**`window.open` called inside a logic hook (not a component):**
- Issue: `runCommand` in `useControlCommandLine.ts` calls `window.open(GITHUB_URL, "_blank", "noopener,noreferrer")` directly. URLs are typed constants, and `noopener,noreferrer` is set correctly, so there is no injection risk. The concern is testability and separation of concerns.
- Files: `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` (lines 120–123)
- Current mitigation: URLs are constants; `noopener,noreferrer` is set.
- Fix approach: Accept an `onOpenUrl: (url: string) => void` callback so the hook is testable without browser globals.

---

## Known Bugs

**Stale E2E assertion — welcome message mismatch:**
- Symptoms: `home.spec.ts` asserts `"Welcome. Type 'help' for available commands."` (no slash), but the actual output from `useControlCommandLine.ts` is `"Welcome. Type '/help' for available commands."` (with slash prefix).
- Files: `src/tests/home.spec.ts` (line ~90), `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` (line 35)
- Impact: The E2E terminal welcome-message test fails against the live application.
- Fix approach: Update `home.spec.ts` expected string to `"Welcome. Type '/help' for available commands."`.

**`aria-controls="mobile-nav-links"` references a non-existent ID:**
- Symptoms: `MenuWrapper.tsx` sets `aria-controls="mobile-nav-links"` on the hamburger button, but the controlled `<section>` has no matching `id` attribute.
- Files: `src/components/molecules/MenuWrapper/MenuWrapper.tsx` (line 35)
- Impact: Screen readers cannot programmatically associate the toggle button with the panel it controls. Broken ARIA contract.
- Fix approach: Add `id="mobile-nav-links"` to the `<section>` in `MenuWrapper.tsx`.

**`aria-label` in `LanguageSwitcher` is always "Switch language to Portuguese" regardless of current locale:**
- Symptoms: When the current locale is `pt`, the button should be labelled "Switch language to English", but the hardcoded string is always in English direction.
- Files: `src/components/molecules/LanguageSwitcher/LanguageSwitcher.tsx` (line 35)
- Impact: Screen reader users receive an inaccurate label when browsing the Portuguese version.
- Fix approach: Derive the label from the current locale: `locale === "en" ? "Switch to Portuguese" : "Switch to English"`.

**Terminal line list uses array index as React `key`:**
- Symptoms: `TerminalWindow.tsx` renders `lines.map((line, index) => <li key={index} ...>)`.
- Files: `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx` (line 73)
- Impact: Low risk for pure-append usage, but becomes a reconciliation bug if lines are ever removed or reordered (e.g., animated removal via `clear` command and re-addition).
- Fix approach: Assign a stable `id` to each `TerminalLine` at creation time (e.g., incrementing counter or `crypto.randomUUID()`).

---

## Missing Coverage

**No unit tests for any molecule-level component:**
- What's not tested: `BentoCell` compound composition, `LanguageSwitcher` locale switching logic, `MenuWrapper` open/close and click-outside behaviour, `SocialMedia` link rendering, `Wave` rendering.
- Files: `src/components/molecules/BentoCell/`, `src/components/molecules/LanguageSwitcher/`, `src/components/molecules/MenuWrapper/`, `src/components/molecules/SocialMedia/`, `src/components/molecules/Wave/`
- Risk: Regressions caught only by E2E or manual review.
- Priority: High for `LanguageSwitcher` and `MenuWrapper` (they contain interaction logic). Low for purely presentational ones.

**No unit tests for `Mascot` component:**
- What's not tested: Timer lifecycle, message sequencing, hover state transitions, reduced-motion path.
- Files: `src/components/organisms/TerminalContact/src/components/Mascot.tsx`
- Risk: Timer and animation bugs are invisible to CI.
- Priority: Medium.

**E2E suite covers Chromium and mobile Chrome only:**
- What's not tested: Safari / WebKit (all iOS browsers) and Firefox.
- Files: `playwright.config.ts`
- Risk: `<dialog>` native behaviour, CSS animation differences, and scroll behaviour in WebKit can ship undetected.
- Priority: Medium — add `webkit` and `firefox` projects to `playwright.config.ts`.

**No test for `page.tsx` home page rendering:**
- What's not tested: The main page component renders `SessionWrapper`, `BentoCell` grid, `SocialMedia`, and `TerminalContact` together. No unit test exercises this composition.
- Files: `src/app/[locale]/page.tsx`
- Risk: Layout regressions not caught by unit layer; reliant solely on E2E.
- Priority: Low — E2E covers the basic visible-section assertions.

---

## Areas Needing Attention

**Hardcoded layout breakpoint `max-[2000px]`:**
- Issue: `src/app/[locale]/layout.tsx` and `src/app/[locale]/page.tsx` use the Tailwind arbitrary breakpoint `max-[2000px]:px-[10vw]` in multiple places.
- Files: `src/app/[locale]/layout.tsx` (lines 69, 103), `src/app/[locale]/page.tsx` (line 91)
- Impact: Magic number repeated in multiple places; changing the layout breakpoint requires editing multiple files. Should be a Tailwind theme token.

**Hardcoded dark background hex values throughout TerminalContact:**
- Issue: `#0d0d0d`, `#111`, `#1a1a1a`, `#12131A` appear as arbitrary Tailwind color values across the terminal components. These are not in the theme.
- Files: `src/app/[locale]/layout.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalWindow.tsx`, `src/components/organisms/TerminalContact/src/components/TerminalInput.tsx`, `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`
- Impact: Terminal dark theme is fragile to update; inconsistency risk if values drift.
- Fix approach: Add terminal color tokens to the Tailwind CSS theme (e.g., `--color-terminal-bg`, `--color-terminal-surface`).

**No `.env.example` file:**
- Issue: `CLAUDE.md` instructs contributors to copy `.env.example` to `.env.local`, but no `.env.example` exists in the repository. Only `.env.sentry-build-plugin` is present.
- Files: (missing) `.env.example`
- Impact: New contributors have no reference for required environment variables; the Sentry build plugin config is not self-documenting.
- Fix approach: Create `.env.example` listing all required vars with placeholder values (at minimum the Sentry DSN once it is moved to an env var).

---

## Risks

**`LanguageProvider` uses top-level `await` inside a server component:**
- Issue: `src/provider/src/LanguageProvider.tsx` calls `const messages = await getMessages()` at the module level (outside the component function). This works in React Server Components on Next.js today but is an unusual pattern that may break under future React or Next.js changes.
- Files: `src/provider/src/LanguageProvider.tsx`
- Risk: Low currently; could become a compatibility concern in major Next.js upgrades.
- Fix approach: Move `await getMessages()` inside the async component function body.

**`LanguageSwitcher` bypasses `next-intl` routing API:**
- Issue: `LanguageSwitcher.tsx` switches locale via `router.replace(\`/\${finalLocale}\${window?.location.hash}\`)` — a manual URL construction rather than using `next-intl`'s `useRouter` from `next-intl/navigation`. This tightly couples the switcher to the `localePrefix: "never"` routing config.
- Files: `src/components/molecules/LanguageSwitcher/LanguageSwitcher.tsx` (line 18)
- Risk: If the `localePrefix` strategy changes in `i18n/routing.ts`, the switcher silently breaks.
- Fix approach: Replace `next/navigation` `useRouter` with the `useRouter` from `next-intl/navigation` and use its `replace` or `push` with a `locale` option.

---

*Concerns audit: 2026-05-08*
