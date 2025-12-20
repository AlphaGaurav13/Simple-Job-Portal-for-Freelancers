// ================================================
// 📊 STATS SECTION - Platform Statistics
// ================================================
// Premium monochrome stats with ultra-bold numbers
// Vertical dividers between stats
// ================================================

import React from 'react';

// ================================================
// STATS SECTION COMPONENT
// ================================================
function StatsSection() {
    // Statistics data
    var stats = [
        { number: '50k+', label: 'Active Freelancers' },
        { number: '100k+', label: 'Projects Completed' },
        { number: '4.9', label: 'Average Rating' },
        { number: '150+', label: 'Countries' }
    ];

    return (
        <section className="py-24 bg-[#F5F5F5]">
            <div className="container-custom mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-[#6B6B6B] text-lg max-w-xl mx-auto">
                        Join a global community of professionals delivering exceptional work.
                    </p>
                </div>

                {/* Stats Grid with Dividers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                    {stats.map(function (stat, index) {
                        return (
                            <div
                                key={index}
                                className="text-center relative"
                            >
                                {/* Number - Ultra Bold */}
                                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-3 tracking-tighter">
                                    {stat.number}
                                </div>

                                {/* Label - Uppercase, Letter-Spaced */}
                                <div className="text-[#6B6B6B] font-medium text-xs uppercase tracking-[0.15em]">
                                    {stat.label}
                                </div>

                                {/* Vertical Divider (except last) */}
                                {index < stats.length - 1 && (
                                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-[#E5E5E5]" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default StatsSection;
