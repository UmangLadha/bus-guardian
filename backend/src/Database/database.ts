import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected with MongoDB Atlas"); 
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};