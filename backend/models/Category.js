// ================================================
// 📁 CATEGORY MODEL - Database Schema
// ================================================
// This defines the structure for category documents
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

const categorySchema = new mongoose.Schema({

    // Category name
    name: {
        type: String,
        required: true,
        unique: true
    },

    // URL-friendly slug
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    // Description
    description: {
        type: String
    },

    // Icon (emoji or class name)
    icon: {
        type: String
    },

    // Background color for UI
    color: {
        type: String,
        default: '#0057ff'
    },

    // Display order
    order: {
        type: Number,
        default: 0
    },

    // Number of projects in this category
    projectCount: {
        type: Number,
        default: 0
    },

    // Is this a featured category?
    isFeatured: {
        type: Boolean,
        default: false
    },

    // Is category active?
    isActive: {
        type: Boolean,
        default: true
    }

}, {
    // Add timestamps
    timestamps: true
});

// ================================================
// STEP 3: CREATE AND EXPORT MODEL
// ================================================

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
