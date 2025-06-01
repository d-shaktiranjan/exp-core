import { Response } from "express";

const apiResponse = (
    res: Response,
    isSuccess: boolean,
    options: {
        message: string;
        statusCode?: number;
        data?: object | null;
        metaData?: object | null;
        errors?: Record<string, string[]> | null;
    },
) => {
    const responseObject = {
        isSuccess,
        message: options.message,
        ...(options.metaData && { metaData: options.metaData }),
        ...(options.data && { data: options.data }),
        ...(options.errors && { errors: options.errors }),
    };
    res.status(options.statusCode || (isSuccess ? 200 : 400)).json(
        responseObject,
    );
};

export const successResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        data?: object | null;
        metaData?: object | null;
    },
): void => apiResponse(res, true, options);

export const errorResponse = (
    res: Response,
    options: {
        message: string;
        statusCode?: number;
        errors?: Record<string, string[]> | null;
    },
): void => apiResponse(res, false, options);
