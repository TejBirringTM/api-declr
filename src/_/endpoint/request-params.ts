import type { HttpRequestHeaderKey } from "../request/http-headers";
import type { HttpMethod, HttpMethodMayHaveBody } from "../request/http-method";
import type { ApiRequestSchema } from "../request/schema";
import type { HttpStatus } from "../response/http-status";
import type { ApiResponseGeneratorFn } from "../response/response-generator-fn";
import type { ApiResponseSchema } from "../response/schema";

/**
 * Represents parameters that will be used to validate the request
 * before the request handler function (ApiRequestHandlerFn) is executed.
 */
export type ApiEndpointParams<
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
    requestSchema: ApiRequestSchema<
        Method,
        Path,
        QueryParams,
        HeaderKeys,
        Body
    >;
    responseGenerators: ResponseGenerators;
};
