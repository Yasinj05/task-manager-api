import express from "express";
import configSetup from "./startup/config.js";
import dbSetup from "./startup/db.js";
import loggingSetup from "./startup/logging.js";
import routesSetup from "./startup/routes.js";
import winston from "winston";
import dotenv from "dotenv";
dotenv.config();

// Create Express application instance
const app = express();

// Setup logging, configuration, database connection, and routes
loggingSetup();
configSetup();
dbSetup();
routesSetup(app);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  winston.info(`Server is running on port ${PORT}`);
});
