import type { ZodType } from "zod";
import type {
    HttpResponseHeaderKey,
    HttpResponseHeaderKeysFromArray,
    HttpResponseHeaderValueFromKey,
} from "./http-headers";
import type {
    HttpStatusRequiredBody,
    HttpStatusOptionalBody,
    HttpStatus,
    HttpStatusMap,
} from "./http-status";

/**
 * Denotes headers to assign to a response:
 * this includes mandatory headers for the given HTTP response status
 * and optional headers to specify in addition.
 */
export type ApiResponseHeaders<Status extends HttpStatus> = {
    [K in HttpResponseHeaderKeysFromArray<
        HttpStatusMap[Status]["optionalHeaders"]
    >]?: HttpResponseHeaderValueFromKey<K>;
} & {
    [K in HttpResponseHeaderKeysFromArray<
        HttpStatusMap[Status]["requiredHeaders"]
    >]: HttpResponseHeaderValueFromKey<K>;
} & {
    [K in HttpResponseHeaderKey]?: HttpResponseHeaderValueFromKey<K>;
};

/**
 * Represents the schema to validate response headers against.
 */
export type ApiResponseHeadersSchema<Status extends HttpStatus> = ZodType<
    ApiResponseHeaders<Status>
>;

/**
 * Represents the schema to validate response body against.
 */
export type ApiResponseBodySchema<S extends HttpStatus> =
    S extends HttpStatusRequiredBody
        ? ZodType<object>
        : S extends HttpStatusOptionalBody
          ? ZodType<object | undefined>
          : ZodType<null>;

/**
 * Represents the schema to constrain and validate a response against.
 */
export type ApiResponseSchema<S extends HttpStatus> = {
    body: ApiResponseBodySchema<S>;
    headers: ApiResponseHeadersSchema<S>;
};
