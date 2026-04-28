# Technology Stack

**Analysis Date:** 2026-04-28

## Languages

**Primary:**
- TypeScript 5.9.x - All source code in `src/`
- TSX (React JSX) - All UI components and pages

**Secondary:**
- JSON - Static data files (repositories, testimonials) in `src/app/api/*/src/data/`

## Runtime

**Environment:**
- Node.js 24.14.1 (active runtime; no `.nvmrc` pinning)

**Package Manager:**
- npm (migrated from pnpm)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.0.10 - App Router, SSR/SSG, API routes, image optimization
  - Turbopack enabled for dev: `next dev --turbopack`
  - Config: `next.config.ts`
- React 19.2.1 - UI rendering
- React DOM 19.2.1 - DOM bindings

**Internationalization:**
- next-intl 4.5.8 - i18n routing and translations, plugin configured via `next.config.ts`, i18n entry at `src/i18n/index.ts`

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS
  - PostCSS integration via `postcss.config.mjs`
  - Global styles at `src/styles/globals.css`
  - tailwind-merge 3.4.0 - Merge conflicting Tailwind classes
  - tailwind-variants 3.2.2 - Variant API for component styling

**UI Components:**
- @radix-ui/react-icons 1.3.2 - Icon set
- @radix-ui/react-label 2.1.8 - Accessible label primitive
- @radix-ui/react-switch 1.2.6 - Accessible toggle switch
- @radix-ui/react-toast 1.2.15 - Toast notification primitive
- @radix-ui/react-tooltip 1.2.8 - Tooltip primitive

**Animation:**
- motion 12.23.26 - Animation library (formerly Framer Motion)

**Forms:**
- react-hook-form 7.68.0 - Form state management
- @hookform/resolvers 5.2.2 - Validation resolver bridge
- zod 4.1.13 - Schema validation

**Rich Text:**
- @tiptap/react 3.13.0 - Rich text editor
- @tiptap/starter-kit 3.13.0 - Base Tiptap extensions
- @tiptap/extension-placeholder 3.13.0 - Placeholder extension
- @tiptap/extension-underline 3.13.0 - Underline extension

**Data Fetching:**
- @tanstack/react-query 5.90.12 - Server state management and caching

**Email Templates:**
- @react-email/components 1.0.1 - React-based email component library
- @react-email/markdown 0.0.17 - Markdown support in emails
- react-email 5.0.8 - Email rendering framework

**Utilities:**
- date-fns 4.1.0 - Date formatting and manipulation
- lodash 4.17.21 - General utility functions
- sanitize-html 2.17.0 - HTML sanitization

## Build Tools

**Bundler:**
- Next.js built-in (Webpack in production, Turbopack in dev)
- import-in-the-middle 2.0.0 - Module interception (used by Sentry)
- require-in-the-middle 8.0.1 - CommonJS module interception (used by Sentry)

**Transpiler:**
- TypeScript compiler via Next.js (`tsconfig.json`)
  - Target: ESNext
  - Module resolution: bundler
  - Strict mode enabled
  - Path alias: `@/*` → `./src/*`
- ts-node 10.9.2 - TypeScript execution for config files

**PostCSS:**
- postcss 8.5.6 - CSS processing
- @tailwindcss/postcss 4.1.18 - Tailwind PostCSS plugin

## Testing

**Unit/Integration:**
- jest 30.2.0 - Test runner
- @jest/globals 30.2.0 - Jest globals
- Config: `jest.config.ts` (Next.js Jest preset, ESM mode)
- Setup: `jest.setup.ts`
- whatwg-fetch 3.6.20 - Fetch polyfill for Jest environment

**E2E:**
- @playwright/test 1.57.0 - E2E test runner
- Config: `playwright.config.ts`
- Test dir: `src/tests/`
- Browsers: Chromium desktop + Galaxy S8 mobile

**Run Commands:**
```bash
npm run test           # Run unit + e2e concurrently
npm run test:unit      # Jest unit tests
npm run test:e2e       # Playwright E2E tests
npm run test:e2e:ui    # Playwright with UI
```

## Code Quality

**Linting:**
- eslint 9.39.1 - Linter
- @typescript-eslint/eslint-plugin 8.49.0 - TypeScript rules
- eslint-config-next 16.0.8 - Next.js recommended rules
- eslint-plugin-react-hooks 7.0.1 - React hooks rules
- eslint-plugin-unused-imports 4.3.0 - Remove unused imports
- eslint-plugin-prettier 5.5.4 - Prettier as ESLint rule
- eslint-config-prettier 10.1.8 - Disable conflicting rules
- Config: `eslint.config.mjs`

**Formatting:**
- prettier 3.7.4 - Code formatter
- prettier-plugin-tailwindcss 0.7.2 - Tailwind class sorting
- Config: `.prettierrc` (references `src/styles/globals.css` for Tailwind stylesheet)

**Git Hooks:**
- husky 9.1.7 - Git hook management
- Hooks dir: `.husky/`

## Production vs Development Dependencies

**Production only (selected critical):**
- next, react, react-dom, tailwindcss ecosystem
- @sentry/nextjs - Error monitoring
- @vercel/analytics, @vercel/speed-insights - Analytics
- openai - AI SDK
- resend - Email sending
- next-intl - i18n

**Dev only:**
- All testing frameworks (jest, playwright)
- All linting/formatting tools (eslint, prettier)
- TypeScript type packages (@types/*)
- ts-node, concurrently, husky

---

*Stack analysis: 2026-04-28*
