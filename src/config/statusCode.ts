/**
 * HTTP Success Response Status Codes (2xx)
 *
 * These codes indicate that the client's request was successfully received,
 * understood, and accepted by the server.
 */
export enum SUCCESS_CODE {
    /**
     * 200 OK
     *
     * The request succeeded. The result and meaning of "success" depends on the HTTP method:
     * - **GET**: The resource has been fetched and is transmitted in the message body.
     * - **HEAD**: Representation headers are included in the response without any message body.
     * - **PUT** or **POST**: The resource describing the result of the action is transmitted in the message body.
     * - **TRACE**: The message body contains the request as received by the server.
     */
    OK = 200,

    /**
     * 201 Created
     *
     * The request succeeded, and a new resource was created as a result.
     * This is typically the response sent after **POST** requests, or some **PUT** requests.
     */
    CREATED = 201,

    /**
     * 202 Accepted
     *
     * The request has been received but not yet acted upon.
     * It is noncommittal, since there is no way in HTTP to later send
     * an asynchronous response indicating the outcome of the request.
     * Commonly used for asynchronous or batch processing.
     */
    ACCEPTED = 202,

    /**
     * 203 Non-Authoritative Information
     *
     * The returned metadata is not exactly the same as is available from the origin server,
     * but is collected from a local or a third-party copy.
     * Mostly used for mirrors or backups of another resource.
     * For most cases, **200 OK** is preferred.
     */
    NON_AUTHORITATIVE_INFORMATION = 203,

    /**
     * 204 No Content
     *
     * There is no content to send for this request, but headers may be useful.
     * The user agent may update its cached headers for this resource.
     * Often used for **DELETE** requests or updates that don’t need a response body.
     */
    NO_CONTENT = 204,

    /**
     * 205 Reset Content
     *
     * Instructs the user agent to reset the document which sent this request.
     * Typically used when form input should be cleared after submission.
     */
    RESET_CONTENT = 205,

    /**
     * 206 Partial Content
     *
     * The server is delivering only part of the resource due to a range header sent by the client.
     * Commonly used for resuming downloads or streaming media.
     */
    PARTIAL_CONTENT = 206,

    /**
     * 207 Multi-Status (WebDAV)
     *
     * Conveys information about multiple resources,
     * for situations where multiple status codes might be appropriate.
     */
    MULTI_STATUS = 207,

    /**
     * 208 Already Reported (WebDAV)
     *
     * Used inside a <dav:propstat> response element to avoid
     * repeatedly enumerating the internal members of multiple
     * bindings to the same collection.
     */
    ALREADY_REPORTED = 208,

    /**
     * 226 IM Used (HTTP Delta Encoding)
     *
     * The server has fulfilled a **GET** request for the resource,
     * and the response is a representation of the result of one or more
     * instance-manipulations applied to the current instance.
     */
    IM_USED = 226,
}

/**
 * HTTP Client Error Response Status Codes (4xx)
 *
 * These codes indicate that the client seems to have made an error.
 * The server cannot or will not process the request as sent.
 */
export enum ERROR_CODE {
    /**
     * 400 Bad Request
     *
     * The server cannot or will not process the request due to something that is perceived
     * to be a client error (e.g., malformed request syntax, invalid request message framing,
     * or deceptive request routing).
     */
    BAD_REQUEST = 400,

    /**
     * 401 Unauthorized
     *
     * Although the HTTP standard specifies "unauthorized", semantically this means "unauthenticated".
     * The client must authenticate itself to get the requested response.
     */
    UNAUTHORIZED = 401,

    /**
     * 402 Payment Required
     *
     * Initially intended for digital payment systems. Rarely used and no standard convention exists.
     */
    PAYMENT_REQUIRED = 402,

    /**
     * 403 Forbidden
     *
     * The client does not have access rights to the content; that is, it is unauthorized,
     * so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
     * the client's identity is known to the server.
     */
    FORBIDDEN = 403,

    /**
     * 404 Not Found
     *
     * The server cannot find the requested resource. In browsers, this often means the URL is invalid.
     * In APIs, this can also mean the endpoint is valid but the resource does not exist.
     * Sometimes returned instead of 403 to hide resource existence.
     */
    NOT_FOUND = 404,

    /**
     * 405 Method Not Allowed
     *
     * The request method is known by the server but is not supported by the target resource.
     * For example, an API may not allow DELETE on a specific endpoint.
     */
    METHOD_NOT_ALLOWED = 405,

    /**
     * 406 Not Acceptable
     *
     * Returned when the server cannot produce a response matching the list of acceptable
     * values defined in the request's proactive content negotiation headers.
     */
    NOT_ACCEPTABLE = 406,

    /**
     * 407 Proxy Authentication Required
     *
     * Similar to 401 Unauthorized, but authentication is required to be done via a proxy.
     */
    PROXY_AUTHENTICATION_REQUIRED = 407,

    /**
     * 408 Request Timeout
     *
     * The server timed out waiting for the request. Often sent on idle connections.
     * Indicates the client should try again later.
     */
    REQUEST_TIMEOUT = 408,

    /**
     * 409 Conflict
     *
     * The request conflicts with the current state of the server.
     * Commonly occurs in edit conflicts or duplicate submissions.
     */
    CONFLICT = 409,

    /**
     * 410 Gone
     *
     * The requested content has been permanently deleted from the server, with no forwarding address.
     * Clients should remove their caches and links to the resource.
     */
    GONE = 410,

    /**
     * 411 Length Required
     *
     * The server rejected the request because the Content-Length header field is missing
     * and the server requires it.
     */
    LENGTH_REQUIRED = 411,

    /**
     * 412 Precondition Failed
     *
     * One or more conditions given in the request header fields evaluated to false when tested on the server.
     * Typically occurs in conditional requests using ETags or modification dates.
     */
    PRECONDITION_FAILED = 412,

    /**
     * 413 Content Too Large
     *
     * The request body is larger than limits defined by the server.
     * The server might close the connection or return a Retry-After header field.
     */
    CONTENT_TOO_LARGE = 413,

    /**
     * 414 URI Too Long
     *
     * The URI requested by the client is longer than the server is willing to interpret.
     */
    URI_TOO_LONG = 414,

    /**
     * 415 Unsupported Media Type
     *
     * The media format of the requested data is not supported by the server,
     * so the server is rejecting the request.
     */
    UNSUPPORTED_MEDIA_TYPE = 415,

    /**
     * 416 Range Not Satisfiable
     *
     * The range specified by the Range header field in the request cannot be fulfilled.
     * The range may be outside the size of the target resource.
     */
    RANGE_NOT_SATISFIABLE = 416,

    /**
     * 417 Expectation Failed
     *
     * The expectation given in the Expect request header could not be met by the server.
     */
    EXPECTATION_FAILED = 417,

    /**
     * 418 I'm a teapot
     *
     * Defined in RFC 2324, "Hyper Text Coffee Pot Control Protocol".
     * The server refuses the attempt to brew coffee with a teapot.
     */
    IM_A_TEAPOT = 418,

    /**
     * 421 Misdirected Request
     *
     * The request was directed at a server that is not able to produce a response.
     * This can happen when a request is sent to the wrong origin or configuration.
     */
    MISDIRECTED_REQUEST = 421,

    /**
     * 422 Unprocessable Content (WebDAV)
     *
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    UNPROCESSABLE_CONTENT = 422,

    /**
     * 423 Locked (WebDAV)
     *
     * The resource that is being accessed is locked.
     */
    LOCKED = 423,

    /**
     * 424 Failed Dependency (WebDAV)
     *
     * The request failed due to failure of a previous request.
     */
    FAILED_DEPENDENCY = 424,

    /**
     * 425 Too Early (Experimental)
     *
     * Indicates that the server is unwilling to risk processing a request that might be replayed.
     */
    TOO_EARLY = 425,

    /**
     * 426 Upgrade Required
     *
     * The server refuses to perform the request using the current protocol
     * but might be willing to do so after the client upgrades to a different one.
     * The server sends an Upgrade header in the response to indicate the required protocol(s).
     */
    UPGRADE_REQUIRED = 426,

    /**
     * 428 Precondition Required
     *
     * The origin server requires the request to be conditional to prevent the "lost update" problem.
     */
    PRECONDITION_REQUIRED = 428,

    /**
     * 429 Too Many Requests
     *
     * The user has sent too many requests in a given amount of time (rate limiting).
     */
    TOO_MANY_REQUESTS = 429,

    /**
     * 431 Request Header Fields Too Large
     *
     * The server is unwilling to process the request because its header fields are too large.
     * The request may be resubmitted after reducing the size of the request headers.
     */
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

    /**
     * 451 Unavailable For Legal Reasons
     *
     * The user agent requested a resource that cannot legally be provided,
     * such as a web page censored by a government.
     */
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,
}
