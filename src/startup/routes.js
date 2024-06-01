import error from "../middleware/error.js";
import tasksRouter from "../routes/tasks.js";
import usersRouter from "../routes/users.js";
import authRouter from "../routes/auth.js";
import express from "express";

export default function setupRoutes(app) {
  app.use(express.json());

  // Mount routers for different API endpoints
  app.use("/api/tasks", tasksRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);

  // Error handling middleware
  app.use(error);
}
