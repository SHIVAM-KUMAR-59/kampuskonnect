import winston from "../config/logger.config.js";

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path || req.url;

  winston.debug(`${path}`);

  next();
};

export default logger;
