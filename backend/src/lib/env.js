import dontenv from "dotenv";
dontenv.config();

export const ENV = {
    port: process.env.PORT || 3000,
}