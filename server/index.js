import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

// CORS configuration
app.use(cors({
    origin: [process.env.ORIGIN], // Your client URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use("/uploads/profiles" , express.static("uploads/profiles"));
app.use("/uploads/files" , express.static("uploads/files"));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts" ,contactsRoutes);
app.use("/api/messages" , messagesRoutes);

// Basic error handling for unhandled routes
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

// Basic error handling for server errors
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

setupSocket(server);

// Connect to MongoDB
mongoose.connect(databaseURL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log('Database connection error:', err.message));
