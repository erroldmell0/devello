import { chatClient } from "../lib/stream.js"

export async function getStreamToken(req, res) {
    try {
        // in stream user is saved using clerk Id
        //so use clerk id to find token
        const token = chatClient.createToken(req.user.clerkId)
        
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        });
    } catch(error) {
        console.log("Error: ", error)
        res.status(500).json({message: "Internal server error"})
    }
}