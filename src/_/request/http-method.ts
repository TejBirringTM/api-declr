import type { BasicCardinality, KeysWithTrueValue } from "../types";
import type { HttpRequestHeaderKey } from "./http-headers";

/**
 * Type representing supported HTTP methods.
 */
export type HttpMethod =
    | "GET"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "POST"
    | "PUT"
    | "PATCH";

/**
 * A map of supported HTTP methods.
 */
export const httpMethodsMap = {
    GET: {
        method: "GET",
        body: "never",
        optionalHeaders: ["if-none-match"],
        requiredHeaders: [],
    },
    DELETE: {
        method: "DELETE",
        body: "never",
        optionalHeaders: ["if-match"],
        requiredHeaders: [],
    },
    HEAD: {
        method: "HEAD",
        body: "never",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    OPTIONS: {
        method: "OPTIONS",
        body: "never",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    POST: {
        method: "POST",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    PUT: {
        method: "PUT",
        body: "required",
        optionalHeaders: ["if-match"],
        requiredHeaders: [],
    },
    PATCH: {
        method: "PATCH",
        body: "required",
        optionalHeaders: ["if-match"],
        requiredHeaders: [],
    },
} as const satisfies _HttpMethodsMap;

/**
 * Type representing map of supported HTTP methods.
 */
export type _HttpMethodsMap = {
    [M in HttpMethod]: {
        method: HttpMethod;
        body: BasicCardinality;
        optionalHeaders: Array<HttpRequestHeaderKey>;
        requiredHeaders: Array<HttpRequestHeaderKey>;
    };
};
export type HttpMethodsMap = typeof httpMethodsMap;

/**
 * Helper to filter HTTP methods by properties in the map — positive match:
 */
type HttpMethodMatch<
    PropKey extends keyof HttpMethodsMap[HttpMethod],
    PropVal,
> = KeysWithTrueValue<{
    [M in HttpMethod]: HttpMethodsMap[M][PropKey] extends PropVal
        ? true
        : false;
}>;

/**
 * Helper to filter HTTP methods by properties in the map — negative match:
 */
type HttpMethodNotMatch<
    PropKey extends keyof HttpMethodsMap[HttpMethod],
    PropVal,
> = KeysWithTrueValue<{
    [M in HttpMethod]: HttpMethodsMap[M][PropKey] extends PropVal
        ? false
        : true;
}>;

/**
 * Http methods filtered by properties:
 */
export type HttpMethodRequiredBody = HttpMethodMatch<"body", "required">;
export type HttpMethodOptionalBody = HttpMethodMatch<"body", "optional">;
export type HttpMethodNeverHasBody = HttpMethodMatch<"body", "never">;
export type HttpMethodMayHaveBody = HttpMethodNotMatch<"body", "never">;
