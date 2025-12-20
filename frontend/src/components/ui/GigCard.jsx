// ================================================
// 🎯 GIG CARD COMPONENT - Premium Vibrant
// ================================================
// Full color images, dynamic tags
// Refined shadows and borders
// ================================================

import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

// ================================================
// GIG CARD COMPONENT
// ================================================
function GigCard(props) {
    var gig = props.gig;
    var gigId = gig.id || '1';
    var gigLink = '/gigs/' + gigId;

    // Get tags from gig data (skills) or fallback
    var tags = gig.tags || gig.skills || [];
    if (typeof tags === 'string') {
        tags = tags.split(',').map(function (t) { return t.trim(); });
    }
    // Limit to max 3 tags
    tags = tags.slice(0, 3);

    return (
        <Link to={gigLink} className="block group">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1">

                {/* Image Section - Full Color */}
                <div className="h-48 overflow-hidden relative">
                    <img
                        src={gig.image}
                        alt={gig.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full text-xs font-medium text-black border border-[#E5E5E5]">
                        {gig.category || 'FEATURED'}
                    </div>

                    {/* Quick Chat Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <Button variant="primary" size="sm" className="!px-6">
                            Quick Chat
                        </Button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5">

                    {/* Provider Info & Rating */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs font-medium">
                                {gig.sellerName ? gig.sellerName.charAt(0).toUpperCase() : 'F'}
                            </div>
                            <span className="text-sm text-[#6B6B6B]">
                                {gig.sellerName || 'Freelancer'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-black">
                            <span>★</span> {gig.rating || 'New'}
                            <span className="text-[#6B6B6B] font-normal">({gig.reviews || 0})</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-black mb-3 line-clamp-2 group-hover:text-[#6B6B6B] transition-colors text-base leading-snug">
                        {gig.title}
                    </h3>

                    {/* Tags - Dynamic from gig data */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tags.length > 0 ? tags.map(function (tag, index) {
                            return (
                                <span
                                    key={index}
                                    className="text-xs font-medium text-black bg-[#F5F5F5] px-2.5 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            );
                        }) : (
                            <span className="text-xs font-medium text-black bg-[#F5F5F5] px-2.5 py-1 rounded-full">
                                {gig.category || 'General'}
                            </span>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5]">
                        <div className="flex flex-col">
                            <span className="text-[#6B6B6B] text-xs">Starting at</span>
                            <span className="text-lg font-semibold text-black">{gig.price}</span>
                        </div>

                        {/* Favorite */}
                        <button className="text-[#6B6B6B] hover:text-black transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GigCard;
