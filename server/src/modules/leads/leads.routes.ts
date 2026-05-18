import { Router } from 'express';

import {
    createLeadController,
    deleteLeadController,
    getLeadController,
    getLeadsController,
    updateLeadController,
    exportLeads
} from './leads.controller';

import {
    createLeadSchema,
    updateLeadSchema,
} from './leads.validator';

import { validate } from '../../middleware/validate.middleware';

import { verifyJwt } from '../../middleware/auth.middleware';

import { authorizeRoles } from '../../middleware/rbac.middleware';

const router = Router();

router.use(verifyJwt);

router.post(
    '/',
    validate(createLeadSchema),
    createLeadController
);

router.get(
    '/',
    getLeadsController
);

router.get(
    '/export',
    verifyJwt,
    authorizeRoles('admin'),
    exportLeads
);

router.get(
    '/:id',
    getLeadController
);

router.patch(
    '/:id',
    validate(updateLeadSchema),
    updateLeadController
);

router.delete(
    '/:id',

    authorizeRoles('admin'),

    deleteLeadController
);



export default router;