import axios from "axios";
import { getToken } from "@clerk/react";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

// frontend and backend sit on different hosts, so the Clerk cookie never reaches the
// backend - send the session token as a Bearer header instead
api.interceptors.request.use(async (config) => {
    try {
        const token = await getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
        console.error("Failed to attach Clerk session token", error);
    }
    return config;
})

export default api
