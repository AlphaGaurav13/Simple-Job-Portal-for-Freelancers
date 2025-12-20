// ================================================
// 🧭 NAVBAR COMPONENT - Navigation Bar
// ================================================
// Premium monochrome navbar with refined styling
// Pure black & white aesthetic
// ================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ================================================
// NAVBAR COMPONENT
// ================================================
function Navbar() {
    var auth = useAuth();
    var user = auth.user;
    var logout = auth.logout;
    var isAuthenticated = auth.isAuthenticated;

    var navigate = useNavigate();
    var location = useLocation();

    // State
    var [isScrolled, setIsScrolled] = useState(false);
    var [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    var [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    var [searchQuery, setSearchQuery] = useState('');

    // Handle scroll
    useEffect(function () {
        function handleScroll() {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handlers
    function handleLogout() {
        logout();
        setIsProfileDropdownOpen(false);
        navigate('/');
    }

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    function toggleProfileDropdown() {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/gigs?search=' + encodeURIComponent(searchQuery.trim()));
            setIsMobileMenuOpen(false);
            setSearchQuery('');
        }
    }

    // User initial for avatar
    var userInitial = user && user.name ? user.name.charAt(0) : 'U';

    // Header class based on scroll
    var headerClass = isScrolled
        ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5]'
        : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-transparent';

    return (
        <header className={headerClass}>
            <div className="container-custom mx-auto">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo & Search */}
                    <div className="flex items-center gap-8 lg:gap-12">

                        {/* Logo - Cyan Neon */}
                        <Link
                            to={isAuthenticated ? '/dashboard' : '/'}
                            className="text-2xl font-bold tracking-tight group"
                        >
                            <span className="text-black">get</span>
                            <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">Work</span>
                            <span className="text-[#00f0ff] group-hover:text-[#ff69b4] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">.</span>
                        </Link>

                        {/* Search Bar (Desktop - appears on scroll) */}
                        <div className={isScrolled ? 'hidden lg:block w-[280px]' : 'hidden'}>
                            <form onSubmit={handleSearch}>
                                <div className="relative flex">
                                    <input
                                        type="text"
                                        placeholder="Find projects..."
                                        value={searchQuery}
                                        onChange={function (e) { setSearchQuery(e.target.value); }}
                                        className="w-full bg-[#F5F5F5] border border-[#E5E5E5] rounded-full px-5 py-2.5 text-black placeholder-[#6B6B6B] focus:outline-none focus:border-black transition-colors text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-black transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">

                        {/* Explore Link */}
                        <Link
                            to="/categories"
                            className={location.pathname === '/categories'
                                ? 'text-sm font-medium text-black'
                                : 'text-sm font-medium text-[#6B6B6B] hover:text-black transition-colors'}
                        >
                            Explore
                        </Link>

                        {/* Dashboard Link */}
                        <Link
                            to={isAuthenticated ? '/dashboard' : '/login'}
                            className={location.pathname === '/dashboard'
                                ? 'text-sm font-medium text-black'
                                : 'text-sm font-medium text-[#6B6B6B] hover:text-black transition-colors'}
                        >
                            Dashboard
                        </Link>

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="relative">
                                {/* Profile Button */}
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm uppercase">
                                        {userInitial}
                                    </div>
                                </button>

                                {/* Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white border border-[#E5E5E5] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-2 z-50">

                                        {/* User Info */}
                                        <div className="px-4 py-3 border-b border-[#E5E5E5]">
                                            <p className="text-xs text-[#6B6B6B]">Signed in as</p>
                                            <p className="text-sm font-medium text-black truncate">
                                                {user && user.email}
                                            </p>
                                        </div>

                                        {/* Links */}
                                        <Link to="/dashboard" className="block px-4 py-2.5 text-sm text-[#6B6B6B] hover:text-black hover:bg-[#F5F5F5] transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link to="/messages" className="block px-4 py-2.5 text-sm text-[#6B6B6B] hover:text-black hover:bg-[#F5F5F5] transition-colors">
                                            Messages
                                        </Link>
                                        <Link to="/orders" className="block px-4 py-2.5 text-sm text-[#6B6B6B] hover:text-black hover:bg-[#F5F5F5] transition-colors">
                                            Orders
                                        </Link>

                                        <div className="h-px bg-[#E5E5E5] my-1" />

                                        {/* Logout */}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-[#6B6B6B] hover:text-black transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/join">
                                    <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#1A1A1A] transition-colors text-sm">
                                        Join Free
                                    </button>
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-black p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
                        onClick={toggleMobileMenu}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-[#E5E5E5] shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">

                    <Link to="/categories" className="text-base font-medium text-black py-2 border-b border-[#E5E5E5]">
                        Explore
                    </Link>

                    {!isAuthenticated && (
                        <Link to="/join?type=freelancer" className="text-base font-medium text-black py-2 border-b border-[#E5E5E5]">
                            Become a Seller
                        </Link>
                    )}

                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-base font-medium text-black py-2 border-b border-[#E5E5E5]">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="text-base font-medium text-red-400 py-2 text-left hover:text-red-500 transition-colors">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-base font-medium text-black py-2 border-b border-[#E5E5E5]">
                                Sign In
                            </Link>
                            <button
                                className="bg-black text-white w-full py-3 rounded-full font-medium hover:bg-[#1A1A1A] transition-colors"
                                onClick={function () { navigate('/join'); }}
                            >
                                Join Now
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}

export default Navbar;
