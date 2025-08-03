/**
 * example:
 * type TStatus = "ACTIVE" | "INITIAL_ENTRY" | "PRE_PUBLIC" | "HIDDEN" | "UNAVAILABLE" | "ARCHIVED" | "DISCONTINUED"
 * PickUnion<TStatus,"PRE_PUBLIC" | "ACTIVE" | "HIDDEN" | "UNAVAILABLE">
 */
export type PickUnionType<T, K extends T> = T extends K ? T : never;
