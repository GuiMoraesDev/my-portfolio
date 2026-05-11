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

- `src/components/atoms/` — primitive UI elements (Icon, etc.)
- `src/components/molecules/` — composed atoms (BentoCell, LanguageSwitcher, Wave, SocialMedia)
- `src/components/organisms/` — feature-level components

Each component folder uses an `index.ts` barrel re-export and keeps the implementation in a same-named `.tsx` file.

**TerminalContact organism** (`src/components/organisms/TerminalContact/`) is the most complex component. It has its own internal `src/` tree:

- `views/TerminalContact.tsx` — top-level orchestrator; owns the `<dialog>` element and framer-motion drag wrapper
- `components/TerminalWindow.tsx` — renders terminal lines and scroll behavior
- `components/TerminalInput.tsx` — input field and autocomplete suggestions
- `components/Mascot.tsx` — animated mascot button that opens the terminal
- `hooks/useControlCommandLine.ts` — all command dispatch logic (slash commands + plain commands, history)
- `hooks/useTerminalInput.ts` — input state, keyboard navigation, history traversal
- `utils/suggestion.ts` — Levenshtein-based typo suggestion for unknown commands

**Providers** (`src/provider/AppProvider.tsx`) wrap the app with TanStack Query, next-intl `NextIntlClientProvider`, Vercel Analytics, and SpeedInsights.

**Styling** uses Tailwind CSS v4 with `tailwind-merge` and `tailwind-variants`. Canonical class ordering is enforced by ESLint (`eslint-plugin-tailwind-canonical-classes`).

**Observability**: Sentry is integrated via `@sentry/nextjs` with source map upload. `src/instrumentation.ts` / `src/instrumentation-client.ts` initialize it.

## Testing

- Unit tests (Jest + jsdom + Testing Library) live alongside source files as `*.test.ts(x)`.
- `next-intl` is mocked in `__mocks__/next-intl.ts` for unit tests.
- E2E tests (Playwright) live in `src/tests/`.
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
