// ================================================
// 🦶 FOOTER COMPONENT - Page Footer
// ================================================
// White footer with links and social icons
// Premium minimalist design
// ================================================

import React from 'react';
import { Link } from 'react-router-dom';

// ================================================
// FOOTER COMPONENT
// ================================================
function Footer() {
    // Footer links data
    var footerLinks = {
        categories: [
            'Graphics & Design', 'Digital Marketing', 'Writing & Translation',
            'Video & Animation', 'Music & Audio', 'Programming & Tech',
            'Data', 'Business', 'Lifestyle'
        ],
        about: [
            'Careers', 'Press & News', 'Partnerships',
            'Privacy Policy', 'Terms of Service', 'Intellectual Property Claims'
        ],
        support: [
            'Help & Support', 'Trust & Safety', 'Selling on getWork',
            'Buying on getWork'
        ],
        community: [
            'Customer Success Stories', 'Community Hub', 'Forum',
            'Events', 'Blog', 'Influencers', 'Affiliates', 'Podcast'
        ]
    };

    return (
        <footer className="bg-[#F5F5F5] border-t border-[#E5E5E5] pt-16 pb-12">
            <div className="container-custom mx-auto">

                {/* Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

                    {/* Categories */}
                    <div>
                        <h4 className="font-bold text-black mb-5 text-sm uppercase tracking-wide">Categories</h4>
                        <ul className="space-y-3">
                            {footerLinks.categories.map(function (link) {
                                return (
                                    <li key={link}>
                                        <Link to="#" className="text-[#6B6B6B] hover:text-black transition-colors text-sm">
                                            {link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="font-bold text-black mb-5 text-sm uppercase tracking-wide">About</h4>
                        <ul className="space-y-3">
                            {footerLinks.about.map(function (link) {
                                return (
                                    <li key={link}>
                                        <Link to="#" className="text-[#6B6B6B] hover:text-black transition-colors text-sm">
                                            {link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-black mb-5 text-sm uppercase tracking-wide">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map(function (link) {
                                return (
                                    <li key={link}>
                                        <Link to="#" className="text-[#6B6B6B] hover:text-black transition-colors text-sm">
                                            {link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h4 className="font-bold text-black mb-5 text-sm uppercase tracking-wide">Community</h4>
                        <ul className="space-y-3">
                            {footerLinks.community.map(function (link) {
                                return (
                                    <li key={link}>
                                        <Link to="#" className="text-[#6B6B6B] hover:text-black transition-colors text-sm">
                                            {link}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-[#E5E5E5] gap-6">

                    {/* Logo and Copyright */}
                    <div className="flex items-center gap-6">
                        <Link to="/" className="text-xl font-bold tracking-tight group">
                            <span className="text-black">get</span>
                            <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">Work</span>
                            <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">.</span>
                        </Link>
                        <span className="text-sm text-[#6B6B6B]">
                            © 2025 getWork International Ltd.
                        </span>
                    </div>

                    {/* Social Icons and Settings */}
                    <div className="flex items-center gap-6">

                        {/* Social Icons */}
                        <div className="flex gap-4 text-[#6B6B6B]">
                            <a href="#" className="hover:text-black transition-colors">
                                <span className="sr-only">TikTok</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v10.1c-.05 2.31-1.73 4.55-4.04 5.22-2.3.69-4.93-.33-6.33-2.3-1.4-1.96-1.07-4.9 1.1-6.55 1.09-.82 2.46-1.15 3.82-1.09v4.14c-.66-.11-1.42.05-1.96.47-.57.44-.84 1.23-.65 1.93.19.71.91 1.25 1.64 1.23.78-.02 1.48-.58 1.54-1.36.05-3.23.02-6.47.02-9.7-1.5-.35-3.01-.07-4.34.78-.37-1.33-.02-2.82.93-3.82.97-1.03 2.35-1.55 3.73-1.57v-4z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-black transition-colors">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-black transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>

                        {/* Language and Currency */}
                        <div className="flex items-center gap-4 text-sm text-[#6B6B6B] font-medium">
                            <button className="hover:text-black hover:bg-[#E5E5E5] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                                🌐 English
                            </button>
                            <button className="hover:text-black hover:bg-[#E5E5E5] px-3 py-1.5 rounded-lg transition-colors">
                                $ USD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
