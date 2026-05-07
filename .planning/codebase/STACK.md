# Technology Stack

**Analysis Date:** 2026-05-07

## Languages

**Primary:**
- TypeScript 5.9 - All source code in `src/`

**Secondary:**
- CSS (via Tailwind) - Styling throughout `src/styles/` and component files

## Runtime

**Environment:**
- Node.js v24.14.1

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.4 - App Router, SSR/SSG, API routes; entry at `src/app/`
- React 19.2.5 - UI rendering

**Internationalization:**
- next-intl 4.11 - i18n with `en`/`pt` locales; config at `src/i18n/routing.ts`, translations in `src/i18n/locales/`

**Build/Dev:**
- Turbopack - Dev server (`next dev --turbopack`)
- PostCSS - CSS processing; config at `postcss.config.mjs`
- Tailwind CSS 4.2 - Utility-first styling; integrated via `@tailwindcss/postcss`
- Husky 9.1 - Git hooks; configured via `prepare` script

## Key Dependencies

**UI:**
- `@radix-ui/react-icons`, `@radix-ui/react-label`, `@radix-ui/react-switch`, `@radix-ui/react-toast`, `@radix-ui/react-tooltip` - Accessible headless UI primitives
- `motion` 12.38 (Framer Motion) - Animations; used in draggable terminal window and transitions
- `tailwind-merge` 3.5 - Conditional class merging (`twMerge`)
- `tailwind-variants` 3.2 - Variant-based component styling

**Data Fetching:**
- `@tanstack/react-query` 5.100 - Server/client data fetching; provider at `src/provider/src/QueryProvider.tsx`

**Observability:**
- `@sentry/nextjs` 10.51 - Error tracking + Session Replay; initialized in `src/instrumentation.ts`, `src/instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`

**Analytics:**
- `@vercel/analytics` 2.0 - Page view analytics; injected in `src/provider/AppProvider.tsx`
- `@vercel/speed-insights` 2.0 - Web vitals reporting; injected in `src/provider/AppProvider.tsx`

**Utilities:**
- `lodash` 4.18 - General utilities

## Testing

**Unit:**
- Jest 30.3 + jest-environment-jsdom - Config at `jest.config.ts`, setup at `jest.setup.ts`
- `@testing-library/react` 16.3 + `@testing-library/jest-dom` 6.9 - Component testing

**E2E:**
- Playwright 1.59 - Config at `playwright.config.ts`; run with `TEST_ENV=true`

## Linting & Formatting

- ESLint 9.39 - Config at `eslint.config.mjs`; plugins: react-hooks, unused-imports, tailwind-canonical-classes, prettier
- Prettier 3.8.3 - Format config includes `prettier-plugin-tailwindcss`

## Configuration

**TypeScript:**
- `tsconfig.json` - Strict mode, path alias `@/*` maps to `./src/*`, bundler module resolution

**Build:**
- `next.config.ts` - Wraps config with `withSentryConfig` and `withNextIntl`

## Platform Requirements

**Development:**
- Node.js 24+, npm

**Production:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, Sentry's `automaticVercelMonitors`)

---

*Stack analysis: 2026-05-07*
