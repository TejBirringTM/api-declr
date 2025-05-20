import type { OutgoingHttpHeader, OutgoingHttpHeaders } from "http";
import type { ValueOf } from "ts-essentials";

/**
 * Response Header Keys:
 * A union of header keys extracted from the `node:http` package (OutgoingHttpHeaders).
 * If additional headers are required on a response, define them here!
 */
export type HttpResponseHeaderKey =
    | "accept"
    | "accept-charset"
    | "accept-encoding"
    | "accept-language"
    | "accept-ranges"
    | "access-control-allow-credentials"
    | "access-control-allow-headers"
    | "access-control-allow-methods"
    | "access-control-allow-origin"
    | "access-control-expose-headers"
    | "access-control-max-age"
    | "access-control-request-headers"
    | "access-control-request-method"
    | "age"
    | "allow"
    | "authorization"
    | "cache-control"
    | "cdn-cache-control"
    | "connection"
    | "content-disposition"
    | "content-encoding"
    | "content-language"
    | "content-length"
    | "content-location"
    | "content-range"
    | "content-security-policy"
    | "content-security-policy-report-only"
    | "cookie"
    | "dav"
    | "dnt"
    | "date"
    | "etag"
    | "expect"
    | "expires"
    | "forwarded"
    | "from"
    | "host"
    | "if-match"
    | "if-modified-since"
    | "if-none-match"
    | "if-range"
    | "if-unmodified-since"
    | "last-modified"
    | "link"
    | "location"
    | "max-forwards"
    | "origin"
    | "pragma"
    | "proxy-authenticate"
    | "proxy-authorization"
    | "public-key-pins"
    | "public-key-pins-report-only"
    | "range"
    | "referer"
    | "referrer-policy"
    | "refresh"
    | "retry-after"
    | "sec-websocket-accept"
    | "sec-websocket-extensions"
    | "sec-websocket-key"
    | "sec-websocket-protocol"
    | "sec-websocket-version"
    | "server"
    | "set-cookie"
    | "strict-transport-security"
    | "te"
    | "trailer"
    | "transfer-encoding"
    | "user-agent"
    | "upgrade"
    | "upgrade-insecure-requests"
    | "vary"
    | "via"
    | "warning"
    | "www-authenticate"
    | "x-content-type-options"
    | "x-dns-prefetch-control"
    | "x-frame-options"
    | "x-xss-protection";

/**
 * Convert an array type of response header keys to a union type of response header keys.
 */
export type HttpResponseHeaderKeysFromArray<
    KeysArray extends
        | Array<HttpResponseHeaderKey>
        | ReadonlyArray<HttpResponseHeaderKey>,
> = ValueOf<KeysArray>;

/**
 * Get the value type for a particular response header key.
 */
export type HttpResponseHeaderValueFromKey<
    Key,
    Strict extends boolean = false,
> = Strict extends true
    ? Key extends HttpResponseHeaderKey
        ? OutgoingHttpHeaders[Key]
        : never
    : Key extends HttpResponseHeaderKey
      ? OutgoingHttpHeaders[Key]
      : OutgoingHttpHeader;
