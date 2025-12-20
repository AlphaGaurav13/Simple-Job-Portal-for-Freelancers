// ================================================
// 📦 FEATURE BOXES DATA - Static Content
// ================================================
// This file contains feature box data for the landing page
// It uses simple JavaScript array of objects
// This data is served via the /api/feature-boxes endpoint

// Create an array of feature box objects
// Each object represents a feature/benefit section
const featureBoxes = [
    {
        id: 1,
        type: 'freelancer',  // Who this feature is for
        title: 'Create Profile',
        benefits: [
            'Showcase your portfolio',
            'Highlight your skills',
            'Set your rates'
        ]
    },
    {
        id: 2,
        type: 'freelancer',
        title: 'Find Jobs',
        benefits: [
            'Search by category',
            'Filter by budget',
            'Apply with one click'
        ]
    },
    {
        id: 3,
        type: 'client',
        title: 'Post a Job',
        benefits: [
            'Describe your project',
            'Set your budget',
            'Receive proposals fast'
        ]
    }
];

// Export the array so other files can use it
// Uses CommonJS module.exports (standard Node.js pattern)
module.exports = featureBoxes;
