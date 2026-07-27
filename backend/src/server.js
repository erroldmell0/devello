import express from "express";
import cors from "cors";
import path from 'path';

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL?.replace(/\/+$/, ""),credentials:true}));// credentails:true - server allows browser cookies on request
app.use(clerkMiddleware()); // this adds auth field to req object: req.auth()

// connect to DB on every request (serverless-safe, skips if already connected)
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chats", chatRoutes)
app.use("/api/sessions", sessionRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is up and running" })
})

// In development, start the server with app.listen
if (ENV.NODE_ENV !== 'production') {
    const startServer = async() => {
        try {
            await connectDB();
            app.listen(ENV.PORT, () => {
                console.log(`Server is running on port ${ENV.PORT}`);
            });
        } catch (error) {
            console.error("server failed to start", error)
        }
    }
    startServer();
}

// Export app for Vercel serverless
export default app;