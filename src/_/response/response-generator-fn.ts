import type { HttpStatus } from "./http-status";
import type { ApiResponseSchema } from "./schema";
import type { ApiResponseSpec } from "./response-spec";

/**
 * Represents a function that produces a response object (ApiResponseSpec)
 * contrained by the given HTTP status and schema.
 */
export type ApiResponseGeneratorFn<
    Status extends HttpStatus,
    Schema extends ApiResponseSchema<Status>,
    // eslint-disable-next-line
    Args extends any[],
> = (...args: Args) => Promise<ApiResponseSpec<Status, Schema>>;

/**
 * Declare a response generator function (ApiResponseGeneratorFn)
 * that produces a response object (ApiResponseSpec) contrained by
 * the given HTTP status and schema.
 *
 * @param status - the intended status of the response object
 * @param schema - the schema to contraint the response object via validation
 * @returns
 */
export const apiResponseGeneratorFn =
    <
        /*const */ Status extends HttpStatus,
        /*const */ Schema extends ApiResponseSchema<Status>,
    >(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        status: Status,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        schema: Schema
    ) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Args extends any[]>(fn: ApiResponseGeneratorFn<Status, Schema, Args>) =>
        fn;
