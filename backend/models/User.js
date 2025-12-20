// ================================================
// 📦 USER MODEL - Database Schema
// ================================================
// This defines the structure for user documents in MongoDB
// Uses basic Mongoose schema features only
//
// ALLOWED: Basic Mongoose schema and CRUD operations
// ================================================

// ================================================
// STEP 1: IMPORT MONGOOSE
// ================================================

const mongoose = require('mongoose');

// ================================================
// STEP 2: DEFINE THE SCHEMA
// ================================================
// A schema defines the structure of documents

const userSchema = new mongoose.Schema({

    // User's name
    name: {
        type: String,
        required: true,
        trim: true
    },

    // User's email (must be unique)
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    // User's password
    // Note: Stored as plain text (bcrypt not in allowed list)
    password: {
        type: String,
        required: true
    },

    // User type: 'freelancer' or 'client'
    userType: {
        type: String,
        enum: ['freelancer', 'client'],
        required: true
    },

    // Profile information
    profile: {
        avatar: String,
        title: String,
        bio: String,
        skills: [String],
        hourlyRate: Number,
        location: String,
        website: String,
        phone: String
    },

    // User statistics
    stats: {
        projectsCompleted: {
            type: Number,
            default: 0
        },
        rating: {
            type: Number,
            default: 0
        },
        reviewCount: {
            type: Number,
            default: 0
        }
    },

    // Account status
    isActive: {
        type: Boolean,
        default: true
    },

    isVerified: {
        type: Boolean,
        default: false
    }

}, {
    // Add timestamps (createdAt, updatedAt)
    timestamps: true
});

// ================================================
// STEP 3: CREATE AND EXPORT MODEL
// ================================================

const User = mongoose.model('User', userSchema);

module.exports = User;
