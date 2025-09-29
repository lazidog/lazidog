interface BaseError {
  readonly _tag: string;
  readonly message: string;
}
export interface ValidationError extends BaseError {
  readonly _tag: "ValidationError";
  readonly field: string;
  readonly value: unknown;
}

export const ValidationError = (
  field: string,
  value: unknown,
): ValidationError => ({
  _tag: "ValidationError",
  field,
  value,
  message: `Validation failed for field: ${field}`,
});

export interface NotFoundError extends BaseError {
  readonly _tag: "NotFoundError";
  readonly entityType: string;
  readonly id: string;
}

export const NotFoundError = (
  entityType: string,
  id: string,
): NotFoundError => ({
  _tag: "NotFoundError",
  entityType,
  id,
  message: `${entityType} with id ${id} not found`,
});

export interface BusinessRuleError extends BaseError {
  readonly _tag: "BusinessRuleError";
  readonly rule: "MaxExamplesPerUser" | "MinXRequirement";
  readonly details?: unknown;
}

export const BusinessRuleError = (
  rule: BusinessRuleError["rule"],
  details?: unknown,
): BusinessRuleError => ({
  _tag: "BusinessRuleError",
  rule,
  details,
  message: `Business rule violation: ${rule}`,
});

export type DomainError = ValidationError | NotFoundError | BusinessRuleError;

export type PrismaClientError = Readonly<{
  type: "PRISMA_CLIENT_ERROR";
  message: string;
  code: string;
}>;
export const PrismaClientError = (
  message: string,
  code: string,
): PrismaClientError => ({ type: "PRISMA_CLIENT_ERROR", message, code });
