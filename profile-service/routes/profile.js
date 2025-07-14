const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const logger = require('../config/logger');

// ... (other routes like /me, /picture, etc.)

// --- UPDATE USER DETAILS (NAME & HINT) ---
router.put('/details', authMiddleware, async (req, res) => {
    // Destructure the fields from the request body
    const { firstName, lastName, passwordHint } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update fields only if they were provided in the request
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (passwordHint) user.passwordHint = passwordHint;
        
        // Save the updated user document
        await user.save();
        
        // Fetch and return the updated user, excluding the password
        const updatedUser = await User.findById(req.user.id).select('-password');
        res.json(updatedUser);

    } catch (err) {
        logger.error('Error updating user details', { error: err.message, userId: req.user.id });
        res.status(500).send('Server Error');
    }
});

// ... (other routes)

module.exports = router;