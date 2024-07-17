# Isomorphic - React.js Next.js Admin Dashboard

This monorepo is powered by [Turborepo](https://turbo.build/), a tool that optimizes build times for monorepo projects. Turborepo leverages your existing package.json scripts and dependencies, making it easy to set up and use.

## Getting Started

System Requirements:

- [Node.js 18.17](https://nodejs.org/en) or later.
- [Turborepo 2.0.1](https://turbo.build/repo/docs/getting-started/installation)
- [pnpm - package manager 9.1.4](https://pnpm.io/installation#using-npm) (recommended). We used this version. But you can change it as you want. Learn more about [Turborepo packageManager](https://turbo.build/repo/docs/getting-started/support-policy)

**Tuborepo**: For quick install just run the following command it will install turbo in your system globally.

```bash
npm install -g turbo
```

## Starting development server

To start the development server locally run the following commands

```bash
pnpm install

pnpm run dev

```

To build locally and view the local build run the following commands.

```bash
pnpm run build

pnpm run start

```

**You can find more commands in the project root `package.json` file.**
To learn more about these commands checkout our [**Documentation**](https://isomorphic-doc.vercel.app/getting-started/installation)

In your monorepo's root directory, there is a `turbo.json` file. This file allows you to configure custom tasks, set global dependencies, set environment variables, and more. [**Learn More about Turborepo**](https://turbo.build/repo/docs/handbook)

Happy coding! 🚀
