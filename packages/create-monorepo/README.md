# create-monorepo

`create-monorepo` is an npm package that scaffolds a modern monorepo project structure with sensible defaults for TypeScript, pnpm, TurboRepo, linting, formatting, and Docker support.

## Features

- Monorepo setup with `apps` and `packages` folders
- TypeScript base configuration
- pnpm workspace management
- TurboRepo for task orchestration
- Biome for linting and formatting
- Husky and lint-staged for Git hooks
- Docker and docker-compose templates for local development
- Ready-to-use scripts for building, testing, and development

## Usage

```sh
npm install -g @lazidog/create-monorepo
npx create-monorepo your-project-name
```

This will generate a new project folder with all configuration files and recommended tooling.

## Requirements

- Node.js
- pnpm
- direnv (optional, for environment management)

## License

MIT