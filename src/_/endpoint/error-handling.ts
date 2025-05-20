import type { TxAdapterFn } from "./tx-adapters/_/tx-adapter";
import { ApiRequestError } from "../error/index";

/**
 * The error handling routine
 *
 * @param error - the thrown error
 * @param adapter - the adapter (TxAdapter) used to convert the response object (ApiResponseSpec) to a format suitable for transmission
 * @returns an instance of NextResponse representing the error response
 */
export function handleError<Tx>(error: unknown, adapter: TxAdapterFn<Tx>) {
    // Print the error
    console.error(error);
    // If thrown error is instance of ApiRequestError, transmit the corresponding response object
    if (error instanceof ApiRequestError) {
        return adapter(error.toResponseSpec());
    }
    // Otherwise, transmit a new ApiRequestError(ApiRequestError:Unknown, INTERNAL SERVER ERROR)
    else {
        return adapter(
            new ApiRequestError(
                "ApiRequestError:Unknown",
                "",
                {}
            ).toResponseSpec()
        );
    }
}
