// ================================================
// 📊 USER DASHBOARD PAGE - User's Personal Dashboard
// ================================================
// Dashboard with real-time updates for user's orders,
// messages, earnings, and gig recommendations
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState } from 'react';

// Import navigation
import { useNavigate } from 'react-router-dom';

// Import context hooks
import { useAuth } from '../context/AuthContext';
import { useRealTimeDashboard } from '../context/useRealTimeDashboard';

// Import UI components
import StatCard from '../components/ui/StatCard';
import GigCard from '../components/ui/GigCard';

// API Base URL from environment or default
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// SVG ICONS
// ================================================
const OrdersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

const MessagesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
);

const EarningsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// ================================================
// USER DASHBOARD COMPONENT
// ================================================
function UserDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const {
        stats,
        orders,
        recommendedGigs,
        dataLoading,
        isRealTimeActive,
        refresh
    } = useRealTimeDashboard();

    const [proposals, setProposals] = useState([]);
    const [loadingProposals, setLoadingProposals] = useState(true);
    const [acceptingProposalId, setAcceptingProposalId] = useState(null);

    // Fetch received proposals
    React.useEffect(() => {
        async function fetchProposals() {
            try {
                const response = await fetch(API_BASE_URL + '/api/proposals/received', {
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    setProposals(data.data);
                }
            } catch (error) {
                console.error('Error fetching proposals:', error);
            } finally {
                setLoadingProposals(false);
            }
        }
        fetchProposals();
    }, []);

    // Handle Accept Proposal
    async function handleAcceptProposal(proposalId) {
        if (!confirm('Are you sure you want to accept this request? This will start an order.')) return;

        setAcceptingProposalId(proposalId);
        try {
            const response = await fetch(API_BASE_URL + '/api/proposals/' + proposalId + '/accept', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();

            if (data.success) {
                alert('Request accepted! Order started.');
                setProposals(prev => prev.filter(p => p._id !== proposalId));
                refresh();
            } else {
                alert(data.message || 'Failed to accept request');
            }
        } catch (error) {
            console.error('Error accepting proposal:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setAcceptingProposalId(null);
        }
    }

    // Handle reject proposal
    async function handleRejectProposal(proposalId) {
        if (!confirm('Are you sure you want to reject this request?')) return;

        setAcceptingProposalId(proposalId);
        try {
            const response = await fetch(API_BASE_URL + '/api/proposals/' + proposalId + '/reject', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                alert('Request rejected.');
                setProposals(proposals.filter(p => p._id !== proposalId));
            } else {
                alert(data.message || 'Failed to reject request');
            }
        } catch (error) {
            console.error('Error rejecting proposal:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setAcceptingProposalId(null);
        }
    }

    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    const getUserFirstName = () => {
        if (user && user.name) {
            const nameParts = user.name.split(' ');
            return nameParts[0];
        }
        return 'User';
    };

    const getDaysUntilDeadline = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================
    const handleSearch = (event) => {
        event.preventDefault();
        const trimmedSearch = searchTerm.trim();
        if (trimmedSearch) {
            navigate('/gigs?search=' + encodeURIComponent(trimmedSearch));
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleQuickAction = (action) => {
        if (action === 'Browse Gigs') {
            navigate('/gigs');
        } else if (action === 'Post a Job') {
            navigate('/create-project');
        } else if (action === 'Messages') {
            navigate('/messages');
        } else if (action === 'Saved Items') {
            navigate('/saved');
        }
    };

    // ============================================
    // PREPARE STAT CARDS DATA
    // ============================================
    const activeOrdersStat = {
        label: 'Active Orders',
        value: stats.activeOrders.loading ? '...' : String(stats.activeOrders.count),
        icon: OrdersIcon,
        trend: 'up',
        trendValue: stats.activeOrders.loading ? '' : '+' + stats.activeOrders.trend,
        color: 'primary',
        valueColor: 'text-red-400',
        onClick: function () { navigate('/dashboard/orders'); }
    };

    const hasNewMessages = stats.unreadMessages.new > 0;
    const unreadMessagesStat = {
        label: 'Unread Messages',
        value: stats.unreadMessages.loading ? '...' : String(stats.unreadMessages.count),
        icon: MessagesIcon,
        trend: hasNewMessages ? 'up' : 'neutral',
        trendValue: stats.unreadMessages.loading ? '' : (hasNewMessages ? 'New' : ''),
        color: 'secondary',
        valueColor: 'text-yellow-500',
        onClick: function () { navigate('/messages'); }
    };

    const earningsTrend = stats.earnings.trend > 0 ? 'up' : (stats.earnings.trend < 0 ? 'down' : 'neutral');
    const earningsTrendValue = stats.earnings.trend > 0 ? '+' + stats.earnings.trend + '%' : stats.earnings.trend + '%';
    const earningsStat = {
        label: 'Earnings',
        value: stats.earnings.loading ? '...' : '$' + stats.earnings.total.toLocaleString(),
        icon: EarningsIcon,
        trend: earningsTrend,
        trendValue: stats.earnings.loading ? '' : earningsTrendValue,
        color: 'success',
        valueColor: 'text-green-600',
        onClick: function () { navigate('/dashboard/earnings'); }
    };

    const statCards = [activeOrdersStat, unreadMessagesStat, earningsStat];
    const quickActions = ['Browse Gigs', 'Post a Job', 'Messages', 'Saved Items'];

    // ============================================
    // RENDER
    // ============================================
    return (
        <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-12">
            <div className="container-custom mx-auto">

                {/* Real-Time Status Indicator - Minimal */}
                <div className="flex items-center justify-end mb-6">
                    <div className="flex items-center gap-2 text-sm">
                        <div className={isRealTimeActive ? 'w-1.5 h-1.5 rounded-full bg-[#1C1C1E]' : 'w-1.5 h-1.5 rounded-full bg-[#8E8E93]'} />
                        <span className="text-[#8E8E93] text-xs tracking-wide">
                            {isRealTimeActive ? 'Live' : 'Polling'}
                        </span>
                        <button
                            onClick={refresh}
                            className="ml-1 text-[#8E8E93] hover:text-[#1C1C1E] transition-colors"
                            title="Refresh dashboard"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Welcome Section - Apple-Inspired Minimal */}
                <div className="bg-white rounded-2xl mb-8 p-8 border border-[#E5E5EA] shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Left side - Welcome text and search */}
                        <div className="w-full md:w-1/2">
                            <h1 className="text-3xl md:text-4xl font-semibold text-[#1C1C1E] tracking-tight mb-2">
                                Welcome back, {getUserFirstName()}.
                            </h1>
                            <p className="text-[#8E8E93] mb-6">
                                Find the perfect service or manage your projects.
                            </p>

                            {/* Minimal Search Bar */}
                            <form onSubmit={handleSearch} className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search services..."
                                    className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent text-[#1C1C1E] placeholder-[#8E8E93] focus:outline-none focus:border-[#E5E5EA] transition-all"
                                />
                                <button type="submit" className="absolute right-2 top-1.5 bg-[#1C1C1E] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#3A3A3C] transition-colors">
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Right side - Action buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={function () { navigate('/profile'); }}
                                className="px-5 py-2.5 rounded-xl border border-[#E5E5EA] text-[#1C1C1E] font-medium hover:bg-[#F5F5F7] transition-colors"
                            >
                                View Profile
                            </button>
                            <button
                                onClick={function () { navigate('/create-project'); }}
                                className="px-5 py-2.5 rounded-xl bg-[#1C1C1E] text-white font-medium hover:bg-[#3A3A3C] transition-colors"
                            >
                                Post a Request
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {statCards.map(function (stat, index) {
                        return (
                            <StatCard
                                key={index}
                                label={stat.label}
                                value={stat.value}
                                icon={stat.icon}
                                trend={stat.trend}
                                trendValue={stat.trendValue}
                                color={stat.color}
                                valueColor={stat.valueColor}
                                onClick={stat.onClick}
                            />
                        );
                    })}
                </div>

                {/* Received Requests Section - Monochrome */}
                {proposals.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-[#1C1C1E] tracking-tight">Received Requests</h2>
                            <span className="bg-[#F5F5F7] text-[#8E8E93] px-3 py-1 rounded-full text-xs font-medium">{proposals.length} Pending</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {proposals.map((proposal) => (
                                <div key={proposal._id} className="bg-white rounded-2xl p-6 border border-[#E5E5EA] shadow-sm hover:shadow-md transition-all duration-200">
                                    <div className="flex justify-between items-start mb-4 gap-3">
                                        <h3 className="font-medium text-[#1C1C1E] line-clamp-2 flex-1">{(proposal.gigId && proposal.gigId.title) || 'Unknown Gig'}</h3>
                                        <span className="bg-[#F5F5F7] text-[#8E8E93] px-2 py-0.5 rounded text-xs font-medium shrink-0">Pending</span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="w-9 h-9 rounded-full bg-[#F5F5F7] overflow-hidden flex items-center justify-center">
                                            {proposal.freelancerId && proposal.freelancerId.avatar ? (
                                                <img src={proposal.freelancerId.avatar} alt="User" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-[#8E8E93] font-semibold text-sm">
                                                    {(proposal.freelancerId && proposal.freelancerId.name && proposal.freelancerId.name.charAt(0)) || '?'}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#1C1C1E]">{(proposal.freelancerId && proposal.freelancerId.name) || 'Unknown User'}</p>
                                            <p className="text-xs text-[#8E8E93]">wants to work on this</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate('/messages', {
                                                state: {
                                                    recipient: {
                                                        id: (proposal.freelancerId && proposal.freelancerId._id) || proposal.freelancerId,
                                                        name: (proposal.freelancerId && proposal.freelancerId.name) || 'Unknown User',
                                                        avatar: proposal.freelancerId && proposal.freelancerId.avatar
                                                    },
                                                    message: 'Hello'
                                                }
                                            })}
                                            className="flex-1 bg-[#F5F5F7] text-[#1C1C1E] py-2.5 rounded-xl text-sm font-medium hover:bg-[#E5E5EA] transition-colors"
                                        >
                                            Message
                                        </button>
                                        <button
                                            onClick={() => handleRejectProposal(proposal._id)}
                                            disabled={acceptingProposalId === proposal._id}
                                            className="flex-1 bg-red-50 text-red-500 py-2.5 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-red-200"
                                        >
                                            {acceptingProposalId === proposal._id ? 'Processing...' : 'Reject'}
                                        </button>
                                        <button
                                            onClick={() => handleAcceptProposal(proposal._id)}
                                            disabled={acceptingProposalId === proposal._id}
                                            className="flex-1 bg-[#1C1C1E] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#3A3A3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {acceptingProposalId === proposal._id ? 'Accepting...' : 'Accept'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions Grid - Pastel Icons, Zoom Hover */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {/* Browse Gigs */}
                    <button
                        onClick={function () { handleQuickAction('Browse Gigs'); }}
                        className="bg-white border border-[#E5E5EA] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <span className="font-medium text-[#1C1C1E] text-sm">Browse Gigs</span>
                    </button>

                    {/* Post a Job */}
                    <button
                        onClick={function () { handleQuickAction('Post a Job'); }}
                        className="bg-white border border-[#E5E5EA] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <span className="font-medium text-[#1C1C1E] text-sm">Post a Job</span>
                    </button>

                    {/* Messages */}
                    <button
                        onClick={function () { handleQuickAction('Messages'); }}
                        className="bg-white border border-[#E5E5EA] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                        </div>
                        <span className="font-medium text-[#1C1C1E] text-sm">Messages</span>
                    </button>

                    {/* My Jobs */}
                    <button
                        onClick={function () { handleQuickAction('Saved Items'); }}
                        className="bg-white border border-[#E5E5EA] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 h-28 transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <span className="font-medium text-[#1C1C1E] text-sm">My Jobs</span>
                    </button>
                </div>

                {/* Active Orders Section - Monochrome */}
                {orders.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-[#1C1C1E] tracking-tight">Active Orders</h2>
                            <button
                                onClick={function () { navigate('/dashboard/orders'); }}
                                className="text-[#8E8E93] hover:text-[#1C1C1E] text-sm font-medium transition-colors"
                            >
                                View All →
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.slice(0, 3).map(function (order) {
                                const statusClass = 'bg-[#F5F5F7] text-[#8E8E93]';

                                return (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-xl p-5 border border-neutral-200 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start justify-between mb-3 gap-2">
                                            <h3 className="font-medium text-neutral-900 flex-1 break-all line-clamp-2">{order.title}</h3>
                                            <span className={'px-2 py-1 rounded text-xs font-medium shrink-0 ' + statusClass}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-neutral-500 shrink-0">Order ID:</span>
                                                <span className="text-neutral-900 truncate font-mono text-xs" title={order.id}>{order.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">Amount:</span>
                                                <span className="text-green-600 font-medium">${order.amount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-neutral-500">Deadline:</span>
                                                <span className="text-neutral-900">
                                                    {getDaysUntilDeadline(order.deadline)} days
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Latest Jobs Section */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-neutral-900">Latest Jobs</h2>
                    <button
                        onClick={function () { navigate('/gigs'); }}
                        className="text-neutral-900 hover:underline text-sm font-medium"
                    >
                        View All →
                    </button>
                </div>

                {dataLoading ? (
                    <div className="text-center py-12 text-neutral-500">
                        Loading latest jobs...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {recommendedGigs.length > 0 ? (
                            recommendedGigs.map(function (gig, index) {
                                return <GigCard key={gig.id || index} gig={gig} />;
                            })
                        ) : (
                            <div className="col-span-full text-center text-neutral-500">
                                No jobs posted yet.
                            </div>
                        )}
                    </div>
                )}

                {/* Real-Time Activity Indicator */}
                {isRealTimeActive && (
                    <div className="mt-10 bg-green-50 border border-green-100 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm text-green-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span>Dashboard is connected and receiving live updates</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Export the component
export default UserDashboard;
