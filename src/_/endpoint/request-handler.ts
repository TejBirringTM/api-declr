import type { HttpRequestHeaderKey } from "../request/http-headers";
import type { HttpMethod, HttpMethodMayHaveBody } from "../request/http-method";
import type { ApiRequestParams } from "../request/schema";
import type { HttpStatus } from "../response/http-status";
import type { ApiResponseGeneratorFn } from "../response/response-generator-fn";
import type { ApiResponseSpec } from "../response/response-spec";
import type { ApiResponseSchema } from "../response/schema";

/**
 * Represents the parsed arguments used by the request handler function (ApiRequestHandlerFn)
 */
export type ApiRequestHandlerFnArgs<
    Method extends HttpMethod,
    Path extends string,
    QueryParams extends object,
    HeaderKeys extends HttpRequestHeaderKey,
    Body extends Method extends HttpMethodMayHaveBody ? object : null,
    ResponseGenerators extends {
        [S in HttpStatus]?: ApiResponseGeneratorFn<
            S,
            ApiResponseSchema<S>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            any[]
        >;
    },
> = {
    method: Method;
    path: Path;
    params: ApiRequestParams<Method, Path, QueryParams, HeaderKeys, Body>;
    generators: ResponseGenerators;
};

/**
 * Represents the request handler function
 */
export type ApiRequestHandlerFn<
    Method extends HttpMethod,
    Path extends string,
    QueryParams extends object,
    HeaderKeys extends HttpRequestHeaderKey,
    Body extends Method extends HttpMethodMayHaveBody ? object : null,
    ResponseGenerators extends {
        [S in HttpStatus]?: ApiResponseGeneratorFn<
            S,
            ApiResponseSchema<S>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            any[]
        >;
    },
    ResponseStatus extends keyof ResponseGenerators & HttpStatus,
> = (
    args: ApiRequestHandlerFnArgs<
        Method,
        Path,
        QueryParams,
        HeaderKeys,
        Body,
        ResponseGenerators
    >
) => Promise<
    ApiResponseSpec<ResponseStatus, ApiResponseSchema<ResponseStatus>>
>;
