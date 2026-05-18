import { NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';

import { ApiError } from '../utils/api-error.util';

import { HTTP_STATUS } from '../constants/http-status.constants';

export const errorMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    if (err instanceof ZodError) {
        return res.status(HTTP_STATUS.UNPROCESSABLE).json({
            success: false,
            message: 'Validation failed',

            errors: err.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
            })),
        });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Internal server error',
    });
};