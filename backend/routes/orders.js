// ================================================
// 📦 ORDERS ROUTES - Order Management
// ================================================
// Handles order creation and retrieval
// ================================================

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const Order = require('../models/Order');
const Project = require('../models/Project');

// Variable to store socketHandler (set via setSocketHandler)
var socketHandler = null;

// Function to set socket handler from server.js
router.setSocketHandler = function (handler) {
    socketHandler = handler;
    console.log('✅ Socket handler set in orders routes');
};

// ================================================
// HELPER: Generate Order ID
// ================================================
async function generateOrderId() {
    const count = await Order.countDocuments();
    return 'ORD-' + String(count + 1).padStart(4, '0');
}

// ================================================
// FUNCTION: Create Order Logic (Internal Helper)
// ================================================
// Used by both the API route and the Proposal Accept logic
async function createOrderInternal(orderData) {
    const orderId = await generateOrderId();

    // Default deadline to 7 days if not provided
    const deadline = orderData.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newOrder = await Order.create({
        id: orderId,
        gigId: orderData.gigId,
        title: orderData.title || 'Untitled Service',
        amount: orderData.amount || 0,
        sellerId: orderData.sellerId, // Expecting ObjectId
        clientId: orderData.clientId, // Expecting ObjectId
        sellerName: orderData.seller,
        clientName: orderData.client,
        packageType: orderData.packageType || 'Standard',
        status: 'pending',
        deadline: deadline
    });

    console.log('✅ Order created in DB:', newOrder.id);

    // Broadcast new order event via socket
    if (socketHandler && socketHandler.broadcastNewOrder) {
        socketHandler.broadcastNewOrder(newOrder);
    }

    return newOrder;
}

// ================================================
// POST /api/orders - Create a new order
// ================================================
router.post('/', requireAuth, async function (req, res) {
    try {
        const { gigId, title, seller, sellerId, package: packageType } = req.body;

        // Correctly use session fields from authController.js
        const userId = req.session.userId;
        const userName = req.session.userName;

        // Ensure sellerId is provided (frontend should send this)
        if (!sellerId) {
            return res.status(400).json({ success: false, message: 'Seller ID is required' });
        }

        // Verify price from the actual gig (don't trust client-provided price)
        var verifiedAmount = 0;
        if (gigId) {
            var gig = await Project.findById(gigId);
            if (gig && gig.budget) {
                verifiedAmount = gig.budget.fixed || gig.budget.min || 0;
            }
        }

        const newOrder = await createOrderInternal({
            gigId,
            title,
            amount: verifiedAmount,
            seller,
            sellerId,
            client: userName,
            clientId: userId,
            packageType
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: newOrder
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order'
        });
    }
});

// ================================================
// GET /api/orders - Get all orders for current user
// ================================================
router.get('/', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;

        // Find orders where user is either client or seller
        const userOrders = await Order.find({
            $or: [{ clientId: userId }, { sellerId: userId }]
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: userOrders,
            count: userOrders.length
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders'
        });
    }
});

// ================================================
// GET /api/orders/count - Get active orders count
// ================================================
router.get('/count', requireAuth, async function (req, res) {
    try {
        const userId = req.session.userId;

        const activeCount = await Order.countDocuments({
            $or: [{ clientId: userId }, { sellerId: userId }],
            status: { $in: ['pending', 'in_progress', 'in-progress'] }
        });

        res.json({
            success: true,
            count: activeCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get order count'
        });
    }
});

// ================================================
// GET /api/orders/:id - Get single order
// ================================================
router.get('/:id', requireAuth, async function (req, res) {
    try {
        const orderId = req.params.id; // This is the mongo ID or the custom ID? Usually param is ID.
        // Let's assume frontend requests by readable ID or Mongo ID. 
        // For safety, let's search by readable ID first, then Mongo ID.

        const userId = req.session.userId;

        const order = await Order.findOne({
            $and: [
                { $or: [{ id: orderId }, { _id: orderId.match(/^[0-9a-fA-F]{24}$/) ? orderId : null }] },
                { $or: [{ clientId: userId }, { sellerId: userId }] }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order'
        });
    }
});

// ================================================
// PUT /api/orders/:id/status - Update order status
// ================================================
router.put('/:id/status', requireAuth, async function (req, res) {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const userId = req.session.userId;

        const order = await Order.findOne({
            $and: [
                { $or: [{ id: orderId }, { _id: orderId.match(/^[0-9a-fA-F]{24}$/) ? orderId : null }] },
                { $or: [{ clientId: userId }, { sellerId: userId }] }
            ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Role-based status change validation
        var isClient = order.clientId.toString() === userId;
        var isSeller = order.sellerId.toString() === userId;

        // Only client can mark as completed or cancelled
        if ((status === 'completed' || status === 'cancelled') && !isClient) {
            return res.status(403).json({
                success: false,
                message: 'Only the client can mark an order as ' + status
            });
        }

        // Only seller can mark as in_progress
        if (status === 'in_progress' && !isSeller) {
            return res.status(403).json({
                success: false,
                message: 'Only the seller can mark an order as in_progress'
            });
        }

        order.status = status;
        if (status === 'completed') {
            order.completedAt = new Date();
        }

        await order.save();

        // Broadcast order update event via socket
        if (socketHandler && socketHandler.broadcastOrderUpdate) {
            socketHandler.broadcastOrderUpdate(order._id, status);
        }

        res.json({
            success: true,
            message: 'Order status updated',
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update order status'
        });
    }
});

router.createOrderInternal = createOrderInternal;
module.exports = router;
