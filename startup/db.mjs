import winston from "winston";
import mongoose from "mongoose";

export default function () {
  mongoose
    .connect("mongodb://localhost/task-manager")
    .then(() => winston.info("Connected to MongoDB..."));
}
