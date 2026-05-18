import { Router } from 'express';

import authRoutes from '../modules/auth/auth.routes';

import leadsRoutes from '../modules/leads/leads.routes';

import { authLimiter } from '../middleware/rate-limit.middleware';

const router = Router();

router.use('/auth', authLimiter, authRoutes);

router.use('/leads', leadsRoutes);

export default router;