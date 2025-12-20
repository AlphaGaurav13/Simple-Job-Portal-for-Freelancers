// ================================================
// 🔐 AUTH ROUTES - Authentication Endpoints
// ================================================
// This file defines the authentication routes
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

// Import express-validator functions (ALLOWED)
const { body, validationResult } = require('express-validator');

// Import controller functions
const authController = require('../controllers/authController');

// ================================================
// STEP 2: VALIDATION MIDDLEWARE
// ================================================
// This function checks validation results

function validateRequest(req, res, next) {
    // Get validation errors
    const errors = validationResult(req);

    // If there are errors, return 400 Bad Request
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    // No errors, continue to next middleware
    next();
}

// ================================================
// ROUTE 1: REGISTER
// ================================================
// POST /api/auth/register
// Creates a new user account

router.post(
    '/register',
    // Validation rules using express-validator body()
    [
        body('name')
            .notEmpty()
            .withMessage('Name is required'),

        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please provide a valid email'),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),

        body('userType')
            .notEmpty()
            .withMessage('User type is required')
            .isIn(['freelancer', 'client'])
            .withMessage('User type must be freelancer or client')
    ],
    validateRequest,           // Check validation
    authController.register    // Handle registration
);

// ================================================
// ROUTE 2: LOGIN
// ================================================
// POST /api/auth/login
// Authenticates user

router.post(
    '/login',
    // Validation rules
    [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .isEmail()
            .withMessage('Please provide a valid email'),

        body('password')
            .notEmpty()
            .withMessage('Password is required')
    ],
    validateRequest,        // Check validation
    authController.login    // Handle login
);

// ================================================
// ROUTE 3: GET ME
// ================================================
// GET /api/auth/me
// Returns current user profile

router.get('/me', authController.getMe);

// ================================================
// ROUTE 4: LOGOUT
// ================================================
// POST /api/auth/logout
// Logs out user

router.post('/logout', authController.logout);

// ================================================
// EXPORT ROUTER
// ================================================

module.exports = router;
