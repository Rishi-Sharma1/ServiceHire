import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2).max(50).trim(),

    email: z.string().email().trim().toLowerCase(),

    password: z
        .string()
        .min(8)
        .max(64)
        .regex(/[A-Z]/, 'Must contain uppercase letter')
        .regex(/[0-9]/, 'Must contain a number'),

    role: z.enum(['admin', 'sales_user']).optional(),
});

export const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),

    password: z.string().min(1),
});