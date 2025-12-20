// ================================================
// 📁 CATEGORIES DATA - Static Content
// ================================================
// This file contains static category data for the landing page
// It uses simple JavaScript array of objects
// This data is served via the /api/categories endpoint

// Create an array of category objects
// Each object represents a service category
const categories = [
    { id: 1, name: 'Web Development', icon: '💻' },
    { id: 2, name: 'Graphic Design', icon: '🎨' },
    { id: 3, name: 'Content Writing', icon: '✍️' },
    { id: 4, name: 'Digital Marketing', icon: '📱' },
    { id: 5, name: 'Video Editing', icon: '🎥' },
    { id: 6, name: 'SEO Optimization', icon: '🔍' },
    { id: 7, name: 'Mobile Apps', icon: '📱' },
    { id: 8, name: 'Data Science', icon: '📊' }
];

// Export the array so other files can use it
// Uses CommonJS module.exports (standard Node.js pattern)
module.exports = categories;
