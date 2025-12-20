// ================================================
// 🔐 AUTH CONTROLLER - User Authentication
// ================================================
// This file handles user login, register, and logout
// Uses session-based authentication (express-session)
//
// CONCEPTS USED:
// - async/await with try/catch
// - Session management (express-session)
// - Basic MongoDB operations (find, create)
// ================================================

// ================================================
// STEP 1: IMPORT THE USER MODEL
// ================================================

const User = require('../models/User');

// ================================================
// FUNCTION 1: REGISTER NEW USER
// ================================================
// Route: POST /api/auth/register
// Creates a new user account

async function register(req, res) {
    try {
        // STEP 1: Get data from request body
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userType = req.body.userType;

        // STEP 2: Check if user already exists
        // Use Mongoose findOne() - basic CRUD operation
        const existingUser = await User.findOne({ email: email });

        // If user exists, return error
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // STEP 3: Create new user in database
        // Use Mongoose create() - basic CRUD operation
        // Note: Password stored as plain text (bcrypt not in allowed list)
        const newUser = await User.create({
            name: name,
            email: email,
            password: password,
            userType: userType
        });

        // STEP 4: Create session for the user
        // Using express-session (ALLOWED)
        req.session.userId = newUser._id;
        req.session.userName = newUser.name;
        req.session.userType = newUser.userType;
        req.session.isLoggedIn = true;

        // STEP 5: Send success response
        // Status 201 = Created
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                userType: newUser.userType
            }
        });

    } catch (error) {
        // Handle any errors
        console.error('Register Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
}

// ================================================
// FUNCTION 2: LOGIN USER
// ================================================
// Route: POST /api/auth/login
// Authenticates user and creates session

async function login(req, res) {
    try {
        // STEP 1: Get email and password from request
        const email = req.body.email;
        const password = req.body.password;

        // STEP 2: Find user by email
        // Use Mongoose findOne() - basic CRUD operation
        const user = await User.findOne({ email: email });

        // If user not found, return error
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // STEP 3: Check password
        // Simple comparison (bcrypt not in allowed list)
        if (user.password !== password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // STEP 4: Create session for user
        // Using express-session (ALLOWED)
        req.session.userId = user._id;
        req.session.userName = user.name;
        req.session.userType = user.userType;
        req.session.isLoggedIn = true;

        // STEP 5: Send success response
        // Status 200 = OK
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType
            }
        });

    } catch (error) {
        // Handle any errors
        console.error('Login Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
}

// ================================================
// FUNCTION 3: GET CURRENT USER
// ================================================
// Route: GET /api/auth/me
// Returns the logged-in user's profile

async function getMe(req, res) {
    try {
        // STEP 1: Check if user is logged in
        // Check session data
        if (!req.session.isLoggedIn) {
            return res.status(401).json({
                success: false,
                message: 'Not logged in'
            });
        }

        // STEP 2: Find user by ID from session
        // Use Mongoose findById() - basic CRUD operation
        const user = await User.findById(req.session.userId);

        // If user not found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // STEP 3: Send user data
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profile: user.profile,
                stats: user.stats
            }
        });

    } catch (error) {
        console.error('GetMe Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}

// ================================================
// FUNCTION 4: LOGOUT USER
// ================================================
// Route: POST /api/auth/logout
// Destroys session and logs out user

function logout(req, res) {
    // Destroy the session using callback pattern
    // This is error-first callback: callback(error)
    req.session.destroy(function (error) {
        if (error) {
            // If error, send error response
            console.error('Logout Error:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Error during logout'
            });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid');

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    });
}

// ================================================
// EXPORT ALL FUNCTIONS
// ================================================

module.exports = {
    register: register,
    login: login,
    getMe: getMe,
    logout: logout
};
