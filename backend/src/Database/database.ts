import mongoose from "mongoose";

export const connectDB = async (mongodb_url:string) => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("Connected with MongoDB Atlas"); 
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};