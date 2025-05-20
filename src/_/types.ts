export type BasicCardinality = "required" | "optional" | "never";

export type KeysWithTrueValue<T> = {
    [K in keyof T]: T[K] extends true ? K : never;
}[keyof T];

export type Optional<T> = T | undefined | null;
