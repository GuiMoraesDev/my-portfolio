# Coding Conventions
> Last updated: 2026-05-07

## Naming Patterns

**Files:**
- React components: PascalCase `.tsx` file, same name as the component (e.g., `BentoCell.tsx`, `TerminalWindow.tsx`)
- Hooks: camelCase prefixed with `use` (e.g., `useDetectClickOutside.tsx`, `useControlCommandLine.ts`)
- Barrel re-exports: `index.ts` (not `index.tsx`) per component folder
- Test files: co-located alongside source, named `<source-file>.test.ts(x)` (e.g., `index.test.tsx`, `useControlCommandLine.test.ts`)

**Components:**
- Named exports only — no default exports for components
- Component names are PascalCase: `TerminalContact`, `TerminalWindow`, `Icon`

**Types:**
- `type` keyword preferred over `interface`
- Component prop types: `<ComponentName>Props` suffix (e.g., `IconProps`, `TerminalWindowProps`, `BentoCellHeadingProps`)
- Hook argument types: `Use<HookName>Args` or `Use<HookName>Props` suffix (e.g., `UseTerminalInputArgs`, `UseHandleClickOutsideProps`)
- Internal/utility types: descriptive name without suffix (e.g., `RunCommandResult`)
- Generic page-level props: `Props` (used only in minimal cases like `global-error.tsx`)

**Functions:**
- camelCase for all functions and handlers
- Event handlers prefixed with `handle` (e.g., `handleOpen`, `handleClose`, `handleClickOutside`)
- Callback props prefixed with `on` (e.g., `onClose`, `onSubmitCommand`, `onInputChange`)

**Variables:**
- camelCase throughout
- Boolean state variables use descriptive names: `isOpen`

## Code Style

**Formatting:**
- Prettier with `prettier-plugin-tailwindcss`
- Tailwind class ordering enforced by `eslint-plugin-tailwind-canonical-classes` (warn level) with CSS path `./src/styles/globals.css`
- Configured via `.prettierrc` with `tailwindStylesheet` pointing to `./src/styles/globals.css`

**Linting:**
- ESLint flat config (`eslint.config.mjs`) using `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- `prettier/prettier` rule set to `warn` (not error)
- `no-console`: `error` — console statements are forbidden in all source files
- Unused imports: `error` via `eslint-plugin-unused-imports`; vars prefixed with `_` are exempt
- `@typescript-eslint/no-unused-vars`: off (delegated to `unused-imports` plugin)
- **Fix command:** always use `npm run lint:fix` — never manually patch or use raw `eslint --fix`

**TypeScript:**
- `strict: true` — all strict checks enabled
- `noEmit: true` — type-check only, no compiled output
- `isolatedModules: true`
- Target: `esnext`, module resolution: `bundler`
- Path alias: `@/` maps to `src/`
- Type-only imports must use `import { type X }` inline syntax (enforced by `@typescript-eslint/consistent-type-imports` with `fixStyle: "inline-type-imports"`)

## Import Organization

**Order (enforced by `import/order` rule, error level):**
1. External packages (e.g., `framer-motion`, `react`)
2. Internal aliases with `@/` prefix
3. Relative imports (`../`, `./`)

**Within each group:** alphabetical, case-insensitive. Blank line between each group.

**Example from `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`:**
```typescript
import { motion, useDragControls } from "framer-motion";
import { useRef, useState } from "react";

import { TerminalMascot } from "../components/Mascot";
import { TerminalWindow } from "../components/TerminalWindow";
```

**Path Aliases:**
- `@/` → `src/` (defined in `tsconfig.json` and mirrored in `jest.config.ts`)

## Next.js Directives

- `"use client"` is placed as the very first line (before any imports) in components that use browser APIs, hooks, or interactivity
- Server components (the default) have no directive
- `"use server"` is not used in this codebase

## Component Design

**Exports:**
- Named exports only from all component files and barrel `index.ts` files
- Barrel pattern: `export { BentoCell } from "./BentoCell";` — one line per named export

**Styling:**
- Tailwind CSS v4 utility classes
- Variant-based styling via `tailwind-variants` (`tv()`) for multi-variant components (see `src/components/atoms/Icon/index.tsx`)
- `className` prop accepted and merged via `tv()`'s built-in className support

**Props:**
- Always destructured from a single object parameter — never positional arguments
- `children?: never` used to explicitly forbid children when a component does not accept them

## Testing Attributes

- `data-testid` attributes are placed directly in production JSX (not conditionally added for tests)
- Naming: kebab-case with a component-scoped prefix (e.g., `terminal-open-button`, `terminal-dialog`, `terminal-line-error`)
- Tests query by testid using `getByTestId` / `getAllByTestId` (Testing Library) and `page.getByTestId()` (Playwright)

## Commit Messages

- Angular commit format required: `<type>(<scope>): <short description>`
- Common types in repo history: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
- Husky pre-commit hook runs `npm run check-types` then `npm run lint` before every commit
- Never bypass with `--no-verify`

## Error Handling

- No global error boundary beyond Next.js `src/app/global-error.tsx`
- Hook-level errors surface as typed terminal lines (`{ type: "error", text: string }`) — errors do not throw
- No try/catch observed in UI layer

## Logging

- `no-console` ESLint rule is set to `error` — console statements are disallowed in all source files
- No logging framework is used

---

*Convention analysis: 2026-05-07*
