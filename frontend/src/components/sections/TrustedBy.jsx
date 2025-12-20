// ================================================
// 🏢 TRUSTED BY SECTION - Company Logos
// ================================================
// Premium monochrome logo display
// Grayscale with hover reveal
// ================================================

import React from 'react';

// ================================================
// TRUSTED BY COMPONENT
// ================================================
function TrustedBy() {
    // Company logos
    var companies = [
        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
        { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
        { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
        { name: 'PayPal', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' }
    ];

    return (
        <section className="bg-[#F5F5F5] border-t border-[#E5E5E5] py-10">
            <div className="container-custom mx-auto">

                {/* Flex Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">

                    {/* Label - Uppercase, Letter-Spaced */}
                    <span className="text-[#6B6B6B] font-medium uppercase tracking-[0.15em] text-xs">
                        Trusted by
                    </span>

                    {/* Company Logos - Monochrome Treatment */}
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14">
                        {companies.map(function (company, index) {
                            return (
                                <img
                                    key={index}
                                    src={company.logo}
                                    alt={company.name}
                                    className="h-6 md:h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrustedBy;
