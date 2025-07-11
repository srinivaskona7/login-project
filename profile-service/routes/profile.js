const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const logger = require('../config/logger'); // Import the logger

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            logger.warn('User profile not found for user ID', { userId: req.user.id });
            return res.status(404).json({ msg: 'User not found' });
        }
        logger.info('User profile fetched successfully', { userId: req.user.id });
        res.json(user);
    } catch (err) {
        logger.error('Server Error in /me route', { userId: req.user.id, error: err.message, stack: err.stack });
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/change-password
// @desc    Change user's password
// @access  Private
router.put('/change-password', authMiddleware, async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
        logger.warn('Change password attempt with missing fields', { userId });
        return res.status(400).json({ msg: 'Please provide all fields.' });
    }

    try {
        const user = await User.findById(userId);

        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            logger.warn('Incorrect password attempt during password change', { userId });
            return res.status(400).json({ msg: 'Current password is incorrect.' });
        }

        user.password = newPassword;
        await user.save();

        logger.info('Password updated successfully', { userId });
        res.json({ msg: 'Password updated successfully.' });
    } catch (err) {
        logger.error('Server Error in /change-password route', { userId, error: err.message, stack: err.stack });
        res.status(500).send('Server Error');
    }
});

module.exports = router;