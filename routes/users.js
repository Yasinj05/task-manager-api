const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user"); // Corrected import name to match model
const router = express.Router();

router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body); // Corrected function name to match model
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists with the given email
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // Create a new user object
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // Save the user to the database
  await user.save();

  // Send a response with only necessary user information
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
