import type { ErrorCode } from "../../../error/_/errors-map";
import type { HttpStatus } from "../../../response/http-status";
import type {
    ApiErrorResponseSpec,
    ApiResponseSpec,
} from "../../../response/response-spec";
import type { ApiResponseSchema } from "../../../response/schema";

/**
 * Transmission Adapter (TxAdapter):
 * Converts the response object (ApiResponseSpec) into
 * a suitable format for transmission (i.e. via web server framework).
 */
export type TxAdapterFn<Tx> = (
    responseSpec:
        | ApiResponseSpec<HttpStatus, ApiResponseSchema<HttpStatus>>
        | ApiErrorResponseSpec<ErrorCode>
) => Tx;

/**
 * Declare a transmission adapter (TxAdapter)
 * for a particular transmission medium
 * (i.e. web server framework).
 *
 * @param status - the intended status of the response object
 * @param schema - the schema to contraint the response object via validation
 * @returns
 */
export const txAdapter = <Tx>(adapter: TxAdapterFn<Tx>) => adapter;
