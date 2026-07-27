import { clerkClient, getAuth } from "@clerk/express";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

export const protectRoute = [
    async (req,res,next) => {
        try {
            let clerkId;
            try {
                clerkId = getAuth(req)?.userId;
            } catch {
                clerkId = null; // clerkMiddleware bailed out, so auth was never attached
            }
            if(!clerkId) return res.status(401).json({message:"User not authenticated"})

            // find user in db using clerk ID
            let user = await User.findOne({clerkId})

            // fallback for users the inngest clerk/user.created handler never synced
            if(!user) {
                const clerkUser = await clerkClient.users.getUser(clerkId);
                const email = clerkUser.primaryEmailAddress?.emailAddress
                    || clerkUser.emailAddresses?.[0]?.emailAddress;
                if(!email) return res.status(404).json({message:"User not found"})

                const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ")
                    || clerkUser.username
                    || email;

                user = await User.findOneAndUpdate(
                    {clerkId},
                    {clerkId, name, email, profileImage: clerkUser.imageUrl || ""},
                    {new: true, upsert: true}
                );

                await upsertStreamUser({id: clerkId, name, image: user.profileImage})
            }

            //attach user to req
            req.user = user;
            next();
        } catch(error) {
            console.error(" Error in protectRoute: ", error)
            res.status(500).json({message:"Internal server error"})
        }
    }
]
