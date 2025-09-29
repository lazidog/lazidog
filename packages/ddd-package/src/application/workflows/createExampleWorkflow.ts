import { Result, ok } from "neverthrow";
import { v4 as uuidv4 } from "uuid";
import type { ExampleId } from "../../domain/entityId";
import type { ValidationError } from "../../domain/error";
import {
  type ExampleEntity,
  type PendingExample,
  validateExampleId,
} from "../../domain/example";

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
  const name = ok(unvalidated.name);
  const description = ok(unvalidated.description);

  return Result.combine([exampleId, name, description]).map(
    ([exampleId, name, description]) => ({
      exampleId,
      name,
      description,
    }),
  );
};

const createExample = (
  validated: ValidatedCommand,
): Result<PendingExample, never> =>
  ok({
    id: uuidv4() as ExampleId,
    name: validated.name,
    status: "pending",
    description: validated.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

type CreateExampleResult = {
  example: ExampleEntity;
};
type CreateExampleError = ValidationError;
type Workflow = (
  command: UnvalidatedCommand,
) => Result<CreateExampleResult, CreateExampleError>;

export const createExampleWorkflowFactory = (): Workflow => (unvalidated) =>
  validateCreateExampleCommand(unvalidated).andThen((validated) =>
    createExample(validated).map((example) => ({
      example,
    })),
  );
