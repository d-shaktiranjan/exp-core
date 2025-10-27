import { Response } from "express";

/**
 * Sends a standardized successful API response.
 *
 * @function successResponse
 * @param {Response} res - Express response object.
 * @param {string} message - Descriptive success message.
 * @param {Object} options - Response options.
 * @param {number} [options.statusCode=200] - Optional HTTP status code (defaults to 200).
 * @param {object|null} [options.data] - Optional data payload.
 * @param {object|null} [options.meta] - Optional meta information (e.g., pagination, environment).
 * @returns {void}
 *
 * @example
 * successResponse(res, "Users fetched successfully.", {
 *   data: { users: [...] },
 *   meta: { totalCount: 50 }
 * });
 */
export const successResponse = (
    res: Response,
    message: string,
    options: {
        statusCode?: number;
        data?: object | null;
        meta?: object | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 200;
    return apiResponse(res, true, message, options as ApiResponseOptions);
};

/**
 * Sends a standardized error API response.
 *
 * @function errorResponse
 * @param {Response} res - Express response object.
 * @param {string} message - Error message describing what went wrong.
 * @param {Object} options - Error response options.
 * @param {number} [options.statusCode=400] - Optional HTTP status code (defaults to 400).
 * @param {Record<string, string[]> | null} [options.errors] - Optional validation or field-specific errors.
 * @returns {void}
 *
 * @example
 * errorResponse(res, "Validation failed.", {
 *   statusCode: 422,
 *   errors: {
 *     email: ["Email is required."],
 *     password: ["Password must be at least 8 characters."]
 *   }
 * });
 */
export const errorResponse = (
    res: Response,
    message: string,
    options: {
        statusCode?: number;
        errors?: Record<string, string[]> | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 400;
    return apiResponse(res, false, message, options as ApiResponseOptions);
};

interface ApiResponseOptions {
    statusCode: number;
    data?: object;
    meta?: object;
    errors?: Record<string, string[]>;
}

function apiResponse(
    res: Response,
    isSuccess: boolean,
    message: string,
    options: ApiResponseOptions,
) {
    const responseObject = {
        isSuccess,
        message,
        ...(options.meta && { meta: options.meta }),
        ...(options.data && { data: options.data }),
        ...(options.errors && { errors: options.errors }),
    };
    res.status(options.statusCode).json(responseObject);
}
