const mongoose = require("mongoose");
const Joi = require("joi");

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true, minlength: 2, maxlength: 20 },
  task: { type: String, required: true },
  date: { type: Date },
});

// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema);

// Validation function for validating task objects
function validateTask(task) {
  const schema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().min(2).max(20).required(),
    task: Joi.string().required(),
    date: Joi.date().required(),
  });

  return schema.validate(task);
}

exports.Task = Task;
exports.validate = validateTask;
exports.taskSchema = taskSchema;
