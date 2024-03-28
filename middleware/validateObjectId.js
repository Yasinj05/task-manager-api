// Middleware function to validate MongoDB object IDs.

const mongoose = require("mongoose");

function validateObjectId(req, res, next) {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID provided.");
  }
  next();
}
module.exports = validateObjectId;
