import { createLogger, format, transports, addColors } from "winston";
const { combine, printf, colorize, errors } = format;

// Define custom colors for log levels
const customColors = {
  error: "bold red",
  debug: "bold yellow",
  success: "bold green",
};

// Add custom level
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 3,
    debug: 4,
  },
  colors: customColors,
};

// Add colors to Winston
addColors(customLevels.colors);

// IST timestamp formatter
const getISTTimestamp = () => {
  const date = new Date();
  const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");
  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");
  const seconds = String(istDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Custom format
const customFormat = printf(({ level, message, stack }) => {
  const levelUpper = level.replace(/\w+/g, (match) => match.toUpperCase());
  const stackTrace = stack ? `\n${stack}` : "";
  return `[${getISTTimestamp()}] [${levelUpper}]: ${message}${stackTrace}`;
});

// Format for console (with colors)
const consoleFormat = combine(errors({ stack: true }), customFormat, colorize({ all: true }));

// Format for files (without colors)

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  level: "debug",
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
  ],
});

// Custom helper methods
logger.success = (msg) => logger.log({ level: "success", message: msg });
logger.debugLog = (msg) => logger.log({ level: "debug", message: msg });
logger.warnLog = (msg) => logger.log({ level: "warn", message: msg });
logger.errorLog = (msg) => logger.log({ level: "error", message: msg });

export default logger;
