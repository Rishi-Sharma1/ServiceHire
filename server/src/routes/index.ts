import { Router } from 'express';

import authRoutes from '../modules/auth/auth.routes';

import leadsRoutes from '../modules/leads/leads.routes';

const router = Router();

router.use('/auth', authRoutes);

router.use('/leads', leadsRoutes);

export default router;