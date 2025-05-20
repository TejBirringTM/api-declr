import type { IncomingHttpHeaders } from "http";
import type { ValueOf } from "ts-essentials";

type IncomingHttpHeader = string | string[];

/**
 * Request Header Keys:
 * A union of header keys extracted from the `node:http` package (IncomingHttpHeaders).
 * If additional headers are required on the request, define them here!
 */
export type HttpRequestHeaderKey =
    | "accept"
    | "accept-language"
    | "accept-patch"
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
    | "alt-svc"
    | "authorization"
    | "cache-control"
    | "connection"
    | "content-disposition"
    | "content-encoding"
    | "content-language"
    | "content-length"
    | "content-location"
    | "content-range"
    | "content-type"
    | "cookie"
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
    | "if-unmodified-since"
    | "last-modified"
    | "location"
    | "origin"
    | "pragma"
    | "proxy-authenticate"
    | "proxy-authorization"
    | "public-key-pins"
    | "range"
    | "referer"
    | "retry-after"
    | "sec-websocket-accept"
    | "sec-websocket-extensions"
    | "sec-websocket-key"
    | "sec-websocket-protocol"
    | "sec-websocket-version"
    | "set-cookie"
    | "strict-transport-security"
    | "tk"
    | "trailer"
    | "transfer-encoding"
    | "upgrade"
    | "user-agent"
    | "vary"
    | "via"
    | "warning"
    | "www-authenticate";

/**
 * Convert an array type of request header keys to a union type of request header keys.
 */
export type HttpRequestHeaderKeysFromArray<
    KeysArray extends
        | Array<HttpRequestHeaderKey>
        | ReadonlyArray<HttpRequestHeaderKey>,
> = ValueOf<KeysArray>;

/**
 * Get the value type for a particular request header key.
 */
export type HttpRequestHeaderValueFromKey<
    Key,
    Strict extends boolean = false,
> = Key extends HttpRequestHeaderKey
    ? IncomingHttpHeaders[Key]
    : Strict extends false
      ? IncomingHttpHeader
      : never;

/**
 * Represents request headers as a key-value map.
 */
export type HttpRequestHeaders<HeaderKeys extends HttpRequestHeaderKey> = {
    [K in HeaderKeys]: HttpRequestHeaderValueFromKey<K, true>;
};
