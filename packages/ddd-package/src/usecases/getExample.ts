import { Result, err, ok } from "neverthrow";
import type { ExampleId } from "../domain/entityId";
import type {
  NotFoundError,
  PrismaClientError,
  ValidationError,
} from "../domain/error";
import { type ExampleEntity, validateExampleId } from "../domain/example";
import type { Context } from "../infra/context";
import { findExampleById } from "../infra/repositories/exampleRepository";

export interface GetExampleParams {
  exampleId: string;
  limit: number;
  cursor?: string;
}

export interface GetExampleResult {
  example: ExampleEntity;
  hasNextPage: boolean;
  nextCursor: string | null;
}

export type ValidateExampleError =
  | ValidationError
  | NotFoundError
  | PrismaClientError;

type UnvalidatedCommand = {
  exampleId: string;
};
type ValidatedCommand = {
  exampleId: ExampleId;
};

const validateExampleCommand = (
  unvalidated: UnvalidatedCommand,
): Result<ValidatedCommand, ValidationError> => {
  const exampleId = validateExampleId(unvalidated.exampleId);
  const validatedValues = Result.combine([exampleId]);
  return validatedValues.map(([exampleId]) => ({
    exampleId,
  }));
};

export const getExample =
  (ctx: Context) =>
  async (
    input: GetExampleParams,
  ): Promise<Result<GetExampleResult, ValidateExampleError>> => {
    const validated = validateExampleCommand(input);
    if (validated.isErr()) {
      return err(validated.error);
    }
    const { exampleId } = validated.value;

    const exampleResult = await findExampleById(ctx)(exampleId);
    if (exampleResult.isErr()) {
      return err(exampleResult.error);
    }
    const example = exampleResult.value;

    return ok({
      example,
      hasNextPage: false,
      nextCursor: null,
    });
  };
