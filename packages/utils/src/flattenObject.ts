// @ts-nocheck
type Primitive = string | number | boolean | null | undefined;

type FlattenedObject = Record<string, Primitive>;

export const flattenObject = (
  obj: Record<string, any>,
  prefix = '',
  result: FlattenedObject = {}
): FlattenedObject => {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      flattenObject(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }

  return result;
}
