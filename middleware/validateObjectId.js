const mongoose = require("mongoose");

/**
 * Middleware function to validate MongoDB object IDs.
 * Checks if the provided ID is a valid MongoDB object ID.
 * If the ID is invalid or not provided, sends a 404 response with an error message.
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */

function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID provided.");
  }
  next();
}
module.exports = validateObjectId;
