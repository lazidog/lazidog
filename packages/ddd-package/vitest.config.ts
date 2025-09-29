import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    // Disable parallel execution to avoid database conflicts
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    env: {
      TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        "postgresql://postgres:postgres@localhost:5433/db-test",
    },
  },
});
