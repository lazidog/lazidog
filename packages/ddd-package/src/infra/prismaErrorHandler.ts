import { PrismaClientError } from "../domain/error";

export const prismaErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    return PrismaClientError(error.message, "UNKNOWN_ERROR");
  }
  return PrismaClientError(String(error), "UNKNOWN_ERROR");
};
