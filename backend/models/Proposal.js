// ================================================
// 📋 PROPOSAL MODEL - Database Schema
// ================================================
// Defines the structure for project proposals/requests
// ================================================

const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({

    // The Gig (Project) being applied to
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    // The Gig Owner (Client)
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // The Applicant (Freelancer)
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Status of the proposal
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    // Optional message from freelancer
    message: {
        type: String,
        default: ''
    },

    // Date created
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

// Add indexes for performance
proposalSchema.index({ gigId: 1 });
proposalSchema.index({ clientId: 1 });
proposalSchema.index({ freelancerId: 1 });
proposalSchema.index({ status: 1 });

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
