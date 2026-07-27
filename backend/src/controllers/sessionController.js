import Session from "../models/Session.js"
import { streamClient, chatClient } from "../lib/stream.js";

export async function createSession(req, res) {
    try {
        const {problem, difficulty} = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty) {
            return res.status(400).json({message:"Problem and Difficulty are required"})
        }

        //generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        });
        
        //create stream video call
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {problem, difficulty, sessionId: session._id.toString()}
            }
        });

        //chat messaging
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id:clerkId,
            members:[clerkId]
        })

        await channel.create() 

        res.status(201).json({session})
        
    } catch(error) {
        console.log("Error in creating session controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getActiveSessions(_, res) {
    try {
        const sessions = await Session.find({status:"active"})
        .populate("host", "name profileImage email clerkId")
        .populate("participant", "name profileImage email clerkId")
        .sort({createdAt: -1})
        .limit(20);

        res.status(200).json({sessions});
    } catch(error) {
        console.log("Error in getActiveSessions", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getMyRecentSessions(req, res) { 
    try {
        //where the use is either host or participant
        const userId = req.user._id;
        const sessions = await Session.find({
            status: "completed", 
            $or: [{host: userId}, {participant: userId}]
        }) 
        .sort({createdAt: -1})
        .limit(20);

        res.status(200).json({sessions});
    } catch(error) {
        console.log("Error in getMyRecentSessions", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSessionById(req, res) {
    try {
        const {id} = req.params; 
        const session = await Session.findById(id)
        .populate("host", "name email profileImage clerkId")
        .populate("participant", "name email profileImage clerkId");

        if(!session) {
            return res.status(404).json({message:"Session not found"});
        }

        res.status(200).json({session});
    } catch(error) {
        console.log("Error in getSessionById", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function joinSession(req, res) {
    try {
        const {id} = req.params;
        const userId = req.user._id
        const clerkId = req.user.clerkId
        
        const session = await Session.findById(id);
        if(!session) {
            return res.status(404).json({message:"Session not found"});
        }

        if(session.status!=="active") {
            return res.status(400).json({message:"Session is not active"});
        }

        if(session.host.toString()===userId.toString()) {
            return res.status(400).json({message:"You are already the host"});
        }

        //checking if session is already full (2people) 
        if(session.participant) {
            return res.status(409).json({message:"Session is full"});
        }

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging",session.callId);
        await channel.addMembers([clerkId])

        return res.status(200).json({session});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function endSession(req, res) {
    try {
        const {id} = req.params;
        const userId = req.user._id;

        const session = await Session.findById(id);
        if(!session) {
            return res.status(404).json({message:"Session not found"});
        }

        //check if user is host
        if(session.host.toString() !== userId.toString()) {
            return res.status(403).json({message:"You are not authorized to end this session"});
        }

        if(session.status==="completed") {
            return res.status(400).json({message:"Session is already completed"});
        }

        //delete stream call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({hard:true});

        //delete stream chat channel
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        return res.status(200).json({message:"Session ended successfully"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}