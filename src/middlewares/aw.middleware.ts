import { NextFunction, Request, RequestHandler, Response } from "express";

import { APP_MESSAGES } from "../config/messages.js";
import { errorResponse } from "../utils/apiResponse.util.js";

/**
 * Wraps an async Express route handler to catch errors and forward them to a standardized error response.
 *
 * Prevents the need for repetitive try/catch blocks in each async controller by automatically
 * handling rejected promises and formatting the error using a consistent API response shape.
 *
 * @function aw
 * @param {RequestHandler} requestHandler - The async route/controller function to wrap.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} A new Express-compatible middleware function.
 *
 * @example
 * // usage in a route
 * router.get('/users', aw(async (req, res) => {
 *   const users = await userService.getAllUsers();
 *   return successResponse(res, {
 *     message: "Users fetched successfully.",
 *     data: { users }
 *   });
 * }));
 */
const aw = (
    requestHandler: RequestHandler,
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            const message = error.message || APP_MESSAGES.SERVER_ERROR;
            return errorResponse(res, {
                message,
                statusCode: error.statusCode || 400,
                errors: error.errors || null,
            });
        });
    };
};

export default aw;
