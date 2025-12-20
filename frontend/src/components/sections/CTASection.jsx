// ================================================
// 🚀 CTA SECTION - Call to Action
// ================================================
// Full-width black background
// High contrast white text
// Premium button styling
// ================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';

// ================================================
// CTA SECTION COMPONENT
// ================================================
function CTASection() {
    var navigate = useNavigate();

    // Handlers
    function handleGetStarted() {
        navigate('/join?type=client');
    }

    function handleBecomeSeller() {
        navigate('/join?type=freelancer');
    }

    return (
        <section className="py-28 bg-black relative overflow-hidden">

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Content */}
            <div className="container-custom mx-auto text-center max-w-3xl relative z-10">

                {/* Heading - White, Maximum Contrast */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white">
                    Ready to get started?
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
                    Join thousands of businesses and freelancers. Start your first project today.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                    {/* Primary - White on Black */}
                    <button
                        onClick={handleGetStarted}
                        className="bg-white text-black px-10 py-4 rounded-full font-semibold text-base hover:bg-white/90 hover:scale-[1.02] transition-all duration-300"
                    >
                        Get Started Free
                    </button>

                    {/* Secondary - Outlined */}
                    <button
                        onClick={handleBecomeSeller}
                        className="text-white px-10 py-4 rounded-full font-medium text-base border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
                    >
                        Become a Seller
                    </button>
                </div>

                {/* Trust Indicator */}
                <p className="mt-10 text-sm text-white/50">
                    No credit card required · Free forever to start
                </p>
            </div>
        </section>
    );
}

export default CTASection;
