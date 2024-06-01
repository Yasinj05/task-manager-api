import winston from "winston";

function error(err, req, res, next) {
  winston.log(err.message, err);

  res.status(500).send("Somthing failed.");
}

export default error;
