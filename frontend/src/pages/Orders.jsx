// ================================================
// 📦 ORDERS PAGE - User's Orders with Actions
// ================================================
// Cancel Order and Mark as Completed functionality
// ================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

// API Base URL from environment or default
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// ORDERS COMPONENT
// ================================================
function Orders() {
    var auth = useAuth();
    var user = auth.user;
    var isAuthenticated = auth.isAuthenticated;
    var navigate = useNavigate();

    var [orders, setOrders] = useState([]);
    var [loading, setLoading] = useState(true);
    var [activeFilter, setActiveFilter] = useState('all');
    var [selectedOrder, setSelectedOrder] = useState(null);
    var [actionLoading, setActionLoading] = useState(false);

    useEffect(function () {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [isAuthenticated, navigate]);

    async function fetchOrders() {
        try {
            setLoading(true);
            var response = await fetch(API_BASE_URL + '/api/orders', {
                credentials: 'include'
            });
            var data = await response.json();
            if (data.success) {
                // Filter to only show orders where user is the FREELANCER (seller)
                var userId = user ? (user.id || user._id) : null;
                var freelancerOrders = (data.data || []).filter(function (order) {
                    return order.sellerId === userId || (order.sellerId && order.sellerId.toString() === userId);
                });
                setOrders(freelancerOrders);
            }
        } catch (err) {
            console.error('Failed to fetch orders:', err);
        } finally {
            setLoading(false);
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
                // Update local state
                setOrders(function (prev) {
                    return prev.map(function (order) {
                        if ((order.id || order._id) === orderId) {
                            return { ...order, status: newStatus };
                        }
                        return order;
                    });
                });
                // Update selected order if viewing
                if (selectedOrder && (selectedOrder.id || selectedOrder._id) === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
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

    function getFilteredOrders() {
        if (activeFilter === 'all') return orders;
        return orders.filter(function (order) {
            return order.status === activeFilter;
        });
    }

    function getStatusBadgeClass(status) {
        if (status === 'pending') return 'bg-yellow-100 text-yellow-700';
        if (status === 'in_progress' || status === 'in-progress') return 'bg-blue-100 text-blue-700';
        if (status === 'completed') return 'bg-green-100 text-green-700';
        if (status === 'cancelled') return 'bg-red-100 text-red-700';
        return 'bg-[#F5F5F5] text-[#6B6B6B]';
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    function getUserRole(order) {
        var userId = user ? (user.id || user._id) : null;
        if (order.clientId === userId || (order.clientId && order.clientId.toString() === userId)) {
            return 'client';
        }
        return 'freelancer';
    }

    var filteredOrders = getFilteredOrders();

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container-custom text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
                    <p className="mt-4 text-[#6B6B6B]">Loading orders...</p>
                </div>
            </div>
        );
    }

    // Detail view for selected order
    if (selectedOrder) {
        var role = getUserRole(selectedOrder);
        var canTakeAction = selectedOrder.status === 'pending' || selectedOrder.status === 'in_progress';

        return (
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container-custom max-w-3xl">
                    {/* Back Button */}
                    <button
                        onClick={function () { setSelectedOrder(null); }}
                        className="flex items-center gap-2 text-[#6B6B6B] hover:text-black mb-6 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        Back to Orders
                    </button>

                    {/* Order Details Card */}
                    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-semibold text-black mb-2">{selectedOrder.title}</h1>
                                <p className="text-[#6B6B6B]">Order #{selectedOrder.id || selectedOrder._id}</p>
                            </div>
                            <span className={'px-4 py-2 rounded-full text-sm font-medium ' + getStatusBadgeClass(selectedOrder.status)}>
                                {selectedOrder.status}
                            </span>
                        </div>

                        {/* Order Info Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-[#E5E5E5]">
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Amount</p>
                                <p className="text-xl font-semibold text-black">${selectedOrder.amount || 0}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Package</p>
                                <p className="text-black font-medium">{selectedOrder.packageType || 'Standard'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Your Role</p>
                                <p className="text-black font-medium capitalize">{role}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Deadline</p>
                                <p className="text-black font-medium">{selectedOrder.deadline ? formatDate(selectedOrder.deadline) : 'Not set'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Client</p>
                                <p className="text-black font-medium">{selectedOrder.clientName || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#6B6B6B] mb-1">Freelancer</p>
                                <p className="text-black font-medium">{selectedOrder.sellerName || 'Unknown'}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {canTakeAction && (
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={function () { handleCancelOrder(selectedOrder.id || selectedOrder._id); }}
                                    disabled={actionLoading}
                                    className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                                >
                                    {actionLoading ? 'Processing...' : 'Cancel Order'}
                                </Button>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={function () { handleCompleteOrder(selectedOrder.id || selectedOrder._id); }}
                                    disabled={actionLoading}
                                    className="flex-1"
                                >
                                    {actionLoading ? 'Processing...' : 'Mark as Completed'}
                                </Button>
                            </div>
                        )}

                        {/* Status Messages */}
                        {selectedOrder.status === 'completed' && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
                                ✅ This order has been completed. Earnings have been added.
                            </div>
                        )}
                        {selectedOrder.status === 'cancelled' && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
                                ❌ This order has been cancelled.
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
                    <h1 className="text-2xl font-semibold text-black mb-2">My Orders</h1>
                    <p className="text-[#6B6B6B]">View and manage all your orders</p>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['all', 'pending', 'in_progress', 'completed', 'cancelled'].map(function (filter) {
                        var label = filter === 'all' ? 'All Orders' : filter.replace('_', ' ');
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

                {/* Orders List */}
                {filteredOrders.length > 0 ? (
                    <div className="space-y-4">
                        {filteredOrders.map(function (order) {
                            return (
                                <div
                                    key={order.id || order._id}
                                    className="bg-white rounded-2xl p-6 border border-[#E5E5E5] hover:shadow-lg transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Order Info */}
                                        <div>
                                            <h3 className="font-medium text-black mb-1">{order.title}</h3>
                                            <p className="text-sm text-[#6B6B6B]">Order #{order.id || order._id}</p>
                                        </div>

                                        {/* Status & Amount */}
                                        <div className="flex items-center gap-4">
                                            <span className={'px-3 py-1 rounded-full text-xs font-medium ' + getStatusBadgeClass(order.status)}>
                                                {order.status}
                                            </span>
                                            <span className="text-lg font-semibold text-black">${order.amount || 0}</span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 pt-4 border-t border-[#E5E5E5] flex items-center justify-between">
                                        <span className="text-sm text-[#6B6B6B]">
                                            Deadline: {order.deadline ? formatDate(order.deadline) : 'Not set'}
                                        </span>
                                        <button
                                            onClick={function () { setSelectedOrder(order); }}
                                            className="text-black hover:underline text-sm font-medium"
                                        >
                                            View Details →
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#F5F5F5] rounded-2xl">
                        <svg className="mx-auto h-16 w-16 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-black">No orders found</h3>
                        <p className="mt-2 text-[#6B6B6B]">
                            {activeFilter === 'all' ? 'You have no orders yet.' : 'No ' + activeFilter + ' orders.'}
                        </p>
                        <Link
                            to="/gigs"
                            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-[#1A1A1A] transition-colors"
                        >
                            Browse Services
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;
