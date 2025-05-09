import express from "express";
import cors from "cors";
import mongoose from  "mongoose";
import authRoutes from './routes/auth.routes.js'
import findroutes from './routes/school.routes.js'
import cookieParser from "cookie-parser";
import x from "../client/dist"
import path from 'path'
const app = express();
const PORT = process.env.PORT || 5000;
// const radius = 10000;
// Middleware

const allowedOrigin = "http://localhost:5173";
const __dirname = path.resolve();


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: allowedOrigin,
  credentials: true, // allow cookies and headers like Authorization
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"../client/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client","dist","index.html"));
})
// MongoDB Connection
const MONGO_URI = "mongodb+srv://rudrasingh090907:J81ZhNrdmXB2Z0Er@cluster0.wgfvmem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.use('/auth',authRoutes);
app.use('/api',findroutes);



// -------------------- Start Server --------------------
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));













// import express from "express";
// import cors from "cors";
// import mongoose from  "mongoose";
// import authRoutes from './routes/auth.routes.js'
// import findroutes from './routes/school.routes.js'
// import cookieParser from "cookie-parser";
// const app = express();
// const PORT = 5000;
// // const radius = 10000;
// // Middleware
// const allowedOrigin = "http://localhost:5173";

// app.use(cors({
//   origin: allowedOrigin,
//   credentials: true, // allow cookies and headers like Authorization
// }));

// app.use(express.json());
// app.use(cookieParser());
// // MongoDB Connection
// const MONGO_URI = "mongodb+srv://manu:manu2004@cluster0.llkyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("✅ Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// app.use('/auth',authRoutes);
// app.use('/api',findroutes);
// // -------------------- Start Server --------------------
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
