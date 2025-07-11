const winston = require('winston');

// Define log levels
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

// Create the logger instance
const logger = winston.createLogger({
  levels: logLevels,
  // Use JSON format for structured logging
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Write all logs to the console
    new winston.transports.Console(),
  ],
  exitOnError: false,
});

module.exports = logger;