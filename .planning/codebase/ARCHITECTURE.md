# Architecture

**Analysis Date:** 2026-05-07

## Pattern Overview

**Overall:** Next.js App Router SSR/RSC hybrid — server components for data fetching and layout, client components for interactivity.

**Key Characteristics:**
- Default-to-server: pages and layouts are async server components; client boundary is explicit via `"use client"`
- Locale-aware routing via next-intl middleware; all pages live under `src/app/[locale]/`
- Single-page portfolio with no API routes; all content is static or translation-driven
- Provider tree (QueryProvider + NextIntlClientProvider) wraps the entire app from `AppProvider`

## Layers

**App Shell (Server):**
- Purpose: Root layout — renders nav, header, footer, providers, metadata
- Location: `src/app/[locale]/layout.tsx`
- Contains: HTML shell, sticky nav, footer with contact info, `AppProvider` mount
- Depends on: `AppProvider`, molecule components, next-intl server utilities
- Used by: Next.js routing

**Pages (Server):**
- Purpose: Page-level composition of sections
- Location: `src/app/[locale]/page.tsx`
- Contains: `SessionWrapper` layout primitives, assembles atoms/molecules/organisms into page sections
- Depends on: `BentoCell`, `SocialMedia`, `TerminalContact`, next-intl `getTranslations`
- Used by: App Shell layout

**Organisms (Client):**
- Purpose: Self-contained interactive features with their own state and hooks
- Location: `src/components/organisms/`
- Contains: `TerminalContact` — a modal terminal with drag support, command execution, and history
- Depends on: own hooks (`useControlCommandLine`, `useTerminalInput`), framer-motion, atoms
- Used by: pages

**Molecules (Mixed):**
- Purpose: Reusable multi-element UI blocks without business logic
- Location: `src/components/molecules/`
- Contains: `BentoCell`, `LanguageSwitcher`, `MenuWrapper`, `SocialMedia`, `Wave`
- Depends on: atoms, next-intl client utilities
- Used by: pages, layout

**Atoms:**
- Purpose: Primitive UI elements
- Location: `src/components/atoms/`
- Contains: `Icon` with custom SVG icons (GitHub, LinkedIn)
- Depends on: nothing internal
- Used by: molecules, organisms

**Providers:**
- Purpose: App-wide React context setup
- Location: `src/provider/`
- Contains: `AppProvider` (composition root), `QueryProvider` (TanStack Query), `LanguageProvider` (NextIntlClientProvider + message hydration)
- Depends on: `@tanstack/react-query`, `next-intl`
- Used by: root layout

**i18n:**
- Purpose: Locale detection, message loading, routing config
- Location: `src/i18n/`
- Contains: `index.ts` (request config), `routing.ts` (locale list + prefix strategy), `locales/en.json`, `locales/pt.json`
- Depends on: next-intl
- Used by: `next.config.ts` plugin, middleware (`src/proxy.ts`), layout, pages

## Data Flow

**Translated Content:**

1. Middleware (`src/proxy.ts`) detects locale from request, sets `x-next-intl-locale` header
2. `src/i18n/index.ts` loads the matching JSON file from `src/i18n/locales/`
3. `LanguageProvider` (`src/provider/src/LanguageProvider.tsx`) hydrates `NextIntlClientProvider` with messages
4. Server components call `getTranslations()` directly; client components use `useTranslations()`

**Terminal Command Flow:**

1. User types in `TerminalInput` → `onSubmitCommand` fires
2. `useControlCommandLine` (`src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`) routes input through `runCommand()`
3. `runCommand` returns `TerminalLine[]`; state updates append lines to the display list
4. `TerminalWindow` renders lines list; `scrollToBottom` callback keeps view at latest output

**State Management:**
- No global state beyond React context. All interactive state is local to the component or hook that owns it.
- `useControlCommandLine`: owns `lines`, `history`, `currentHistoryIndex`
- `useTerminalInput`: owns typed input, autocomplete suggestion
- `TerminalContact` view: owns `isOpen` and dialog ref
- TanStack Query (`QueryProvider`) is set up but has no active queries in current codebase

## Routing Strategy

- All routes are under `src/app/[locale]/` — a single segment captures the locale
- `localePrefix: "never"` in `src/i18n/routing.ts` means URLs do not include `/en/` or `/pt/` prefix; locale is inferred from `Accept-Language` or cookie
- Middleware in `src/proxy.ts` handles locale negotiation for all non-asset paths
- Current routes: one page only (`/` → `src/app/[locale]/page.tsx`)

## Error Handling

**Strategy:** Sentry capture for runtime errors; Next.js error boundary for global crashes.

**Patterns:**
- `src/app/global-error.tsx` catches unhandled errors app-wide, calls `Sentry.captureException`, renders a 500 page
- Terminal command not-found uses `findSuggestion` (Levenshtein) to produce actionable error lines instead of silent failure

## Cross-Cutting Concerns

**Monitoring:** Sentry (server + edge configs at `src/instrumentation.ts`, `src/instrumentation-client.ts`); Vercel Analytics + Speed Insights injected via `AppProvider`
**Styling:** Tailwind CSS via `src/styles/globals.css`; `twMerge` used in every component for conditional class merging
**Animation:** Framer Motion used in `TerminalContact` (drag) and `TerminalWindow` (mascot blink)

---

*Architecture analysis: 2026-05-07*
