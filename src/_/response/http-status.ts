import type { ValueOf } from "ts-essentials";
import type { KeysWithTrueValue, BasicCardinality } from "../types";
import type { HttpResponseHeaderKey } from "./http-headers";

/*
 * A map of supported HTTP statuses.
 */
export const httpStatusMap = {
    OK: {
        status: "OK",
        statusCode: 200,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: ["etag"],
        requiredHeaders: [],
    },
    CREATED: {
        status: "CREATED",
        statusCode: 201,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: ["etag"],
        requiredHeaders: ["location"],
    },
    ACCEPTED: {
        status: "ACCEPTED",
        statusCode: 202,
        category: "SUCCESS",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NON_AUTHORITATIVE_INFORMATION: {
        status: "NON_AUTHORITATIVE_INFORMATION",
        statusCode: 203,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NO_CONTENT: {
        status: "NO_CONTENT",
        statusCode: 204,
        category: "SUCCESS",
        body: "never",
        optionalHeaders: ["etag"],
        requiredHeaders: [],
    },
    RESET_CONTENT: {
        status: "RESET_CONTENT",
        statusCode: 205,
        category: "SUCCESS",
        body: "never",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    PARTIAL_CONTENT: {
        status: "PARTIAL_CONTENT",
        statusCode: 206,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["content-range"],
    },
    MULTI_STATUS: {
        status: "MULTI_STATUS",
        statusCode: 207,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    ALREADY_REPORTED: {
        status: "ALREADY_REPORTED",
        statusCode: 208,
        category: "SUCCESS",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    IM_USED: {
        status: "IM_USED",
        statusCode: 226,
        category: "SUCCESS",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    MULTIPLE_CHOICES: {
        status: "MULTIPLE_CHOICES",
        statusCode: 300,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    MOVED_PERMANENTLY: {
        status: "MOVED_PERMANENTLY",
        statusCode: 301,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    FOUND: {
        status: "FOUND",
        statusCode: 302,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    SEE_OTHER: {
        status: "SEE_OTHER",
        statusCode: 303,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    NOT_MODIFIED: {
        status: "NOT_MODIFIED",
        statusCode: 304,
        category: "REDIRECT",
        body: "never",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    USE_PROXY: {
        status: "USE_PROXY",
        statusCode: 305,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    TEMPORARY_REDIRECT: {
        status: "TEMPORARY_REDIRECT",
        statusCode: 307,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    PERMANENT_REDIRECT: {
        status: "PERMANENT_REDIRECT",
        statusCode: 308,
        category: "REDIRECT",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: ["location"],
    },
    BAD_REQUEST: {
        status: "BAD_REQUEST",
        statusCode: 400,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    UNAUTHORIZED: {
        status: "UNAUTHORIZED",
        statusCode: 401,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["www-authenticate"],
    },
    PAYMENT_REQUIRED: {
        status: "PAYMENT_REQUIRED",
        statusCode: 402,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    FORBIDDEN: {
        status: "FORBIDDEN",
        statusCode: 403,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NOT_FOUND: {
        status: "NOT_FOUND",
        statusCode: 404,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    METHOD_NOT_ALLOWED: {
        status: "METHOD_NOT_ALLOWED",
        statusCode: 405,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["allow"],
    },
    NOT_ACCEPTABLE: {
        status: "NOT_ACCEPTABLE",
        statusCode: 406,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    PROXY_AUTHENTICATION_REQUIRED: {
        status: "PROXY_AUTHENTICATION_REQUIRED",
        statusCode: 407,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["proxy-authenticate"],
    },
    REQUEST_TIMEOUT: {
        status: "REQUEST_TIMEOUT",
        statusCode: 408,
        category: "CLIENT_ERROR",
        body: "optional",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    CONFLICT: {
        status: "CONFLICT",
        statusCode: 409,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    GONE: {
        status: "GONE",
        statusCode: 410,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    LENGTH_REQUIRED: {
        status: "LENGTH_REQUIRED",
        statusCode: 411,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    PRECONDITION_FAILED: {
        status: "PRECONDITION_FAILED",
        statusCode: 412,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    PAYLOAD_TOO_LARGE: {
        status: "PAYLOAD_TOO_LARGE",
        statusCode: 413,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    URI_TOO_LONG: {
        status: "URI_TOO_LONG",
        statusCode: 414,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    UNSUPPORTED_MEDIA_TYPE: {
        status: "UNSUPPORTED_MEDIA_TYPE",
        statusCode: 415,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    RANGE_NOT_SATISFIABLE: {
        status: "RANGE_NOT_SATISFIABLE",
        statusCode: 416,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["content-range"],
    },
    EXPECTATION_FAILED: {
        status: "EXPECTATION_FAILED",
        statusCode: 417,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    // IM_A_TEAPOT: {
    //   status: 'IM_A_TEAPOT',
    //   statusCode: 418,
    //   category: 'CLIENT_ERROR',
    //   body: 'optional',
    //   requiredHeaders: []
    // },
    MISDIRECTED_REQUEST: {
        status: "MISDIRECTED_REQUEST",
        statusCode: 421,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    UNPROCESSABLE_ENTITY: {
        status: "UNPROCESSABLE_ENTITY",
        statusCode: 422,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    LOCKED: {
        status: "LOCKED",
        statusCode: 423,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    FAILED_DEPENDENCY: {
        status: "FAILED_DEPENDENCY",
        statusCode: 424,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    TOO_EARLY: {
        status: "TOO_EARLY",
        statusCode: 425,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    UPGRADE_REQUIRED: {
        status: "UPGRADE_REQUIRED",
        statusCode: 426,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["upgrade"],
    },
    PRECONDITION_REQUIRED: {
        status: "PRECONDITION_REQUIRED",
        statusCode: 428,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    TOO_MANY_REQUESTS: {
        status: "TOO_MANY_REQUESTS",
        statusCode: 429,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["retry-after"],
    },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        status: "REQUEST_HEADER_FIELDS_TOO_LARGE",
        statusCode: 431,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        status: "UNAVAILABLE_FOR_LEGAL_REASONS",
        statusCode: 451,
        category: "CLIENT_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    INTERNAL_SERVER_ERROR: {
        status: "INTERNAL_SERVER_ERROR",
        statusCode: 500,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NOT_IMPLEMENTED: {
        status: "NOT_IMPLEMENTED",
        statusCode: 501,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    BAD_GATEWAY: {
        status: "BAD_GATEWAY",
        statusCode: 502,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    SERVICE_UNAVAILABLE: {
        status: "SERVICE_UNAVAILABLE",
        statusCode: 503,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: ["retry-after"],
    },
    GATEWAY_TIMEOUT: {
        status: "GATEWAY_TIMEOUT",
        statusCode: 504,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    HTTP_VERSION_NOT_SUPPORTED: {
        status: "HTTP_VERSION_NOT_SUPPORTED",
        statusCode: 505,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    VARIANT_ALSO_NEGOTIATES: {
        status: "VARIANT_ALSO_NEGOTIATES",
        statusCode: 506,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    INSUFFICIENT_STORAGE: {
        status: "INSUFFICIENT_STORAGE",
        statusCode: 507,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    LOOP_DETECTED: {
        status: "LOOP_DETECTED",
        statusCode: 508,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NOT_EXTENDED: {
        status: "NOT_EXTENDED",
        statusCode: 510,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
    NETWORK_AUTHENTICATION_REQUIRED: {
        status: "NETWORK_AUTHENTICATION_REQUIRED",
        statusCode: 511,
        category: "SERVER_ERROR",
        body: "required",
        optionalHeaders: [],
        requiredHeaders: [],
    },
} as const satisfies _HttpStatusMap;

/**
 * Type representing map of supported HTTP statuses.
 */
export type _HttpStatusMap = {
    [Status in HttpStatus]: {
        status: Status;
        statusCode: number;
        category: HttpStatusCategory;
        body: BasicCardinality;
        optionalHeaders: Array<HttpResponseHeaderKey>;
        requiredHeaders: Array<HttpResponseHeaderKey>;
    };
};
export type HttpStatusMap = typeof httpStatusMap;

/**
 * Type representing supported HTTP statuses.
 */
export type HttpStatus =
    | "OK"
    | "CREATED"
    | "ACCEPTED"
    | "NON_AUTHORITATIVE_INFORMATION"
    | "NO_CONTENT"
    | "RESET_CONTENT"
    | "PARTIAL_CONTENT"
    | "MULTI_STATUS"
    | "ALREADY_REPORTED"
    | "IM_USED"
    | "MULTIPLE_CHOICES"
    | "MOVED_PERMANENTLY"
    | "FOUND"
    | "SEE_OTHER"
    | "NOT_MODIFIED"
    | "USE_PROXY"
    | "TEMPORARY_REDIRECT"
    | "PERMANENT_REDIRECT"
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "PAYMENT_REQUIRED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "METHOD_NOT_ALLOWED"
    | "NOT_ACCEPTABLE"
    | "PROXY_AUTHENTICATION_REQUIRED"
    | "REQUEST_TIMEOUT"
    | "CONFLICT"
    | "GONE"
    | "LENGTH_REQUIRED"
    | "PRECONDITION_FAILED"
    | "PAYLOAD_TOO_LARGE"
    | "URI_TOO_LONG"
    | "UNSUPPORTED_MEDIA_TYPE"
    | "RANGE_NOT_SATISFIABLE"
    | "EXPECTATION_FAILED"
    // | "IM_A_TEAPOT"
    | "MISDIRECTED_REQUEST"
    | "UNPROCESSABLE_ENTITY"
    | "LOCKED"
    | "FAILED_DEPENDENCY"
    | "TOO_EARLY"
    | "UPGRADE_REQUIRED"
    | "PRECONDITION_REQUIRED"
    | "TOO_MANY_REQUESTS"
    | "REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "UNAVAILABLE_FOR_LEGAL_REASONS"
    | "INTERNAL_SERVER_ERROR"
    | "NOT_IMPLEMENTED"
    | "BAD_GATEWAY"
    | "SERVICE_UNAVAILABLE"
    | "GATEWAY_TIMEOUT"
    | "HTTP_VERSION_NOT_SUPPORTED"
    | "VARIANT_ALSO_NEGOTIATES"
    | "INSUFFICIENT_STORAGE"
    | "LOOP_DETECTED"
    | "NOT_EXTENDED"
    | "NETWORK_AUTHENTICATION_REQUIRED";

export const HttpStatusCategories = [
    "SUCCESS",
    "REDIRECT",
    "CLIENT_ERROR",
    "SERVER_ERROR",
] as const;

export type HttpStatusCategory = ValueOf<typeof HttpStatusCategories>;

/**
 * Helper to filter HTTP statuses by properties in the map — positive match:
 */
export type HttpStatusMatch<
    PropKey extends keyof HttpStatusMap[HttpStatus],
    PropVal,
> = KeysWithTrueValue<{
    [S in HttpStatus]: HttpStatusMap[S][PropKey] extends PropVal ? true : false;
}>;

/**
 * Helper to filter HTTP statuses by properties in the map — negative match:
 */
export type HttpStatusNotMatch<
    PropKey extends keyof HttpStatusMap[HttpStatus],
    PropVal,
> = KeysWithTrueValue<{
    [S in HttpStatus]: HttpStatusMap[S][PropKey] extends PropVal ? false : true;
}>;

/**
 * Http statuses filtered by properties:
 */
export type HttpStatusRequiredBody = HttpStatusMatch<"body", "required">;
export type HttpStatusOptionalBody = HttpStatusMatch<"body", "optional">;
export type HttpStatusNeverHasBody = HttpStatusMatch<"body", "never">;
export type HttpStatusMayHaveBody = HttpStatusNotMatch<"body", "never">;

export type HttpClientErrorStatus = HttpStatusMatch<"category", "CLIENT_ERROR">;
export type HttpServerErrorStatus = HttpStatusMatch<"category", "SERVER_ERROR">;
export type HttpErrorStatus = HttpClientErrorStatus | HttpServerErrorStatus;
