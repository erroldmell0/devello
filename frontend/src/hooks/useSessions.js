import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session";

export const useCreateSession = () => {
    const result =  useMutation({
        mutationKey: ["createSession"],
        mutationFn: sessionApi.createSession,
        onSuccess: () => {toast.success("session created sucessfully")},
        onError: (error) => {toast.error(error.response?.data?.message || 'failed to create room')}
    })

    return result; 
}

export const useActiveSessions = () => {
    const result = useQuery({
        queryKey:["activeSessions"],
        queryFn: sessionApi.getActiveSessions
    })

    return result
}

export const useMyRecentSessions = () => {
    const result = useQuery({
        queryKey: ["myRecentSessions"],
        queryFn: sessionApi.getMyRecentSessions,
    })

    return result 
}

export const useSessionById = (id) => {
    const result = useQuery({
        queryKey: ["session", id],
        queryFn: () => sessionApi.getSessionById(id),
        enabled: !!id,
        refetchInterval: 5000, //refetch every 5 seconds to detect session status changes   
    })

    return result
}

export const useJoinSession = () => {
    const result =  useMutation({
        mutationKey: ["joinSession"],
        mutationFn: sessionApi.joinSession,
        onSuccess: () => {toast.success("Joined session")},
        onError: (error) => {toast.error(error.response?.data?.message || 'failed to join session')}
    })

    return result;
}

export const useEndSession = () => {
    const result = useMutation({
        mutationKey: ["endSession"],
        mutationFn: sessionApi.endSession,
        onSuccess: () => {toast.success("Session ended")},
        onError: (error) => {toast.error(error.response?.data?.message || 'failed to end session')}
    })

    return result;
}
