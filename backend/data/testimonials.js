// ================================================
// 💬 TESTIMONIALS DATA - Static Content
// ================================================
// This file contains customer testimonial data for landing page
// It uses simple JavaScript array of objects
// This data is served via the /api/testimonials endpoint

// Create an array of testimonial objects
// Each object represents a customer review
const testimonials = [
    {
        id: 1,
        name: 'Erin Botter',
        role: 'Client',
        avatarUrl: 'https://via.placeholder.com/150',
        message: 'FreelanceHub made it incredibly easy to find top-tier talent for our new project. Highly recommended!'
    },
    {
        id: 2,
        name: 'Sara Editor',
        role: 'Freelance Writer',
        avatarUrl: 'https://via.placeholder.com/150',
        message: 'I found my first major client here within a week. The platform is intuitive and supportive.'
    },
    {
        id: 3,
        name: 'Mike Developer',
        role: 'Full Stack Dev',
        avatarUrl: 'https://via.placeholder.com/150',
        message: 'The best platform for freelancers. Great payments and amazing clients.'
    }
];

// Export the array so other files can use it
// Uses CommonJS module.exports (standard Node.js pattern)
module.exports = testimonials;
