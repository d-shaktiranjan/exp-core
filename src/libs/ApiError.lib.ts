import { ERROR_CODE } from "../config/statusCode";

/**
 * Custom error class for handling API-specific errors with support for HTTP status codes
 * and detailed validation or field-level errors.
 *
 * Extends the built-in `Error` class to include additional properties commonly used
 * in API error responses.
 *
 * @class ApiError
 * @extends {Error}
 *
 * @property {ERROR_CODE|number} statusCode - HTTP status code associated with the error (default: ERROR_CODE.BAD_REQUEST).
 * @property {Record<string, string[]> | null} errors - Optional detailed validation or field-level errors (default: null).
 *
 * @example
 * throw new ApiError("Invalid input data", ERROR_CODE.BAD_REQUEST, {
 *   email: ["Email is required."],
 *   password: ["Password must be at least 8 characters."]
 * });
 */
class ApiError extends Error {
    statusCode: ERROR_CODE | number;
    errors: Record<string, string[]> | null;

    /**
     * Creates a new ApiError instance.
     *
     * @param {string} message - A human-readable error message.
     * @param {ERROR_CODE|number} [statusCode=ERROR_CODE.BAD_REQUEST] - Optional HTTP status code.
     * @param {Record<string, string[]> | null} [errors=null] - Optional detailed validation or field-level errors.
     */
    constructor(
        message: string,
        statusCode: number = ERROR_CODE.BAD_REQUEST,
        errors: Record<string, string[]> | null = null,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default ApiError;
