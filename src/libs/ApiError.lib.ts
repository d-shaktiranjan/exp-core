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
 * @property {number} statusCode - HTTP status code associated with the error (default: 400).
 * @property {Record<string, string[]> | null} errors - Optional detailed validation or field-level errors.
 *
 * @example
 * throw new ApiError("Invalid input data", 422, {
 *   email: ["Email is required."],
 *   password: ["Password must be at least 8 characters."]
 * });
 */
class ApiError extends Error {
    statusCode: number;
    errors: Record<string, string[]> | null;

    /**
     * Creates a new ApiError instance.
     *
     * @param {string} message - A human-readable error message.
     * @param {number} [statusCode=400] - Optional HTTP status code.
     * @param {Record<string, string[]> | null} [errors=null] - Optional detailed errors.
     */
    constructor(
        message: string,
        statusCode: number = 400,
        errors: Record<string, string[]> | null = null,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default ApiError;
