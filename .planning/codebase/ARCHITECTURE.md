# Architecture

**Analysis Date:** 2026-04-28

## Pattern Overview

**Overall:** Single-page portfolio with Next.js App Router, Atomic Design component hierarchy, and co-located API routes

**Key Characteristics:**
- Single locale-aware page (`/[locale]`) rendered as a React Server Component with async data fetching via `Suspense` boundaries
- API routes live alongside the frontend in the same Next.js app — no external backend
- Atomic Design (atoms → molecules → organisms) used to organize components
- Server Components fetch data; client components handle interactivity
- i18n handled via `next-intl` with locale determined from browser settings at the middleware level

## Layers

**Middleware / Routing:**
- Purpose: Detect locale from Accept-Language header, set locale prefix, inject `domain-origin` cookie for internal API calls
- Location: `src/proxy.ts`
- Contains: `next-intl` middleware wrapper + cookie injection
- Depends on: `src/i18n/routing.ts`
- Used by: Next.js request pipeline (configured via `matcher`)

**Page Layer:**
- Purpose: Single-page layout composed of full-page `SessionWrapper` sections
- Location: `src/app/[locale]/page.tsx`
- Contains: Async RSC page, layout primitives (`SessionWrapper`, `SessionHeader`, `HighlightCard`)
- Depends on: organisms, molecules, atoms, `next-intl` translation utilities
- Used by: Next.js router

**Layout Layer:**
- Purpose: HTML shell with fonts, global providers, analytics
- Location: `src/app/[locale]/layout.tsx`
- Contains: Font loading, metadata, `QueryProvider`, `Toaster`, Vercel Analytics + Speed Insights
- Depends on: `src/provider/QueryProvider`, `src/components/atoms/Toaster`
- Used by: All page routes under `[locale]`

**API Routes:**
- Purpose: Thin data proxies; fetch from external APIs or serve static JSON
- Location: `src/app/api/`
- Contains: Route handlers for articles (proxies dev.to), testimonials (static JSON), repos (static JSON)
- Depends on: Static JSON data files at `src/app/api/*/list/src/data/`
- Used by: `src/services/api/` (called server-side from RSCs)

**Service Layer:**
- Purpose: Typed wrappers around internal API route calls
- Location: `src/services/api/`
- Contains: `api.articles.ts`, `api.testimonials.ts`, aggregated `index.ts`
- Depends on: `domain-origin` cookie (set by middleware) to resolve absolute URL at runtime
- Used by: Organism view components (server-side fetch)

**Component Layer (Atomic Design):**
- Purpose: Reusable UI building blocks stratified by complexity
- Location: `src/components/`
- Contains: `atoms/` → primitive UI; `molecules/` → composed UI groups; `organisms/` → feature-level sections with own data fetching
- Depends on: `src/services/api/` (organisms only), `src/hooks/`, `src/i18n/`
- Used by: Page layer

**i18n Layer:**
- Purpose: Internationalisation configuration and locale message loading
- Location: `src/i18n/`
- Contains: `routing.ts` (locale config), `index.ts` (request config), `locales/en.json`, `locales/pt.json`
- Depends on: `next-intl`
- Used by: Middleware, layouts, RSCs, client components

## Data Flow

**Articles Section:**

1. RSC page renders `<ArticlesView />` (organism)
2. `ArticlesView` wraps `ArticlesFetch` in `<Suspense>` with skeleton fallback
3. `ArticlesFetch` calls `api.articles.list()` from `src/services/api/api.articles.ts`
4. Service reads `domain-origin` cookie, constructs URL, fetches `/api/articles/list`
5. API route at `src/app/api/articles/list/route.ts` proxies to `https://dev.to/api/articles?username=guimoraes`
6. Data flows back as typed `DevDotToArticle[]` rendered by `ArticlesList`

**Testimonials Section:**

1. RSC page renders `<TestimonialsView />` (organism)
2. `TestimonialsView` wraps page in `<TestimonialsProvider>` (client context for show-more state)
3. `TestimonialsFetch` calls `api.testimonials.list()`
4. API route at `src/app/api/testimonials/list/route.ts` returns static JSON from `testimonials.json`
5. `TestimonialsList` renders with `showMore` state from context

**State Management:**
- Server-side data: fetched directly in RSCs, no client cache layer in use beyond `QueryProvider` (TanStack Query client registered but not actively used for server data)
- Client-side UI state: React Context (`TestimonialsContext`) for show-more toggle; `useState` within client components (Header open/close)
- No global state store (Redux/Zustand/etc.)

## Key Abstractions

**`api` service object:**
- Purpose: Namespace for all internal API calls, keeping fetch logic out of components
- Examples: `src/services/api/index.ts`, `src/services/api/api.articles.ts`, `src/services/api/api.testimonials.ts`
- Pattern: Each domain has its own file exporting an object; `index.ts` aggregates into `api.{domain}.{method}()`

**Organism View + Fetch split:**
- Purpose: Separate async data fetching from layout/rendering within organisms
- Examples: `src/components/organisms/Articles/src/views/Articles.tsx` (view + fetch), `src/components/organisms/Articles/src/components/ArticlesList.tsx` (render only)
- Pattern: `*View` = Suspense boundary + fetch wrapper; `*List` = pure render component; `*Skeleton` = loading fallback

**`TestimonialsProvider` context:**
- Purpose: Share `showMore` state across sibling components without prop drilling
- Examples: `src/components/organisms/Testimonials/src/provider/TestimonialsProvider.tsx`
- Pattern: `createContext` + `useState` provider + co-located `useTestimonials` hook

## Entry Points

**Next.js App Root:**
- Location: `src/app/[locale]/layout.tsx`
- Triggers: Every page request under the `[locale]` segment
- Responsibilities: Font loading, global providers, metadata, Vercel analytics

**Main Page:**
- Location: `src/app/[locale]/page.tsx`
- Triggers: GET request to `/` or `/{locale}`
- Responsibilities: Compose all portfolio sections in order

**Middleware:**
- Location: `src/proxy.ts`
- Triggers: Every request matching `/` or `/(en|pt)/:path*`
- Responsibilities: Locale detection/redirect, `domain-origin` cookie injection

## Error Handling

**Strategy:** Sentry for runtime error capture; minimal in-app error UI

**Patterns:**
- `src/app/global-error.tsx`: Next.js global error boundary for unhandled RSC errors
- API routes wrap external fetches in try/catch and return `Response.json({ error })` on failure
- `sentry.server.config.ts` and `sentry.edge.config.ts` configure server-side capture
- `src/instrumentation-client.ts` configures browser-side capture

## Cross-Cutting Concerns

**Logging:** `src/util/logToConsole.ts` utility; Sentry for production error capture
**Validation:** `src/schemas/generateMessage/schema.ts` (Zod schema for message form — schema exists, form was removed from current branch)
**Authentication:** Not applicable — public portfolio, no auth
**Internationalisation:** `next-intl` throughout; locale resolved at middleware level and available server-side via `getLocale()` / `getTranslations()` and client-side via `useLocale()` / `useTranslations()`

---

*Architecture analysis: 2026-04-28*
