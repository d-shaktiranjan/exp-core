import { Request, Response, NextFunction } from "express";
import aw from "../middlewares/aw.middleware.js";

/**
 * Middleware to ensure `req.body` is always initialized as an object.
 *
 * In Express 5, `req.body` is `undefined` by default if no body-parsing middleware
 * is used. This middleware sets `req.body` to `{}` if it's undefined.
 *
 * @function initRequestBody
 */
const initRequestBody = aw(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) req.body = {};
        next();
    },
);

export default initRequestBody;
