const express = require("express");
const mongoose = require("mongoose");
const { Task, validate } = require("./models/task");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define routes
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.send(tasks); // Send tasks as response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status code for server errors
  }
});

app.post("/api/tasks", async (req, res) => {
  const { error } = validate(req.body); // Validate request body
  if (error) return res.status(400).send(error.details[0].message); // Send 400 status code for bad request

  try {
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
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  const { error } = validate(req.body); // Validate request body
  if (error) return res.status(400).send(error.details[0].message); // Send 400 status code for bad request

  try {
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
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    // Find and delete the task with the given ID
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task)
      return res.status(404).send("The task with the given ID was not found"); // Send 404 status code if task not found
    res.send(task); // Send the deleted task as response
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
