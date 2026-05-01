# Technology Stack

**Analysis Date:** 2026-04-30

## Languages

**Primary:**
- TypeScript 5.9.3 - All source files under `src/`
- TSX (React JSX) - All UI components and pages

**Secondary:**
- CSS (via Tailwind v4) - `src/styles/globals.css` using `@theme {}` variable syntax
- JSON - i18n locale files in `src/i18n/locales/`

## Runtime

**Environment:**
- Node.js 22.x (pinned in CI via `.github/workflows/ci.yaml`)

**Package Manager:**
- npm (scripts use `npm run`)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.4 - App Router, SSR/SSG, API routes
  - Turbopack enabled for dev: `next dev --turbopack`
  - Config: `next.config.ts`
- React 19.2.5 - UI rendering
- React DOM 19.2.5 - DOM bindings

**Internationalization:**
- next-intl 4.11.0 - i18n routing and message loading
  - Entry point: `src/i18n/index.ts`
  - Routing config: `src/i18n/routing.ts`
  - Locales: `en`, `pt` (JSON files in `src/i18n/locales/`)
  - Plugin hooked into Next.js in `next.config.ts`

**Animation:**
- motion 12.38.0 - Animation library (formerly Framer Motion); wrapper at `src/components/atoms/Motion/`

**Data Fetching:**
- @tanstack/react-query 5.100.6 - Server state management and caching; provider at `src/provider/QueryProvider/`

**Testing:**
- Jest 30.3.0 - Unit test runner
- jest-environment-jsdom 30.3.0 - DOM environment for Jest
- @jest/globals 30.3.0 - Jest globals
- @playwright/test 1.59.1 - E2E test runner; config at `playwright.config.ts`
- @testing-library/react 16.3.2 - React component testing utilities
- @testing-library/jest-dom 6.9.1 - DOM assertion matchers
- whatwg-fetch 3.6.20 - Fetch polyfill for Jest environment

## Styling

**Approach:** Tailwind CSS v4 via `@tailwindcss/postcss` PostCSS plugin
- Global styles and design tokens: `src/styles/globals.css` (uses `@theme {}` CSS variable syntax)
- Class merging: `tailwind-merge` 3.5.0 (`twMerge()` used in layout and components)
- Variant composition: `tailwind-variants` 3.2.2
- Class order enforced by ESLint: `eslint-plugin-tailwind-canonical-classes` 1.3.3
- Prettier class sorting: `prettier-plugin-tailwindcss` 0.8.0; stylesheet referenced in `.prettierrc`
- Fonts loaded via `next/font/google`: Lato (`--font-lato`) and Fira Sans (`--font-fira-sans`)

## UI Component Libraries

- @radix-ui/react-icons 1.3.2 - Icon primitives
- @radix-ui/react-label 2.1.8 - Accessible label
- @radix-ui/react-switch 1.2.6 - Toggle switch
- @radix-ui/react-toast 1.2.15 - Toast notifications
- @radix-ui/react-tooltip 1.2.8 - Tooltips

## Key Dependencies

**Critical:**
- `next` 16.2.4 - Core framework; App Router under `src/app/`
- `react` / `react-dom` 19.2.5 - UI layer
- `next-intl` 4.11.0 - Required for locale routing under `src/app/[locale]/`
- `@sentry/nextjs` 10.51.0 - Error monitoring; wraps Next.js config in `next.config.ts`
- `@tanstack/react-query` 5.100.6 - Data fetching for Dev.to articles feed

**Infrastructure:**
- `@vercel/analytics` 2.0.1 - Page analytics; `<Analytics />` in `src/app/[locale]/layout.tsx`
- `@vercel/speed-insights` 2.0.0 - Core Web Vitals; `<SpeedInsights />` in `src/app/[locale]/layout.tsx`
- `lodash` 4.18.1 + `@types/lodash` 4.17.24 - Utility functions

## Build Tools

**Bundler:**
- Next.js built-in (Webpack in production, Turbopack in dev)

**PostCSS:**
- postcss 8.5.12 - CSS processing
- @tailwindcss/postcss 4.2.4 - Tailwind CSS v4 PostCSS plugin
- @tailwindcss/node 4.2.4 - Node.js Tailwind utilities
- Config: `postcss.config.mjs`

**TypeScript:**
- typescript 5.9.3 - Compiler (`tsconfig.json`)
- ts-node 10.9.2 - TypeScript execution for config files

## Code Quality

**Linting:** ESLint 9.39.1; flat config at `eslint.config.mjs`
- `eslint-config-next` 16.2.4 (core-web-vitals + typescript presets)
- `@typescript-eslint/eslint-plugin` 8.59.1
- `eslint-plugin-react-hooks` 7.1.1
- `eslint-plugin-unused-imports` 4.4.1 - Errors on unused imports/vars
- `eslint-plugin-tailwind-canonical-classes` 1.3.3 - Warns on non-canonical class order
- `eslint-plugin-prettier` 5.5.5 - Prettier integrated as ESLint rule
- `eslint-config-prettier` 10.1.8 - Disables conflicting formatting rules
- `eslint-import-resolver-typescript` 4.4.4 - TypeScript-aware import resolution
- Import ordering: `import/order` rule, alphabetical, newlines-between groups

**Formatting:** Prettier 3.8.3; config at `.prettierrc`
- Plugin: `prettier-plugin-tailwindcss`
- Stylesheet reference: `./src/styles/globals.css`

**Git Hooks:** Husky 9.1.7; hooks in `.husky/`

**Type Checking:** `npm run check-types` → `tsc --noEmit`

## TypeScript Configuration

File: `tsconfig.json`
- `"strict": true`
- Target: `esnext`, module resolution: `bundler`
- Path alias: `@/*` → `./src/*`
- JSX: `react-jsx`
- Next.js TypeScript plugin included

## Test Configuration

**Unit (Jest):** `jest.config.ts`
- Next.js Jest preset via `next/jest.js`
- jsdom test environment
- Path alias `@/*` mapped
- `next-intl` mocked via `__mocks__/next-intl.ts`
- Setup file: `jest.setup.ts`

**E2E (Playwright):** `playwright.config.ts`
- Test dir: `src/tests/`
- Base URL: `http://localhost:3000`
- Browsers: Chromium desktop + Galaxy S8 mobile
- Dev server auto-started on `npm run dev`

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run check-types  # TypeScript type check (no emit)
npm run test:unit    # Run Jest unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run Playwright with interactive UI
npm run prepare      # Install Husky hooks
```

## Platform Requirements

**Development:**
- Node.js 22.x
- npm

**Production:**
- Deployment target: Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, Sentry `automaticVercelMonitors: true` in `next.config.ts`)

## CI/CD

- GitHub Actions; workflow: `.github/workflows/ci.yaml`
- Triggers: pull requests to `homolog` or `main`
- Jobs:
  - `Type-And-Lint`: TypeScript check + ESLint
  - `Unit-test`: Jest unit tests
  - `E2E-test`: Playwright (Chromium + mobile); reports uploaded as 30-day artifacts
- All jobs use Node 22.x on `ubuntu-latest`

---

*Stack analysis: 2026-04-30*
