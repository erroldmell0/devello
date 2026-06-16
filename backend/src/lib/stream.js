import {StreamChat} from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk";
import {ENV} from "./env.js"

const apiKey = ENV.STREAM_API_KEY
const secretKey = ENV.STREAM_API_SECRET

if(!apiKey || !secretKey){
    console.error("Stream API Key is missing")
}

export const chatClient = StreamChat.getInstance(apiKey, secretKey); // for chat features
export const streamClient =  new StreamClient(apiKey, secretKey); // for video calls

//upser - means both create and update an user 
export const upsertStreamUser = async(userData) => {
    try {
        await chatClient.upsertUser(userData)
        console.log("Stream user upserted  sucessfully:", userData)
    } catch (error) {
        console.error("Error upserting Stream user: ",error)
    }
}

export const deleteStreamUser = async(userId) => {
    try {
        await chatClient.deleteUser(userId)
        console.log("Stream user deleted sucessfully:", userId)
    } catch (error) {
        console.error("Error deleteing stream user :",error)
    }
}