import config from "config";
import winston from "winston";

export default function configSetup() {
  if (!config.get("jwtPrivateKey")) {
    const errorMessage = "FATAL ERROR: jwtPrivateKey is not defined.";
    winston.error(errorMessage);
    throw new Error(errorMessage);
  }
}
