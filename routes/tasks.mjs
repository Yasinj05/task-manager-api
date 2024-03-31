import express from "express";
import auth from "../middleware/auth.mjs";
import admin from "../middleware/admin.mjs";
import { Task, validate } from "../models/task.mjs";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST a new task
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Create a new task object and save it to the database
    const task = new Task({
      name: req.body.name,
      author: req.body.author,
      task: req.body.task,
      date: req.body.date,
    });
    await task.save();
    res.send(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT update task by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find and update the task with the given ID
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        author: req.body.author,
        task: req.body.task,
        date: req.body.date,
      },
      { new: true } // Return the updated task
    );
    if (!task)
      return res.status(404).send("The task with the given ID was not found");
    res.send(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE task by ID
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    // Find and delete the task with the given ID
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).send("The task with the given ID was not found");
    res.send(task);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
