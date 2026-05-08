# Coding Conventions

**Analysis Date:** 2026-05-08

## Code Style

**Formatting:**
- Prettier with `prettier-plugin-tailwindcss`
- Config: `.prettierrc` — sets `tailwindStylesheet: ./src/styles/globals.css` for Tailwind class sorting
- Prettier violations surfaced as ESLint warnings via `eslint-plugin-prettier`
- **Fix command:** always use `npm run lint:fix` — never manually patch lint errors or use raw `eslint --fix`

**Linting — `eslint.config.mjs` (flat config):**
- `no-console`: error — console statements are forbidden in all source files
- `unused-imports/no-unused-imports`: error — unused imports must be removed
- `unused-imports/no-unused-vars`: error — unused vars are an error; prefix name with `_` to exempt
- `prettier/prettier`: warn
- `@typescript-eslint/no-unused-vars`: off (delegated to `unused-imports` plugin)
- `@typescript-eslint/consistent-type-imports`: error — inline `type` keyword required for type-only imports
- `import/order`: error — import groups separated by blank lines, alphabetical within each group
- `tailwind-canonical-classes/tailwind-canonical-classes`: warn

**Active ESLint plugins:**
- `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- `eslint-plugin-prettier` / `eslint-config-prettier`
- `eslint-plugin-tailwind-canonical-classes`
- `eslint-plugin-unused-imports`

## Naming Patterns

**Files:**
- React components: PascalCase `.tsx` matching the component name (e.g., `TerminalContact.tsx`, `TerminalWindow.tsx`)
- Hooks: camelCase prefixed with `use` (e.g., `useDetectClickOutside.tsx`, `useControlCommandLine.ts`)
- Utility modules: camelCase (e.g., `suggestion.ts`)
- Test files: same base name as source + `.test.tsx` (components) or `.test.ts` (hooks/logic)
- Barrel files: `index.ts` or `index.tsx` — one per component directory

**Directories:**
- Component groupings: PascalCase matching component name (e.g., `TerminalContact/`, `Icon/`)
- Atomic design tiers: lowercase plural (e.g., `atoms/`, `molecules/`, `organisms/`)

**Functions and Variables:**
- All functions and variables: camelCase
- Event handlers: prefixed with `handle` (e.g., `handleOpen`, `handleClose`, `handleClickOutside`)
- Callback props: prefixed with `on` (e.g., `onClose`, `onSubmitCommand`, `onInputChange`)
- Boolean state: descriptive noun (e.g., `isOpen`)

**Constants:**
- Shared/exported constants: SCREAMING_SNAKE_CASE (e.g., `GITHUB_URL`, `LINKEDIN_URL` in `src/constants/`)

**Components:**
- Named exports only — no default exports for components
- PascalCase: `TerminalContact`, `Icon`, `BentoCell`

## TypeScript

**Config:** `tsconfig.json`
- `strict: true` — all strict checks enabled
- `noEmit: true` — type-check only, no compiled output
- `isolatedModules: true`
- `target: "esnext"`, `moduleResolution: "bundler"`
- `resolveJsonModule: true` — JSON imports supported
- Path alias: `@/` maps to `src/`

**Type patterns:**
- `type` keyword preferred over `interface` for all prop and utility shapes
- Component prop types: `<ComponentName>Props` suffix (e.g., `IconProps`, `TerminalWindowProps`)
- Hook argument types: `Use<HookName>Props` or `Use<HookName>Args` (e.g., `UseHandleClickOutsideProps`, `UseTerminalInputArgs`)
- Internal/utility types: descriptive name without suffix (e.g., `RunCommandResult`)
- `VariantProps<typeof tv()>` used to derive prop types from `tailwind-variants` definitions
- `children?: never` added explicitly when a component must not accept children

**Type imports — must use inline `type` keyword:**
```typescript
import { type ComponentPropsWithRef } from "react";
import { type VariantProps, tv } from "tailwind-variants";
```

**Avoid `any`:**
- When unavoidable (e.g., jsdom polyfills in test setup), use:
  `// eslint-disable-next-line @typescript-eslint/no-explicit-any`

## Import Style

**Order** (enforced by `import/order` at error level — blank line between groups, alphabetical within):

1. Side-effect imports (e.g., `import "@/styles/globals.css"`)
2. External packages (e.g., `framer-motion`, `react`, `next/link`, `next-intl`)
3. Internal `@/` alias imports (e.g., `@/components/...`, `@/provider/...`)
4. Relative imports (`../`, `./`)

**Example from `src/app/[locale]/layout.tsx`:**
```typescript
import "@/styles/globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher";
import { AppProvider } from "@/provider/AppProvider";
```

**Path alias:**
- `@/` → `src/` (defined in `tsconfig.json`, mirrored in `jest.config.ts`)
- Always use `@/` for cross-directory imports; never use `../../` across feature boundaries

**Barrel exports:**
- Each component directory exports via `index.ts` or `index.tsx`
- Consumers import from the directory: `import { Icon } from "@/components/atoms/Icon"`
- Barrel pattern: `export { BentoCell } from "./BentoCell";` — one named export per line

## Commit Messages

**Format:** Angular commit format
```
<type>(<optional-scope>): <short summary in imperative mood>
```

**Types observed in repo history:** `feat`, `fix`, `chore`, `refactor`, `docs`, `test`

**Rules:**
- Summary in imperative mood, no period at end
- Scope is optional but encouraged for specificity

## Linting & Pre-commit

**Pre-commit hook (`.husky/pre-commit`):**
```
npm run check-types
npm run lint
```
Both must pass before a commit is accepted. Never bypass with `--no-verify`.

## Tailwind CSS

- Version: Tailwind CSS v4
- `tailwind-variants` (`tv()`) for variant-based component styling — preferred over manual conditional class strings
- `tailwind-merge` (`twMerge`) when merging externally-supplied `className` with internal classes
- Canonical class ordering enforced by `eslint-plugin-tailwind-canonical-classes` (references `./src/styles/globals.css`)

## Component Design

**Next.js directives:**
- `"use client"` placed as the very first line (before all imports) in components using browser APIs, hooks, or interactivity
- Server components (the default) have no directive
- `"use server"` is not used in this codebase

**Props:**
- Always destructured from a single object parameter — never positional arguments

**Testing attributes:**
- `data-testid` placed directly in production JSX (not conditionally added for tests)
- Naming: kebab-case with component-scoped prefix (e.g., `terminal-open-button`, `terminal-dialog`, `terminal-line-error`)
- Query via `getByTestId` / `getAllByTestId` (Testing Library) and `page.getByTestId()` (Playwright)

## Error Handling

- Global boundary: `src/app/global-error.tsx` (Sentry-integrated)
- Hook-level errors: surface as typed terminal line objects `{ type: "error", text: string }` — not thrown exceptions
- No try/catch in UI layer

## Logging

- `no-console` ESLint rule is set to `error` — no console statements in any source file
- No logging framework is used

---

*Convention analysis: 2026-05-08*
