# External Integrations

**Analysis Date:** 2026-05-07

## APIs & External Services

**GitHub:**
- Used for: Fetching repository/profile data (referenced in social links and potentially projects section)
  - Auth: `NEXT_PUBLIC_GH_TOKEN` env var
  - Client: Native `fetch` (inferred from env var presence)

**Resend:**
- Used for: Email sending (contact form or notifications)
  - Auth: `NEXT_PUBLIC_RESEND_API_KEY` env var
  - Note: Key is prefixed `NEXT_PUBLIC_` — exposed to client bundle; review if this is intentional

**OpenAI:**
- Used for: AI-powered feature (likely terminal assistant or contact feature)
  - Auth: `NEXT_PUBLIC_OPENAI_API_KEY` env var
  - Note: Key is prefixed `NEXT_PUBLIC_` — exposed to client bundle; this is a security concern

## Data Storage

**Databases:**
- None detected

**File Storage:**
- Remote images served from `raw.githubusercontent.com` (allowed via `next.config.ts` `remotePatterns`)

**Caching:**
- `@tanstack/react-query` for client-side cache; no external cache layer

## Authentication & Identity

**Auth Provider:**
- None detected — portfolio site has no user authentication

## Monitoring & Observability

**Error Tracking:**
- Sentry (`@sentry/nextjs` 10.51)
  - DSN: hardcoded in `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation-client.ts`
  - Org: `guilherme-moraes`, Project: `my-portifolio`
  - Session Replay enabled client-side (10% session rate, 100% on error)
  - Trace sample rate: 1.0 (100%) — consider reducing in production
  - Source maps uploaded at build time via `@sentry/webpack-plugin`
  - Tunnel route: `/monitoring` (bypasses ad-blockers)

**Analytics:**
- Vercel Analytics (`@vercel/analytics`) — page view tracking; no env var required, tied to Vercel deployment
- Vercel Speed Insights (`@vercel/speed-insights`) — Core Web Vitals; no env var required

**Logs:**
- Sentry log ingestion enabled (`enableLogs: true` in all Sentry configs)

## CI/CD & Deployment

**Hosting:**
- Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, and Sentry `automaticVercelMonitors`)

**CI Pipeline:**
- Not detected in repository; Sentry build plugin uses `CI` env var to control log verbosity

## Environment Configuration

**Required env vars (from `.env.example`):**
- `NEXT_PUBLIC_GH_TOKEN` — GitHub API token for repository data
- `NEXT_PUBLIC_RESEND_API_KEY` — Resend email API key
- `NEXT_PUBLIC_OPENAI_API_KEY` — OpenAI API key

**Sentry build credentials:**
- `.env.sentry-build-plugin` present — contains Sentry auth token for source map uploads (do not commit)

**Secrets location:**
- `.env.example` documents required vars
- Actual values in `.env` (not committed)

## Webhooks & Callbacks

**Incoming:**
- `/monitoring` — Sentry tunnel route (proxies browser error reports through Next.js to avoid ad-blockers)

**Outgoing:**
- None detected

## i18n

**Provider:** next-intl 4.11
- Locales: `en` (default), `pt`
- Locale prefix strategy: `never` (locale not shown in URL)
- Middleware: `src/proxy.ts` handles locale routing via `createIntlMiddleware`
- Translations: `src/i18n/locales/`

---

*Integration audit: 2026-05-07*
