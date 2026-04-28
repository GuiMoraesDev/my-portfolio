# External Integrations

**Analysis Date:** 2026-04-28

## APIs & External Services

**AI / Language Models:**
- OpenAI - Used via the `openai` SDK (^6.10.0)
  - SDK: `openai` npm package
  - Auth: `NEXT_PUBLIC_OPENAI_API_KEY`
  - Purpose: AI-generated content (likely message/text generation based on `src/schemas/generateMessage/`)

**Email Delivery:**
- Resend - Transactional email sending via `resend` SDK (^6.6.0)
  - SDK: `resend` npm package
  - Auth: `NEXT_PUBLIC_RESEND_API_KEY`
  - Templates built with `@react-email/components` and `@react-email/markdown`

**GitHub:**
- GitHub REST API (public) - Fetching repository data
  - Auth: `NEXT_PUBLIC_GH_TOKEN` (personal access token)
  - Used by: `src/app/api/repos/list/route.ts` (currently reads from local JSON, token may be used elsewhere)
  - Remote image patterns configured for `raw.githubusercontent.com` in `next.config.ts`

**Publishing / Content:**
- Dev.to API (public, no auth) - Fetching published articles
  - Endpoint: `https://dev.to/api/articles?username=guimoraes`
  - Used by: `src/app/api/articles/list/route.ts`
  - No API key required for read access

## Data Storage

**Databases:**
- None detected - no database client or ORM in dependencies

**Static Data (JSON):**
- `src/app/api/repos/list/src/data/repositories.json` - Hardcoded repository list
- `src/app/api/testimonials/list/src/data/testimonials.json` - Hardcoded testimonials

**File Storage:**
- Local filesystem only (public assets in `public/`)
- Remote images proxied from `raw.githubusercontent.com` via Next.js image optimization

**Caching:**
- @tanstack/react-query 5.90.12 - Client-side API response caching
- No external cache service (Redis, Memcached, etc.) detected

## Authentication & Identity

**Auth Provider:**
- None detected - no authentication library (NextAuth, Clerk, Auth0, etc.) in dependencies
- The site is a portfolio and appears to have no user authentication

## Monitoring & Observability

**Error Tracking:**
- Sentry (`@sentry/nextjs` ^10.1.0) - Full-stack error monitoring
  - DSN: configured in `sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation-client.ts`
  - Env vars: `NEXT_PUBLIC_SENTRY_ORG`, `NEXT_PUBLIC_SENTRY_PROJECT`
  - Features enabled: Session Replay (`Sentry.replayIntegration()`), request error capture, router transition tracking
  - Source maps uploaded during CI builds
  - Tunnel route: `/monitoring` (bypasses ad blockers)
  - Config files:
    - `sentry.server.config.ts` - Node.js runtime
    - `sentry.edge.config.ts` - Edge runtime
    - `src/instrumentation.ts` - Next.js instrumentation hook
    - `src/instrumentation-client.ts` - Client-side init
  - Build plugin config: `.env.sentry-build-plugin`, `.sentryclirc`

**Analytics:**
- Vercel Analytics (`@vercel/analytics` ^1.6.1) - Page view and event analytics
  - Component: `<Analytics />` rendered in `src/app/[locale]/layout.tsx`
  - No additional env vars required (auto-detected on Vercel)

**Performance:**
- Vercel Speed Insights (`@vercel/speed-insights` ^1.3.1) - Core Web Vitals monitoring
  - Component: `<SpeedInsights />` rendered in `src/app/[locale]/layout.tsx`
  - No additional env vars required (auto-detected on Vercel)

**Logs:**
- Custom console wrapper at `src/util/logToConsole.ts` - Suppresses logs in production (`NODE_ENV === "production"`)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, and Sentry tunnel config)

**CI Pipeline:**
- GitHub Actions (`.github/` directory present)
  - Sentry source map upload activated when `CI` env var is set

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_GH_TOKEN` - GitHub personal access token
- `NEXT_PUBLIC_RESEND_API_KEY` - Resend email API key
- `NEXT_PUBLIC_OPENAI_API_KEY` - OpenAI API key
- `NEXT_PUBLIC_SENTRY_ORG` - Sentry organization slug (build-time)
- `NEXT_PUBLIC_SENTRY_PROJECT` - Sentry project slug (build-time)

**Env var notes:**
- All keys use `NEXT_PUBLIC_` prefix, meaning they are exposed to the browser bundle. This is a potential security concern for server-side secrets (see CONCERNS.md).
- Example file: `.env.example`
- Sentry build plugin has its own config: `.env.sentry-build-plugin`

**Runtime env vars (internal):**
- `NEXT_RUNTIME` - Set by Next.js (`nodejs` or `edge`), used in `src/instrumentation.ts`
- `NODE_ENV` - Standard Node.js env (`production` suppresses console logs)
- `CI` - Set in CI pipelines; affects Sentry logging and Playwright retry behavior
- `TEST_ENV` - Set to `true` when running E2E tests (Playwright scripts)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Dev.to API - outbound fetch from `src/app/api/articles/list/route.ts`
- OpenAI API - outbound calls via SDK
- Resend API - outbound email delivery via SDK

---

*Integration audit: 2026-04-28*
