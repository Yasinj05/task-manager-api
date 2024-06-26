import express from "express";
import auth from "../middleware/auth.js";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { User, validate } from "../models/user.js";

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // Hash the password before saving to the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken(); // Generate JWT token
  res
    .header("x-auth-token", token) // Set the token in the response header
    .send(_.pick(user, ["_id", "name", "email"])); // Send user information (excluding password) in the response
});

export default router;
