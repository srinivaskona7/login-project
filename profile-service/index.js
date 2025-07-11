require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Profile-Service: MongoDB Connected'))
    .catch(err => console.error('Profile-Service: MongoDB Connection Error:', err));

// API Routes
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Profile-Service running on port ${PORT}`));