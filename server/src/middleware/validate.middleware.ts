import {
    NextFunction,
    Request,
    Response,
} from 'express';

import { ZodSchema } from 'zod';

export const validate =
    (
        schema: ZodSchema,
        target: 'body' | 'query' = 'body'
    ) =>
        (
            req: Request,
            _res: Response,
            next: NextFunction
        ) => {
            schema.parse(req[target]);

            next();
        };