require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./config/logger');

const app = express();

app.use(cors());
app.use(express.json());

// Setup Morgan to stream HTTP logs through Winston
app.use(morgan('combined', { 
  stream: { 
    write: (message) => logger.info(message.trim()) 
  } 
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => logger.info('Profile-Service: MongoDB Connected'))
    .catch(err => logger.error('Profile-Service: MongoDB Connection Error:', { error: err }));

// Routes
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logger.info(`Profile-Service running on port ${PORT}`));