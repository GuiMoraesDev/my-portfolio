# Architecture

> Last updated: 2026-05-07

## Pattern Overview

**Overall:** Next.js 15 App Router SSR/RSC hybrid with Atomic Design component hierarchy

**Key Characteristics:**
- Default-to-server: pages and layouts are async Server Components; `"use client"` boundary is explicit and narrow
- Locale-aware routing via `next-intl` middleware; all pages live under `src/app/[locale]/`
- `localePrefix: "never"` — URLs never show `/en/` or `/pt/`; locale inferred from `Accept-Language` / cookie by `src/proxy.ts`
- Single-page portfolio; no API routes; all content is static or translation-driven
- Provider tree (`LanguageProvider` → Analytics) wraps the entire app from `AppProvider`

## Layers

**App Shell (Server):**
- Purpose: Root layout — renders nav, header, footer, providers, metadata
- Location: `src/app/[locale]/layout.tsx`
- Contains: HTML shell, sticky nav with `MenuWrapper` + `LanguageSwitcher`, footer with `SocialMedia`, `AppProvider` mount
- Depends on: `AppProvider`, molecule components, `next-intl` server utilities (`getTranslations`)
- Used by: Next.js routing

**Pages (Server):**
- Purpose: Page-level composition of sections
- Location: `src/app/[locale]/page.tsx`
- Contains: `SessionWrapper` layout primitive (local component), two sections: `#presentation` (intro + `TerminalContact`) and `#about-me` (bento grid)
- Depends on: `BentoCell`, `SocialMedia`, `TerminalContact`, `next-intl` `getTranslations`
- Used by: App Shell layout

**Organisms (Client):**
- Purpose: Self-contained interactive features with their own state, hooks, and internal architecture
- Location: `src/components/organisms/`
- Contains: `TerminalContact` — the only organism; a modal terminal dialog with drag support, command dispatch, autocomplete, and history
- Depends on: own hooks (`useControlCommandLine`, `useTerminalInput`), `framer-motion`, atoms, `src/constants/socialMedia.ts`
- Used by: `src/app/[locale]/page.tsx`

**Molecules (Mixed):**
- Purpose: Reusable multi-element UI blocks; some are Server Components, some `"use client"`
- Location: `src/components/molecules/`
- Contains:
  - `BentoCell` — compound component (`BentoCell.Wrapper`, `.Label`, `.Heading`, `.Body`) for grid cards; Server Component
  - `LanguageSwitcher` — `"use client"` toggle between `en`/`pt` via `router.replace`
  - `MenuWrapper` — `"use client"` responsive nav wrapper with mobile hamburger; uses `useHandleClickOutside`
  - `SocialMedia` — async Server Component rendering GitHub/LinkedIn/resume links
  - `Wave` — decorative SVG background; Server Component
- Depends on: atoms, `next-intl`, `next/navigation`, shared hooks
- Used by: pages, layout

**Atoms:**
- Purpose: Primitive, fully reusable UI elements with no business logic
- Location: `src/components/atoms/`
- Contains: `Icon` — wraps Radix UI icons and custom SVGs; uses `tailwind-variants` (`tv()`) for `size` and `rounded` variants; `name` prop is a union of registered icon keys
- Depends on: `@radix-ui/react-icons`, `tailwind-variants`, `src/components/atoms/Icon/CustomIcons/`
- Used by: molecules, organisms

**Providers:**
- Purpose: App-wide React context composition
- Location: `src/provider/AppProvider.tsx`, `src/provider/src/`
- Contains:
  - `AppProvider` — composition root; renders `LanguageProvider` → children + Analytics + SpeedInsights
  - `LanguageProvider` — async Server Component; calls `getMessages()` and passes messages to `NextIntlClientProvider`
- Depends on: `next-intl`, `@vercel/analytics`, `@vercel/speed-insights`
- Used by: `src/app/[locale]/layout.tsx`

**i18n:**
- Purpose: Locale detection, message loading, routing config
- Location: `src/i18n/`
- Contains: `index.ts` (next-intl `getRequestConfig`), `routing.ts` (locales: `["en", "pt"]`, defaultLocale: `"en"`, prefix: `"never"`), `locales/en.json`, `locales/pt.json`
- Depends on: `next-intl`
- Used by: `next.config.ts` plugin, `src/proxy.ts`, `LanguageProvider`, server components

**Shared Hooks:**
- Purpose: Reusable React hooks not tied to a single component
- Location: `src/hooks/`
- Contains: `useDetectClickOutside.tsx` — exports `useHandleClickOutside({ ref, callback })`; attaches `mousedown` listener on `document`
- Used by: `MenuWrapper`

**Constants:**
- Purpose: Module-level shared static values
- Location: `src/constants/`
- Contains: `socialMedia.ts` — exports `GITHUB_URL`, `LINKEDIN_URL`
- Used by: `SocialMedia`, `useControlCommandLine`

## TerminalContact Organism — Internal Architecture

The only organism has its own internal `src/` tree mirroring the top-level project structure.

```
src/components/organisms/TerminalContact/
├── index.ts                          # barrel: re-exports TerminalContact view
└── src/
    ├── views/
    │   └── TerminalContact.tsx       # orchestrator: owns <dialog> ref, open state, framer-motion drag
    ├── components/
    │   ├── TerminalWindow.tsx        # terminal chrome + line list + drag handle; consumes useControlCommandLine
    │   ├── TerminalInput.tsx         # input field + autocomplete suggestion list; consumes useTerminalInput
    │   └── Mascot.tsx                # animated SVG robot mascot with speech bubble (AnimatePresence)
    ├── hooks/
    │   ├── useControlCommandLine.ts  # command dispatch (runCommand), lines state, history state
    │   └── useTerminalInput.ts       # typed input, keyboard nav (↑↓Tab Enter), suggestion filtering
    └── utils/
        └── suggestion.ts             # Levenshtein distance (threshold ≤ 2) for typo suggestions
```

**Responsibilities:**
- `TerminalContact.tsx` — owns `isOpen` state, `useDragControls`; uses Radix UI `Dialog.Root`/`Dialog.Content` (via `src/components/atoms/Dialog/`) rather than a native `<dialog>` ref; hands `dragControls.start` to `TerminalWindow`
- `TerminalWindow.tsx` — calls `useControlCommandLine`; renders typed terminal lines by `type` (`input` | `output` | `error` | `link`); exposes `scrollToBottom` ref
- `TerminalInput.tsx` — purely presentational; delegates all logic to `useTerminalInput`; renders suggestion list when `filteredSuggestions.length > 0`
- `useControlCommandLine.ts` — `runCommand(raw)` is a pure function returning `{ lines, clear? }`; slash commands (`/help`, `/contact`, `/games`, `/open github|linkedin`) and plain commands (`whoami`, `echo`, `clear`); unknown commands pass through `findSuggestion`
- `useTerminalInput.ts` — reads `SLASH_COMMANDS` from `useControlCommandLine` for prefix-filtered autocomplete; handles `Enter`, `ArrowUp`, `ArrowDown`, `Tab`

## Data Flow

**Server render (SSR):**
1. Request → `src/proxy.ts` middleware runs `createIntlMiddleware(routing)` to resolve locale
2. `src/app/[locale]/layout.tsx` (async Server Component) calls `getTranslations()` for nav/footer strings; mounts `AppProvider`
3. `LanguageProvider` calls `getMessages()` (server-side) and passes all messages to `NextIntlClientProvider` for client hydration
4. `src/app/[locale]/page.tsx` calls `getTranslations()` for all page copy; renders presentation section and bento grid
5. `SocialMedia` is an async Server Component calling `getTranslations("presentation")`

**Client interactivity:**
- `LanguageSwitcher` — `router.replace(`/${finalLocale}${hash}`)` triggers a full page navigation to alternate locale
- `MenuWrapper` — local `isOpen` state; closes on outside click via `useHandleClickOutside`
- `TerminalContact` and entire internal tree — `"use client"` throughout

**State management:**
- No global client state. All state is local to its owning component/hook.
- `useControlCommandLine`: `lines[]`, `history[]`, `currentHistoryIndex`
- `useTerminalInput`: `input` string, `suggestionIndex`
- `TerminalContact` view: `isOpen` boolean

## Routing Strategy

- All routes are under `src/app/[locale]/` — a single dynamic segment captures the locale
- `localePrefix: "never"` means URLs display without a locale segment; middleware sets locale in the request context
- `src/proxy.ts` matches all non-asset, non-api, non-_next paths: `/((?!api|_next|_vercel|.*\\..*).*)` 
- Current routes: one page only (`/` → `src/app/[locale]/page.tsx`)

## Error Handling

**Strategy:** Sentry capture at framework boundary + Next.js error boundary

**Patterns:**
- `src/app/global-error.tsx` — catches unhandled render errors; calls `Sentry.captureException(error)`; renders a 500 page
- `src/instrumentation.ts` — registers Sentry for `nodejs` and `edge` runtimes via `NEXT_RUNTIME`
- `src/instrumentation-client.ts` — initializes Sentry on the browser
- `next.config.ts` — `tunnelRoute: "/monitoring"` routes Sentry requests through Next.js to avoid ad-blockers
- Terminal: unknown commands surface an `error`-typed terminal line with a Levenshtein typo suggestion; no exceptions thrown client-side

## Cross-Cutting Concerns

**Monitoring:** Sentry (`@sentry/nextjs`) for server + client error capture; Vercel Analytics + Speed Insights injected by `AppProvider`

**i18n:** All user-facing copy goes through `next-intl`; server components use `getTranslations()`, client components use `useTranslations()` / `useLocale()`

**Styling:** Tailwind CSS v4 applied inline on JSX; `tailwind-merge` (`twMerge`) used in every component for conditional class merging; `tailwind-variants` (`tv()`) used for variant-driven component APIs (e.g., `Icon`)

**Animation:** `motion/react` used in: `TerminalContact.tsx` (drag constraints), `TerminalWindow.tsx` (inline mascot pixel blink), `Mascot.tsx` (bobbing loop, `AnimatePresence` speech bubble)

---

*Architecture analysis: 2026-05-07*
