export type Nullish = null | undefined;

export function isNullish<T>(value: T | Nullish): value is Nullish {
  return value == null;
}

export function isNotNullish<T>(value: T | Nullish): value is T {
  return !isNullish(value);
}
