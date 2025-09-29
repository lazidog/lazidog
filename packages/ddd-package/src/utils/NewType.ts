/**
 * NewType Pattern
 *
 * This utility creates branded types (also known as nominal types) in TypeScript.
 * It provides compile-time type safety for primitive values, preventing
 * accidental mixing of different semantic types.
 *
 * Example:
 * ```typescript
 * type UserId = NewType<"UserId", string>;
 * type ProductId = NewType<"ProductId", string>;
 *
 * const userId: UserId = "user123" as UserId;
 * const productId: ProductId = "prod456" as ProductId;
 *
 * // This will cause a TypeScript error:
 * // const wrong: UserId = productId;
 * ```
 */

/**
 * Unique symbol for branding
 */
declare const _type: unique symbol;

/**
 * NewType creates a branded type from a base type
 *
 * @template Type - A unique string literal to distinguish this type
 * @template RawType - The underlying type (string, number, etc.)
 */
export type NewType<Type extends string, RawType> = RawType & {
  readonly [_type]: Type;
};

/**
 * Helper type to extract the base type from a NewType
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type BaseType<T> = T extends NewType<any, infer U> ? U : never;
