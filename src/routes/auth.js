import express from "express";
import Joi from "joi";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { User } from "../models/user.js";

const router = express.Router();

// Handle POST request to authenticate user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // Compare passwords
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken(); // Generate authentication token
  res.send(token); // Send token if authentication is successful
});

// Function to validate user input
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(req);
}

export default router;
