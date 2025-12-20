// ================================================
// ⭐ FEATURED PROJECTS SECTION - Popular Services
// ================================================
// Premium monochrome service cards
// B&W image treatment with hover effects
// ================================================

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ================================================
// FEATURED PROJECTS COMPONENT
// ================================================
function FeaturedProjects() {
    var navigate = useNavigate();
    var location = useLocation();
    var auth = useAuth();
    var isAuthenticated = auth.isAuthenticated;

    // Service data
    var services = [
        {
            title: 'Vibe Coding',
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: 'vibe-coding'
        },
        {
            title: 'Website Development',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: 'website-development'
        },
        {
            title: 'Video Editing',
            image: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            slug: 'video-editing'
        },
        {
            title: 'Software Development',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: 'software-development'
        },
        {
            title: 'Book Publishing',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: 'book-publishing'
        },
        {
            title: 'Architecture & Design',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            slug: 'architecture-design'
        }
    ];

    // Handle service click
    function handleServiceClick(e, serviceTitle) {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
        } else {
            navigate('/gigs?search=' + encodeURIComponent(serviceTitle));
        }
    }

    return (
        <section className="py-24 bg-white">
            <div className="container-custom mx-auto">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-2">
                            Popular Services
                        </h2>
                        <p className="text-[#6B6B6B] text-lg">
                            Explore what's trending right now
                        </p>
                    </div>
                    <Link
                        to="/gigs"
                        className="hidden md:flex items-center gap-2 px-6 py-3 border border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-all duration-300"
                    >
                        View All
                    </Link>
                </div>

                {/* Services Grid - 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {services.map(function (service, index) {
                        return (
                            <div
                                key={index}
                                onClick={function (e) { handleServiceClick(e, service.title); }}
                                className="group block rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] bg-white border border-[#E5E5E5]"
                            >
                                {/* Image - B&W Treatment */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-black font-semibold text-lg mb-2">
                                        {service.title}
                                    </h3>
                                    <span className="text-[#6B6B6B] group-hover:text-black transition-colors text-sm font-medium flex items-center gap-1">
                                        Explore
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturedProjects;
