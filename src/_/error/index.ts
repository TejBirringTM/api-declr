import type { ErrorCode, ErrorsMap } from "./_/errors-map";
import { errorsMap } from "./_/errors-map";
import type { ApiErrorResponseSpec } from "../response/response-spec";
import type { ApiResponseSchema } from "../response/schema";
import type { z } from "zod";

/**
 * Throw an instantiation of this class in order to
 * transmit an error response.
 */
export class ApiRequestError<E extends ErrorCode> extends Error {
    constructor(
        public readonly code: E,
        public readonly message: string,
        public readonly headers: z.infer<
            ApiResponseSchema<ErrorsMap[E]["status"]>["headers"]
        >
    ) {
        super(message);

        // Set the prototype explicitly to ensure instanceof works correctly
        Object.setPrototypeOf(this, ApiRequestError.prototype);

        // Set instance name from constructor
        this.name = this.constructor.name;
    }

    toResponseSpec() {
        const status = errorsMap[this.code]["status"];
        const headers = this.headers;
        return {
            status,
            headers,
            body: {
                name: this.code,
                message: this.message,
            },
        } satisfies ApiErrorResponseSpec<E>;
    }
}
