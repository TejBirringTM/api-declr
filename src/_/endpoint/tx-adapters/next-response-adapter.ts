import { NextResponse } from "next/server";
import { txAdapter } from "./_/tx-adapter";
import { httpStatusMap } from "../../response/http-status";
import type { ApiResponseBody } from "../../response/response-spec";

/**
 * A transmission adapter for the Next.js framework:
 * converts a response object (ApiResponseSpec) to an
 * instance of NextResponse.
 */
export const nextResponseAdapter = txAdapter((responseSpec) => {
    const response = NextResponse.json(
        {
            status: responseSpec.status,
            statusCode: httpStatusMap[responseSpec.status]["statusCode"],
            statusType: httpStatusMap[responseSpec.status]["category"],
            data: responseSpec.body,
        } satisfies ApiResponseBody<typeof responseSpec>,
        {
            status: httpStatusMap[responseSpec.status]["statusCode"],
            statusText: httpStatusMap[responseSpec.status]["status"],
            headers: {},
        }
    );

    return response;
});
