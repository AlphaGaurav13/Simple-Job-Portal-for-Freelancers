// ================================================
// 👤 USER ROUTES - User Data Endpoints
// ================================================
// This file handles user-specific data like stats, orders, messages
//
// ALLOWED TECHNOLOGIES:
// - express.Router
// - Basic Mongoose CRUD (find, findById, create, update, delete)
// ================================================

// ================================================
// STEP 1: IMPORT MODULES
// ================================================

const express = require('express');
const router = express.Router();  // Create router instance
const { requireAuth } = require('../middleware/auth');

// Import models
const User = require('../models/User');
const Project = require('../models/Project');
const Order = require('../models/Order');
const Message = require('../models/Message');
const mongoose = require('mongoose');

// ================================================
// ROUTE 1: GET USER STATS
// ================================================
// GET /api/users/stats
// Returns dashboard stats for logged-in user

router.get('/stats', requireAuth, async function (req, res) {
    try {
        const userId = new mongoose.Types.ObjectId(req.session.userId);

        // 1. Unread Messages Count
        const unreadCount = await Message.countDocuments({
            recipientId: userId,
            read: false
        });

        // 2. Active Orders Count (User as Buyer or Seller)
        const activeOrders = await Order.find({
            $or: [{ clientId: userId }, { sellerId: userId }],
            status: { $in: ['pending', 'in_progress'] }
        });

        // 3. Earnings (Sum of completed orders where user is seller)
        const earningsData = await Order.aggregate([
            {
                $match: {
                    sellerId: userId,
                    status: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const totalEarnings = earningsData.length > 0 ? earningsData[0].total : 0;

        // Construct response stats
        const stats = {
            activeOrders: {
                count: activeOrders.length,
                pending: activeOrders.filter(o => o.status === 'pending').length,
                inProgress: activeOrders.filter(o => o.status === 'in_progress').length,
                trend: 0 // placeholder for now
            },
            unreadMessages: {
                count: unreadCount,
                new: unreadCount > 0 ? 1 : 0 // flag for UI "New" indicator
            },
            earnings: {
                total: totalEarnings,
                today: 0,
                weekly: 0,
                monthly: 0,
                trend: 0
            }
        };

        res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        console.error('Error getting user stats:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching stats'
        });
    }
});

// ================================================
// ROUTE 2: GET USER ORDERS
// ================================================
// GET /api/users/orders
// Returns orders for logged-in user

router.get('/orders', requireAuth, async function (req, res) {
    try {
        // Get user ID from session
        const userId = req.session.userId;

        // Find all orders where user is client or seller
        const orders = await Order.find({
            $or: [
                { clientId: userId },
                { sellerId: userId }
            ]
        }).sort({ createdAt: -1 });

        // Map to order format
        const ordersList = orders.map(function (order) {
            return {
                id: order._id,
                title: order.title,
                status: order.status || 'pending',
                amount: order.amount || 0,
                clientId: order.clientId,
                sellerId: order.sellerId,
                clientName: order.clientName,
                sellerName: order.sellerName,
                deadline: order.deadline,
                createdAt: order.createdAt
            };
        });

        res.status(200).json({
            success: true,
            count: ordersList.length,
            data: ordersList
        });

    } catch (error) {
        console.error('Error getting orders:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders'
        });
    }
});

// ================================================
// ROUTE 3: GET ACTIVE ORDERS ONLY
// ================================================
// GET /api/users/orders/active
// Returns only active (pending, in_progress) orders

router.get('/orders/active', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;

        // Find active orders where user is client or seller
        const activeOrders = await Order.find({
            $or: [
                { clientId: userId },
                { sellerId: userId }
            ],
            status: { $in: ['pending', 'in_progress'] }
        }).sort({ createdAt: -1 });

        const ordersList = activeOrders.map(function (order) {
            return {
                id: order._id,
                title: order.title,
                status: order.status,
                amount: order.amount,
                clientId: order.clientId,
                sellerId: order.sellerId,
                deadline: order.deadline,
                createdAt: order.createdAt
            };
        });

        res.status(200).json({
            success: true,
            count: ordersList.length,
            data: ordersList
        });

    } catch (error) {
        console.error('Error getting active orders:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching active orders'
        });
    }
});

// ================================================
// ROUTE 4: GET ALL USERS (For Chat)
// ================================================
// GET /api/users/list
// Returns list of users for chat selection

router.get('/list', requireAuth, async function (req, res) {
    try {
        const currentUserId = req.session.userId;

        // Find all users except current user
        // Select only necessary fields
        const users = await User.find({ _id: { $ne: currentUserId } })
            .select('name email _id avatar')
            .sort({ name: 1 });

        // Map to simpler format
        const userList = users.map(function (user) {
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                status: 'offline' // Default status
            };
        });

        res.status(200).json({
            success: true,
            count: userList.length,
            data: userList
        });

    } catch (error) {
        console.error('Error fetching user list:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
});

// ================================================
// ROUTE: UPDATE USER PROFILE
// ================================================
// PUT /api/users/profile
router.put('/profile', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;
        const { name, title, bio, skills, hourlyRate, location, website, phone, avatar } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update basic info
        if (name) user.name = name;

        // Update profile fields
        if (!user.profile) user.profile = {};
        if (title !== undefined) user.profile.title = title;
        if (bio !== undefined) user.profile.bio = bio;
        if (skills !== undefined) user.profile.skills = typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : skills;
        if (hourlyRate !== undefined) user.profile.hourlyRate = hourlyRate;
        if (location !== undefined) user.profile.location = location;
        if (website !== undefined) user.profile.website = website;
        if (phone !== undefined) user.profile.phone = phone;
        if (avatar !== undefined) user.profile.avatar = avatar;

        await user.save();

        // Return updated user data
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
});

// ================================================
// EXPORT ROUTER
// ================================================

module.exports = router;
