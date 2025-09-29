# create-clean-package

This package follows clean architecture principles with clear separation of concerns.

## Architecture Overview

### Directory Structure

```
src/
├── domain/              # Core business logic and entities
│   ├── entities/       # Business entities
│   ├── repositories/   # Repository interfaces
│   ├── events/         # Domain events
│   ├── valueObjects/   # Value objects
│   ├── entityId.ts     # Branded ID types
│   └── error.ts        # Domain error types
├── application/        # Application layer
│   └── workflows/      # Complex business workflows
├── infra/              # Infrastructure layer
│   ├── repositories/   # Repository implementations
│   ├── context.ts      # Dependency injection
│   └── prismaErrorHandler.ts
├── usecases/           # Simple use cases
├── projections/        # Event projections
├── utils/              # Utility functions
├── test-utils/         # Testing utilities
└── index.ts            # Main entry point
```

## Key Patterns

### 1. Result Type Pattern (neverthrow)

All functions return `Result<T, Error>` for explicit error handling:

```typescript
const result = await instance.getExample({ exampleId: "123" });
if (result.isOk()) {
  console.log(result.value);
} else {
  console.error(result.error);
}
```

### 2. NewType Pattern

Branded types for type-safe IDs:

```typescript
type UserId = NewType<"UserId", string>;
type ExampleId = NewType<"ExampleId", string>;
```
