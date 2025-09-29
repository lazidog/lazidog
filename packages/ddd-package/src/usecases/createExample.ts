import { Result, ResultAsync, err, ok, okAsync } from "neverthrow";
import { createExampleWorkflowFactory } from "../application/workflows/createExampleWorkflow";
import type { ExampleId } from "../domain/entityId";
import {
  BusinessRuleError,
  type PrismaClientError,
  type ValidationError,
} from "../domain/error";
import { type ExampleEntity, validateExampleId } from "../domain/example";
import type { Context } from "../infra/context";
import { prismaErrorHandler } from "../infra/prismaErrorHandler";
import * as exampleRepo from "../infra/repositories/exampleRepository";

export interface CreateExampleParams {
  exampleId: string;
  name: string;
  description?: string;
}

export interface CreateExampleResult {
  example: ExampleEntity;
}

export type ValidateCreateExampleError =
  | ValidationError
  | BusinessRuleError
  | PrismaClientError;

type UnvalidatedCommand = {
  exampleId: string;
  name: string;
  description?: string;
};
type ValidatedCommand = {
  exampleId: ExampleId;
  name: string;
  description?: string;
};

const validateCreateExampleCommand = (
  unvalidated: UnvalidatedCommand,
): Result<ValidatedCommand, ValidationError> => {
  const exampleId = validateExampleId(unvalidated.exampleId);
  const validatedValues = Result.combine([exampleId]);
  return validatedValues.map(([exampleId]) => ({
    exampleId,
    name: unvalidated.name,
    description: unvalidated.description,
  }));
};

const isReachedLimit =
  (ctx: Context) =>
  (params: {
    exampleId: ExampleId;
  }): ResultAsync<boolean, BusinessRuleError | PrismaClientError> => {
    return ResultAsync.fromPromise(
      exampleRepo.countExamplesById(ctx)(params.exampleId),
      prismaErrorHandler,
    ).andThen((countResult) => {
      if (countResult.isErr()) {
        return err(countResult.error);
      }
      const MAX_ENTITIES_PER_USER = 10;
      if (countResult.value >= MAX_ENTITIES_PER_USER) {
        return err(BusinessRuleError("MaxExamplesPerUser"));
      }
      return ok(true);
    });
  };

export const createExample =
  (ctx: Context) => async (params: CreateExampleParams) => {
    const createExampleWorkflow = createExampleWorkflowFactory();
    return okAsync(params)
      .andThen(validateCreateExampleCommand)
      .andThrough(isReachedLimit(ctx))
      .andThen(createExampleWorkflow)
      .andThen((p) => {
        const x = ResultAsync.combine([
          exampleRepo.createExample(ctx)(p.example),
        ]).map(([p]) => ({
          example: p,
        }));
        return x;
      });
  };
