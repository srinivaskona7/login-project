const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../config/logger'); // Import the logger

// --- Register Route ---
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, passwordHint } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            logger.warn('Registration attempt with missing fields', { email });
            return res.status(400).json({ msg: 'Please enter all required fields' });
        }
        let user = await User.findOne({ email });
        if (user) {
            logger.warn('Registration attempt for existing user', { email });
            return res.status(400).json({ msg: 'User already exists' });
        }
        
        user = new User({ firstName, lastName, email, password, passwordHint });
        await user.save();

        logger.info('User registered successfully', { userId: user.id, email: user.email });
        res.status(201).json({ msg: 'User registered successfully!' });

    } catch (err) {
        logger.error('Server Error during registration', { 
            error: err.message, 
            stack: err.stack,
            email 
        });
        res.status(500).send('Server Error');
    }
});

// --- Login Route ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('Failed login attempt: Invalid Credentials (user not found)', { email });
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn('Failed login attempt: Invalid Credentials (password mismatch)', { email });
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            logger.info('User logged in successfully', { userId: user.id, email: user.email });
            res.json({ token });
        });
    } catch (err) {
        logger.error('Server Error during login', { 
            error: err.message, 
            stack: err.stack,
            email 
        });
        res.status(500).send('Server Error');
    }
});

module.exports = router;