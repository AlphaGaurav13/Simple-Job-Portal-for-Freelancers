// ================================================
// 🖥️ SERVER.JS - Main Express Server
// ================================================
// Entry point of the backend application
// Sets up Express, middleware, routes, and Socket.IO
//
// ALLOWED TECHNOLOGIES USED:
// - express (basic usage)
// - express.Router
// - cookie-parser
// - express-session
// - socket.io (basic: connection, disconnect, message)
// - http (Node.js core)
// - events (EventEmitter)
// - fs (Node.js core) - for reading .env
// ================================================

// ================================================
// STEP 1: IMPORT REQUIRED MODULES
// ================================================

// Node.js core modules
var http = require('http');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

// Express and middleware (all allowed)
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Socket.IO for real-time communication (ALLOWED - basic usage)
var Server = require('socket.io').Server;

// Local modules
var connectDB = require('./config/db');

// Route files
var authRoutes = require('./routes/auth');
var categoryRoutes = require('./routes/categories');
var newsletterRoutes = require('./routes/newsletter');
var projectRoutes = require('./routes/projects');
var userRoutes = require('./routes/users');
var orderRoutes = require('./routes/orders');
var proposalRoutes = require('./routes/proposals');
var messageRoutes = require('./routes/messages');

// ================================================
// STEP 2: LOAD ENVIRONMENT VARIABLES (using fs)
// ================================================
// Read .env file manually instead of using dotenv

function loadEnvFile() {
    try {
        // Read .env file
        var envPath = __dirname + '/.env';
        if (fs.existsSync(envPath)) {
            var envContent = fs.readFileSync(envPath, 'utf8');
            var lines = envContent.split('\n');

            // Parse each line
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                // Skip empty lines and comments
                if (line && line[0] !== '#') {
                    var equalIndex = line.indexOf('=');
                    if (equalIndex > 0) {
                        var key = line.substring(0, equalIndex).trim();
                        var value = line.substring(equalIndex + 1).trim();
                        // Remove quotes if present
                        if ((value[0] === '"' && value[value.length - 1] === '"') ||
                            (value[0] === "'" && value[value.length - 1] === "'")) {
                            value = value.substring(1, value.length - 1);
                        }
                        process.env[key] = value;
                    }
                }
            }
            console.log('✅ Environment variables loaded from .env');
        }
    } catch (error) {
        console.error('⚠️ Could not load .env file:', error.message);
    }
}

// Load environment variables
loadEnvFile();

// Create Express app
var app = express();

// Create HTTP server (using Node.js http module)
var server = http.createServer(app);

// Set the port
var PORT = process.env.PORT || 4000;

// ================================================
// STEP 3: CREATE EVENT EMITTER
// ================================================

var serverEvents = new EventEmitter();

// Listen for events
serverEvents.on('serverStarted', function (port) {
    console.log('📡 Event: Server started on port ' + port);
});

serverEvents.on('dbConnected', function () {
    console.log('📡 Event: Database connected');
});

serverEvents.on('error', function (error) {
    console.error('📡 Event: Error - ' + error.message);
});

// Make events available in routes
app.set('serverEvents', serverEvents);

// ================================================
// STEP 4: CONNECT TO DATABASE
// ================================================

connectDB()
    .then(function () {
        serverEvents.emit('dbConnected');
    })
    .catch(function (error) {
        serverEvents.emit('error', error);
    });

// ================================================
// STEP 5: SETUP MIDDLEWARE
// ================================================

// 1. CORS - Manual implementation (instead of cors package)
// 1. CORS - Manual implementation (instead of cors package)
// This middleware adds CORS headers to responses
app.use(function (req, res, next) {
    // Allowed origins defined in environment variable (comma separated) or defaults
    var allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'];

    // Add production frontend URL if defined
    if (process.env.FRONTEND_URL) {
        allowedOrigins.push(process.env.FRONTEND_URL);
        // Also allow without https if needed or multiple URLs
        var envOrigins = process.env.FRONTEND_URL.split(',');
        envOrigins.forEach(function (url) {
            if (url.trim() && allowedOrigins.indexOf(url.trim()) === -1) {
                allowedOrigins.push(url.trim());
            }
        });
    }

    var origin = req.headers.origin;

    // STAGE 1: Determine if this origin is allowed
    var isAllowed = false;
    if (origin) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            isAllowed = true;
        } else if (origin.endsWith('.onrender.com')) {
            isAllowed = true;
        }
    }

    // STAGE 2: Set Origin Header
    // IMPORTANT: Access-Control-Allow-Origin cannot be '*' when Credentials is true
    if (isAllowed) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Fallback for development if no origin header (some older tools)
        if (!origin) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        }
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});

// 2. Parse JSON data in request body
app.use(express.json());

// 3. Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// 4. Cookie Parser (ALLOWED)
app.use(cookieParser());

// 5. Session Middleware (ALLOWED - express-session)
// Trust proxy is required for secure cookies behind Render's load balancer
app.set('trust proxy', 1);

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key-dev-only',
    resave: false,
    saveUninitialized: false,
    proxy: true, // Required for secure cookies behind proxy
    cookie: {
        // Force secure and sameSite: 'none' if we are not on localhost
        // Render uses HTTPS by default, so we should use secure cookies
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    }
}));

// ================================================
// STEP 6: SETUP SOCKET.IO (Basic Usage Only)
// ================================================

var io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            var allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
            if (process.env.FRONTEND_URL) {
                var envOrigins = process.env.FRONTEND_URL.split(',');
                envOrigins.forEach(function (url) {
                    allowedOrigins.push(url.trim());
                });
            }

            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.onrender.com')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Load socket handler
var socketHandler = require('./socket/dashboardEvents')(io);

// Make io available in routes
app.set('io', io);
app.set('socketHandler', socketHandler);

// Wire socket handler to orders routes for real-time events
orderRoutes.setSocketHandler(socketHandler);

console.log('✅ Socket.IO initialized');

// ================================================
// STEP 7: SETUP ROUTES
// ================================================

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/messages', messageRoutes);

// ================================================
// STEP 8: HEALTH CHECK ROUTE
// ================================================

app.get('/', function (req, res) {
    res.status(200).json({
        success: true,
        message: 'getWork API is running!',
        version: '1.0.0'
    });
});

// ================================================
// STEP 9: 404 ERROR HANDLER
// ================================================

app.use(function (req, res) {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// ================================================
// STEP 10: GLOBAL ERROR HANDLER
// ================================================

app.use(function (error, req, res, next) {
    console.error('❌ Error:', error.message);
    serverEvents.emit('error', error);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// ================================================
// STEP 11: START THE SERVER
// ================================================

server.listen(PORT, function () {
    console.log('================================================');
    console.log('🚀 Server is running!');
    console.log('📍 URL: http://localhost:' + PORT);
    console.log('🔌 Socket.IO: Enabled');
    console.log('🍪 Sessions: Enabled');
    console.log('================================================');
    serverEvents.emit('serverStarted', PORT);
});
