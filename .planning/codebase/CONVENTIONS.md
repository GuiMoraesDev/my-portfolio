# Coding Conventions

**Analysis Date:** 2026-05-07

## Naming Patterns

**Files:**
- React components: PascalCase matching the export name — `BentoCell.tsx`, `TerminalInput.tsx`
- Hooks: camelCase prefixed with `use` — `useDetectClickOutside.tsx`, `useControlCommandLine.ts`
- Barrel files: `index.ts` or `index.tsx` at directory root re-exporting the primary named export
- Test files: co-located with the source file, same name with `.test.tsx` / `.test.ts` suffix
- Playwright specs: `*.spec.ts` inside `src/tests/`

**Components:**
- Named exports only — no default exports on components
- Example: `export const Icon = ...`, `export const BentoCell = { Wrapper, Label, Heading, Body }`

**Hooks:**
- Named exports, camelCase with `use` prefix
- Accept a single options object (destructured), never positional args
- Example: `useHandleClickOutside({ ref, callback })`

**Types:**
- Defined inline near usage or at the top of the file
- Named with PascalCase and a `Props` suffix for component props: `IconProps`, `BentoCellHeadingProps`
- Type imports use inline syntax: `import { type ComponentProps } from "react"`

**Constants:**
- SCREAMING_SNAKE_CASE for exported constants: `GITHUB_URL`, `LINKEDIN_URL`
- Stored in `src/constants/`

## Code Style

**Formatting:**
- Tool: Prettier with `prettier-plugin-tailwindcss`
- Tailwind stylesheet: `./src/styles/globals.css`
- Config: `.prettierrc`
- Run via: `npm run lint:fix` (do NOT use raw `eslint --fix`)

**Linting:**
- Tool: ESLint flat config at `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`, `tailwind-canonical-classes`
- Key rules:
  - `no-console`: error — no console statements allowed
  - `unused-imports/no-unused-imports`: error — remove all unused imports
  - `unused-imports/no-unused-vars`: error — prefix unused vars/args with `_` to suppress
  - `@typescript-eslint/consistent-type-imports`: error — enforce `import { type X }` inline style
  - `import/order`: error — imports must be sorted alphabetically with newlines between groups
  - `tailwind-canonical-classes`: warn — Tailwind classes must follow canonical order

## Import Organization

**Order (enforced by `import/order` rule, alphabetical within groups):**
1. External packages (e.g., `react`, `framer-motion`, `@radix-ui/react-icons`)
2. Internal aliases starting with `@/` (e.g., `@/components/...`, `@/hooks/...`)
3. Relative imports (e.g., `./useControlCommandLine`)

**Blank line required between each group.**

**Path Aliases:**
- `@/*` → `src/*` (defined in `tsconfig.json` and mirrored in `jest.config.ts`)
- Always prefer `@/` over deep relative paths for cross-module imports
- Use relative imports only within the same component's local `src/` subtree

**Type Imports:**
- Use inline `type` keyword: `import { type ComponentProps } from "react"`
- Never use `import type { ... }` (top-level form) — ESLint enforces inline style

## Component Structure Patterns

**Server Components (default in Next.js App Router):**
- No directive needed
- Keep data fetching and async logic here

**Client Components:**
- Add `"use client"` as the very first line
- Use when hooks, event handlers, or browser APIs are needed
- Examples: `MenuWrapper.tsx`, `TerminalContact.tsx`, `TerminalInput.tsx`

**Compound Components:**
- Group sub-components as properties of a namespace object
- Example pattern from `BentoCell.tsx`:
  ```tsx
  export const BentoCell = { Wrapper, Label, Heading, Body };
  ```

**Styling:**
- Tailwind CSS only — no CSS modules, no inline `style` props for layout
- `twMerge` for conditional class merging when Tailwind variants are not involved
- `tailwind-variants` (`tv`) for multi-variant component APIs (see `Icon/index.tsx`)
- `data-*` attributes for state-driven styles (e.g., `data-is-open={isOpen}`) instead of inline conditionals

**Props:**
- Extend native HTML element props with `ComponentProps<"element">` or `ComponentPropsWithRef<"element">`
- Spread remaining props onto the root DOM element
- Use `children?: never` to explicitly disallow children when not supported

## Commit Message Format

- Conventional Commits style: `type: description`
- Types observed: `feat`, `refactor`, `fix`
- Lowercase, imperative mood, no period
- Examples from history:
  - `feat: make terminal window draggable via framer-motion`
  - `refactor: move input logic into TerminalInput, TerminalWindow owns only lines and scroll`
  - `feat: suggest closest command on typo using Levenshtein distance`

---

*Convention analysis: 2026-05-07*
