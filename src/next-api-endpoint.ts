import { z, ZodNull } from "zod";
import type {
    HttpMethod,
    HttpMethodMayHaveBody,
} from "./_/request/http-method";
import type { HttpStatus } from "./_/response/http-status";
import type { HttpRequestHeaderKey } from "./_/request/http-headers";
import type { NextRequest, NextResponse } from "next/server";
import { parseRealPath } from "./_/request/path";
import type { ApiResponseGeneratorFn } from "./_/response/response-generator-fn";
import type { ApiResponseSchema } from "./_/response/schema";
import type { ApiRequestHandlerFn } from "./_/endpoint/request-handler";
import qs from "qs";
import { handleError } from "./_/endpoint/error-handling";
import { nextResponseAdapter } from "./_/endpoint/tx-adapters/next-response-adapter";
import { ApiRequestError } from "./_/error";
import type { ApiEndpointParams } from "./_/endpoint/request-params";

/**
 * Declare an API endpoint for Next.js
 *
 * @param params - parameters to validate the request
 * @param handler - the request handler function
 * @returns a higher-order request handler function for Next.js
 */
export const nextApiEndpoint =
    <
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
    >(
        params: ApiEndpointParams<
            Method,
            Path,
            QueryParams,
            HeaderKeys,
            Body,
            ResponseGenerators
        >
    ) =>
    (
        handler: ApiRequestHandlerFn<
            Method,
            Path,
            QueryParams,
            HeaderKeys,
            Body,
            ResponseGenerators,
            keyof ResponseGenerators & HttpStatus
        >
    ) =>
    async (req: NextRequest): Promise<NextResponse> => {
        try {
            const reqUrl = new URL(req.url);

            // 1. Validate the request method
            const reqMethod = req.method;
            const parsedReqMethod = z
                .literal(params.method)
                .safeParse(reqMethod);
            if (!parsedReqMethod.success) {
                throw new ApiRequestError(
                    "ApiRequestError:InvalidMethod",
                    "",
                    {}
                );
            }

            // 2. Validate the request path (inc. path parameters)
            const rawPathParams = parseRealPath(params.path, reqUrl.pathname);
            const parsedPathParams =
                params.requestSchema.pathParams.safeParse(rawPathParams);
            if (!parsedPathParams.success) {
                throw new ApiRequestError(
                    "ApiRequestError:InvalidPathParams",
                    "",
                    {}
                );
            }
            const reqPath = reqUrl.pathname as Path;

            // 3. Validate request headers
            const rawHeaders = Object.fromEntries(req.headers.entries());
            const parsedHeaders =
                params.requestSchema.headers.safeParse(rawHeaders);
            if (!parsedHeaders.success) {
                throw new ApiRequestError(
                    "ApiRequestError:InvalidHeaders",
                    "",
                    {}
                );
            }

            // 4. Validate request query params
            const rawQueryParamsStr = reqUrl.search.substring(1);
            const rawQueryParamsObj = qs.parse(rawQueryParamsStr);
            const parsedQueryParams =
                params.requestSchema.queryParams.safeParse(rawQueryParamsObj);
            if (!parsedQueryParams.success) {
                throw new ApiRequestError(
                    "ApiRequestError:InvalidQueryParams",
                    "",
                    {}
                );
            }

            // 5. Validate request body
            const rawBody =
                params.requestSchema.body instanceof ZodNull
                    ? null
                    : req.json();
            const parsedBody = params.requestSchema.body.safeParse(rawBody);
            if (!parsedBody.success) {
                throw new ApiRequestError(
                    "ApiRequestError:InvalidBody",
                    "",
                    {}
                );
            }

            // Produce the response object
            const responseSpec = await handler({
                method: parsedReqMethod.data,
                path: reqPath,
                params: {
                    body: parsedBody.data,
                    headers: parsedHeaders.data,
                    pathParams: parsedPathParams.data,
                    queryParams: parsedQueryParams.data,
                },
                generators: params.responseGenerators,
            });

            // Transform the response object for transmission
            return nextResponseAdapter(responseSpec);
        } catch (e) {
            // Execute error handling logic
            return handleError(e, nextResponseAdapter);
        }
    };
