// ================================================
// 🦸 HERO SECTION - Premium Monochrome Design
// ================================================
// Full viewport hero with ultra-bold typography
// Pure black & white aesthetic
// ================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ================================================
// HERO COMPONENT
// ================================================
function Hero() {
    const navigate = useNavigate();

    // Popular tags
    const popularTags = ['Website Design', 'Mobile App', 'Logo Design', 'AI Services'];

    // Placeholder rotation
    const placeholders = [
        'Search for any project...',
        'Find a web developer...',
        'Hire a designer...',
        'Get work done today...'
    ];

    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
    const [searchQuery, setSearchQuery] = useState('');

    // Rotate placeholders
    useEffect(function () {
        var currentIndex = 0;
        var interval = setInterval(function () {
            currentIndex = (currentIndex + 1) % placeholders.length;
            setCurrentPlaceholder(placeholders[currentIndex]);
        }, 3000);

        return function () {
            clearInterval(interval);
        };
    }, []);

    // Handle search
    function handleSearch(e) {
        if (e) e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/gigs?search=' + encodeURIComponent(searchQuery.trim()));
        }
    }

    // Handle tag click
    function handleTagClick(tag) {
        navigate('/gigs?search=' + encodeURIComponent(tag));
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <section className="relative bg-white min-h-screen flex items-center justify-center pt-20">

            {/* Subtle Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Content Container */}
            <div className="container-custom mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Main Heading - Ultra Bold, Large Scale */}
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 text-black tracking-tight">
                        Hire Expert<br />
                        <span className="tracking-wide">Freelancers.</span>
                    </h1>

                    {/* Secondary Line */}
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-black/80 mb-6 tracking-tight">
                        Get Work Done.
                    </p>

                    {/* Subheadline - Refined Typography */}
                    <p className="text-lg md:text-xl text-[#6B6B6B] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        Find skilled professionals for any project. Fast, secure, and reliable.
                    </p>

                    {/* ============================================ */}
                    {/* SEARCH BAR - Premium Pill Design */}
                    {/* ============================================ */}
                    <div className="max-w-2xl mx-auto mb-10">
                        <form
                            onSubmit={handleSearch}
                            className="bg-white rounded-full p-2 flex items-center border border-[#E5E5E5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-shadow duration-300"
                        >
                            {/* Search Icon - Outlined */}
                            <div className="pl-5 pr-3 text-[#6B6B6B]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>

                            {/* Input */}
                            <input
                                type="text"
                                placeholder={currentPlaceholder}
                                value={searchQuery}
                                onChange={function (e) { setSearchQuery(e.target.value); }}
                                className="flex-1 py-4 px-2 text-black placeholder-[#6B6B6B] focus:outline-none text-lg bg-transparent font-medium"
                            />

                            {/* Search Button - Pure Black */}
                            <button
                                type="submit"
                                className="bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 text-base hover:scale-[1.02]"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Popular Searches - Refined Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <span className="text-[#6B6B6B] font-medium text-sm uppercase tracking-wider">Popular:</span>

                        {popularTags.map(function (tag) {
                            return (
                                <button
                                    key={tag}
                                    onClick={function () { handleTagClick(tag); }}
                                    className="bg-[#F5F5F5] hover:bg-black text-black hover:text-white px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-medium border border-transparent hover:border-black"
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
