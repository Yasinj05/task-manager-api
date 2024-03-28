const express = require("express");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount the tasks router under the /api/tasks path
app.use("/api/tasks", tasksRouter); // Changed to use tasksRouter
app.use("/api/users", usersRouter); // Added users router

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
