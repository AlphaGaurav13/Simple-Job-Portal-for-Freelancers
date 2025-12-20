// ================================================
// 💬 TESTIMONIALS SECTION - Success Stories
// ================================================
// Auto-sliding testimonials with 3-second interval
// Premium monochrome design with smooth transitions
// ================================================

import React, { useState, useEffect } from 'react';

// ================================================
// TESTIMONIALS SECTION COMPONENT
// ================================================
function TestimonialsSection() {
    // Testimonials data array
    var testimonials = [
        {
            quote: 'The freelance talent we found on getWork has been instrumental in scaling our content production. The quality of work is consistently outstanding.',
            author: 'Abhishak Chaturvedi',
            role: 'Founder',
            company: 'getWork',
            image: '/abhi.png'
        },
        {
            quote: 'Partnering with freelance talent through getWork has significantly accelerated our growth. Their professionalism and consistency have made a real impact on our execution and results.',
            author: 'Agam Kumar',
            role: 'Co-Founder',
            company: 'getWork',
            image: '/agam.jpg'
        }
    ];

    // Current slide index
    var [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 3 seconds
    useEffect(function () {
        var timer = setInterval(function () {
            setCurrentIndex(function (prev) {
                return (prev + 1) % testimonials.length;
            });
        }, 10000);

        // Cleanup timer on unmount
        return function () {
            clearInterval(timer);
        };
    }, []);

    // Get current testimonial
    var testimonial = testimonials[currentIndex];

    return (
        <section className="py-24 bg-white">
            <div className="container-custom mx-auto">

                {/* Section Label */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                        Success Stories
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 max-w-5xl mx-auto">

                    {/* Image with fade transition */}
                    <div className="w-full md:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden group aspect-square border border-[#E5E5E5] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                            <img
                                key={currentIndex}
                                src={testimonial.image}
                                alt={testimonial.author}
                                className="w-full h-full object-cover object-top scale-110 group-hover:scale-115 transition-all duration-500 animate-fadeIn"
                            />
                        </div>
                    </div>

                    {/* Quote Content with fade transition */}
                    <div className="w-full md:w-1/2" key={currentIndex}>

                        {/* Decorative Quote Mark */}
                        <div className="text-8xl font-serif text-[#E5E5E5] leading-none mb-4">"</div>

                        {/* Quote - Elegant Typography */}
                        <blockquote className="text-2xl md:text-3xl font-medium text-black leading-relaxed mb-8 -mt-8 animate-fadeIn">
                            {testimonial.quote}
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 animate-fadeIn">
                            <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
                                {testimonial.author.charAt(0)}
                            </div>
                            <div>
                                <p className="font-semibold text-lg text-black">
                                    {testimonial.author}
                                </p>
                                <p className="text-[#6B6B6B]">
                                    {testimonial.role}, {testimonial.company}
                                </p>
                            </div>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex gap-2 mt-8">
                            {testimonials.map(function (_, index) {
                                return (
                                    <button
                                        key={index}
                                        onClick={function () { setCurrentIndex(index); }}
                                        className={
                                            "w-3 h-3 rounded-full transition-all duration-300 " +
                                            (index === currentIndex ? "bg-black w-8" : "bg-[#E5E5E5] hover:bg-[#CCCCCC]")
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
