import {
    InferSchemaType,
    model,
    Schema,
} from 'mongoose';

const leadSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        status: {
            type: String,

            enum: [
                'New',
                'Contacted',
                'Qualified',
                'Lost',
            ],

            default: 'New',
        },

        source: {
            type: String,

            enum: [
                'Website',
                'Instagram',
                'Referral',
            ],

            required: true,
        },
    },
    {
        timestamps: true,
    }
);

leadSchema.index({
    status: 1,
});

leadSchema.index({
    source: 1,
});

leadSchema.index({
    createdAt: -1,
});

leadSchema.index({
    name: 'text',
    email: 'text',
});

export type LeadDocument =
    InferSchemaType<typeof leadSchema>;

export const Lead = model<LeadDocument>(
    'Lead',
    leadSchema
);