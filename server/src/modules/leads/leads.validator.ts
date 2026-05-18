import { z } from 'zod';

export const createLeadSchema =
    z.object({
        name: z
            .string()
            .min(2)
            .max(100)
            .trim(),

        email: z
            .string()
            .email()
            .trim()
            .toLowerCase(),

        status: z.enum([
            'New',
            'Contacted',
            'Qualified',
            'Lost',
        ]),

        source: z.enum([
            'Website',
            'Instagram',
            'Referral',
        ]),
    });

export const updateLeadSchema =
    createLeadSchema.partial();

export const querySchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),

    status: z
        .enum([
            'New',
            'Contacted',
            'Qualified',
            'Lost',
        ])
        .optional(),

    source: z
        .enum([
            'Website',
            'Instagram',
            'Referral',
        ])
        .optional(),

    search: z.string().optional(),

    sort: z
        .enum(['latest', 'oldest'])
        .default('latest'),
});