import { error } from "console";
import dotenv from "dotenv";
import { z } from "zod";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
});

const envSchema = z.object({
    PORT: z.string().default('5000'),

    NODE_ENV: z.enum([
        'development',
        'production',
        'test'
    ]).default('development'),
    MONGO_URI: z.string().min(1),
    JWT_SECRET: z.string().min(10),
    JWT_EXPIRES_IN: z.string().default('7d'),
    CLIENT_URL: z.string().url()
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("Invalid ENV Variables", parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsedEnv.data;

