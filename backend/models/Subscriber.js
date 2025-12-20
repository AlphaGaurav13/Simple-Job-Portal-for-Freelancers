// ================================================
// 📧 SUBSCRIBER MODEL - Database Schema
// ================================================

const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
