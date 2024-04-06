import winston from "winston";
import "express-async-errors";

export default function loggingSetup() {
  // Handle uncaught exceptions and log them
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  // Handle unhandled promise rejections and throw them as exceptions
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // Add file transport to log regular logs to a file
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
}
