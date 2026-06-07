import { ENV } from "./lib/env.js";
import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "server is up and running" })
})

app.listen(ENV.port, () => {
    console.log(`Server is running on port ${ENV.port}`);
});