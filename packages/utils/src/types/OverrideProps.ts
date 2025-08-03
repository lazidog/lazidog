type Merge<First, Second> = Omit<First, keyof Second> & Second;

export type OverrideProps<
  TOriginal,
  TOverride extends Partial<Record<keyof TOriginal, unknown>> & {
    [Key in keyof TOverride]: Key extends keyof TOriginal
      ? TOverride[Key] extends TOriginal[Key]
        ? TOverride[Key]
        : never
      : never;
  },
> = Merge<TOriginal, TOverride>;
