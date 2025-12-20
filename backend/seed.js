// ================================================
// 🌱 SEED.JS - Database Seeding Script
// ================================================
// This script adds sample data to the database
// Run with: node seed.js
//
// CONCEPTS DEMONSTRATED:
// - EventEmitter (.on, .emit)
// - Callbacks (error-first pattern)
// - Promises (new Promise)
// - async/await with try/catch
// ================================================

// ================================================
// STEP 1: IMPORT MODULES
// ================================================

const mongoose = require('mongoose');
const { EventEmitter } = require('events');  // Node.js EventEmitter

// Import database connection
const connectDB = require('./config/db');

// Import models
const Category = require('./models/Category');
const Project = require('./models/Project');
const User = require('./models/User');

// ================================================
// STEP 2: CREATE EVENT EMITTER
// ================================================
// EventEmitter is used to emit and listen for events

const seedEvents = new EventEmitter();

// Listen for events using .on()
seedEvents.on('seedStarted', function () {
    console.log('📡 Event: Seeding started');
});

seedEvents.on('dataCleared', function () {
    console.log('📡 Event: Data cleared');
});

seedEvents.on('categoriesCreated', function (count) {
    console.log('📡 Event: ' + count + ' categories created');
});

seedEvents.on('usersCreated', function (count) {
    console.log('📡 Event: ' + count + ' users created');
});

seedEvents.on('projectsCreated', function (count) {
    console.log('📡 Event: ' + count + ' projects created');
});

seedEvents.on('seedCompleted', function () {
    console.log('📡 Event: Seeding completed');
});

// ================================================
// STEP 3: SAMPLE DATA
// ================================================

// Sample categories
var categories = [
    {
        name: 'Graphic & Design',
        slug: 'graphic-design',
        description: 'Logo design, branding, illustrations',
        icon: '🎨',
        color: '#FF6B6B',
        order: 1,
        isFeatured: true
    },
    {
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'SEO, social media, content marketing',
        icon: '📱',
        color: '#4ECDC4',
        order: 2,
        isFeatured: true
    },
    {
        name: 'Writing & Translation',
        slug: 'writing-translation',
        description: 'Content writing, copywriting, translation',
        icon: '✍️',
        color: '#95E1D3',
        order: 3,
        isFeatured: true
    },
    {
        name: 'Programming & Tech',
        slug: 'programming-tech',
        description: 'Web development, mobile apps',
        icon: '💻',
        color: '#0057ff',
        order: 4,
        isFeatured: true
    }
];

// Sample users
// Note: Passwords are plain text (bcrypt not allowed)
var users = [
    {
        name: 'John Designer',
        email: 'john@example.com',
        password: 'password123',
        userType: 'freelancer',
        profile: {
            title: 'Graphic Designer',
            skills: ['Logo Design', 'Branding'],
            hourlyRate: 50
        }
    },
    {
        name: 'Sarah Developer',
        email: 'sarah@example.com',
        password: 'password123',
        userType: 'freelancer',
        profile: {
            title: 'Full Stack Developer',
            skills: ['React', 'Node.js', 'MongoDB'],
            hourlyRate: 75
        }
    },
    {
        name: 'Tech Startup Inc',
        email: 'client@example.com',
        password: 'password123',
        userType: 'client'
    }
];

// ================================================
// STEP 4: HELPER FUNCTION - CLEAR COLLECTION
// ================================================
// Uses callback pattern (error-first)

function clearCollection(model, name, callback) {
    model.deleteMany({})
        .then(function (result) {
            console.log('🗑️ Cleared ' + name);
            // Call callback with null error (success)
            callback(null, result);
        })
        .catch(function (error) {
            console.error('❌ Error clearing ' + name);
            // Call callback with error
            callback(error, null);
        });
}

// ================================================
// STEP 5: HELPER FUNCTION - INSERT DOCUMENTS
// ================================================
// Uses Promise wrapper

function insertDocuments(model, data, name) {
    // Return a new Promise
    return new Promise(function (resolve, reject) {
        model.insertMany(data)
            .then(function (result) {
                console.log('✅ Inserted ' + result.length + ' ' + name);
                resolve(result);
            })
            .catch(function (error) {
                console.error('❌ Error inserting ' + name);
                reject(error);
            });
    });
}

// ================================================
// STEP 6: MAIN SEEDING FUNCTION
// ================================================
// Uses async/await with try/catch

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Emit seed started event
        seedEvents.emit('seedStarted');

        // Connect to database
        await connectDB();

        // Clear existing data using callbacks wrapped in Promises
        console.log('\n🗑️ Clearing existing data...');

        await new Promise(function (resolve, reject) {
            clearCollection(Category, 'categories', function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });

        await new Promise(function (resolve, reject) {
            clearCollection(Project, 'projects', function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });

        await new Promise(function (resolve, reject) {
            clearCollection(User, 'users', function (error, result) {
                if (error) reject(error);
                else resolve(result);
            });
        });

        // Emit data cleared event
        seedEvents.emit('dataCleared');

        // Insert categories
        console.log('\n📁 Inserting categories...');
        var createdCategories = await insertDocuments(Category, categories, 'categories');
        seedEvents.emit('categoriesCreated', createdCategories.length);

        // Insert users
        console.log('\n👥 Inserting users...');
        var createdUsers = await insertDocuments(User, users, 'users');
        seedEvents.emit('usersCreated', createdUsers.length);

        // Find client user
        var clientUser = createdUsers.find(function (user) {
            return user.userType === 'client';
        });

        // Create sample projects
        var projects = [
            {
                title: 'Logo Design for Tech Startup',
                description: 'Need a modern logo for our startup.',
                category: 'Graphic & Design',
                client: clientUser._id,
                budget: { fixed: 500, type: 'fixed' },
                skills: ['Logo Design', 'Branding'],
                status: 'open',
                isFeatured: true
            },
            {
                title: 'E-commerce Website',
                description: 'Build a full e-commerce website.',
                category: 'Programming & Tech',
                client: clientUser._id,
                budget: { min: 2000, max: 5000, type: 'fixed' },
                skills: ['React', 'Node.js'],
                status: 'open',
                isFeatured: true
            }
        ];

        // Insert projects
        console.log('\n📋 Inserting projects...');
        var createdProjects = await insertDocuments(Project, projects, 'projects');
        seedEvents.emit('projectsCreated', createdProjects.length);

        // Done!
        console.log('\n================================================');
        console.log('🎉 Database seeding completed!');
        console.log('📁 Categories: ' + createdCategories.length);
        console.log('👥 Users: ' + createdUsers.length);
        console.log('📋 Projects: ' + createdProjects.length);
        console.log('================================================\n');

        // Emit completed event
        seedEvents.emit('seedCompleted');

        // Exit
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding error:', error.message);
        process.exit(1);
    }
}

// ================================================
// STEP 7: RUN THE SEEDING
// ================================================

seedDatabase();
