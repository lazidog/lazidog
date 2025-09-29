import { type Result, err, ok } from "neverthrow";
import type { ExampleId } from "./entityId";
import { ValidationError } from "./error";

export type PendingExample = Readonly<{
  id: ExampleId;
  name: string;
  status: "pending";
  description?: string;
}>;

export type ActiveExample = Readonly<{
  id: ExampleId;
  name: string;
  status: "active";
  description?: string;
}>;

export type InactiveExample = Readonly<{
  id: ExampleId;
  name: string;
  status: "inactive";
  description?: string;
}>;

export type ExampleEntity = PendingExample | ActiveExample | InactiveExample;

export const isExampleEntity = (value: unknown): value is ExampleEntity => {
  return (
    typeof value === "object" &&
    value != null &&
    "id" in value &&
    "name" in value &&
    "status" in value
  );
};

export const validateExampleId = (
  exampleId: string,
): Result<ExampleId, ValidationError> => {
  if (
    !exampleId ||
    exampleId.trim().length === 0 ||
    !exampleId.match(/^[a-zA-Z0-9_-]+$/)
  ) {
    return err(ValidationError("exampleId", exampleId));
  }

  return ok(exampleId as ExampleId);
};
