
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.js"; // If app is being defined in socket.js, don't redeclare here

import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
 
const MONGO_URL = process.env.MONGO_URI; // Use environment variable for MONGO_URL

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
}
 const _dirname = path.resolve();
  console.log(_dirname);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200, // Legacy browser compatibility
};
app.use(cors(corsOptions)); // Enable CORS with the configured options

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get("*",(req,res) =>{
  res,sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am coming from the backend",
    success: true,
  });
});

// Server listening
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
