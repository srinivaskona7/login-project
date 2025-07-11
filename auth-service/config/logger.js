const winston = require('winston');

// Define log levels and colors
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
    // - Write all logs to the console
    new winston.transports.Console(),
    // - Optionally, write error logs to a file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
  exitOnError: false,
});

module.exports = logger;