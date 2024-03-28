const mongoose = require("mongoose");
const Joi = require("joi");

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema);

// Validation function for validating task objects
function validateTask(task) {
  // Define Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().min(2).max(20).required(),
    task: Joi.string().required(),
    date: Joi.date().required(),
  });

  // Validate the task object against the schema
  return schema.validate(task);
}

// Export Task model, validation function, and task schema
exports.Task = Task;
exports.validate = validateTask;
exports.taskSchema = taskSchema;
