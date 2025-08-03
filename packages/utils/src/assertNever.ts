export function assertNever(v: never): never {
  throw new Error(`[assertNever] should not reach here: ${v}`);
}
