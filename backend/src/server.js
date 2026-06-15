import express from "express";
import cors from "cors";
import path from 'path';

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

//middleware
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));// credentails:true - server allows browser cookies on request
app.use(clerkMiddleware()); // this adds auth field to req object: req.auth()

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chats", chatRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is up and running" })
})

const _dirname = path.resolve();
//making app ready for deployment
if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname, "../frontend/dist")))

    app.get('/{*any}',(req,res)=>{
        res.sendFile(path.join(_dirname,'../frontend','dist','index.html'))
    })
}

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