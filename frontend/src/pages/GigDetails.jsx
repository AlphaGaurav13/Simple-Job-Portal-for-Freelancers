// ================================================
// 🎯 GIG DETAILS PAGE - Single Gig View
// ================================================
// Displays detailed information about a specific gig
// Premium minimalist design
// ================================================

// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import navigation
import { useParams, Link, useNavigate } from 'react-router-dom';

// Import auth context
import { useAuth } from '../context/AuthContext';

// Import API
import { projectAPI } from '../api/api';

// Import UI components
import Button from '../components/ui/Button';

// API Base URL from environment or default
var API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// GIG DETAILS COMPONENT
// ================================================
function GigDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [proposalStatus, setProposalStatus] = useState(null); // 'pending', 'accepted', etc.
    const [error, setError] = useState(null);

    useEffect(function () {
        fetchGig();
        if (isAuthenticated) {
            checkProposalStatus();
        }
    }, [id, isAuthenticated]);

    async function checkProposalStatus() {
        try {
            const response = await fetch(API_BASE_URL + '/api/proposals/check/' + id, {
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success && data.hasApplied) {
                setProposalStatus(data.status);
            }
        } catch (err) {
            console.error('Error checking proposal status:', err);
        }
    }

    async function fetchGig() {
        try {
            setLoading(true);
            const response = await projectAPI.getById(id);

            if (response.success && response.data) {
                const data = response.data;

                // Handle populated client object
                const clientData = (data.client && typeof data.client === 'object')
                    ? data.client
                    : { _id: data.client, name: 'Freelancer', avatar: null };

                const sellerId = data.sellerId || clientData._id || data.client;

                const formattedGig = {
                    id: data._id || id,
                    title: data.title || 'Untitled Gig',
                    description: data.description || 'No description provided.',
                    price: data.budget && data.budget.fixed
                        ? data.budget.fixed
                        : (data.budget && data.budget.min) || 0,
                    rating: data.rating || 'New',
                    reviews: data.proposalCount || 0,
                    seller: {
                        name: clientData.name || 'Anonymous Client',
                        avatar: clientData.avatar || null,
                        level: 'Project Owner',
                        id: clientData._id || data.client
                    },
                    image: data.images && data.images[0] ? data.images[0] : null,
                    features: data.features || ['Project Milestone 1', 'Standard Quality', 'Professional Communication'],
                    category: data.category || 'General',
                    status: data.status || 'open'
                };
                setGig(formattedGig);
            } else {
                setError('Gig not found');
            }

        } catch (err) {
            console.error('Error fetching gig:', err);
            setError('Failed to load gig details');
        } finally {
            setLoading(false);
        }
    }

    // Handle Send Proposal
    async function handleSendProposal() {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Prevent owner from applying to own project
        var currentUserId = user ? (user._id || user.id) : null;
        if (gig.seller.id === currentUserId) {
            alert("You cannot send a request to your own project.");
            return;
        }

        if (!gig.seller.id) {
            alert("Error: Project Owner ID is missing. Cannot send request.");
            return;
        }

        setSubmitting(true);
        try {
            // Call API to create proposal
            const response = await fetch(API_BASE_URL + '/api/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    gigId: gig.id,
                    sellerId: gig.seller.id
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Request sent successfully! Wait for the owner to approve.');
                setProposalStatus('pending');
            } else {
                alert(data.message || 'Failed to send request');
            }
        } catch (err) {
            console.error('Error sending request:', err);
            alert('Failed to send request. Check console for details.');
        } finally {
            setSubmitting(false);
        }
    }

    // ============================================
    // RENDER: Loading state
    // ============================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900">
                Loading...
            </div>
        );
    }

    // ============================================
    // RENDER: Error state
    // ============================================
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-red-600">
                {error}
            </div>
        );
    }

    // ============================================
    // RENDER: Gig not found
    // ============================================
    if (!gig) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 text-neutral-900">
                Gig not found
            </div>
        );
    }

    // ============================================
    // RENDER: Main content
    // ============================================
    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
            <div className="container-custom mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8 min-w-0 overflow-hidden">

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 break-words overflow-hidden">
                            {gig.title}
                        </h1>

                        {/* Seller Info */}
                        <div className="flex items-center gap-4">
                            {/* Seller Avatar - shows image or initial */}
                            {gig.seller.avatar ? (
                                <img
                                    src={gig.seller.avatar}
                                    alt={gig.seller.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xl font-semibold">
                                    {gig.seller.name ? gig.seller.name.charAt(0).toUpperCase() : 'F'}
                                </div>
                            )}
                            <div>
                                <span className="text-sm text-neutral-500">
                                    {gig.seller.level} | ★ {gig.rating}
                                </span>
                            </div>
                            {/* Status Badge */}
                            <div className="ml-auto">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 ${gig.status === 'open'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : gig.status === 'in-progress'
                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                                    }`}>
                                    {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        {/* Gig Image - Only show if image exists */}
                        {gig.image && (
                            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm">
                                <img
                                    src={gig.image}
                                    alt={gig.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        {/* Description */}
                        <div className="bg-white p-8 rounded-xl border border-neutral-200 overflow-hidden">
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                                About This Gig
                            </h2>
                            <p className="text-neutral-600 leading-relaxed break-words whitespace-pre-wrap">
                                {gig.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Action */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">

                            {/* Package Header */}
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-neutral-500 font-medium">Standard Package</span>
                                <span className="text-2xl font-semibold text-neutral-900">${gig.price}</span>
                            </div>

                            {/* Package Description */}
                            <p className="text-neutral-500 mb-6 text-sm">
                                One concept, high resolution, source file included.
                            </p>

                            {/* Features List */}
                            <div className="space-y-3 mb-8">
                                {gig.features.map(function (feature, index) {
                                    return (
                                        <div key={index} className="flex items-center gap-2 text-neutral-700 text-sm">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Send Request Button */}
                            {/* HIDE FOR OWNER OR NON-OPEN STATUS */}
                            {gig.status === 'open' ? (
                                (!isAuthenticated || (gig.seller.id !== (useAuth().user && (useAuth().user._id || useAuth().user.id)))) ? (
                                    proposalStatus ? (
                                        <div className="text-center p-4 bg-blue-50 border-2 border-blue-100 rounded-lg text-blue-700 font-bold mb-4">
                                            Request {proposalStatus.charAt(0).toUpperCase() + proposalStatus.slice(1)}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleSendProposal}
                                            disabled={submitting}
                                            className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                                        >
                                            {submitting ? 'Sending Request...' : `Send Request ($${gig.price})`}
                                        </button>
                                    )
                                ) : (
                                    <div className="text-center p-4 bg-neutral-100 rounded-lg text-neutral-500 text-sm font-bold mb-4">
                                        You own this project
                                    </div>
                                )
                            ) : (
                                <div className="text-center p-4 bg-red-50 border-2 border-red-100 rounded-lg text-red-600 text-sm font-bold mb-4">
                                    This project is no longer accepting requests
                                </div>
                            )}

                            {/* Contact Owner - Hide for Owner or Non-Open Status */}
                            {gig.status === 'open' && (!isAuthenticated || (gig.seller.id !== (useAuth().user && (useAuth().user._id || useAuth().user.id)))) && (
                                <button
                                    onClick={function () {
                                        if (isAuthenticated) {
                                            navigate('/messages', {
                                                state: {
                                                    recipient: {
                                                        id: gig.seller.id,
                                                        name: gig.seller.name,
                                                        avatar: gig.seller.avatar
                                                    },
                                                    message: 'Hello'
                                                }
                                            });
                                        } else {
                                            navigate('/login');
                                        }
                                    }}
                                    className="w-full py-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-bold"
                                >
                                    Contact Owner
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the component
export default GigDetails;



