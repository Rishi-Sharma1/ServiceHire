import mongoose from "mongoose";

import { env } from './env.config'


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MONGODB CONNECTED");
    }
    catch (err) {
        console.log("MongoDB connection failed");
        process.exit(1);
    }
}