// ================================================
// 🏢 COMPANIES DATA - Static Content
// ================================================
// This file contains trusted company logos for landing page
// It uses simple JavaScript array of objects
// This data is served via the /api/companies endpoint

// Create an array of company objects
// Each object represents a trusted company/partner
const companies = [
    { id: 1, name: 'Microsoft', logoText: 'Microsoft' },
    { id: 2, name: 'AWS', logoText: 'AWS' },
    { id: 3, name: 'Shopify', logoText: 'Shopify' },
    { id: 4, name: 'Facebook', logoText: 'Facebook' },
    { id: 5, name: 'Walmart', logoText: 'Walmart' }
];

// Export the array so other files can use it
// Uses CommonJS module.exports (standard Node.js pattern)
module.exports = companies;
