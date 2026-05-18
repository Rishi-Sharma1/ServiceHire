import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        role: {
            type: String,
            enum: ['admin', 'sales_user'],
            default: 'sales_user',
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    return bcrypt.compare(candidatePassword, this.password);
};

export type UserDocument = InferSchemaType<typeof userSchema> & {
    comparePassword(candidatePassword: string): Promise<boolean>;
};

export const User = model<UserDocument>('User', userSchema);