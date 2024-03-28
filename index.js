const express = require("express");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasks"); // Import tasks router
const usersRouter = require("./routes/users"); // Import users router
const authRouter = require("./routes/auth"); // Import authentication router

const app = express(); // Create Express application
const PORT = process.env.PORT || 3000; // Define port for server to listen on

// Parse JSON request bodies
app.use(express.json());

// Mount the tasks router under the /api/tasks path
app.use("/api/tasks", tasksRouter);
// Mount the users router under the /api/users path
app.use("/api/users", usersRouter);
// Mount the auth router under the /api/auth path
app.use("/api/auth", authRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB...")) // Log successful connection
  .catch((err) => console.error("Could not connect to MongoDB:", err)); // Log connection error

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
