# History commits in short

## 21082024 - Fix bug "Force update `history.md` when commit on main"

## 24072024 - Force update `history.md` when commit on main

- Use hook `pre-commit` of husky to run command check if history file is updated or not

## 23072024 - Rename project

## 15072024 - Seed data & data migration

- Use `scaffdog` to create template for data migration
- Seed data

### Migrations

- 20240515015345_auto_gen_user_id

## 14072024 - Setup common database package

- Create database with docker-compose
- Setup prisma client in common package
- Write docs setup and usage

## 14072024 - Setup coding style

- Structure workspace
- Config `eslint` and `prettier`
- Setup `husky` and `lint-staged` for pre-commit validation
