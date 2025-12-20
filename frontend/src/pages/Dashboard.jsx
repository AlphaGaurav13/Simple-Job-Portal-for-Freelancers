// ================================================
// 🏠 DASHBOARD PAGE - Landing/Home Page
// ================================================
// Main landing page with hero, categories, etc.
// Premium minimalist design
// ================================================

// Import React
import React from 'react';

// ================================================
// Import Section Components
// ================================================
import Hero from '../components/sections/Hero';
import TrustedBy from '../components/sections/TrustedBy';
import CategorySection from '../components/sections/CategorySection';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import StatsSection from '../components/sections/StatsSection';
import FreelancerSpotlight from '../components/sections/FreelancerSpotlight';

// ================================================
// DASHBOARD COMPONENT
// ================================================
function Dashboard() {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero Section */}
            <Hero />

            {/* Trusted By */}
            <TrustedBy />

            {/* Categories */}
            <CategorySection />

            {/* Featured Projects */}
            <FeaturedProjects />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* Stats Section */}
            <StatsSection />

            {/* Freelancer Spotlight */}
            <FreelancerSpotlight />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
}

// Export the component
export default Dashboard;

