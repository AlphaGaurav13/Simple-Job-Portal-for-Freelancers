// ================================================
// 👤 SELLER PROFILE PAGE - Public Seller View
// ================================================
// Displays a seller's public profile with their gigs
//
// CONCEPTS USED:
// - Functional Components
// - Props
// - Array Methods (map)
// - Tailwind CSS Styling
// ================================================

// Import React
import React from 'react';

// Import navigation
import { useParams } from 'react-router-dom';

// Import layout components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Import UI components
import Button from '../components/ui/Button';

// ================================================
// SELLER PROFILE COMPONENT
// ================================================
function SellerProfile() {
    // ============================================
    // HOOKS
    // ============================================

    // Get seller ID from URL params
    const { id } = useParams();

    // ============================================
    // MOCK DATA
    // ============================================
    // TODO: Replace with actual API call using id

    const seller = {
        name: 'Alex Morgan',
        title: 'Senior UI/UX Designer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        reviews: 150,
        location: 'United States',
        memberSince: '2020',
        about: 'I am a passionate designer with over 5 years of experience in creating user-friendly interfaces for web and mobile applications. I love turning complex problems into simple, beautiful solutions.',
        skills: ['Figma', 'Adobe XD', 'React', 'HTML/CSS', 'Prototyping'],
        gigs: [
            {
                id: 1,
                title: 'I will design a modern logo',
                price: 50,
                image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            },
            {
                id: 2,
                title: 'I will design your mobile app',
                price: 200,
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
        ]
    };

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    // Generate star rating string
    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars = stars + '★';
        }
        return stars;
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="min-h-screen bg-surface-primary">
            {/* Navigation */}
            <Navbar />

            <div className="container-custom mx-auto py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-secondary p-8 rounded-xl border border-surface-hover shadow-lg text-center">

                            {/* Avatar with online indicator */}
                            <div className="relative inline-block mb-4">
                                <img
                                    src={seller.avatar}
                                    alt={seller.name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-surface-tertiary"
                                />
                                <div className="absolute bottom-2 right-2 w-4 h-4 bg-success rounded-full border-2 border-surface-secondary"></div>
                            </div>

                            {/* Name and title */}
                            <h1 className="text-2xl font-bold text-content-primary">{seller.name}</h1>
                            <p className="text-content-secondary mb-4">{seller.title}</p>

                            {/* Rating */}
                            <div className="flex justify-center gap-1 mb-6 text-warning font-bold">
                                {getStarRating(seller.rating)}
                                <span className="text-content-secondary font-normal">({seller.reviews})</span>
                            </div>

                            {/* Contact button */}
                            <Button variant="outline-neon" className="w-full mb-4">Contact Me</Button>

                            {/* Location and member info */}
                            <div className="text-left space-y-3 border-t border-surface-hover pt-6 mt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">From</span>
                                    <span className="text-content-primary font-medium">{seller.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-content-secondary">Member since</span>
                                    <span className="text-content-primary font-medium">{seller.memberSince}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Gigs */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* About Section */}
                        <div className="bg-surface-secondary p-8 rounded-xl border border-surface-hover">
                            <h2 className="text-xl font-bold text-content-primary mb-4">Description</h2>
                            <p className="text-content-secondary leading-relaxed">{seller.about}</p>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-surface-secondary p-8 rounded-xl border border-surface-hover">
                            <h2 className="text-xl font-bold text-content-primary mb-4">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {seller.skills.map(function (skill, index) {
                                    return (
                                        <span
                                            key={index}
                                            className="bg-surface-tertiary text-content-primary px-3 py-1 rounded-full text-sm font-medium border border-surface-hover"
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gigs Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-content-primary mb-6">
                                Gigs by {seller.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {seller.gigs.map(function (gig) {
                                    return (
                                        <div
                                            key={gig.id}
                                            className="bg-surface-secondary rounded-xl overflow-hidden border border-surface-hover group hover:border-primary transition-colors cursor-pointer"
                                        >
                                            <img
                                                src={gig.image}
                                                alt={gig.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-bold text-content-primary mb-2 group-hover:text-primary transition-colors">
                                                    {gig.title}
                                                </h3>
                                                <p className="text-content-secondary text-sm">
                                                    Starting at <span className="text-content-primary font-bold text-lg">${gig.price}</span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

// Export the component
export default SellerProfile;
