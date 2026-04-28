# Code Conventions

**Analysis Date:** 2026-04-28

## TypeScript

- **Strict mode enabled** — `"strict": true` in `tsconfig.json`
- Target: `esnext`, module resolution: `bundler`
- `isolatedModules: true` — no cross-file type-only constructs
- `resolveJsonModule: true` — JSON files importable as typed modules
- **Consistent type imports enforced** via ESLint: `@typescript-eslint/consistent-type-imports` with `inline-type-imports` fix style
  - Example: `import { type Foo } from './foo'` (not a separate `import type` line)

## ESLint Rules

Config: `eslint.config.mjs` (flat config format)

Key rules:
- `no-console: error` — no console.log in source; use `src/util/logToConsole.ts` wrapper
- `unused-imports/no-unused-imports: error` — zero dead imports
- `unused-imports/no-unused-vars: error` — unused vars disallowed; prefix with `_` to suppress
- `import/order: error` — imports must be grouped with newlines between groups, alphabetized (case-insensitive)
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, `eslint-config-prettier`

Pre-commit hook runs: `npm run check-types && npm run lint`

## Prettier

Config: `.prettierrc`
```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/styles/globals.css"
}
```
- Tailwind class sorting is automatic via `prettier-plugin-tailwindcss`
- Prettier integrated into ESLint via `eslint-config-prettier` (disables conflicting rules)

## Naming Conventions

**Components (files):**
- PascalCase matching exported name: `ArticlesList.tsx`, `Header.tsx`, `SocialMedia.tsx`
- Entry point always `index.tsx` (JSX) or `index.ts` (non-JSX)
- Implementation file: `ComponentName/ComponentName.tsx` (for molecules/organisms)
- Re-export file: `ComponentName/index.tsx` or `ComponentName/index.ts`

**Non-component files:**
- Utilities: camelCase — `capitalizeFirstLetter.ts`, `logToConsole.ts`
- Services: `api.<resource>.ts` — e.g., `api.articles.ts`, `api.testimonials.ts`
- Schemas: `schema.ts` inside a named directory
- Tests: `<name>.spec.ts`
- Types: `index.ts` inside a `@types/` directory
- Route handlers: `route.ts` (Next.js convention)

**Directories:**
- Component directories: PascalCase — `Icon/`, `Header/`, `Articles/`
- Layer directories: lowercase plural — `atoms/`, `molecules/`, `organisms/`
- Organism internals: `src/` subdirectory containing `views/`, `components/`, `provider/`
- Type directories: `@types/` (prefixed with `@`)

**CSS classes:**
- Tailwind utility classes only — no custom CSS classes in components
- Complex class composition via `tailwind-variants` and `tailwind-merge`
- Global styles only in `src/styles/globals.css`

## Import Patterns

- **Path alias:** `@/*` maps to `./src/*` (configured in `tsconfig.json`)
  - Example: `import { api } from '@/services/api'`
- Use absolute `@/` imports for cross-module references
- Use relative imports only within the same component's own subdirectory
- Import groups ordered alphabetically with blank lines between groups (enforced by ESLint)

## Component Structure Patterns

**Atom:** single file, no sub-structure
```
atoms/ComponentName/
  index.tsx          ← implementation + export
  styles.css         ← optional, component-scoped styles
```

**Molecule:** split implementation from entry
```
molecules/ComponentName/
  index.tsx          ← re-export only
  ComponentName.tsx  ← implementation
```

**Organism:** full internal module structure
```
organisms/FeatureName/
  index.ts                        ← public re-export
  src/
    views/FeatureName.tsx         ← main view component
    components/                   ← sub-components
    provider/                     ← context/state if needed
    @types/index.ts               ← local type definitions
```

## State Management

- **Server state:** TanStack Query (`@tanstack/react-query`) — all API data fetching
- **Form state:** React Hook Form (`react-hook-form`) with Zod resolvers
- **Local UI state:** React `useState` / `useReducer` within components
- **No global client state manager** (no Redux, Zustand, etc.)
- `QueryProvider` wraps the app at `src/provider/QueryProvider/index.tsx`

## CSS / Styling

- **Tailwind CSS v4** — utility-first, configured via `postcss.config.mjs`
- `tailwind-variants` for component variants (replaces `cva`)
- `tailwind-merge` for conditional class merging
- Global CSS: `src/styles/globals.css` (Tailwind directives + custom properties)
- No CSS modules — Tailwind classes directly in JSX

## Animation

- **Motion** (`motion` package, formerly Framer Motion) for animations
- Used in organisms and page-level transitions

## Internationalization

- `next-intl` for i18n; locales: `en` (default), `pt`
- Translation keys in `src/i18n/locales/en.json` and `pt.json`
- Always add keys to both locale files when creating new translatable text
- Access via `useTranslations()` hook in components

## Git Conventions

- Pre-commit: type-check + lint (via Husky)
- Branches: feature branches targeting `homolog` or `main`
- CI runs on PRs to `homolog` and `main`

---

*Conventions analysis: 2026-04-28*
