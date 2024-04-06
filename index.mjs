import express from "express";
import configSetup from "./startup/config.mjs";
import dbSetup from "./startup/db.mjs";
import loggingSetup from "./startup/logging.mjs";
import routesSetup from "./startup/routes.mjs";
import winston from "winston";

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
