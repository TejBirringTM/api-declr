import type { _ErrorNamesFromMap, _ErrorsMap } from "./types";

/**
 * A map of all errors that the module can throw
 * as an instance of ApiRequestError.
 */
export const errorsMap = {
    "ApiRequestError:Unknown": {
        status: "INTERNAL_SERVER_ERROR",
    },
    "ApiRequestError:InvalidMethod": {
        status: "BAD_REQUEST",
    },
    "ApiRequestError:InvalidQueryParams": {
        status: "BAD_REQUEST",
    },
    "ApiRequestError:InvalidPathParams": {
        status: "BAD_REQUEST",
    },
    "ApiRequestError:InvalidHeaders": {
        status: "BAD_REQUEST",
    },
    "ApiRequestError:InvalidBody": {
        status: "UNPROCESSABLE_ENTITY",
    },
    "ApiRequestError:FailedToParseRequest": {
        status: "BAD_REQUEST",
    },
} satisfies _ErrorsMap;

export type ErrorsMap = typeof errorsMap;

export type ErrorCode = _ErrorNamesFromMap<ErrorsMap>;
