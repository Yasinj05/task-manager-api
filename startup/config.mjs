import config from "config";
import winston from "winston";

export default function configSetup() {
  // Check if jwtPrivateKey is defined
  if (!config.get("jwtPrivateKey")) {
    // If jwtPrivateKey is not defined, create error message
    const errorMessage = "FATAL ERROR: jwtPrivateKey is not defined.";
    winston.error(errorMessage);
    throw new Error(errorMessage);
  }
}
