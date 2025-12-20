// ================================================
// 🔌 DATABASE CONNECTION - MongoDB Setup
// ================================================
// This file handles connecting to MongoDB database
// Uses Mongoose library for database operations
//
// CONCEPTS DEMONSTRATED:
// - async/await
// - EventEmitter
// - Callbacks (error-first pattern)
// - Promises
// ================================================

// ================================================
// STEP 1: IMPORT MODULES
// ================================================

const mongoose = require('mongoose');           // MongoDB library
const { EventEmitter } = require('events');     // Node.js EventEmitter
require('dotenv').config();                     // Load .env variables

// ================================================
// STEP 2: CREATE EVENT EMITTER FOR DB EVENTS
// ================================================

const dbEvents = new EventEmitter();

// ================================================
// STEP 3: GET DATABASE URL
// ================================================

// Get MongoDB URL from environment variable
// If not set, use local MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/getwork';

// ================================================
// STEP 4: CONNECT FUNCTION (Async/Await)
// ================================================
// This is the main connection function

async function connectDB() {
    try {
        // Try to connect to MongoDB
        // await pauses until connection is complete
        const connection = await mongoose.connect(MONGO_URI);

        // Log success message
        console.log('✅ MongoDB Connected: ' + connection.connection.host);
        console.log('📦 Database: ' + connection.connection.name);

        // Emit 'connected' event using EventEmitter
        dbEvents.emit('connected', {
            host: connection.connection.host,
            database: connection.connection.name
        });

        // Return the connection
        return connection;

    } catch (error) {
        // If connection fails, log error
        console.error('❌ MongoDB Error: ' + error.message);

        // Emit 'error' event
        dbEvents.emit('error', error);

        // Exit the application
        process.exit(1);
    }
}

// ================================================
// STEP 5: CONNECT FUNCTION (Callback Pattern)
// ================================================
// This demonstrates error-first callback pattern
// callback(error, result)

function connectDBWithCallback(callback) {
    // Use the Promise and convert to callback
    mongoose.connect(MONGO_URI)
        .then(function (connection) {
            // Success - call callback with null error
            console.log('✅ MongoDB Connected (callback)');
            callback(null, connection);  // callback(error, result)
        })
        .catch(function (error) {
            // Error - call callback with error
            console.error('❌ MongoDB Error: ' + error.message);
            callback(error, null);  // callback(error, result)
        });
}

// ================================================
// STEP 6: MONGOOSE CONNECTION EVENTS
// ================================================
// Mongoose emits events when connection status changes

// When disconnected
mongoose.connection.on('disconnected', function () {
    console.log('⚠️ MongoDB disconnected');
    dbEvents.emit('disconnected');
});

// When there's an error
mongoose.connection.on('error', function (err) {
    console.error('❌ MongoDB error: ' + err);
    dbEvents.emit('error', err);
});

// ================================================
// STEP 7: EXPORT THE FUNCTIONS
// ================================================

// Export main function as default
module.exports = connectDB;

// Also export other functions
module.exports.connectDBWithCallback = connectDBWithCallback;
module.exports.dbEvents = dbEvents;
