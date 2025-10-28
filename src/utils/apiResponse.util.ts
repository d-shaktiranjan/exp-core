import { Response } from "express";
import { ERROR_CODE, SUCCESS_CODE } from "../config/statusCode";

/**
 * Sends a standardized successful API response.
 *
 * @function successResponse
 * @param {Response} res - Express response object.
 * @param {string} message - Descriptive success message.
 * @param {Object} options - Response options.
 * @param {SUCCESS_CODE} [options.statusCode=SUCCESS_CODE.OK] - Optional HTTP status code from SUCCESS_CODE enum (defaults to SUCCESS_CODE.OK).
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
        statusCode?: SUCCESS_CODE;
        data?: object | null;
        meta?: object | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = SUCCESS_CODE.OK;
    return apiResponse(res, true, message, options as ApiResponseOptions);
};

/**
 * Sends a standardized error API response.
 *
 * @function errorResponse
 * @param {Response} res - Express response object.
 * @param {string} message - Error message describing what went wrong.
 * @param {Object} options - Error response options.
 * @param {ERROR_CODE} [options.statusCode=ERROR_CODE.BAD_REQUEST] - Optional HTTP status code from ERROR_CODE enum (defaults to ERROR_CODE.BAD_REQUEST).
 * @param {Record<string, string[]> | null} [options.errors] - Optional validation or field-specific errors mapping fields to their error messages.
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
        statusCode?: ERROR_CODE;
        errors?: Record<string, string[]> | null;
    },
): void => {
    if (!options.statusCode) options.statusCode = ERROR_CODE.BAD_REQUEST;
    return apiResponse(res, false, message, options as ApiResponseOptions);
};

interface ApiResponseOptions {
    statusCode: SUCCESS_CODE | ERROR_CODE;
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
