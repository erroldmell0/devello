import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined")
        }
        const connect = await mongoose.connect(ENV.DB_URL)
        console.log("database connected successfully:", connect.connection.host)
    } catch (err) {
        console.error("database connection failed", err)
        process.exit(1); // 0 you add for succes, 1 you add for faliure
    }
}