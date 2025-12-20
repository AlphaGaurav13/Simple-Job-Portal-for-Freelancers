// ================================================
// 📧 NEWSLETTER ROUTES - Newsletter Subscription
// ================================================
// This file handles newsletter subscriptions
// Uses express.Router and express-validator
//
// ALLOWED TECHNOLOGIES:
// - express.Router
// - express-validator (body, validationResult)
// ================================================

// ================================================
// STEP 1: IMPORT MODULES
// ================================================

const express = require('express');
const router = express.Router();  // Create router instance
const Subscriber = require('../models/Subscriber');
const { validateRequest } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

// Import express-validator functions (ALLOWED)
const { body } = require('express-validator');

// ================================================
// ROUTE 1: SUBSCRIBE TO NEWSLETTER
// ================================================
// POST /api/newsletter

router.post(
    '/',
    // Validation using express-validator (ALLOWED)
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please provide a valid email')
    ],
    validateRequest,
    async function (req, res) {
        try {
            // Get email from request body
            const email = req.body.email;

            // Check if already subscribed
            const existingSubscriber = await Subscriber.findOne({ email });
            if (existingSubscriber) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already subscribed'
                });
            }

            // Create new subscriber
            await Subscriber.create({ email });

            // Send success response
            res.status(200).json({
                success: true,
                message: 'Successfully subscribed to newsletter'
            });
        } catch (error) {
            console.error('Newsletter Error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
);

// ================================================
// ROUTE 2: GET ALL SUBSCRIBERS
// ================================================
// GET /api/newsletter
// Protected - requires authentication

router.get('/', requireAuth, async function (req, res) {
    try {
        const subscribers = await Subscriber.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: subscribers.length,
            data: subscribers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching subscribers'
        });
    }
});

// ================================================
// EXPORT ROUTER
// ================================================

module.exports = router;
