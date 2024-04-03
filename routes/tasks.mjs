import express from "express";
import auth from "../middleware/auth.mjs";
import admin from "../middleware/admin.mjs";
import { Task, validate } from "../models/task.mjs";
import error from "../middleware/error.mjs";

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
    name: req.body.name,
    author: req.body.author,
    task: req.body.task,
    date: req.body.date,
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
      name: req.body.name,
      author: req.body.author,
      task: req.body.task,
      date: req.body.date,
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
