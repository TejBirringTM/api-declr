# API Declr

__API Declr__ provides a declarative way to to implement schema-enforced API endpoints in Node.js projects. Written in TypeScript. Supports multiple web frameworks.

__API Declr__ is opinionated; it aims to help backend developers implement overlooked [REST API best practices](https://posts.tejbirring.com/rest_apis__2_crudl_best_practices) such as HATEOAS (Hypermedia as the Engine of Application State).

Other than error handling (throwing instance of the `ApiRequestError` class), __API Declr__ is designed to be used as a functional library, the two functions you will use are:

* `xApiEndpoint(...)`, where `x` is your choice of (supported) web framework. This is the function you will use to implement the endpoint that will deal with a particular kind of API request (i.e. HTTP request method on a given path).

* `apiResponseGenerator(...)` is used to declare a function that produces a particular kind of response associated with a HTTP response status (e.g. `200 OK`). Response generator functions declared using `apiResponseGenerator(...)` are called inside the request handler function (argument of `xApiEndpoint(...)`) to produce a response. Another way to produce a response is to throw an instance of the `ApiRequestError` class.

## Supported Web Frameworks

* [Next.js](https://nextjs.org/)

More to come...

## Structure

```text
<root>/
├─ _/
│  ├─ endpoint/
│  │  ├─ tx-adapters/
│  │  │  ├─ next-response-adapter.ts
│  │  │  ├─ ...
│  ├─ error/
│  ├─ request/
│  ├─ response/
├─ next-api-endpoint.ts
├─ ...
```

* The root folder contains source files that export API endpoint declarator functions for different web frameworks, e.g. `next-api-endpoint.ts` exports a function by the same name that is used to declare an endpoint in Next.js projects (i.e. uses `NextRequest` class to produce instance of `NextResponse`).

  * Folders named `_` represent underlying source dependency of the module represented by the current folder.

  * The `_/endpoint/tx-adapters` folder contains source files that export transmission adapters used by the `*-ap-endpoint.ts` source files. Transmission adapters (TxAdapter) are functions that transform the response object (ApiResponseSpec) produced by the handler function (ApiRequestHandlerFn, an argument to the declarator function) to a format suitable for the specific web framework. E.g. `next-response-adapter.ts` exports a function called `nextResponseAdapter` (as type `TxAdapterFn`) which converts a response object to an instance of `NextResponse`.

* The `error` folder provisions the Error class `ApiRequestError` which is thrown inside the handler function to produce an error response. Errors are enumerated in `_/error/_/errors-map.ts`.

## Usage Examples

### Next.js

Create an API endpoint `GET /api/hello` using the [App Router](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) by creating the file `<root>/src/app/api/hello/route.ts`:

```typescript
import {
    apiResponseGeneratorFn,
    nextApiEndpoint,
} from "@/libs/utils/api-endpoint/next-api-endpoint";
import { z } from "zod";

export const GET = nextApiEndpoint({
    method: "GET",
    path: "/hello",
    requestSchema: {
        body: z.null(),
        headers: z.object({}),
        pathParams: z.object({}),
        queryParams: z.object({
            name: z.string().optional(),
        }),
    },
    responseGenerators: {
        OK: apiResponseGeneratorFn("OK", {
            body: z.object({
                message: z.string(),
            }),
            headers: z.object({}),
        })(async (name?: string) => ({
            status: "OK",
            body: {
                message: name ? `Hello, ${name}!` : `Hello, you!`,
            },
            headers: {},
        })),
    },
})(
    async ({ generators, params }) =>
        await generators.OK(params.queryParams.name)
);
```

The endpoint will respond with the following response, where `"Hello, you!"` will be replaced by `"Hello, <name>!"` if `name` is passed as a query argument on the request URL:

```json
{
    "status": "OK",
    "statusCode": 200,
    "statusType": "SUCCESS",
    "data": {
        "message": "Hello, you!"
    }
}
```

## Dependencies

* __Internal:__
  Not applicable

* __External:__
  * [Zod](https://zod.dev/)
