// ================================================
// 💬 MESSAGES ROUTES - Chat Message Endpoints
// ================================================
// Handles fetching conversations and chat history
//
// ALLOWED TECHNOLOGIES:
// - express.Router
// - async/await with try/catch
// - Basic Mongoose operations
// ================================================

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = require('../models/Message');
var User = require('../models/User');

// ================================================
// AUTH MIDDLEWARE
// ================================================

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
    next();
}

// ================================================
// ROUTE 1: GET CONVERSATIONS
// ================================================
// GET /api/messages/conversations
// Returns list of users the current user has chatted with

router.get('/conversations', requireAuth, async function (req, res) {
    try {
        var userId = new mongoose.Types.ObjectId(req.session.userId);

        // Find all unique users the current user has interacted with
        var interactions = await Message.aggregate([
            {
                $match: {
                    $or: [{ senderId: userId }, { recipientId: userId }]
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ["$senderId", userId] },
                            "$recipientId",
                            "$senderId"
                        ]
                    },
                    lastMessage: { $first: "$text" },
                    timestamp: { $first: "$createdAt" }
                }
            }
        ]);

        // Populate user details for each interaction
        var conversationList = [];
        for (var i = 0; i < interactions.length; i++) {
            var item = interactions[i];
            var otherUser = await User.findById(item._id).select('name avatar');
            if (otherUser) {
                conversationList.push({
                    id: item._id,
                    participant: {
                        id: item._id,
                        name: otherUser.name,
                        avatar: otherUser.avatar,
                        status: 'offline'
                    },
                    lastMessage: {
                        text: item.lastMessage,
                        timestamp: item.timestamp
                    },
                    unreadCount: 0
                });
            }
        }

        res.status(200).json({
            success: true,
            data: conversationList
        });

    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ================================================
// ROUTE 2: GET CHAT HISTORY
// ================================================
// GET /api/messages/history/:otherUserId
// Returns full chat history with a specific user

router.get('/history/:otherUserId', requireAuth, async function (req, res) {
    try {
        var userId = new mongoose.Types.ObjectId(req.session.userId);
        var otherUserId = new mongoose.Types.ObjectId(req.params.otherUserId);

        // Mark all messages from otherUser to currentUser as read
        await Message.updateMany(
            {
                senderId: otherUserId,
                recipientId: userId,
                read: false
            },
            {
                $set: { read: true }
            }
        );

        var history = await Message.find({
            $or: [
                { senderId: userId, recipientId: otherUserId },
                { senderId: otherUserId, recipientId: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ================================================
// EXPORT ROUTER
// ================================================

module.exports = router;
