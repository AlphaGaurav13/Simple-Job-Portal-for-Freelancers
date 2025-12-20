// ================================================
// 💼 MY POSTED JOBS PAGE - Client's Jobs with Order Status
// ================================================
// Shows jobs posted by client with order status (completed, cancelled)
// ================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

// API Base URL from environment or default
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// MY JOBS COMPONENT
// ================================================
function Saved() {
    var auth = useAuth();
    var user = auth.user;
    var isAuthenticated = auth.isAuthenticated;
    var navigate = useNavigate();

    var [myJobs, setMyJobs] = useState([]);
    var [jobOrders, setJobOrders] = useState({}); // Map of jobId -> order
    var [loading, setLoading] = useState(true);
    var [selectedJob, setSelectedJob] = useState(null);
    var [interestedUsers, setInterestedUsers] = useState([]);
    var [loadingProposals, setLoadingProposals] = useState(false);
    var [actionLoading, setActionLoading] = useState(false);
    var [activeFilter, setActiveFilter] = useState('all');

    // Redirect and fetch data
    useEffect(function () {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchMyJobs();
    }, [isAuthenticated, navigate]);

    // Fetch user's posted jobs and their orders
    async function fetchMyJobs() {
        try {
            setLoading(true);

            // Fetch jobs
            var jobsResponse = await fetch(API_BASE_URL + '/api/projects/my-posts', {
                credentials: 'include'
            });
            var jobsData = await jobsResponse.json();

            // Fetch orders (for client - to see order status of their jobs)
            var ordersResponse = await fetch(API_BASE_URL + '/api/orders', {
                credentials: 'include'
            });
            var ordersData = await ordersResponse.json();

            if (jobsData.success) {
                setMyJobs(jobsData.data || []);
            }

            if (ordersData.success) {
                // Create map of gigId -> order for quick lookup
                var orderMap = {};
                var userId = user ? (user.id || user._id) : null;
                (ordersData.data || []).forEach(function (order) {
                    // Only include orders where user is the client
                    if (order.clientId === userId || (order.clientId && order.clientId.toString() === userId)) {
                        orderMap[order.gigId] = order;
                    }
                });
                setJobOrders(orderMap);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch interested users for a job
    async function fetchInterestedUsers(jobId) {
        try {
            setLoadingProposals(true);
            var response = await fetch(API_BASE_URL + '/api/proposals/by-gig/' + jobId, {
                credentials: 'include'
            });
            var data = await response.json();
            if (data.success) {
                setInterestedUsers(data.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch interested users:', error);
        } finally {
            setLoadingProposals(false);
        }
    }

    // Update order status
    async function updateOrderStatus(orderId, newStatus) {
        setActionLoading(true);
        try {
            var response = await fetch(API_BASE_URL + '/api/orders/' + orderId + '/status', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            });
            var data = await response.json();
            if (data.success) {
                // Refresh data
                await fetchMyJobs();
                alert('Order ' + newStatus + ' successfully!');
            } else {
                alert(data.message || 'Failed to update order');
            }
        } catch (err) {
            console.error('Error updating order:', err);
            alert('Failed to update order status');
        } finally {
            setActionLoading(false);
        }
    }

    function handleCancelOrder(orderId) {
        if (confirm('Are you sure you want to cancel this order?')) {
            updateOrderStatus(orderId, 'cancelled');
        }
    }

    function handleCompleteOrder(orderId) {
        if (confirm('Mark this order as completed? This will finalize the transaction.')) {
            updateOrderStatus(orderId, 'completed');
        }
    }

    function handleJobClick(job) {
        setSelectedJob(job);
        fetchInterestedUsers(job._id);
    }

    function handleBackToList() {
        setSelectedJob(null);
        setInterestedUsers([]);
    }

    function handleContactUser(interestedUser) {
        navigate('/messages', {
            state: {
                recipient: {
                    id: interestedUser.user.id,
                    name: interestedUser.user.name,
                    avatar: interestedUser.user.avatar
                }
            }
        });
    }

    function formatBudget(budget) {
        if (!budget) return 'Not specified';
        if (budget.fixed) return '$' + budget.fixed;
        if (budget.min && budget.max) return '$' + budget.min + ' - $' + budget.max;
        return 'Not specified';
    }

    function getJobStatus(job) {
        var order = jobOrders[job._id];
        if (order) {
            return order.status;
        }
        return job.status;
    }

    function getStatusBadge(status) {
        if (status === 'open') return 'bg-green-100 text-green-700';
        if (status === 'in_progress' || status === 'in-progress') return 'bg-blue-100 text-blue-700';
        if (status === 'completed') return 'bg-green-100 text-green-700';
        if (status === 'cancelled') return 'bg-red-100 text-red-700';
        if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
        return 'bg-[#F5F5F5] text-[#6B6B6B]';
    }

    // Filter jobs based on status
    function getFilteredJobs() {
        if (activeFilter === 'all') return myJobs;
        return myJobs.filter(function (job) {
            var status = getJobStatus(job);
            return status === activeFilter;
        });
    }

    var filteredJobs = getFilteredJobs();

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container-custom text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
                    <p className="mt-4 text-[#6B6B6B]">Loading your posted jobs...</p>
                </div>
            </div>
        );
    }

    // Detail view for selected job
    if (selectedJob) {
        var jobStatus = getJobStatus(selectedJob);
        var order = jobOrders[selectedJob._id];
        var canTakeAction = order && (order.status === 'pending' || order.status === 'in_progress');

        return (
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container-custom max-w-3xl">
                    {/* Back Button */}
                    <button
                        onClick={handleBackToList}
                        className="flex items-center gap-2 text-[#6B6B6B] hover:text-black mb-6 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back to My Jobs
                    </button>

                    {/* Job Header */}
                    <div className="bg-[#F5F5F5] rounded-2xl p-8 mb-8">
                        <h1 className="text-2xl font-semibold text-black mb-2">{selectedJob.title}</h1>
                        <p className="text-[#6B6B6B] mb-4">{selectedJob.description}</p>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-black border border-[#E5E5E5]">
                                {selectedJob.category}
                            </span>
                            <span className="px-3 py-1 bg-white rounded-full text-sm text-black border border-[#E5E5E5]">
                                {formatBudget(selectedJob.budget)}
                            </span>
                            <span className={"px-3 py-1 rounded-full text-sm font-medium " + getStatusBadge(jobStatus)}>
                                {jobStatus}
                            </span>
                        </div>
                    </div>

                    {/* Order Actions (if order exists) */}
                    {order && (
                        <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 mb-8">
                            <h2 className="text-lg font-semibold text-black mb-4">Order Details</h2>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-sm text-[#6B6B6B]">Freelancer</p>
                                    <p className="font-medium text-black">{order.sellerName || 'Unknown'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#6B6B6B]">Amount</p>
                                    <p className="font-medium text-black">${order.amount || 0}</p>
                                </div>
                            </div>

                            {canTakeAction && (
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        size="md"
                                        onClick={function () { handleCancelOrder(order.id || order._id); }}
                                        disabled={actionLoading}
                                        className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                                    >
                                        {actionLoading ? 'Processing...' : 'Cancel Order'}
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="md"
                                        onClick={function () { handleCompleteOrder(order.id || order._id); }}
                                        disabled={actionLoading}
                                        className="flex-1"
                                    >
                                        {actionLoading ? 'Processing...' : 'Mark as Completed'}
                                    </Button>
                                </div>
                            )}

                            {order.status === 'completed' && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
                                    ✅ This order has been completed successfully!
                                </div>
                            )}
                            {order.status === 'cancelled' && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
                                    ❌ This order has been cancelled.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Interested Users Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-black mb-6">
                            Interested Candidates ({interestedUsers.length})
                        </h2>

                        {loadingProposals ? (
                            <div className="text-center py-12 text-[#6B6B6B]">
                                Loading interested users...
                            </div>
                        ) : interestedUsers.length > 0 ? (
                            <div className="space-y-4">
                                {interestedUsers.map(function (item) {
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-5 bg-white border border-[#E5E5E5] rounded-2xl hover:shadow-lg transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-medium">
                                                    {item.user.name ? item.user.name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-black">{item.user.name}</h3>
                                                    <p className={"text-sm " + (item.status === 'accepted' ? 'text-green-600' : 'text-[#6B6B6B]')}>
                                                        {item.status === 'pending' ? 'Awaiting your response' : item.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="primary"
                                                size="md"
                                                onClick={function () { handleContactUser(item); }}
                                            >
                                                Contact
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-[#F5F5F5] rounded-2xl">
                                <svg className="mx-auto h-16 w-16 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-black">No interested candidates yet</h3>
                                <p className="mt-2 text-[#6B6B6B]">
                                    Freelancers who send requests for this job will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Main list view
    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-black mb-2">My Posted Jobs</h1>
                    <p className="text-[#6B6B6B]">Jobs you've posted and their status</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['all', 'open', 'pending', 'in_progress', 'completed', 'cancelled'].map(function (filter) {
                        var label = filter === 'all' ? 'All Jobs' : filter.replace('_', ' ');
                        return (
                            <button
                                key={filter}
                                onClick={function () { setActiveFilter(filter); }}
                                className={activeFilter === filter
                                    ? 'px-4 py-2 rounded-full bg-black text-white font-medium capitalize whitespace-nowrap'
                                    : 'px-4 py-2 rounded-full bg-white text-[#6B6B6B] hover:bg-[#F5F5F5] border border-[#E5E5E5] capitalize whitespace-nowrap'}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* Jobs Grid */}
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map(function (job) {
                            var status = getJobStatus(job);
                            var order = jobOrders[job._id];

                            return (
                                <div
                                    key={job._id}
                                    onClick={function () { handleJobClick(job); }}
                                    className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                                >
                                    {/* Image */}
                                    <div className="h-40 bg-[#F5F5F5] relative">
                                        {job.images && job.images[0] ? (
                                            <img
                                                src={job.images[0]}
                                                alt={job.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#6B6B6B]">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Status Badge Overlay */}
                                        <span className={"absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium " + getStatusBadge(status)}>
                                            {status}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-[#6B6B6B]">{job.category}</span>
                                            {order && (
                                                <span className="text-xs text-[#6B6B6B]">
                                                    Freelancer: {order.sellerName}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-medium text-black mb-3 line-clamp-2">
                                            {job.title}
                                        </h3>

                                        <div className="flex items-center justify-between pt-3 border-t border-[#E5E5E5]">
                                            <span className="font-semibold text-black">
                                                {formatBudget(job.budget)}
                                            </span>
                                            <span className="text-sm text-[#6B6B6B]">
                                                View Details →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#F5F5F5] rounded-2xl">
                        <svg className="mx-auto h-16 w-16 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-black">
                            {myJobs.length === 0 ? 'No jobs posted yet' : 'No ' + activeFilter.replace('_', ' ') + ' jobs'}
                        </h3>
                        <p className="mt-2 text-[#6B6B6B]">
                            {myJobs.length === 0 ? 'Create a job posting to find freelancers!' : 'No jobs match the selected filter.'}
                        </p>
                        {myJobs.length === 0 && (
                            <Link
                                to="/create-project"
                                className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-[#1A1A1A] transition-colors"
                            >
                                Post a Job
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Saved;
