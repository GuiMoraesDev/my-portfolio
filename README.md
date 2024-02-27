# My portfolio

[![next](https://img.shields.io/badge/nextjs-%5E14.1.0-white?logo=Next.js)](https://nextjs.org/)
[![typescript](https://img.shields.io/badge/typescript-%5E5.0.2-blue?logo=Typescript)](https://www.typescriptlang.org/)
[![@tanstack/react-query](https://img.shields.io/badge/@tanstack/react--query-%5E5.18.1-FF4154?logo=ReactQuery)](https://tanstack.com/query/v5)
[![openai](https://img.shields.io/badge/openai-%5E4.28.0-412991?logo=openai)](https://platform.openai.com/docs/overview)
[![react-email](https://img.shields.io/badge/react--email-%5E2.0.0-214c69)](https://react.email/)
[![zod](https://img.shields.io/badge/zod-%5E3.22.4-3E67B1?logo=zod)](https://zod.dev/)
[![tailwindcss](https://img.shields.io/badge/talwind-%5E3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/docs/installation)
[![react-hook-form](https://img.shields.io/badge/react--hook--form-%5E7.50.1-EC5990?logo=reacthookform)](https://react-hook-form.com/)
</br>
<small>Every badge are links to their doc</small>

<a href="https://www.linkedin.com/in/guimoraesdev/">
  <img src="./public/cover.png" alt="" height="300px"/>
</a>

</br>

## Description of that project 📖

A SSR website to be my personal portfolio;

## Project Links

- 📝[Figma Project](https://www.figma.com/file/JCTgadu9Hf6FMQ26lBiUFN/Personal-Website?type=design&node-id=717%3A2&mode=design&t=4KCXdVFsUCtmVLOm-1)
- 📱[Production Link](www.guimoraes.dev/)

## Requirements 🛑

For development, you will need some software installed in your environment.

- [Node LTS](https://nodejs.org/en/download/)
- [PNPM](https://pnpm.io/installation)

## Running the project 🧰

Create a copy of the `.env.example` file, rename it to `.env.local` and add your own keys.

Use PNPM to install all dependencies into the project.

```sh
pnpm install
```

You can run the project with the following script.

```sh
pnpm dev
```

There are two dev scripts in the project, one for the next.js dev server, and another to the react-email dev server.

```sh
pnpm dev:app # Next.JS dev server
pnpm dev:email # React Email dev server
```

## Project Maintenance 👨‍🔧

- Project is using Angular Commits Guide Line, for more information, click on this [link](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).
- Use [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/) to organize and maintain this project.
- [Husky](https://typicode.github.io/husky/) will run commit hooks before every commit message to test the types and run the linting, do not bypass it.

## Tasks

- [ ] Add a limiter to the generation function, max 3 per day per session;
- [ ] Add test to form schema;
- [ ] Add test to check generation function limiter;
- [ ] Add rendering states tests;

## Doubts

Should show the preview in browsers which has no support?

- [ ] Yes, the UI must be equal and don't show different elements on diferente browsers
- [ ] No, The UI should not show an not usable block to the user polluting their screen
  - Why?
