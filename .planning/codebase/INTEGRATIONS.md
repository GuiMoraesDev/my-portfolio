# External Integrations

**Analysis Date:** 2026-04-30

## APIs & External Services

**Publishing / Content:**
- Dev.to API (public, no auth required) - Fetches published articles for the portfolio
  - Endpoint: `https://dev.to/api/articles?username=guimoraes`
  - Consumed by: `src/app/api/articles/list/route.ts` (Next.js Route Handler)
  - Client service: `src/services/api/api.articles.ts` calls the internal route at `/api/articles/list`
  - Response type: `DevDotToArticle[]` defined in `src/app/api/articles/list/src/@types/index.ts`

**GitHub:**
- GitHub REST API - Remote image hosting from `raw.githubusercontent.com`
  - Auth: `NEXT_PUBLIC_GH_TOKEN` (personal access token; declared in `.env.example` but no active API call using it was found in current source)
  - Remote image pattern allowed in `next.config.ts`: `raw.githubusercontent.com`
  - GitHub profile URL used as static links in `src/constants/socialMedia.ts` and `src/components/molecules/SocialMedia/SocialMedia.tsx`

**Email / Messaging:**
- Resend - Declared in `.env.example` as `NEXT_PUBLIC_RESEND_API_KEY`
  - Status: No active Resend SDK (`resend` package) is present in `package.json`. The env var exists but no integration code was found in current source. Likely removed or planned.

**AI:**
- OpenAI - Declared in `.env.example` as `NEXT_PUBLIC_OPENAI_API_KEY`
  - Status: No `openai` SDK package present in `package.json`. The env var exists but no integration code was found in current source. Likely removed or planned.

## Data Storage

**Databases:**
- None detected - no database client or ORM in dependencies

**Static Data (local):**
- `src/data/blog-posts.ts` - Hardcoded internal blog post records (title, slug, date, content)
- `src/i18n/locales/en.json` - English translation strings
- `src/i18n/locales/pt.json` - Portuguese translation strings
- `src/posts/` - Raw blog post content files (Markdown/MDX); `src/posts/draft/` for drafts

**File Storage:**
- Local filesystem only; public assets served from `public/`
  - `public/cover/` - Open Graph images (256p, 800p, 1800p)
  - `public/projects/` - Project screenshots
  - `public/testimonial/` - Testimonial images
- Remote images proxied via Next.js image optimization from `raw.githubusercontent.com`

**Caching:**
- @tanstack/react-query 5.100.6 - Client-side API response caching (no external cache service)

## Authentication & Identity

**Auth Provider:**
- None - no authentication library detected (no NextAuth, Clerk, Auth0, etc.)
- Site is a public portfolio with no user authentication

## Monitoring & Observability

**Error Tracking:**
- Sentry (`@sentry/nextjs` 10.51.0) - Full-stack error monitoring
  - DSN (hardcoded): `https://72a10c22d8b66638f1beb39b8deee486@o4506790144245760.ingest.us.sentry.io/4506791074922496`
  - Sentry org: `guilherme-moraes`, project: `my-portifolio` (in `next.config.ts`)
  - Tunnel route: `/monitoring` (bypasses ad blockers)
  - Features: `tracesSampleRate: 1`, `enableLogs: true`, `sendDefaultPii: true`
  - Config files:
    - `sentry.server.config.ts` - Node.js runtime initialization
    - `sentry.edge.config.ts` - Edge runtime initialization
    - `src/instrumentation.ts` - Next.js instrumentation hook (loads configs by runtime)
  - Source maps uploaded during CI builds (`silent: !process.env.CI` in `next.config.ts`)
  - Build plugin config: `.env.sentry-build-plugin`

**Analytics:**
- Vercel Analytics (`@vercel/analytics` 2.0.1) - Page view analytics
  - Component: `<Analytics />` rendered in `src/app/[locale]/layout.tsx`
  - No env vars required (auto-detected on Vercel)

**Performance:**
- Vercel Speed Insights (`@vercel/speed-insights` 2.0.0) - Core Web Vitals monitoring
  - Component: `<SpeedInsights />` rendered in `src/app/[locale]/layout.tsx`
  - No env vars required (auto-detected on Vercel)

**Logs:**
- No custom logging utility detected; `no-console` ESLint rule is set to `"error"` (console usage is disallowed in source)
- Sentry `enableLogs: true` routes logs to Sentry

## Internationalization

- next-intl 4.11.0 - Locale-based routing and message loading
  - Supported locales: `en`, `pt`
  - Config entry: `src/i18n/index.ts`
  - Routing config: `src/i18n/routing.ts`
  - Message files: `src/i18n/locales/en.json`, `src/i18n/locales/pt.json`
  - Client provider: `<NextIntlClientProvider>` in `src/app/[locale]/layout.tsx`

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, Sentry `automaticVercelMonitors: true`)

**CI Pipeline:**
- GitHub Actions; workflow: `.github/workflows/ci.yaml`
- Triggers: pull requests to `homolog` or `main`
- Sentry source maps uploaded when `CI` env var is set

## Environment Configuration

**Declared in `.env.example`:**
- `NEXT_PUBLIC_GH_TOKEN` - GitHub personal access token (purpose: remote image auth or future API use)
- `NEXT_PUBLIC_RESEND_API_KEY` - Resend email API key (no active integration found)
- `NEXT_PUBLIC_OPENAI_API_KEY` - OpenAI API key (no active integration found)

**Runtime env vars (set by Next.js / CI):**
- `NEXT_RUNTIME` - `"nodejs"` or `"edge"`, used in `src/instrumentation.ts` to load Sentry config
- `CI` - Set in CI pipelines; affects Sentry log verbosity and Playwright retries
- `TEST_ENV` - Set to `"true"` when running E2E tests (`npm run test:e2e`)

**Security note:**
- All three declared public keys use the `NEXT_PUBLIC_` prefix, exposing them to the browser bundle. For server-only secrets this is a risk. See CONCERNS.md.

**Sentry build:**
- `.env.sentry-build-plugin` - Contains Sentry auth token for source map upload (not committed)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Dev.to API - outbound fetch from `src/app/api/articles/list/route.ts`
- Sentry ingest - error/trace events sent from server, edge, and client runtimes

---

*Integration audit: 2026-04-30*
