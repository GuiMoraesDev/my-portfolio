# Technology Stack
> Last updated: 2026-05-07

## Languages

**Primary:**
- TypeScript 5.9 — all source files under `src/`; strict mode enabled via `tsconfig.json`
- TSX — React component files

**Secondary:**
- CSS — `src/styles/globals.css` (Tailwind v4 theme definitions via `@theme {}` block)
- JSON — translation files in `src/i18n/locales/`

## Runtime

**Environment:**
- Node.js (v24.14.1 in current environment; no `.nvmrc` or `.node-version` file present)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.4 — App Router, SSR; all pages under `src/app/[locale]/`; config at `next.config.ts`
- React 19.2.5 — UI rendering

**Internationalization:**
- next-intl ^4.11.0 — locale routing and server/client translations; routing config at `src/i18n/routing.ts` (locales: `en`, `pt`; `localePrefix: "never"`); request config at `src/i18n/index.ts`

**Data Fetching:**
- TanStack Query (React Query) ^5.100.6 — client-side async state management; `QueryClient` initialized in `src/provider/src/QueryProvider.tsx`

**Animation:**
- Framer Motion (imported as `"framer-motion"` from the `motion` ^12.38.0 package) — drag, presence animations, viewport detection; used in `src/components/organisms/TerminalContact/src/`

**Testing:**
- Jest ^30.3.0 + jest-environment-jsdom — unit tests; config at `jest.config.ts`, setup at `jest.setup.ts`
- @testing-library/react ^16.3.2 + @testing-library/jest-dom ^6.9.1 — component assertions
- Playwright ^1.59.1 — E2E tests (Chromium + Galaxy S8); config at `playwright.config.ts`; tests in `src/tests/`

**Build/Dev:**
- Turbopack — dev server (`next dev --turbopack`)
- PostCSS ^8.5 with `@tailwindcss/postcss` ^4.2.4 — CSS pipeline; config at `postcss.config.mjs`

## Styling

- Tailwind CSS v4 (^4.2.4) — utility classes; custom color palette and font tokens defined in `src/styles/globals.css`
- tailwind-merge ^3.5.0 — conditional class merging (`twMerge`); used throughout layout and components
- tailwind-variants ^3.2.2 — component variant system
- prettier-plugin-tailwindcss ^0.8.0 — Tailwind class sorting via Prettier (stylesheet: `src/styles/globals.css`)
- Google Fonts — `Michroma` (font-title) and `Space Grotesk` (font-body) loaded via `@import url(...)` in `src/styles/globals.css`

## UI Component Primitives

- @radix-ui/react-icons ^1.3.2
- @radix-ui/react-label ^2.1.8
- @radix-ui/react-switch ^1.2.6
- @radix-ui/react-toast ^1.2.15
- @radix-ui/react-tooltip ^1.2.8

## Utilities

- lodash ^4.17.24 — general utilities (listed as production dependency; not found in use within `src/` at time of analysis)

## Linting & Formatting

- ESLint ^9.39.1 — flat config at `eslint.config.mjs`
- eslint-config-next 16.2.4 — Next.js recommended rules (core-web-vitals + typescript presets)
- @typescript-eslint/eslint-plugin ^8.59.1 — TypeScript-aware lint rules; enforces `consistent-type-imports` with inline type keyword
- eslint-plugin-prettier ^5.5.5 + eslint-config-prettier ^10.1.8 — Prettier as an ESLint rule (warn level)
- eslint-plugin-tailwind-canonical-classes ^1.3.3 — enforces canonical Tailwind class ordering
- eslint-plugin-unused-imports ^4.4.1 — removes unused imports (error level)
- Prettier 3.8.3 — format config at `.prettierrc` with `prettier-plugin-tailwindcss`
- eslint-import-resolver-typescript ^4.4.4 — resolves TypeScript path aliases in import rules
- Import ordering: enforced via `import/order` rule with `newlines-between: "always"` and alphabetical sorting

## Git Hooks

- Husky ^9.1.7 — pre-commit hook at `.husky/pre-commit` runs: `npm run check-types` then `npm run lint`
- Hook bypass (`--no-verify`) is prohibited per project conventions

## TypeScript Configuration

- Target: `esnext`, module resolution: `bundler`
- Strict mode: `true`
- Path alias: `@/*` → `./src/*` (defined in `tsconfig.json`, resolved in ESLint via `eslint-import-resolver-typescript`)
- No emit (`noEmit: true`) — type checking only via `npm run check-types`

## Build Configuration (`next.config.ts`)

- Plugin chain: `withSentryConfig(withNextIntl(nextConfig))`
- Remote image hostname allowed: `raw.githubusercontent.com`
- Sentry: `widenClientFileUpload: true`, tunnel route `/monitoring`, `automaticVercelMonitors: true`, `removeDebugLogging: true`

## Platform Requirements

**Development:**
- Node.js 24+ (recommended), npm
- Copy `.env.example` → `.env.local`; `.env.sentry-build-plugin` needed for source map uploads

**Production:**
- Vercel (confirmed by `@vercel/analytics`, `@vercel/speed-insights`, and Sentry `automaticVercelMonitors`)

---

*Stack analysis: 2026-05-07*
