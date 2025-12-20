// ================================================
// 📁 CATEGORY SECTION - Premium Card Grid
// ================================================
// White cards with hairline borders
// Scale & shadow on hover
// ================================================

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ================================================
// CATEGORY SECTION COMPONENT
// ================================================
function CategorySection() {
    var navigate = useNavigate();
    var location = useLocation();
    var auth = useAuth();
    var isAuthenticated = auth.isAuthenticated;

    // Categories with monochrome icons
    var categories = [
        { name: 'Programming & Tech', icon: '💻', slug: 'programming-tech' },
        { name: 'Graphics & Design', icon: '🎨', slug: 'graphics-design' },
        { name: 'Digital Marketing', icon: '📱', slug: 'digital-marketing' },
        { name: 'Writing', icon: '✍️', slug: 'writing-translation' },
        { name: 'Video & Animation', icon: '🎬', slug: 'video-animation' },
        { name: 'AI Services', icon: '🤖', slug: 'ai-services' },
        { name: 'Music & Audio', icon: '🎵', slug: 'music-audio' },
        { name: 'Business', icon: '💼', slug: 'business' }
    ];

    // Handle category click
    function handleCategoryClick(event, categoryName) {
        event.preventDefault();
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
        } else {
            navigate('/gigs?category=' + encodeURIComponent(categoryName));
        }
    }

    return (
        <section className="py-20 bg-white">
            <div className="container-custom mx-auto">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                        Browse Categories
                    </h2>
                    <Link
                        to="/categories"
                        className="text-sm font-medium text-[#6B6B6B] hover:text-black transition-colors flex items-center gap-2 group"
                    >
                        See All
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* Category Grid - 4 columns desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

                    {categories.map(function (category, index) {
                        return (
                            <div
                                key={index}
                                onClick={function (e) { handleCategoryClick(e, category.name); }}
                                className="bg-white border border-[#E5E5E5] rounded-2xl p-6 flex flex-col justify-between h-32 cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:border-black"
                            >
                                {/* Icon */}
                                <div className="text-3xl transition-all duration-300">
                                    {category.icon}
                                </div>

                                {/* Category Name */}
                                <h3 className="text-sm md:text-base font-semibold text-black leading-tight">
                                    {category.name}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CategorySection;
