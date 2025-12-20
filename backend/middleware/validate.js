// ================================================
// ✅ VALIDATE MIDDLEWARE - Standard Request Validation
// ================================================
// This middleware checks for validation errors from express-validator
// and returns a standard error response if found.
//
// Usage: Put this AFTER your validation chain
// ================================================

const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
    // Get validation errors from request
    const errors = validationResult(req);

    // If there are errors
    if (!errors.isEmpty()) {
        // Return 400 Bad Request with error details
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    // No errors, proceed to next middleware/controller
    next();
}

module.exports = { validateRequest };
