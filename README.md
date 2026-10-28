# My portfolio

[![next](https://img.shields.io/badge/nextjs-16-white?logo=Next.js)](https://nextjs.org/)
[![typescript](https://img.shields.io/badge/typescript-%5E5.9.3-blue?logo=Typescript)](https://www.typescriptlang.org/)
[![tailwindcss](https://img.shields.io/badge/tailwind-%5E4.3.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/docs/installation)
[![next-intl](https://img.shields.io/badge/next--intl-%5E4.12.0-blue)](https://next-intl-docs.vercel.app/)
[![motion](https://img.shields.io/badge/motion-%5E12.38.0-purple)](https://motion.dev/)
[![playwright](https://img.shields.io/badge/playwright-e2e-2EAD33?logo=Playwright)](https://playwright.dev/)
</br>
<small>Every badge is a link to its docs</small>

## About 📖

My personal portfolio: an SSR Next.js site in English and Portuguese with a hero, focus areas, stack, side projects, a contact modal and an interactive terminal you can open from the footer.

## Project Links

- 📱 [Production](https://www.guimoraes.dev/)
- 📝 [Figma](https://www.figma.com/file/JCTgadu9Hf6FMQ26lBiUFN/Personal-Website?type=design&node-id=717%3A2&mode=design&t=4KCXdVFsUCtmVLOm-1)

## Requirements 🛑

- [Node LTS](https://nodejs.org/en/download/)

## Running the project 🧰

Copy `.env.example` to `.env.local` and fill in your keys:

| Variable | Used by |
|---|---|
| `SENTRY_AUTH_TOKEN` | Source map upload at build time |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry error reporting |
| `NEXT_PUBLIC_MIXPANEL_TOKEN` | Mixpanel analytics |

Install dependencies and start the dev server:

```sh
npm install
npm run dev
```

For e2e tests, install the Playwright browsers once:

```sh
npx playwright install
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Next.js dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run check-types` | TypeScript type check |
| `npm run test:unit` | Run unit tests with Jest |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run test:e2e:ui` | Run Playwright tests with UI |

## Project structure 🗂️

```
src/
├── app/[locale]/        # App Router pages (next-intl locale segment, hidden from URLs)
├── components/          # Atomic Design: atoms, molecules, organisms
├── constants/           # Contact links and resume path
├── i18n/                # Routing config and en/pt translations
├── posts/               # Markdown drafts and templates (not rendered yet)
├── provider/            # next-intl and Mixpanel providers
├── styles/              # Tailwind v4 theme tokens and global styles
├── tests/               # Playwright e2e tests
└── utils/               # Shared helpers
```

## Project Maintenance 👨‍🔧

- Commits follow the [Angular commit guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
- Components are organized with [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/).
- [Husky](https://typicode.github.io/husky/) checks types and lint before every commit; do not bypass it.
- CI runs type check, lint, unit and e2e tests on every pull request to `main`.
