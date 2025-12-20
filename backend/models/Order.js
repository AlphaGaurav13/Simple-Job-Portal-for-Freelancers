// ================================================
// 📦 ORDER MODEL - Database Schema
// ================================================
// Defines the structure for orders in MongoDB
// Replaces in-memory storage
// ================================================

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Custom readable ID (e.g., ORD-0001)
    id: {
        type: String,
        required: true,
        unique: true
    },

    // Title of the service/gig
    title: {
        type: String,
        required: true
    },

    // Linked Gig ID
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },

    // Buyer (Client) ID
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Seller (Freelancer) ID
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Names snapshot (for faster display)
    clientName: String,
    sellerName: String,

    // Financials
    amount: {
        type: Number,
        required: true
    },
    packageType: {
        type: String, // 'Basic', 'Standard', 'Premium', 'Custom'
        default: 'Standard'
    },

    // Order Status
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled', 'disputed'],
        default: 'pending'
    },

    // Important Dates
    deadline: Date,
    completedAt: Date

}, {
    timestamps: true
});

// Add indexes for performance
orderSchema.index({ clientId: 1 });
orderSchema.index({ sellerId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
