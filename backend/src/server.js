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

// CLIENT_URL may hold several comma separated origins
const allowedOrigins = (ENV.CLIENT_URL || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

//middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // non-browser clients send no Origin
        if (!allowedOrigins.length) return callback(null, true);
        callback(null, allowedOrigins.includes(origin.replace(/\/+$/, "")));
    },
    credentials: true, // credentails:true - server allows browser cookies on request
}));
app.use(clerkMiddleware()); // this adds auth field to req object: req.auth()

// a malformed/expired token makes clerkMiddleware throw - treat it as signed out
app.use((error, req, res, next) => {
    console.error("Clerk authentication failed:", error?.message);
    next();
});

// after the clerk handler, so a bad JSON body still ends up a 400
app.use(express.json());

// kept above the DB middleware so health never depends on mongo
app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is up and running" })
})

// connect to DB on every request (serverless-safe, skips if already connected)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("database connection failed", error);
        res.status(503).json({ message: "Database unavailable" });
    }
});

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chats", chatRoutes)
app.use("/api/sessions", sessionRoutes)

// answer with JSON so the client never gets an HTML error page
app.use((error, req, res, next) => {
    if (error?.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Invalid JSON body" });
    }
    console.error("Unhandled request error:", error);
    res.status(500).json({ message: "Internal server error" });
});

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