import { ENV } from "./lib/env.js";
import path from 'path';
import express from "express";
import { connectDB } from "./lib/db.js";

const _dirname = path.resolve();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is up and running" })
})

app.get("/books", (req, res) => {
    res.status(200).json({ message: "list of books" })
})

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