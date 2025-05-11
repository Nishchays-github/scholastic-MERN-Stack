import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes.js'
import findroutes from './routes/school.routes.js'
import cookieParser from "cookie-parser";
import path from 'path'
import {connectDB} from "./lib/db.js"
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5001;
// const radius = 10000;
// Middleware
const allowedOrigin = "http://localhost:5173";

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
// MongoDB Connection
app.use('/auth',authRoutes);
app.use('/api',findroutes);
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}
// -------------------- Start Server --------------------
app.listen(PORT,connectDB);
