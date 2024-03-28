const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * Middleware function to authenticate user requests using JSON web tokens.
 * Checks for the presence of a valid token in the request header.
 * If no token is provided or the token is invalid, sends a 401 or 400 response accordingly.
 * If the token is valid, decodes it and attaches the decoded payload to the request object.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    console.error("Error verifying token:", ex); // Log the error for debugging purposes
    res.status(401).send("Invalid token.");
  }
}

module.exports = auth;
