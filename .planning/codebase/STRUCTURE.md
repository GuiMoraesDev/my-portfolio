# Codebase Structure

> Last updated: 2026-05-07

## Directory Layout

```
my-portifolio/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # Root layout: nav, footer, AppProvider, metadata
│   │   │   └── page.tsx            # Home page (only route)
│   │   ├── favicon.ico
│   │   └── global-error.tsx        # Global error boundary (Sentry)
│   ├── components/
│   │   ├── atoms/
│   │   │   └── Icon/
│   │   │       ├── CustomIcons/
│   │   │       │   ├── github.tsx
│   │   │       │   └── linkedin.tsx
│   │   │       ├── index.tsx       # Icon component with tailwind-variants
│   │   │       └── index.test.tsx
│   │   ├── molecules/
│   │   │   ├── BentoCell/
│   │   │   │   ├── BentoCell.tsx   # Compound component (Wrapper, Label, Heading, Body)
│   │   │   │   └── index.ts
│   │   │   ├── LanguageSwitcher/
│   │   │   │   ├── LanguageSwitcher.tsx
│   │   │   │   └── index.ts
│   │   │   ├── MenuWrapper/
│   │   │   │   ├── MenuWrapper.tsx
│   │   │   │   └── index.ts
│   │   │   ├── SocialMedia/
│   │   │   │   ├── SocialMedia.tsx
│   │   │   │   └── index.tsx
│   │   │   └── Wave/
│   │   │       ├── Wave.tsx
│   │   │       └── index.ts
│   │   └── organisms/
│   │       └── TerminalContact/
│   │           ├── index.ts        # Barrel: re-exports TerminalContact view
│   │           └── src/
│   │               ├── components/
│   │               │   ├── Mascot.tsx
│   │               │   ├── TerminalInput.tsx
│   │               │   └── TerminalWindow.tsx
│   │               ├── hooks/
│   │               │   ├── useControlCommandLine.ts
│   │               │   ├── useControlCommandLine.test.ts
│   │               │   ├── useTerminalInput.ts
│   │               │   └── useTerminalInput.test.ts
│   │               ├── utils/
│   │               │   └── suggestion.ts
│   │               └── views/
│   │                   ├── TerminalContact.tsx
│   │                   └── TerminalContact.test.tsx
│   ├── constants/
│   │   └── socialMedia.ts          # GITHUB_URL, LINKEDIN_URL
│   ├── hooks/
│   │   ├── useDetectClickOutside.tsx
│   │   └── useDetectClickOutside.test.tsx
│   ├── i18n/
│   │   ├── index.ts                # next-intl getRequestConfig
│   │   ├── routing.ts              # locales, defaultLocale, localePrefix
│   │   └── locales/
│   │       ├── en.json
│   │       └── pt.json
│   ├── posts/                      # Draft blog posts and templates (not rendered)
│   │   ├── draft/
│   │   └── templates/
│   ├── provider/
│   │   ├── AppProvider.tsx         # Composition root
│   │   └── src/
│   │       ├── LanguageProvider.tsx
│   │       └── QueryProvider.tsx
│   ├── styles/
│   │   └── globals.css             # Tailwind base styles
│   ├── tests/
│   │   └── home.spec.ts            # Playwright E2E test
│   ├── instrumentation.ts          # Sentry server/edge registration
│   ├── instrumentation-client.ts   # Sentry browser initialization
│   └── proxy.ts                    # Next.js middleware: next-intl locale routing
├── public/                         # Static assets (GM-Resume.pdf, images, favicons)
├── .planning/codebase/             # GSD codebase analysis documents
├── .github/workflows/              # CI pipeline definitions
├── .husky/                         # Git hooks (pre-commit: type-check + lint)
├── next.config.ts                  # Next.js config: next-intl plugin + Sentry wrapper
├── tsconfig.json                   # TypeScript config; defines @/ alias → src/
├── jest.config.ts                  # Jest config (unit tests)
├── jest.setup.ts                   # Jest global setup
├── playwright.config.ts            # Playwright E2E config
├── eslint.config.mjs               # ESLint flat config
└── package.json
```

## Directory Purposes

**`src/app/[locale]/`:**
- All Next.js App Router routes; the `[locale]` segment captures the active locale
- `layout.tsx` is the only place to modify global nav, footer, metadata, or provider wrapping
- `page.tsx` is the only rendered route; add new page sections here as `<SessionWrapper>` blocks

**`src/components/atoms/Icon/`:**
- The sole atom; wraps `@radix-ui/react-icons` and custom SVGs behind a typed `name` prop
- Add new icon sources to `CustomIcons/` and register the name in the `icons` map in `index.tsx`

**`src/components/molecules/`:**
- Each molecule is a self-contained directory with a `ComponentName.tsx` implementation and an `index.ts` barrel
- Molecules are composable UI blocks; they may use `"use client"` but contain no domain logic

**`src/components/organisms/TerminalContact/`:**
- The only organism; a self-contained interactive feature
- Internal `src/` tree mirrors the top-level project layout: `views/`, `components/`, `hooks/`, `utils/`
- Public interface: `index.ts` barrel re-exports only `TerminalContact` from `src/views/TerminalContact.tsx`

**`src/constants/`:**
- App-wide static values shared across components and hooks
- One file per domain concern (e.g., `socialMedia.ts`, not a single monolithic `constants.ts`)

**`src/hooks/`:**
- Shared custom hooks used by more than one component
- Organism-specific hooks live inside the organism's own `src/hooks/` directory, not here

**`src/i18n/`:**
- All internationalisation config and translation files
- `routing.ts` is the single source of truth for supported locales
- `locales/en.json` and `locales/pt.json` hold all user-facing copy; keys must be kept in sync

**`src/provider/`:**
- `AppProvider.tsx` is the composition root; add new app-wide providers here
- Individual providers live in `src/provider/src/` as separate files

**`src/styles/`:**
- Only `globals.css`; component-level styles are handled via Tailwind utility classes inline on JSX

**`src/tests/`:**
- Playwright E2E tests only; excluded from Jest via `modulePathIgnorePatterns`
- Unit/component tests live co-located with their source files as `*.test.ts(x)`

**`src/posts/`:**
- Markdown drafts and post templates; not connected to any rendered route
- Future blog feature material; safe to ignore for current development

## Naming Conventions

**Files:**
- React components: PascalCase matching the export name (`TerminalWindow.tsx`, `BentoCell.tsx`)
- Hooks: camelCase prefixed with `use` (`useControlCommandLine.ts`, `useTerminalInput.ts`)
- Utilities: camelCase describing the domain (`suggestion.ts`)
- Constants: camelCase describing the domain (`socialMedia.ts`)
- Barrel files: always `index.ts` (or `index.tsx` when the barrel itself contains JSX — see `SocialMedia/index.tsx`)
- Test files: same name as source + `.test.ts(x)` suffix, co-located

**Directories:**
- Component directories: PascalCase matching the component (`TerminalContact/`, `BentoCell/`, `Icon/`)
- Generic concern directories: camelCase (`hooks/`, `utils/`, `views/`, `constants/`, `styles/`)

## Entry Points

| Entry | File | Purpose |
|-------|------|---------|
| HTTP middleware | `src/proxy.ts` | Locale negotiation for every non-asset request |
| App shell | `src/app/[locale]/layout.tsx` | Root layout, providers, nav, footer |
| Home page | `src/app/[locale]/page.tsx` | The sole rendered route |
| Error boundary | `src/app/global-error.tsx` | Catches unhandled render errors |
| Server monitoring | `src/instrumentation.ts` | Sentry server + edge init |
| Client monitoring | `src/instrumentation-client.ts` | Sentry browser init |

## Key Files That Govern Global Behavior

| File | Controls |
|------|---------|
| `src/proxy.ts` | Locale detection and routing for all requests |
| `src/i18n/routing.ts` | Supported locales (`en`, `pt`), URL prefix strategy |
| `src/i18n/locales/en.json` | All English UI copy |
| `src/i18n/locales/pt.json` | All Portuguese UI copy |
| `src/provider/AppProvider.tsx` | Provider composition order |
| `next.config.ts` | next-intl plugin wiring, Sentry config, image domains |
| `tsconfig.json` | `@/` path alias pointing to `src/` |
| `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts` | All terminal commands and their output |

## Where to Add New Code

**New page section:**
- Add a `<SessionWrapper id="section-id">` block in `src/app/[locale]/page.tsx`
- Add all copy keys to both `src/i18n/locales/en.json` and `src/i18n/locales/pt.json`

**New molecule component:**
- Create `src/components/molecules/ComponentName/ComponentName.tsx`
- Create `src/components/molecules/ComponentName/index.ts` with named re-export

**New organism (self-contained feature):**
- Create `src/components/organisms/FeatureName/index.ts` (barrel)
- Create `src/components/organisms/FeatureName/src/views/`, `hooks/`, `components/`, `utils/` as needed

**New terminal command:**
- Edit `src/components/organisms/TerminalContact/src/hooks/useControlCommandLine.ts`
- Add a case to the `runCommand` switch for slash commands or the plain-command switch
- If the command should appear in autocomplete, add it to the `SLASH_COMMANDS` array

**New icon:**
- Add SVG component to `src/components/atoms/Icon/CustomIcons/`
- Register it in the `icons` map in `src/components/atoms/Icon/index.tsx`

**New locale string:**
- Add the key to both `src/i18n/locales/en.json` and `src/i18n/locales/pt.json`

**New shared hook:**
- Add to `src/hooks/` if used by multiple components
- Add inside the organism's `src/hooks/` if specific to that organism

**New app-wide constant:**
- Add to a file in `src/constants/` (new file per domain, e.g., `navigation.ts`)

## Special Directories

**`.planning/codebase/`:**
- GSD codebase analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Committed to repo; updated by the `/gsd-map-codebase` command

**`src/posts/`:**
- Draft blog content (Markdown); not wired to any route
- Safe to ignore; future feature material

**`public/`:**
- Static assets served at `/`; includes `GM-Resume.pdf` linked from `SocialMedia`
- Not processed by webpack/Turbopack

---

*Structure analysis: 2026-05-07*
