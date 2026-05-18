import {
    NextFunction,
    Request,
    Response,
} from 'express';

import { verifyToken } from '../utils/jwt.util';

import { ApiError } from '../utils/api-error.util';

import { HTTP_STATUS } from '../constants/http-status.constants';

export const verifyJwt = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const authHeader =
        req.headers.authorization;

    if (
        !authHeader ||
        !authHeader.startsWith('Bearer ')
    ) {
        throw new ApiError(
            HTTP_STATUS.UNAUTHORIZED,
            'Unauthorized'
        );
    }

    const token =
        authHeader.split(' ')[1];

    const decoded = verifyToken(token);

    req.user = {
        _id: decoded._id,
        email: decoded.email,
        role: decoded.role as any,
    };

    next();
};