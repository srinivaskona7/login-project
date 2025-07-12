require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./config/logger'); // Import logger

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Setup Morgan to stream HTTP logs through Winston
app.use(morgan('combined', { 
  stream: { 
    write: (message) => logger.info(message.trim()) 
  } 
}));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('Auth-Service: MongoDB Connected')) // Use logger
    .catch(err => logger.error('Auth-Service: MongoDB Connection Error:', err)); // Use logger

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Auth-Service running on port ${PORT}`)); // Use logger