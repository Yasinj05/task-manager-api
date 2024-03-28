const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// Check if jwtPrivateKey is defined in configuration
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Mount the tasks, users, and authentication routers
app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
