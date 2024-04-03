import express from "express";
import configSetup from "./startup/config.mjs";
import dbSetup from "./startup/db.mjs";
import loggingSetup from "./startup/logging.mjs";
import routesSetup from "./startup/routes.mjs";
import winston from "winston";

const app = express();

loggingSetup();
configSetup();
dbSetup();
routesSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  winston.info(`Server is running on port ${PORT}`);
});
