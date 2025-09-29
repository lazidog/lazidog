import type { ResultAsync } from "neverthrow";
import type { PrismaClientError } from "../error";
import type { ExampleEntity } from "../example";

export type CreateExample<T extends ExampleEntity> = (
  params: Omit<T, "id" | "createdAt" | "updatedAt">,
) => ResultAsync<T, PrismaClientError>;
