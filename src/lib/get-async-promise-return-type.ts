export type AsyncReturnType<T extends (...args: any) => Promise<unknown>> =
  T extends (...args: any) => Promise<infer R>
    ? R extends undefined
      ? void
      : R
    : never;
