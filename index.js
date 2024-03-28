const express = require("express");
const mongoose = require("mongoose");
const { Task, validate } = require("./models/task");
const tasks = require("./routes/tasks"); // Import the tasks router

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount the tasks router under the /api/tasks path
app.use("/api/tasks", tasks);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
