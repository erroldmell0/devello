import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async () => {
    try {
        // In serverless (Vercel), this function may be called on every request.
        // Skip if already connected to avoid redundant connections.
        if (mongoose.connection.readyState === 1) {
            return;
        }
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined")
        }
        const connect = await mongoose.connect(ENV.DB_URL)
        console.log("database connected successfully:", connect.connection.host)
    } catch (err) {
        console.error("database connection failed", err)
    }
}