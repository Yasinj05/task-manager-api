const Joi = require("joi");
const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Validation function for validating user objects
function validateUser(user) {
  // Define Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  });

  // Validate the user object against the schema
  return schema.validate(user);
}

// Export User model, validation function, and user schema
exports.User = User;
exports.validateUser = validateUser; // Corrected the export name
exports.userSchema = userSchema;