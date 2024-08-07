import { Router } from "express"; // Check if Express is installed and imported correctly
import { verifyToken } from "../middlewares/AuthMiddleware.js"; // Ensure the path is correct and the file exports verifyToken
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js"; // Ensure the path is correct and the file exports createChannel

const channelRoutes = Router(); // Initialize Router

// Define the route with middleware and controller
channelRoutes.post("/create-channel", verifyToken, createChannel);
channelRoutes.get("/get-user-channels" ,verifyToken ,getUserChannels);
channelRoutes.get("/get-channel/messages/:channelId",verifyToken , getChannelMessages);

export default channelRoutes; // Ensure export is correct
