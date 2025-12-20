// ================================================
// 📋 PROJECT MODEL - Database Schema
// ================================================
// This defines the structure for project documents
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

const projectSchema = new mongoose.Schema({

    // Project title
    title: {
        type: String,
        required: true
    },

    // Project description
    description: {
        type: String,
        required: true
    },

    // Category name
    category: {
        type: String,
        required: true
    },

    // Subcategory (optional)
    subcategory: {
        type: String
    },

    // Client who posted (reference to User)
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Freelancer assigned (reference to User)
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Budget information
    budget: {
        min: Number,
        max: Number,
        fixed: Number,
        type: {
            type: String,
            enum: ['hourly', 'fixed'],
            default: 'fixed'
        }
    },

    // Duration
    duration: {
        value: Number,
        unit: {
            type: String,
            enum: ['days', 'weeks', 'months'],
            default: 'days'
        }
    },

    // Required skills
    skills: {
        type: [String]
    },

    // Project status
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'cancelled'],
        default: 'open'
    },

    // Image URLs
    images: {
        type: [String]
    },

    // Number of proposals
    proposalCount: {
        type: Number,
        default: 0
    },

    // Is featured?
    isFeatured: {
        type: Boolean,
        default: false
    },

    // Deadline date
    deadline: {
        type: Date
    }

}, {
    // Add timestamps
    timestamps: true
});

// ================================================
// STEP 3: ADD INDEXES FOR PERFORMANCE
// ================================================

projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ client: 1 });
projectSchema.index({ createdAt: -1 });

// ================================================
// STEP 4: CREATE AND EXPORT MODEL
// ================================================

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
