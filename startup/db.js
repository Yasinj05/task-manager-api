import winston from "winston";
import mongoose from "mongoose";

// Function to setup database connection
export default function () {
  mongoose
    .connect("mongodb://localhost/task-manager")
    .then(() => winston.info("Connected to MongoDB..."));
}
