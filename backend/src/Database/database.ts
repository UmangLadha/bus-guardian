import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    console.log("hello atlas");
    await mongoose.connect(process.env.MONGODB_ATLAS_URL!);
    console.log("Connected with MongoDB Atlas"); 
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};