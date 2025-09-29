import { type Result, ResultAsync, ok } from "neverthrow";
import type { ExampleId } from "../../domain/entityId";
import type { PrismaClientError } from "../../domain/error";
import type { ExampleEntity } from "../../domain/example";
import type { CreateExample } from "../../domain/repositories/exampleRepository";
import type { Context } from "../context";
import { prismaErrorHandler } from "../prismaErrorHandler";

export const createExample =
  <T extends ExampleEntity>(_ctx: Context): CreateExample<T> =>
  (params) => {
    return ResultAsync.fromPromise(
      Promise.resolve({
        id: "example-id" as ExampleId,
        name: params.name,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ExampleEntity),
      prismaErrorHandler,
    ).andThen((createdExample) => {
      return ok(createdExample as T);
    });
  };

export const findExampleById =
  (_ctx: Context) =>
  async (
    exampleId: ExampleId,
  ): Promise<Result<ExampleEntity, PrismaClientError>> => {
    return ResultAsync.fromPromise(
      Promise.resolve({
        id: exampleId,
        name: "Example Name",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ExampleEntity),
      prismaErrorHandler,
    );
  };

export const countExamplesById =
  (_ctx: Context) =>
  (_exampleId: ExampleId): ResultAsync<number, PrismaClientError> => {
    return ResultAsync.fromPromise(Promise.resolve(0), prismaErrorHandler);
  };
