# Codebase Structure

**Analysis Date:** 2026-04-28

## Directory Layout

```
my-portifolio/
├── src/                        # All application source code
│   ├── app/                    # Next.js App Router (pages + API routes)
│   │   ├── [locale]/           # Locale-prefixed route group (en/pt)
│   │   │   ├── layout.tsx      # Root HTML shell, font loading, providers
│   │   │   └── page.tsx        # Single-page portfolio (Home)
│   │   ├── api/                # Next.js Route Handlers
│   │   │   ├── articles/list/  # GET /api/articles/list — proxies dev.to API
│   │   │   ├── repos/list/     # GET /api/repos/list — serves static JSON
│   │   │   ├── testimonials/list/ # GET /api/testimonials/list — serves static JSON
│   │   │   └── sentry-example-api/ # Sentry error demo endpoint
│   │   ├── sentry-example-page/ # Sentry error demo page
│   │   ├── favicon.ico
│   │   └── global-error.tsx    # Global error boundary (Sentry)
│   ├── components/             # UI components (Atomic Design)
│   │   ├── atoms/              # Smallest, stateless UI primitives
│   │   ├── molecules/          # Composed UI from atoms
│   │   └── organisms/          # Complex feature sections
│   ├── hooks/                  # Shared custom React hooks
│   ├── i18n/                   # Internationalization config + locale strings
│   │   └── locales/            # en.json, pt.json translation files
│   ├── provider/               # React context providers
│   │   └── QueryProvider/      # TanStack Query client wrapper
│   ├── schemas/                # Zod validation schemas
│   │   └── generateMessage/    # Contact form schema + unit test
│   ├── services/               # API client functions
│   │   └── api/                # Fetcher modules per resource
│   ├── styles/                 # Global CSS
│   ├── tests/                  # E2E tests (Playwright)
│   ├── util/                   # Pure utility functions
│   ├── instrumentation.ts      # Sentry server-side instrumentation
│   ├── instrumentation-client.ts # Sentry client-side instrumentation
│   └── proxy.ts                # next-intl middleware (locale detection)
├── public/                     # Static assets served at /
│   ├── cover/                  # OG image variants (256p, 800p, 1800p)
│   ├── projects/               # Project screenshot images
│   ├── testimonial/            # Testimonial author avatars
│   ├── GM-Resume.pdf           # Downloadable resume
│   └── profile.png             # Profile photo
├── .github/workflows/          # CI/CD pipeline definitions
├── .husky/                     # Git hooks (pre-commit)
├── .planning/codebase/         # GSD analysis documents
├── .vscode/                    # Editor settings
├── eslint.config.mjs           # ESLint flat config
├── jest.config.ts              # Jest config (unit tests)
├── jest.setup.ts               # Jest global setup
├── next.config.ts              # Next.js config (Sentry plugin, i18n)
├── playwright.config.ts        # Playwright E2E config
├── postcss.config.mjs          # PostCSS / Tailwind pipeline
├── tsconfig.json               # TypeScript config (path alias @/→src/)
├── .prettierrc                 # Prettier formatting rules
└── package.json                # npm scripts + dependencies
```

## Directory Purposes

**`src/app/[locale]/`**
- Purpose: The locale-aware Next.js route that renders the entire portfolio
- Key files: `layout.tsx` (fonts, providers, metadata), `page.tsx` (full page layout with all sections)
- All sections (presentation, about-me, articles, references, footer) are assembled here

**`src/app/api/`**
- Purpose: Next.js Route Handlers acting as a lightweight BFF (backend-for-frontend)
- Each resource has its own subdirectory following `api/<resource>/<action>/route.ts`
- Internal types live at `src/app/api/<resource>/<action>/src/@types/index.ts`
- Static data (repos, testimonials) lives at `src/app/api/<resource>/<action>/src/data/<resource>.json`

**`src/components/atoms/`**
- Purpose: Primitive UI building blocks with no business logic
- Key components: `Icon`, `Draws`, `Spheres`, `Toaster`, `Tooltip`, `Input`, `Label`, `TextArea`, `ErrorMessage`
- Each atom is a directory with `index.tsx` as its public entry point, plus optional `styles.css` and subdirectories for sub-elements/hooks

**`src/components/molecules/`**
- Purpose: Composed components built from atoms, with limited interaction logic
- Key components: `Header` (navigation + language selector), `SocialMedia` (icon link row)
- Molecules follow `ComponentName/index.tsx` (re-export) + `ComponentName/ComponentName.tsx` (implementation) split

**`src/components/organisms/`**
- Purpose: Full feature sections that fetch data and render complex UI
- Key organisms: `Articles` (fetches dev.to articles via API), `Testimonials` (fetches testimonials, handles show-more)
- Each organism uses a `src/` subdirectory with `views/`, `components/`, and optionally `provider/`
- Public entry point is `index.ts` at the organism root

**`src/hooks/`**
- Purpose: Shared custom React hooks used across components
- Key file: `useDetectClickOutside.tsx`

**`src/i18n/`**
- Purpose: Internationalization setup for next-intl
- `routing.ts` — defines supported locales (`en`, `pt`) and `defaultLocale`
- `index.ts` — next-intl request config
- `locales/en.json`, `locales/pt.json` — translation keys; `*_new.json` variants are work-in-progress copies

**`src/provider/`**
- Purpose: React context providers wrapping the app
- `QueryProvider/index.tsx` — TanStack Query `QueryClient` setup

**`src/schemas/`**
- Purpose: Zod schemas for runtime validation
- `generateMessage/schema.ts` — contact form payload validation
- `generateMessage/test.spec.ts` — Jest unit tests for the schema

**`src/services/api/`**
- Purpose: Typed fetch wrappers for internal Next.js API routes
- `api.articles.ts`, `api.testimonials.ts` — resource-specific fetchers
- `index.ts` — aggregated `api` object: `api.articles.list()`, `api.testimonials.list()`

**`src/styles/`**
- Purpose: Global CSS (Tailwind directives, custom properties, animations)
- Key file: `globals.css`

**`src/tests/`**
- Purpose: Playwright E2E tests
- Key file: `home.spec.ts` — locale detection, page sections visibility, form interaction

**`src/util/`**
- Purpose: Pure, framework-agnostic helper functions
- Key files: `capitalizeFirstLetter.ts`, `logToConsole.ts`

## Key File Locations

**Entry Points:**
- `src/app/[locale]/layout.tsx` — HTML root, global fonts, providers, SEO metadata
- `src/app/[locale]/page.tsx` — Sole page; all portfolio sections in one component
- `src/proxy.ts` — Middleware: next-intl locale detection, runs on every request

**Configuration:**
- `tsconfig.json` — TypeScript, path alias `@/*` → `./src/*`
- `next.config.ts` — Next.js + Sentry build plugin
- `eslint.config.mjs` — ESLint rules
- `.prettierrc` — Prettier formatting
- `jest.config.ts` — Jest unit test runner
- `playwright.config.ts` — Playwright E2E runner
- `src/i18n/routing.ts` — Locale definitions

**Core Logic:**
- `src/services/api/index.ts` — Single `api` object used by organisms to fetch data
- `src/components/organisms/Articles/src/views/Articles.tsx` — Articles section with Suspense streaming
- `src/components/organisms/Testimonials/src/views/Testimonials.tsx` — Testimonials section with provider + Suspense
- `src/components/molecules/Header/index.tsx` — Navigation with locale-aware Suspense wrapper

**Testing:**
- `src/tests/home.spec.ts` — Playwright E2E tests
- `src/schemas/generateMessage/test.spec.ts` — Jest unit test for Zod schema

## Naming Conventions

**Files:**
- React components: PascalCase matching the exported component name — `ArticlesList.tsx`, `Header.tsx`
- Index re-exports: always `index.tsx` (components) or `index.ts` (non-JSX)
- API route handlers: `route.ts` (Next.js convention)
- Service files: `api.<resource>.ts` — e.g., `api.articles.ts`
- Schema files: `schema.ts` within a named schema directory
- Utility files: camelCase — `capitalizeFirstLetter.ts`, `logToConsole.ts`
- Test files: `<name>.spec.ts`
- Type files: `index.ts` inside a `@types/` directory

**Directories:**
- Components: PascalCase — `Icon/`, `Header/`, `Articles/`
- Atomic design layers: lowercase plural — `atoms/`, `molecules/`, `organisms/`
- Feature internals: `src/` subdirectory inside organism for `components/`, `views/`, `provider/`
- API type definitions: `@types/` (prefixed with `@`)
- Static data: `data/` inside API route `src/`
- Locales: lowercase language code — `en.json`, `pt.json`

## Where to Add New Code

**New page section / feature organism:**
- Implementation: `src/components/organisms/<FeatureName>/src/views/<FeatureName>.tsx`
- Sub-components: `src/components/organisms/<FeatureName>/src/components/`
- State/context: `src/components/organisms/<FeatureName>/src/provider/`
- Public re-export: `src/components/organisms/<FeatureName>/index.ts`
- Import in page: `src/app/[locale]/page.tsx`

**New API endpoint:**
- Route handler: `src/app/api/<resource>/<action>/route.ts`
- Types: `src/app/api/<resource>/<action>/src/@types/index.ts`
- Static data (if needed): `src/app/api/<resource>/<action>/src/data/<resource>.json`

**New service fetcher:**
- File: `src/services/api/api.<resource>.ts`
- Register in: `src/services/api/index.ts`

**New atom component:**
- Directory + entry: `src/components/atoms/<ComponentName>/index.tsx`

**New molecule component:**
- Implementation: `src/components/molecules/<ComponentName>/<ComponentName>.tsx`
- Re-export: `src/components/molecules/<ComponentName>/index.tsx`

**New utility function:**
- File: `src/util/<functionName>.ts`

**New shared hook:**
- File: `src/hooks/use<HookName>.tsx`

**New Zod schema:**
- Schema: `src/schemas/<schemaName>/schema.ts`
- Tests: `src/schemas/<schemaName>/test.spec.ts`

**New translation key:**
- Add to both `src/i18n/locales/en.json` and `src/i18n/locales/pt.json`

**New E2E test:**
- File: `src/tests/<feature>.spec.ts`

## Special Directories

**`.planning/codebase/`:**
- Purpose: GSD analysis documents for AI-assisted planning
- Generated: No
- Committed: Yes

**`.next/`:**
- Purpose: Next.js build output and cache
- Generated: Yes
- Committed: No

**`node_modules/`:**
- Purpose: npm package dependencies
- Generated: Yes
- Committed: No

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD pipelines
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-04-28*
