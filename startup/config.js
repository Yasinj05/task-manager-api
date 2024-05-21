import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

export default function configSetup() {
  // Check if jwtPrivateKey is defined
  if (!process.env.JWT_PRIVATE_KEY) {
    // If jwtPrivateKey is not defined, create error message
    const errorMessage = "FATAL ERROR: jwtPrivateKey is not defined.";
    winston.error(errorMessage);
    throw new Error(errorMessage);
  }
}
