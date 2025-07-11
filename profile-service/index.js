// profile-service/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Profile-Service: MongoDB Connected'))
    .catch(err => console.error('Profile-Service: MongoDB Connection Error:', err));

// --- THIS IS THE CORRECTED LINE ---
// It now correctly points to the profile routes
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Profile-Service running on port ${PORT}`));