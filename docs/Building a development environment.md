# Building a development environment

## Required tool

- node
- pnpm
- docker
- direnv (notes: `eval "$(direnv hook zsh)"`)

## Prepare Database

### Install

```sh
docker compose up
```

### Migration

```sh
$ cd packages/db/workspace/local
#log --> direnv: loading packages/db/workspace/local/.envrc
#log --> direnv: export +DATABASE_URL +DIRECT_URL
pnpm prisma migrate dev

# check schema
psql -h localhost -p 5432 -U postgres -d postgres
postgres=# \dt
```

### Seed data

The data defined in `packages/db/prisma/seed.ts`

```sh
pnpm seed
```
