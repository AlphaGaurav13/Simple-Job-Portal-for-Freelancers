// ================================================
// 🔐 AUTH MIDDLEWARE - Route Protection
// ================================================
// This middleware verifies if a user is logged in
// via express-session.
// ================================================

function requireAuth(req, res, next) {
    // Check session for isLoggedIn flag and userId
    if (req.session && req.session.isLoggedIn && req.session.userId) {
        // User is authenticated, proceed to next handler
        return next();
    }

    // User is not authenticated
    res.status(401).json({
        success: false,
        message: 'Acccess denied. Please log in to continue.'
    });
}

module.exports = {
    requireAuth: requireAuth
};
