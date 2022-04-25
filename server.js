import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import profileroute from "./routes/profileRoutes.js";
import userroute from "./routes/userRoutes.js";
import authroute from "./routes/authRoutes.js";
import postroute from "./routes/postRoutes.js";

dotenv.config();

const app = express(); 

//Connect Database
connectDB();

app.get("/", (req, res) => res.send("API running..."));

app.use(express.json({ extended: false }));
app.use("/api/users", userroute);
app.use("/api/profile", profileroute);
app.use("/api/auth", authroute);
app.use("/api/post", postroute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`app running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
