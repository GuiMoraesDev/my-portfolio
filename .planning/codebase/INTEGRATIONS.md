# External Integrations
> Last updated: 2026-05-07

## APIs & External Services

None — no external API integrations in the codebase.

## Data Storage

**Databases:**
- None detected

**File Storage:**
- No object storage (S3, Cloudinary, etc.) detected

**Caching:**
- None

## Authentication & Identity

**Auth Provider:**
- None — portfolio site has no user authentication

## Monitoring & Observability

**Error Tracking:**
- Sentry (`@sentry/nextjs` ^10.51.0)
  - DSN hardcoded in `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation-client.ts`
  - Org: `guilherme-moraes`, Project: `my-portifolio`
  - Session Replay enabled client-side: 10% session rate, 100% on error
  - Trace sample rate: 1.0 (100%) on all runtimes
  - `sendDefaultPii: true` on server and edge
  - Source maps uploaded at build time via Sentry webpack plugin (token in `.env.sentry-build-plugin`)
  - Tunnel route: `/monitoring` (bypasses ad-blockers)
  - `Suspense Exception` events filtered out in `src/instrumentation-client.ts` via `beforeSend`
  - Router transition tracing: `onRouterTransitionStart` exported from `src/instrumentation-client.ts`
  - Request error capture: `onRequestError` exported from `src/instrumentation.ts`

**Analytics:**
- Vercel Analytics (`@vercel/analytics` ^2.0.1) — page view tracking; rendered in `src/provider/AppProvider.tsx`; no env var required, tied to Vercel deployment
- Vercel Speed Insights (`@vercel/speed-insights` ^2.0.0) — Core Web Vitals reporting; rendered in `src/provider/AppProvider.tsx`

**Logs:**
- Sentry log ingestion enabled (`enableLogs: true`) on all runtimes (server, edge, client)

## CI/CD & Deployment

**Hosting:**
- Vercel (`@vercel/analytics`, `@vercel/speed-insights`, Sentry `automaticVercelMonitors: true` in `next.config.ts`)

**CI Pipeline:**
- No CI config file detected in repository; Sentry build plugin uses `CI` env var to suppress verbose output

## Fonts

**Google Fonts:**
- `Michroma` — title font (`--font-title`); loaded via `@import url(...)` in `src/styles/globals.css`
- `Space Grotesk` (weights 300–700) — body font (`--font-body`); loaded via `@import url(...)` in `src/styles/globals.css`
- No self-hosting; requires network access on first load

## Environment Configuration

**Required env vars:**
- None beyond Sentry build secrets

**Build-only secrets:**
- `.env.sentry-build-plugin` — Sentry auth token for source map uploads (present, not committed)


## Webhooks & Callbacks

**Incoming:**
- `GET/POST /monitoring` — Sentry tunnel route (configured via `tunnelRoute` in `next.config.ts`); proxies browser error reports through Next.js to avoid ad-blockers

**Outgoing:**
- None detected

## i18n

**Provider:** next-intl ^4.11.0
- Locales: `en` (default), `pt`
- Locale prefix strategy: `never` (locale not shown in URL)
- Routing config: `src/i18n/routing.ts`
- Request config: `src/i18n/index.ts` (loads `src/i18n/locales/{locale}.json` dynamically)
- next-intl is fully mocked in unit tests via `__mocks__/next-intl.ts`

---

*Integration audit: 2026-05-07*
