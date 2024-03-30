// Middleware function for checking if the user is an admin
function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}

module.exports = admin;
