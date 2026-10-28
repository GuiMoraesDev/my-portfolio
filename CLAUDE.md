# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # Next.js dev server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix (preferred over manual patches)
npm run check-types  # TypeScript type check (no emit)
npm run test:unit    # Jest unit tests
npm run test:e2e     # Playwright e2e tests (requires TEST_ENV=true)
npm run test:e2e:ui  # Playwright with interactive UI
```

To run a single Jest test file:

```sh
npm run test:unit -- --testPathPattern=<filename>
```

## Architecture

**Next.js 16 App Router** with SSR. All pages live under `src/app/[locale]/` — the `[locale]` segment handles i18n routing via `next-intl` (locales: `en`, `pt`; prefix never shown in URL). `src/i18n/routing.ts` defines the routing config; `src/i18n/locales/` holds translation JSON files.

**Component organization follows Atomic Design:**

- `src/components/atoms/` — primitive UI elements (Icon, Dialog — a thin re-export of Radix Dialog parts)
- `src/components/molecules/` — composed atoms (SocialMedia: resume, email, GitHub and LinkedIn CTAs)
- `src/components/organisms/` — feature-level components (Header, Footer, ContactModal, TerminalContact)

Each component folder uses an `index.ts` barrel re-export and keeps the implementation in a same-named `.tsx` file.

**Pages:** only the home page exists (`src/app/[locale]/(home)/page.tsx`): hero, focus areas, stack, side projects. `Header` and `Footer` are rendered by `src/app/[locale]/layout.tsx` on every page. The header's Contact item opens `ContactModal`; the footer holds the "Open terminal" entry point.

**TerminalContact organism** (`src/components/organisms/TerminalContact/`) is the most complex component. It is loaded client-only via `next/dynamic` and has its own internal `src/` tree:

- `views/TerminalContact.tsx` — top-level orchestrator; owns the Radix dialog and its trigger
- `components/TerminalTrigger.tsx` — the text "$ Open terminal" trigger and its loading placeholder
- `components/TerminalWindow.tsx` — renders terminal lines, scroll behavior and the `motion` drag wrapper
- `components/TerminalInput.tsx` — input field and autocomplete suggestions
- `hooks/useControlCommandLine.ts` — all command dispatch logic (slash commands + plain commands, history)
- `hooks/useTerminalInput.ts` — input state, keyboard navigation, history traversal
- `utils/suggestion.ts` — Levenshtein-based typo suggestion for unknown commands

**Providers** (`src/provider/AppProvider.tsx`) wrap the app with next-intl (`LanguageProvider`) and Mixpanel (`MixpanelProvider`).

**Utilities** live in `src/utils/` (e.g. `getYearsOfExperience`, shared by the hero and the terminal's `whoami`). Contact links and the resume path live in `src/constants/socialMedia.ts`.

**Posts:** `src/posts/` holds Markdown drafts and templates that are not rendered yet (e.g. `draft/Engineering principles.md`, moved out of the removed `/principles` page).

**Styling** uses Tailwind CSS v4 with `tailwind-merge` and `tailwind-variants`. Canonical class ordering is enforced by ESLint (`eslint-plugin-tailwind-canonical-classes`). Theme tokens live in `src/styles/globals.css`: prefer the semantic ones (e.g. `bg-bg-canvas`, `bg-bg-elevated`, `text-text-primary/secondary/muted`, `border-border-subtle/strong`, `text-accent-500`). Fonts are Geist (`font-body`/`font-title`) and Geist Mono (`font-mono`). The `plum-*` and `terminal-*` colors are only used inside the terminal window.

**Observability**: Sentry is integrated via `@sentry/nextjs` with source map upload. `src/instrumentation.ts` / `src/instrumentation-client.ts` initialize it.

## Testing

- Unit tests (Jest + jsdom + Testing Library) live alongside source files as `*.test.ts(x)`.
- `next-intl` is mocked in `__mocks__/next-intl.ts` for unit tests. The mock resolves English strings from a namespace, so client components must call `useTranslations("namespace")`; a bare `useTranslations()` returns raw keys in tests.
- E2E tests (Playwright) live in `src/tests/` and run on 5 projects (Chromium, Firefox, WebKit, mobile Chrome, mobile Safari). Install browsers locally with `npx playwright install`.
- CI (`.github/workflows/ci.yaml`) runs type-check + lint, unit tests and e2e on every PR to `main`. The e2e job is pinned to `ubuntu-24.04` because the current Playwright can't install browsers on `ubuntu-latest` (26.04).
- `modulePathIgnorePatterns` excludes `src/tests/` from Jest.

## Conventions

- Commit messages follow [Angular commit format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
- Husky runs type-check and lint before every commit — do not bypass with `--no-verify`.
- Path alias `@/` maps to `src/`.
- Copy `.env.example` to `.env.local` for local development.

## Feature Development Workflow

When building a new page or significant feature, follow this workflow:

1. **Plan** — draft a concise implementation plan (≤15 lines) covering routing, components, i18n, and quality checks.
2. **Approval** — present the plan and wait for explicit user approval before writing any code.
3. **Implement** — build the feature; no hardcoded copy allowed — all user-facing text goes through `next-intl` translation keys in both `en.json` and `pt.json`.
4. **Revision** — present a summary of changes and ask the user to review before committing.
5. **Commit** — once the user approves, create an atomic commit following Angular commit format.
