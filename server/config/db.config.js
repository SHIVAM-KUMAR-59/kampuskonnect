import mongoose from "mongoose";
import { DB_URL } from "./init.config.js";
import logger from "./logger.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
      tls: true,
      tlsAllowInvalidCertificates: false,
    });

    logger.success("Connected to MongoDB successfully");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

export default connectDB;
