import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL
export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log("connection established ", conn.connection.host);
    }
    catch(error){
        console.log("connection failed",error);
    }
}