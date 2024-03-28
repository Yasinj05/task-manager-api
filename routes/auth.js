const express = require("express");
const Joi = require("joi"); // Import Joi for request body validation
const _ = require("lodash");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const { User } = require("../models/user"); // Import User model
const router = express.Router(); // Create an Express router

// Handle POST request to authenticate user
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body); // Validate request body against schema
  if (error) return res.status(400).send(error.details[0].message); // Return 400 if validation fails

  // Find user by email
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password."); // Return 400 if user not found

  // Compare passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password."); // Return 400 if passwords don't match

  const token = user.generateAuthToken(); // Generate authentication token
  res.send(token); // Send token if authentication is successful
});

// Function to validate user input
function validate(req) {
  // Define Joi schema for validation
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(), // Define schema for email validation
    password: Joi.string().required().min(5).max(1024), // Define schema for password validation
  });

  // Validate the user object against the schema
  return schema.validate(req); // Return validation result
}

module.exports = router; // Export the router
