# pnpm-monorepo-boilerplate

## Before start

- Rename project in `package.json`, `docker-compose.yml`
- Find `FIXME` and update to your own value

## Prepare

- direnv

## TechStack

- Coding style & project structure
  - [monorepo](https://www.notion.so/monorepo-46b57bbc6f164e13b6c9dfbf5a1a8386?pvs=21)
  - [pnpm workspace](https://www.notion.so/pnpm-workspace-865e4ce236254a96a1b29b7ad0a1ce15?pvs=21)
  - [App Route](https://www.notion.so/Pages-Route-vs-App-Route-e86a58688c634d848ce8093eea0441a5?pvs=21)
  - [Husky & lint-staged](https://www.notion.so/Husky-and-lint-staged-c59d88f092984089a22d2c4d287bd1ad)
- Build tool
  - [Docker](TBD)
- Database
  - [Postgres](TBD)
  - [Prisma](TBD)

## Library in use

- root:
  - eslint
  - husky
  - lint-staged
- packages:
  - db:
    - prisma
    - scaffdog: create file template (use for create data migration template)
- apps:
