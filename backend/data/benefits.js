// ================================================
// 📦 BENEFITS DATA - Static Content
// ================================================
// This file contains static data for platform benefits
// It uses simple JavaScript array of objects
// This data is served via the /api/benefits endpoint

// Create an array of benefit objects
// Each object represents a benefit section for different user types
const benefits = [
    {
        // Unique identifier for this benefit section
        id: 'freelancers',
        // Title displayed on the UI
        title: 'For Freelancers',
        // Emoji icon
        icon: '🚀',
        // Array of benefit points (list items)
        points: [
            'Find work that fits your skills',
            'Get paid safely and securely',
            'Build your professional network'
        ]
    },
    {
        id: 'freelancers-pro',
        title: 'For Freelancers Pro',
        icon: '⭐',
        points: [
            'Access exclusive premium jobs',
            'Lower platform fees',
            'Priority support'
        ]
    },
    {
        id: 'clients',
        title: 'For Clients',
        icon: '💼',
        points: [
            'Hire top quality talent',
            'Secure payment protection',
            '24/7 customer support'
        ]
    }
];

// Export the array so other files can use it
// Uses CommonJS module.exports (standard Node.js pattern)
module.exports = benefits;
