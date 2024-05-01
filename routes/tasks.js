import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { Task, validate } from "../models/task.js";
import error from "../middleware/error.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res, next) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// POST a new task
router.post("/", auth, async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    title: req.body.title,
    task: req.body.task,
    date: req.body.date,
    category: req.body.category,
  });
  await task.save();
  res.send(task);
});

// PUT update task by ID
router.put("/:id", auth, async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      task: req.body.task,
      date: req.body.date,
      category: req.body.category,
    },
    { new: true }
  );
  if (!task) return res.status(404).send("Task not found");

  res.send(task);
});

// DELETE task by ID
router.delete("/:id", [auth, admin], async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send("Task not found");

  res.send(task);
});

export default router;
