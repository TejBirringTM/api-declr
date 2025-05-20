import type { ZodType } from "zod";
import type { PathParamsFromTemplate } from "./path";
import type {
    HttpMethod,
    HttpMethodsMap,
    HttpMethodMayHaveBody,
} from "./http-method";
import type { Optional } from "../types";
import type {
    HttpRequestHeaderKey,
    HttpRequestHeaderKeysFromArray,
    HttpRequestHeaders,
    HttpRequestHeaderValueFromKey,
} from "./http-headers";

/**
 * Denotes headers to assign to a response:
 * this includes mandatory headers for the given HTTP response status
 * and optional headers to specify in addition.
 */
export type ApiRequestHeaders<Method extends HttpMethod> = {
    [K in HttpRequestHeaderKeysFromArray<
        HttpMethodsMap[Method]["optionalHeaders"]
    >]?: HttpRequestHeaderValueFromKey<K>;
} /* & {
    [K in HttpRequestHeaderKeysFromArray<
        HttpMethodsMap[Method]["requiredHeaders"]
    >]: HttpRequestHeaderValueFromKey<K>;
} */ & {
    [K in HttpRequestHeaderKey]?: HttpRequestHeaderValueFromKey<K>;
};

/**
 * Represents the schema to validate response headers against.
 */
export type ApiRequestHeadersSchema<Method extends HttpMethod> = ZodType<
    ApiRequestHeaders<Method>
>;

/**
 * The type of request body, according to request method.
 */
type ApiRequestBody<
    Method extends HttpMethod,
    T,
> = HttpMethodsMap[Method]["body"] extends "required"
    ? T
    : HttpMethodsMap[Method]["body"] extends "optional"
      ? Optional<T>
      : null;

/**
 * Represents the parameters of any specific request (after parsing, via ApiRequestSchema).
 */
export type ApiRequestParams<
    Method extends HttpMethod,
    Path extends string,
    QueryParams extends object,
    HeaderKeys extends HttpRequestHeaderKey,
    Body extends Method extends HttpMethodMayHaveBody ? object : null,
> = {
    pathParams: PathParamsFromTemplate<Path>;
    queryParams: QueryParams;
    headers: HttpRequestHeaders<HeaderKeys>;
    body: ApiRequestBody<Method, Body>;
};

/**
 * The schema by which an incoming request should be parsed. Used to produce ApiRequestParams as argument for the request handling function.
 */
export type ApiRequestSchema<
    Method extends HttpMethod,
    Path extends string,
    QueryParams extends object,
    HeaderKeys extends HttpRequestHeaderKey,
    Body extends Method extends HttpMethodMayHaveBody ? object : null,
> = {
    [K in keyof ApiRequestParams<
        Method,
        Path,
        QueryParams,
        HeaderKeys,
        Body
    >]: ZodType<
        ApiRequestParams<Method, Path, QueryParams, HeaderKeys, Body>[K]
    >;
};
