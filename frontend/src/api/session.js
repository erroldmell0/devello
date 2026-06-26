import api from "../lib/axios";

export const sessionApi = {
    createSession: async(data) => {
        const response = await api.post("/sessions", data);
        return response.data
    }, 
     
    getActiveSessions: async() => {
        const response = await api.get("/sessions/active");
        return response.data
    }, 

    getMyRecentSessions: async() => {
        const response = await api.get("/sessions/my-recent");
        return response.data
    }, 

    getSessionById: async(id) => {
        const response = await api.get(`/sessions/${id}`);
        return response.data
    }, 

    joinSession: async(id) => {
        const response = await api.post(`/sessions/${id}/join`);
        return response.data;
    },

    endSession: async(id) => {
        const response = await api.post(`/sessions/${id}/end`);
        return response.data;
    },

    getStreamToken: async() => {
        const response = await api.get(`/chats/token`);
        return response.data;
    },
}