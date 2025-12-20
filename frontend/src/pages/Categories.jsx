// ================================================
// 📁 CATEGORIES PAGE - Browse Service Categories
// ================================================
// Displays all available service categories
// Requires authentication to browse gigs
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import navigation
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Import API
import { categoryAPI } from '../api/api';

// ================================================
// CATEGORIES COMPONENT
// ================================================
function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    useEffect(function () {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            setLoading(true);
            const response = await categoryAPI.getAll();
            if (response.success) {
                setCategories(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
            setError('Failed to load categories');
        } finally {
            setLoading(false);
        }
    }

    // Handle category click with authentication check
    function handleCategoryClick(event, categoryName) {
        event.preventDefault();
        if (!isAuthenticated) {
            // Redirect to login if not authenticated with return path
            navigate('/login', { state: { from: location } });
        } else {
            // Navigate to gigs with category filter
            navigate('/gigs?category=' + encodeURIComponent(categoryName));
        }
    }

    // ============================================
    // RENDER: Loading state
    // ============================================
    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container-custom text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
                    <p className="mt-4 text-[#6B6B6B]">Loading categories...</p>
                </div>
            </div>
        );
    }

    // ============================================
    // RENDER: Main content
    // ============================================
    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="container-custom">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-semibold text-black mb-4">
                        Explore Categories
                    </h1>
                    <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto">
                        Find the perfect freelancer for your project. Browse through our categories.
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="text-center py-10">
                        <p className="text-red-600">{error}</p>
                    </div>
                )}

                {/* Categories Grid */}
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(function (category) {
                            return (
                                <div
                                    key={category._id || category.slug}
                                    onClick={(e) => handleCategoryClick(e, category.name)}
                                    className="group bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:border-black transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer"
                                >
                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-[#F5F5F5] rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#E5E5E5] transition-colors">
                                        {category.icon || '📁'}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-medium text-black mb-2 group-hover:text-[#6B6B6B] transition-colors">
                                        {category.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#6B6B6B] text-sm line-clamp-2">
                                        {category.description || 'Explore services in this category'}
                                    </p>

                                    {/* Service count */}
                                    {category.serviceCount && (
                                        <p className="mt-3 text-xs text-[#6B6B6B]">
                                            {category.serviceCount} services available
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E5E5]">
                        <svg className="mx-auto h-16 w-16 text-[#E5E5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-black">No categories yet</h3>
                        <p className="mt-2 text-[#6B6B6B]">Categories will appear here soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Export the component
export default Categories;

