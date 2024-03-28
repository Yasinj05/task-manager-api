const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user"); // Import required modules and the User model
const router = express.Router(); // Create an instance of Express Router

router.post("/", async (req, res) => {
  // Validate the request body using the validate function from the User model
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); // Return error if validation fails

  // Check if the user already exists with the given email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered."); // Return error if user already exists

  // Create a new user object with selected fields from the request body
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save the user to the database
  await user.save();

  // Send a response with only necessary user information (excluding the password)
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router; // Export the router for use in other files
