import mongoose from "mongoose";
import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";



export const createChannel = async (req, res, next) => {
    try {
        const{ name ,members } =req.body;

        const userId = req.userId;

        const admin  = await User.findById(userId);
        if(!admin){
            return res.status(400).send("Admin user not found");
        }
        const validMembers  = await User.find({_id:{$in:members}});
        if(validMembers.length !== members.length){
            return res.status(400).send("some members are not valid users.");
        }
        const newChannel = new Channel({
            name,members,admin:userId,
        });

        await newChannel.save();
        return res.status(201).json({channel:newChannel});


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const getUserChannels = async (req, res, next) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);
        const channels = await Channel.find({
            $or:[{admin:userId},{members:userId}],
        }).sort({updatedAt:-1});



        return res.status(201).json({ channels });


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

export const getChannelMessages = async (req, res, next) => {
    try {
        // Extract channelId from request parameters
        const { channelId } = req.params;
        
        // Find the channel by its ID and populate messages with sender details
        const channel = await Channel.findById(channelId).populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "firstName lastName email _id image color",
            },
        });

        // Check if the channel exists
        if (!channel) {
            return res.status(404).send("Channel not found!");
        }

        // Retrieve the messages from the channel
        const messages = channel.messages;

        // Respond with the retrieved messages
        return res.status(200).json({ messages });

    } catch (error) {
        // Log the error and respond with a server error status
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
