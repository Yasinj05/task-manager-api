const express = require("express");
const { Task, validate } = require("../models/task"); // Import Task model and validation function
const router = express.Router(); // Create an Express router

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.send(tasks); // Send tasks as response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status code for server errors
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body); // Validate request body
    if (error) return res.status(400).send(error.details[0].message); // Send 400 status code for bad request

    // Create a new task object and save it to the database
    const task = new Task({
      name: req.body.name,
      author: req.body.author,
      task: req.body.task,
      date: req.body.date,
    });
    await task.save();
    res.send(task); // Send the created task as response
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status code for server errors
  }
});

// PUT update task by ID
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body); // Validate request body
    if (error) return res.status(400).send(error.details[0].message); // Send 400 status code for bad request

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
      return res.status(404).send("The task with the given ID was not found"); // Send 404 status code if task not found
    res.send(task); // Send the updated task as response
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status code for server errors
  }
});

// DELETE task by ID
router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the task with the given ID
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).send("The task with the given ID was not found"); // Send 404 status code if task not found
    res.send(task); // Send the deleted task as response
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status code for server errors
  }
});

module.exports = router; // Export the router
