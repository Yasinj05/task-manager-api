// Middleware function to authenticate user requests using JSON web tokens.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    console.error("Error verifying token:", ex);
    res.status(401).send("Invalid token.");
  }
}

export default auth;
