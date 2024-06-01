import winston from "winston";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Function to setup database connection
export default function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => winston.info("Connected to MongoDB..."));
}
