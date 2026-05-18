import { Router } from 'express';

import {
    loginController,
    meController,
    registerController,
} from './auth.controller';

import {
    loginSchema,
    registerSchema,
} from './auth.validator';

import { validate } from '../../middleware/validate.middleware';

import { verifyJwt } from '../../middleware/auth.middleware';

const router = Router();

router.post(
    '/register',
    validate(registerSchema),
    registerController
);

router.post(
    '/login',
    validate(loginSchema),
    loginController
);

router.get(
    '/me',
    verifyJwt,
    meController
);

export default router;