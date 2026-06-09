import dontenv from "dotenv";
dontenv.config();

export const ENV = {
    port: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV || "development",
}