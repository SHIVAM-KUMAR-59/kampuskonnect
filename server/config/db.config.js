import mongoose from "mongoose";
import { DB_URL } from "./init.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
