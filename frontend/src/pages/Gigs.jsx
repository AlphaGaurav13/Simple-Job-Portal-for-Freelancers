// ================================================
// 🔍 GIGS PAGE - Browse Available Projects
// ================================================
// Browse and filter available freelance projects
// Requires authentication
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import navigation
import { useNavigate } from 'react-router-dom';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Import API
import { projectAPI } from '../api/api';

// Import UI components
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// ================================================
// CATEGORY OPTIONS
// ================================================
const CATEGORIES = [
    'All Categories',
    'Graphic & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Programming & Tech',
    'Music & Audio'
];

// Number of gigs per page
const GIGS_PER_PAGE = 9;

// ================================================
// GIGS COMPONENT
// ================================================
function Gigs() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [loading, setLoading] = useState(true);
    const [gigs, setGigs] = useState([]);
    const [filteredGigs, setFilteredGigs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [budgetFilter, setBudgetFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Redirect to login if not authenticated
    useEffect(function () {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(function () {
        if (isAuthenticated) {
            fetchGigs();
        }
    }, [isAuthenticated]);

    useEffect(function () {
        filterGigs();
    }, [searchTerm, selectedCategory, budgetFilter, gigs]);

    async function fetchGigs() {
        try {
            setLoading(true);
            const response = await projectAPI.getAll({
                status: 'open',
                limit: 50
            });
            const gigsData = response.data || [];
            setGigs(gigsData);
        } catch (error) {
            console.error('Failed to fetch gigs:', error);
        } finally {
            setLoading(false);
        }
    }

    function filterGigs() {
        let filtered = [...gigs];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(function (gig) {
                const titleMatch = gig.title.toLowerCase().includes(searchLower);
                const descMatch = gig.description.toLowerCase().includes(searchLower);
                let skillMatch = false;
                if (gig.skills && gig.skills.length > 0) {
                    skillMatch = gig.skills.find(function (skill) {
                        return skill.toLowerCase().includes(searchLower);
                    });
                }
                return titleMatch || descMatch || skillMatch;
            });
        }

        if (selectedCategory && selectedCategory !== 'All Categories') {
            filtered = filtered.filter(function (gig) {
                return gig.category === selectedCategory;
            });
        }

        if (budgetFilter !== 'all') {
            filtered = filtered.filter(function (gig) {
                let budget = 0;
                if (gig.budget && gig.budget.fixed) {
                    budget = gig.budget.fixed;
                } else if (gig.budget && gig.budget.max) {
                    budget = gig.budget.max;
                }

                if (budgetFilter === 'low') {
                    return budget < 500;
                } else if (budgetFilter === 'medium') {
                    return budget >= 500 && budget < 2000;
                } else if (budgetFilter === 'high') {
                    return budget >= 2000;
                }
                return true;
            });
        }

        setFilteredGigs(filtered);
        setCurrentPage(1);
    }

    const indexOfLastGig = currentPage * GIGS_PER_PAGE;
    const indexOfFirstGig = indexOfLastGig - GIGS_PER_PAGE;
    const currentGigs = filteredGigs.slice(indexOfFirstGig, indexOfLastGig);
    const totalPages = Math.ceil(filteredGigs.length / GIGS_PER_PAGE);

    function formatBudget(budget) {
        if (!budget) {
            return 'Budget not specified';
        }
        if (budget.type === 'fixed' && budget.fixed) {
            return '$' + budget.fixed.toLocaleString();
        }
        if (budget.type === 'hourly' && budget.min && budget.max) {
            return '$' + budget.min + '-$' + budget.max + '/hr';
        }
        return 'Budget not specified';
    }

    function formatDuration(duration) {
        if (!duration) {
            return 'Duration not specified';
        }
        return duration.value + ' ' + duration.unit;
    }

    function calculateTimeAgo(createdAt) {
        const now = Date.now();
        const created = new Date(createdAt).getTime();
        const diff = now - created;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return 'Today';
        }
        if (days === 1) {
            return 'Yesterday';
        }
        if (days < 7) {
            return days + ' days ago';
        }
        if (days < 30) {
            const weeks = Math.floor(days / 7);
            return weeks + ' weeks ago';
        }
        const months = Math.floor(days / 30);
        return months + ' months ago';
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleCategoryChange(event) {
        const value = event.target.value;
        if (value === 'All Categories') {
            setSelectedCategory('');
        } else {
            setSelectedCategory(value);
        }
    }

    function handleBudgetChange(event) {
        setBudgetFilter(event.target.value);
    }

    function handleGigClick(gigId) {
        navigate('/gigs/' + gigId);
    }

    function goToPreviousPage() {
        setCurrentPage(function (prev) {
            return Math.max(1, prev - 1);
        });
    }

    function goToNextPage() {
        setCurrentPage(function (prev) {
            return Math.min(totalPages, prev + 1);
        });
    }

    function goToPage(page) {
        setCurrentPage(page);
    }

    function renderPagination() {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            const shouldShow =
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1);

            if (shouldShow) {
                pageNumbers.push(i);
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pageNumbers.push('...');
            }
        }

        return pageNumbers.map(function (page, index) {
            if (page === '...') {
                return (
                    <span key={'ellipsis-' + index} className="px-2 text-neutral-400">
                        ...
                    </span>
                );
            }

            const isCurrentPage = currentPage === page;
            const buttonClass = isCurrentPage
                ? 'px-4 py-2 rounded-lg bg-neutral-900 text-white'
                : 'px-4 py-2 rounded-lg bg-white text-neutral-900 hover:bg-neutral-100 border border-neutral-200';

            return (
                <button
                    key={page}
                    onClick={function () { goToPage(page); }}
                    className={buttonClass}
                >
                    {page}
                </button>
            );
        });
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="container-custom">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Project Requests</h1>
                    <p className="text-neutral-500">Find the perfect project for your skills</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        {/* Search */}
                        <div className="md:col-span-2">
                            <Input
                                type="search"
                                placeholder="Search gigs by title, description, or skills..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory || 'All Categories'}
                                onChange={handleCategoryChange}
                                className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
                            >
                                {CATEGORIES.map(function (cat) {
                                    return (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        {/* Budget Filter */}
                        <div>
                            <select
                                value={budgetFilter}
                                onChange={handleBudgetChange}
                                className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:border-neutral-400 transition-colors"
                            >
                                <option value="all">All Budgets</option>
                                <option value="low">Under $500</option>
                                <option value="medium">$500 - $2,000</option>
                                <option value="high">$2,000+</option>
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-neutral-500">
                        Showing {filteredGigs.length} request{filteredGigs.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-neutral-900 border-t-transparent"></div>
                        <p className="mt-4 text-neutral-500">Loading gigs...</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && filteredGigs.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
                        <svg className="mx-auto h-16 w-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-neutral-900">No gigs found</h3>
                        <p className="mt-2 text-neutral-500">Try adjusting your filters or search term</p>
                    </div>
                )}

                {/* Gigs Grid */}
                {!loading && currentGigs.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentGigs.map(function (gig) {
                                return (
                                    <div
                                        key={gig._id}
                                        className="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 overflow-hidden h-[280px] flex flex-col"
                                        onClick={function () { handleGigClick(gig._id); }}
                                    >
                                        {/* Gig Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-neutral-900 line-clamp-2 mb-2 break-words overflow-hidden">
                                                    {gig.title}
                                                </h3>
                                                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">
                                                    {gig.category}
                                                </span>
                                            </div>
                                            {gig.isFeatured && (
                                                <span className="ml-2 text-yellow-500">⭐</span>
                                            )}
                                        </div>

                                        {/* Project Meta */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs text-neutral-400">Posted by</span>
                                            <span className="text-xs font-semibold text-neutral-700">
                                                {gig.client && gig.client.name ? gig.client.name : 'Client'}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-neutral-500 text-sm line-clamp-3 mb-4 break-words overflow-hidden flex-grow">
                                            {gig.description}
                                        </p>

                                        {/* Skills */}
                                        {gig.skills && gig.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {gig.skills.slice(0, 3).map(function (skill, index) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded"
                                                        >
                                                            {skill}
                                                        </span>
                                                    );
                                                })}
                                                {gig.skills.length > 3 && (
                                                    <span className="px-2 py-1 text-neutral-400 text-xs">
                                                        +{gig.skills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                                            <div>
                                                <div className="text-lg font-semibold text-neutral-900">
                                                    {formatBudget(gig.budget)}
                                                </div>
                                                <div className="text-xs text-neutral-400">
                                                    {formatDuration(gig.duration)}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs text-neutral-400">
                                                    {calculateTimeAgo(gig.createdAt)}
                                                </div>
                                                {gig.proposalCount > 0 && (
                                                    <div className="text-xs text-neutral-500 mt-1">
                                                        {gig.proposalCount} proposal{gig.proposalCount !== 1 ? 's' : ''}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                <div className="flex gap-2">
                                    {renderPagination()}
                                </div>

                                <Button
                                    variant="secondary"
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// Export the component
export default Gigs;

