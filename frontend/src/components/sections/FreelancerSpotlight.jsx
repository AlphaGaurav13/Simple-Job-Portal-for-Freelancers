// ================================================
// 🌟 FREELANCER SPOTLIGHT - Featured Freelancers
// ================================================
// Premium profile cards with B&W photos
// Skill tags, rating badges, hire button
// ================================================

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ================================================
// FREELANCER SPOTLIGHT COMPONENT
// ================================================
function FreelancerSpotlight() {
    var navigate = useNavigate();
    var location = useLocation();
    var auth = useAuth();
    var isAuthenticated = auth.isAuthenticated;

    // Freelancer data
    var freelancers = [
        {
            name: 'Agam Kumar',
            role: 'Senior UI/UX Designer',
            image: '/agam.jpg',
            rating: '5.0',
            skills: ['Figma', 'React', 'Prototyping']
        },
        {
            name: 'Sarah Chen',
            role: 'Full Stack Developer',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            rating: '4.9',
            skills: ['Node.js', 'Python', 'AWS']
        },
        {
            name: 'Abhishak Chaturvedi',
            role: 'Full Stack Developer',
            image: '/abhi.png',
            rating: '5.0',
            skills: ['Node.js', 'React', 'Next.js', 'AWS']
        }
    ];

    // Handle freelancer click
    function handleFreelancerClick(e, freelancerName) {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
        } else {
            navigate('/gigs?search=' + encodeURIComponent(freelancerName));
        }
    }

    return (
        <section className="py-24 bg-[#F5F5F5]">
            <div className="container-custom mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-2">
                            Freelancer Spotlight
                        </h2>
                        <p className="text-[#6B6B6B] text-lg">
                            Top rated talent ready to start your project today.
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
                        <button className="w-12 h-12 rounded-full border border-[#E5E5E5] bg-white hover:border-black hover:bg-black hover:text-white text-[#6B6B6B] transition-all duration-300 flex items-center justify-center">
                            ←
                        </button>
                        <button className="w-12 h-12 rounded-full border border-[#E5E5E5] bg-white hover:border-black hover:bg-black hover:text-white text-[#6B6B6B] transition-all duration-300 flex items-center justify-center">
                            →
                        </button>
                    </div>
                </div>

                {/* Freelancers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {freelancers.map(function (freelancer, index) {
                        return (
                            <div
                                key={index}
                                onClick={function (e) { handleFreelancerClick(e, freelancer.name); }}
                                className="group bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            >
                                {/* Image - B&W Treatment */}
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={freelancer.image}
                                        alt={freelancer.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Name and Rating */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-black">
                                                {freelancer.name}
                                            </h3>
                                            <p className="text-[#6B6B6B] text-sm">
                                                {freelancer.role}
                                            </p>
                                        </div>
                                        {/* Rating Badge */}
                                        <div className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                            ★ {freelancer.rating}
                                        </div>
                                    </div>

                                    {/* Skills - Pill Badges */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {freelancer.skills.map(function (skill, skillIndex) {
                                            return (
                                                <span
                                                    key={skillIndex}
                                                    className="text-xs bg-[#F5F5F5] text-black px-3 py-1.5 rounded-full font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {/* Hire Button - Full Width Black */}
                                    <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-[#1A1A1A] transition-colors">
                                        Hire Me
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FreelancerSpotlight;
