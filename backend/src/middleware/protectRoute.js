import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth({signInUrl: "/sign-in"}),
    async (req,res,next) => {
        try {
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({message:"User not authenticated"})
            
            // find user in db using clerk ID
            const user = await User.findOne({clerkId})
            if(!user) return res.status(404).json({message:"User not found"})

            //attach user to req
            req.user = user;
            next();
        } catch(error) {
            console.error(" Error in protectRoute: ", error)
            res.status(500).json({message:"Internal server error"})
        }
    }
]