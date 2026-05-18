import {
    NextFunction,
    Request,
    Response,
} from 'express';

import { ApiError } from '../utils/api-error.util';

import { HTTP_STATUS } from '../constants/http-status.constants';

import { UserRole } from '../modules/auth/auth.types';

export const authorizeRoles =
    (...roles: UserRole[]) =>
        (
            req: Request,
            _res: Response,
            next: NextFunction
        ) => {
            if (!req.user) {
                throw new ApiError(
                    HTTP_STATUS.UNAUTHORIZED,
                    'Unauthorized'
                );
            }

            if (
                !roles.includes(req.user.role)
            ) {
                throw new ApiError(
                    HTTP_STATUS.FORBIDDEN,
                    'Forbidden'
                );
            }

            next();
        };