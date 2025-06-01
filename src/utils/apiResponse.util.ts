import { Response } from "express";

/**
 * Sends a standardized successful API response.
 *
 * @function successResponse
 * @param {Response} res - Express response object.
 * @param {Object} options - Response options.
 * @param {string} options.message - Descriptive success message.
 * @param {number} [options.statusCode=200] - Optional HTTP status code (defaults to 200).
 * @param {object|null} [options.data=null] - Optional data payload (can be object or null).
 * @param {object|null} [options.meta=null] - Optional meta information (e.g., pagination, environment).
 * @returns {void}
 *
 * @example
 * successResponse(res, {
 *   message: "Users fetched successfully.",
 *   data: { users: [...] },
 *   meta: { totalCount: 50 }
 * });
 */
export const successResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        data?: object | null;
        meta?: object | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 200;
    return apiResponse(res, true, options as ApiResponseOptions);
};

/**
 * Sends a standardized error API response.
 *
 * @function errorResponse
 * @param {Response} res - Express response object.
 * @param {Object} options - Error response options.
 * @param {string} options.message - Error message describing what went wrong.
 * @param {number} [options.statusCode=400] - Optional HTTP status code (defaults to 400).
 * @param {Record<string, string[]> | null} [options.errors=null] - Optional validation or field-specific errors.
 * @returns {void}
 *
 * @example
 * errorResponse(res, {
 *   message: "Validation failed.",
 *   statusCode: 422,
 *   errors: {
 *     email: ["Email is required."],
 *     password: ["Password must be at least 8 characters."]
 *   }
 * });
 */
export const errorResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        errors?: Record<string, string[]> | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = 400;
    return apiResponse(res, false, options as ApiResponseOptions);
};

interface ApiResponseOptions {
    message: string;
    statusCode: number;
    data?: object;
    meta?: object;
    errors?: Record<string, string[]>;
}

function apiResponse(
    res: Response,
    isSuccess: boolean,
    options: ApiResponseOptions,
) {
    const responseObject = {
        isSuccess,
        message: options.message,
        ...(options.meta && { meta: options.meta }),
        ...(options.data && { data: options.data }),
        ...(options.errors && { errors: options.errors }),
    };
    res.status(options.statusCode).json(responseObject);
}
