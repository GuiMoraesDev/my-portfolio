# Codebase Structure

**Analysis Date:** 2026-05-07

## Directory Layout

```
my-portifolio/
├── src/
│   ├── app/
│   │   └── [locale]/         # Next.js App Router — locale-scoped pages
│   │       ├── layout.tsx    # Root layout: nav, footer, AppProvider
│   │       └── page.tsx      # Home page (only route)
│   │   └── global-error.tsx  # Global error boundary (Sentry)
│   ├── components/
│   │   ├── atoms/            # Primitive UI: Icon, custom SVGs
│   │   ├── molecules/        # Composed UI: BentoCell, LanguageSwitcher, MenuWrapper, SocialMedia, Wave
│   │   └── organisms/
│   │       └── TerminalContact/   # Interactive terminal modal (self-contained feature)
│   │           ├── index.ts
│   │           └── src/
│   │               ├── components/   # TerminalInput, TerminalWindow, Mascot
│   │               ├── hooks/        # useControlCommandLine, useTerminalInput
│   │               ├── utils/        # suggestion.ts (Levenshtein)
│   │               └── views/        # TerminalContact (top-level view + dialog)
│   ├── constants/            # App-wide constants (socialMedia.ts)
│   ├── hooks/                # Shared hooks (useDetectClickOutside)
│   ├── i18n/
│   │   ├── index.ts          # next-intl request config
│   │   ├── routing.ts        # Locale list + prefix strategy
│   │   └── locales/          # en.json, pt.json
│   ├── posts/                # Draft blog posts and templates (not rendered yet)
│   ├── provider/
│   │   ├── AppProvider.tsx   # Composition root: wraps QueryProvider + LanguageProvider
│   │   └── src/
│   │       ├── LanguageProvider.tsx   # NextIntlClientProvider + message hydration
│   │       └── QueryProvider.tsx      # TanStack Query client
│   ├── styles/
│   │   └── globals.css       # Tailwind base styles
│   ├── tests/
│   │   └── home.spec.ts      # Playwright E2E test
│   ├── instrumentation.ts        # Sentry server instrumentation
│   ├── instrumentation-client.ts # Sentry client instrumentation
│   └── proxy.ts              # Next.js middleware: next-intl locale routing
├── public/                   # Static assets (favicons, images)
├── .planning/                # GSD planning documents
├── .github/workflows/        # CI pipeline definitions
├── .husky/                   # Git hooks
├── next.config.ts            # Next.js config: next-intl plugin + Sentry wrapper
├── tsconfig.json             # TypeScript config with `@/` path alias
├── jest.config.ts            # Jest config for unit/component tests
├── jest.setup.ts             # Jest global setup
├── playwright.config.ts      # Playwright E2E config
├── eslint.config.mjs         # ESLint flat config
└── .prettierrc               # Prettier config
```

## Directory Purposes

**`src/app/[locale]/`:**
- Purpose: Next.js App Router pages, locale-scoped
- Contains: `layout.tsx` (shell), `page.tsx` (home page)
- Key files: `layout.tsx` — only place to modify global nav, footer, or metadata

**`src/components/atoms/`:**
- Purpose: Smallest reusable UI units with no business logic
- Contains: `Icon` component with custom SVG icons
- Key files: `src/components/atoms/Icon/index.tsx`

**`src/components/molecules/`:**
- Purpose: Multi-element UI blocks, stateless or lightly stateful, no domain logic
- Contains: `BentoCell` (compound component), `LanguageSwitcher`, `MenuWrapper`, `SocialMedia`, `Wave`
- Pattern: Each molecule has its own directory with `index.ts` barrel re-export

**`src/components/organisms/TerminalContact/`:**
- Purpose: Self-contained interactive feature — terminal modal with command execution
- Internal structure mirrors a mini-app: `views/`, `components/`, `hooks/`, `utils/`
- Key files: `src/views/TerminalContact.tsx` (entry), `src/hooks/useControlCommandLine.ts` (command state)

**`src/provider/`:**
- Purpose: React context providers composed into a single `AppProvider`
- Key files: `AppProvider.tsx` — mount point used in `layout.tsx`

**`src/i18n/`:**
- Purpose: All internationalisation config and message files
- Key files: `routing.ts` (locale list), `locales/en.json` + `locales/pt.json` (all copy)

**`src/constants/`:**
- Purpose: App-wide static values shared across components
- Key files: `socialMedia.ts` — GitHub and LinkedIn URLs used in terminal commands and footer

**`src/hooks/`:**
- Purpose: Shared custom hooks not specific to any one component
- Key files: `useDetectClickOutside.tsx`

**`src/tests/`:**
- Purpose: Playwright E2E tests (separate from co-located unit tests)
- Key files: `home.spec.ts`

**`src/posts/`:**
- Purpose: Draft blog posts and post templates (Markdown); not yet wired to any rendered route

## Naming Conventions

**Files:**
- Components: PascalCase (`TerminalWindow.tsx`, `BentoCell.tsx`)
- Hooks: camelCase prefixed with `use` (`useControlCommandLine.ts`)
- Utilities: camelCase (`suggestion.ts`)
- Constants: camelCase (`socialMedia.ts`)
- Barrel exports: `index.ts` (re-exports named component)

**Directories:**
- Component directories: PascalCase matching the component name (`TerminalContact/`, `BentoCell/`)
- Utility/hook directories: camelCase (`hooks/`, `utils/`)

## Entry Points

- **HTTP:** `src/proxy.ts` — Next.js middleware, first handler for every non-asset request
- **App shell:** `src/app/[locale]/layout.tsx` — root layout, mounts providers, nav, footer
- **Home page:** `src/app/[locale]/page.tsx` — sole rendered route
- **Error boundary:** `src/app/global-error.tsx` — catches unhandled errors
- **Monitoring:** `src/instrumentation.ts` (server), `src/instrumentation-client.ts` (browser)

## Key Files That Govern Behavior

| File | Controls |
|------|----------|
| `src/proxy.ts` | Locale detection and routing for all requests |
| `src/i18n/routing.ts` | Supported locales (`en`, `pt`), prefix strategy (`never`) |
| `src/i18n/locales/en.json` | All English UI copy |
| `src/i18n/locales/pt.json` | All Portuguese UI copy |
| `src/provider/AppProvider.tsx` | Provider composition order |
| `next.config.ts` | next-intl plugin wiring, Sentry config, image domains |
| `tsconfig.json` | `@/` path alias pointing to `src/` |
| `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` | All terminal commands and their output |

## Where to Add New Code

**New page section:**
- Add a `<SessionWrapper>` block in `src/app/[locale]/page.tsx`
- Add copy keys to `src/i18n/locales/en.json` and `src/i18n/locales/pt.json`

**New molecule component:**
- Create `src/components/molecules/ComponentName/ComponentName.tsx` and `index.ts`

**New organism (self-contained feature):**
- Create `src/components/organisms/FeatureName/` with `index.ts`, `src/views/`, `src/hooks/`, `src/components/`

**New terminal command:**
- Edit `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` — add to `runCommand` switch

**New locale string:**
- Add key to both `src/i18n/locales/en.json` and `src/i18n/locales/pt.json`

**New shared hook:**
- Add to `src/hooks/`

**New constant:**
- Add to `src/constants/` (new file per domain, e.g. `navigation.ts`)

## Special Directories

**`.planning/`:**
- Purpose: GSD planning and codebase analysis documents
- Generated: No (manually maintained)
- Committed: Yes

**`src/posts/`:**
- Purpose: Draft blog content — templates and in-progress posts
- Generated: No
- Committed: Yes
- Note: Not connected to any rendered route; future blog feature material

---

*Structure analysis: 2026-05-07*
