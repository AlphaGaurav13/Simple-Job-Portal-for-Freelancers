// ================================================
// 🔌 SOCKET.IO HANDLER - Real-Time Events
// ================================================
// Handles Socket.IO connections using BASIC features only:
// - connection event
// - disconnect event
// - message event
// - socket.on() and socket.emit()
// - Simple broadcasting (io.emit)
//
// Uses manual socket tracking instead of rooms
// ================================================

var EventEmitter = require('events').EventEmitter;

// Create EventEmitter for socket events
var socketEvents = new EventEmitter();

// Store connected sockets: userId -> socket
var connectedUsers = {};

// ================================================
// MAIN HANDLER FUNCTION
// ================================================

function initializeSocket(io) {

    // ============================================
    // CONNECTION EVENT
    // ============================================

    io.on('connection', function (socket) {
        console.log('🔌 Client connected: ' + socket.id);
        socketEvents.emit('clientConnected', socket.id);

        // ----------------------------------------
        // MESSAGE EVENT (Basic chat)
        // ----------------------------------------

        socket.on('message', function (data) {
            console.log('💬 Message from ' + socket.id);

            // Parse JSON safely
            var messageData;
            try {
                if (typeof data === 'string') {
                    messageData = JSON.parse(data);
                } else {
                    messageData = data;
                }
            } catch (error) {
                console.error('❌ Invalid JSON:', error.message);
                socket.emit('error', { message: 'Invalid message format' });
                return;
            }

            socketEvents.emit('messageReceived', {
                socketId: socket.id,
                data: messageData
            });

            // Broadcast to ALL clients
            io.emit('message', {
                from: socket.id,
                data: messageData,
                timestamp: new Date().toISOString()
            });
        });

        // ----------------------------------------
        // BROADCAST EVENT
        // ----------------------------------------

        socket.on('broadcast', function (data) {
            console.log('📢 Broadcast from ' + socket.id);
            io.emit('broadcast', {
                from: socket.id,
                data: data,
                timestamp: new Date().toISOString()
            });
        });

        // ----------------------------------------
        // USER JOIN (for private messaging)
        // ----------------------------------------
        // Store userId -> socket mapping

        socket.on('user:join', function (userId) {
            if (userId) {
                socket.userId = userId;
                connectedUsers[userId] = socket;
                console.log('👤 User joined: ' + userId);
            }
        });

        // ----------------------------------------
        // PRIVATE MESSAGE (one-to-one chat)
        // ----------------------------------------
        // Send message to specific user using manual tracking

        socket.on('private_message', async function (data) {
            console.log('💬 Private message from ' + socket.userId + ' to ' + data.recipientId);

            // Prevent self-messaging
            if (socket.userId === data.recipientId) {
                console.log('⚠️ Blocked self-message attempt');
                socket.emit('error', { message: 'You cannot message yourself.' });
                return;
            }

            try {
                // Import Message model
                var Message = require('../models/Message');

                // Create message object
                var messageObj = {
                    senderId: socket.userId || data.senderId,
                    recipientId: data.recipientId,
                    text: data.text
                };

                // Save to DB
                var savedMessage = new Message(messageObj);
                await savedMessage.save();

                var messageToSend = {
                    _id: savedMessage._id,
                    id: savedMessage._id,
                    senderId: savedMessage.senderId,
                    recipientId: savedMessage.recipientId,
                    text: savedMessage.text,
                    timestamp: savedMessage.createdAt
                };

                // Send to recipient using manual tracking
                var recipientSocket = connectedUsers[data.recipientId];
                if (recipientSocket) {
                    recipientSocket.emit('private_message', messageToSend);
                }

                // Send back to sender
                socket.emit('private_message', messageToSend);

                socketEvents.emit('privateMessageSent', messageToSend);

            } catch (error) {
                console.error('❌ Error saving message:', error);
                socket.emit('error', { message: 'Failed to save message' });
            }
        });

        // ----------------------------------------
        // TYPING INDICATORS
        // ----------------------------------------

        socket.on('typing_start', function (data) {
            var recipientSocket = connectedUsers[data.recipientId];
            if (recipientSocket) {
                recipientSocket.emit('typing_start', {
                    senderId: data.senderId || socket.userId
                });
            }
        });

        socket.on('typing_stop', function (data) {
            var recipientSocket = connectedUsers[data.recipientId];
            if (recipientSocket) {
                recipientSocket.emit('typing_stop', {
                    senderId: data.senderId || socket.userId
                });
            }
        });

        // ----------------------------------------
        // DISCONNECT EVENT
        // ----------------------------------------

        socket.on('disconnect', function () {
            console.log('🔌 Client disconnected: ' + socket.id);

            // Remove from connected users
            if (socket.userId && connectedUsers[socket.userId]) {
                delete connectedUsers[socket.userId];
            }

            socketEvents.emit('clientDisconnected', socket.id);
        });
    });

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    function broadcastToAll(eventName, data) {
        io.emit(eventName, {
            data: data,
            timestamp: new Date().toISOString()
        });
        console.log('📢 Broadcasted: ' + eventName);
    }

    function sendNotification(message, type) {
        type = type || 'info';
        io.emit('notification', {
            type: type,
            message: message,
            timestamp: new Date().toISOString()
        });
    }

    function broadcastNewOrder(orderData) {
        io.emit('order:new', {
            id: orderData.id || orderData._id,
            title: orderData.title,
            timestamp: new Date().toISOString()
        });
        // Also trigger dashboard refresh
        broadcastDashboardRefresh();
    }

    function broadcastOrderUpdate(orderId, status) {
        io.emit('order:update', {
            orderId: orderId,
            status: status,
            timestamp: new Date().toISOString()
        });
        // Also trigger dashboard refresh
        broadcastDashboardRefresh();
    }

    function broadcastDashboardRefresh() {
        io.emit('dashboard:refresh', {
            timestamp: new Date().toISOString()
        });
        console.log('📢 Dashboard refresh broadcasted');
    }

    // ============================================
    // RETURN HELPER FUNCTIONS
    // ============================================

    return {
        broadcastToAll: broadcastToAll,
        sendNotification: sendNotification,
        broadcastNewOrder: broadcastNewOrder,
        broadcastOrderUpdate: broadcastOrderUpdate,
        broadcastDashboardRefresh: broadcastDashboardRefresh,
        socketEvents: socketEvents,
        connectedUsers: connectedUsers
    };
}

// ================================================
// EXPORT THE HANDLER
// ================================================

module.exports = initializeSocket;
