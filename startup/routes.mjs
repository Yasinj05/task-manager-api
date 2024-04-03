import error from "../middleware/error.mjs";
import tasksRouter from "../routes/tasks.mjs";
import usersRouter from "../routes/users.mjs";
import authRouter from "../routes/auth.mjs";
import express from "express";

export default function setupRoutes(app) {
  app.use(express.json());
  app.use("/api/tasks", tasksRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use(error);
}