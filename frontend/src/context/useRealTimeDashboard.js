// ================================================
// 📊 useRealTimeDashboard - Custom Hook
// ================================================
// Provides real-time dashboard data from the API
// No mock data - all data is fetched from the database
//
// CONCEPTS USED:
// - Custom Hooks
// - useState, useEffect, useRef
// - Regular functions
// ================================================

// Import React hooks
import { useState, useEffect, useRef } from 'react';

// Import context hooks
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';

// Import API functions
import { userAPI, projectAPI } from '../api/api';

// ================================================
// CUSTOM HOOK: useRealTimeDashboard
// ================================================
function useRealTimeDashboard() {
    // Get socket and user from context
    const { socket } = useSocket();
    const { user } = useAuth();

    // ============================================
    // STATE: Dashboard Statistics
    // ============================================
    const [stats, setStats] = useState({
        activeOrders: { count: 0, trend: 0, loading: true },
        unreadMessages: { count: 0, new: 0, loading: true },
        earnings: { total: 0, today: 0, weekly: 0, monthly: 0, trend: 0, loading: true }
    });

    // ============================================
    // STATE: Dashboard Data
    // ============================================
    const [orders, setOrders] = useState([]);
    const [recommendedGigs, setRecommendedGigs] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [isRealTimeActive, setIsRealTimeActive] = useState(false);

    // ============================================
    // REFS: For polling intervals
    // ============================================
    const statsPollingRef = useRef(null);
    const gigsPollingRef = useRef(null);

    // Polling interval in milliseconds (10 seconds)
    const POLLING_INTERVAL = 10000;

    // ============================================
    // FUNCTION: Fetch User Stats from API
    // ============================================
    async function fetchUserStats() {
        try {
            // Call the real API
            const response = await userAPI.getStats();

            if (response.success && response.data) {
                const data = response.data;

                // Update stats with real data
                setStats({
                    activeOrders: {
                        count: data.activeOrders.count || 0,
                        trend: data.activeOrders.inProgress || 0,
                        loading: false
                    },
                    unreadMessages: {
                        count: data.unreadMessages.count || 0,
                        new: data.unreadMessages.new || 0,
                        loading: false
                    },
                    earnings: {
                        total: data.earnings.total || 0,
                        today: data.earnings.today || 0,
                        weekly: data.earnings.weekly || 0,
                        monthly: data.earnings.monthly || 0,
                        trend: 0,
                        loading: false
                    }
                });
            }
        } catch (error) {
            console.error('Failed to fetch user stats:', error);
            // Set loading to false even on error
            setStats(function (prev) {
                return {
                    activeOrders: { ...prev.activeOrders, loading: false },
                    unreadMessages: { ...prev.unreadMessages, loading: false },
                    earnings: { ...prev.earnings, loading: false }
                };
            });
        }
    }

    // ============================================
    // FUNCTION: Fetch Active Orders from API
    // ============================================
    async function fetchActiveOrders() {
        try {
            // Call the real API
            const response = await userAPI.getActiveOrders();

            if (response.success) {
                setOrders(response.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch active orders:', error);
            setOrders([]);
        }
    }

    // ============================================
    // FUNCTION: Fetch Latest Gigs from API
    // ============================================
    async function fetchRecommendedGigs() {
        try {
            // Call the real API for latest projects (sorted by newest, limit 4)
            const response = await projectAPI.getAll({
                status: 'open',
                limit: 4,
                sort: '-createdAt'
            });

            if (response.success && response.data && response.data.length > 0) {
                // Map to display format (max 4)
                const mappedGigs = [];

                response.data.slice(0, 4).forEach(function (gig) {
                    // Build price string
                    let priceString = '$0';
                    if (gig.budget && gig.budget.fixed) {
                        priceString = '$' + gig.budget.fixed;
                    } else if (gig.budget && gig.budget.min) {
                        priceString = '$' + gig.budget.min + ' - $' + (gig.budget.max || 0);
                    }

                    // Build image URL
                    let imageUrl = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800';
                    if (gig.images && gig.images.length > 0) {
                        imageUrl = gig.images[0];
                    }

                    mappedGigs.push({
                        id: gig._id,
                        title: gig.title,
                        price: priceString,
                        image: imageUrl,
                        rating: 'New',
                        reviews: gig.proposalCount || 0,
                        category: gig.category,
                        sellerName: gig.client && gig.client.name ? gig.client.name : 'Client'
                    });
                });

                setRecommendedGigs(mappedGigs);
            } else {
                // No gigs found
                setRecommendedGigs([]);
            }
        } catch (error) {
            console.error('Failed to fetch latest jobs:', error);
            setRecommendedGigs([]);
        }
    }

    // ============================================
    // FUNCTION: Fetch All Data
    // ============================================
    async function fetchAllData() {
        setDataLoading(true);

        // Fetch all data
        await fetchUserStats();
        await fetchActiveOrders();
        await fetchRecommendedGigs();

        setDataLoading(false);
    }

    // ============================================
    // FUNCTION: Start Polling
    // ============================================
    function startPolling() {
        console.log('📊 Starting polling for dashboard data');

        // Poll stats every 10 seconds
        statsPollingRef.current = setInterval(function () {
            fetchUserStats();
            fetchActiveOrders();
        }, POLLING_INTERVAL);

        // Poll gigs every 30 seconds
        gigsPollingRef.current = setInterval(function () {
            fetchRecommendedGigs();
        }, POLLING_INTERVAL * 3);
    }

    // ============================================
    // FUNCTION: Stop Polling
    // ============================================
    function stopPolling() {
        console.log('⏸️ Stopping polling');

        if (statsPollingRef.current) {
            clearInterval(statsPollingRef.current);
        }
        if (gigsPollingRef.current) {
            clearInterval(gigsPollingRef.current);
        }
    }

    // ============================================
    // EFFECT: Socket Event Listeners
    // ============================================
    useEffect(function () {
        if (!socket || !user) {
            return;
        }

        console.log('🔌 Setting up real-time listeners');
        setIsRealTimeActive(true);
        stopPolling();

        // Handle new order event
        function handleNewOrder(order) {
            console.log('📦 New order:', order);
            setOrders(function (prev) {
                return [order].concat(prev);
            });
        }

        // Handle order update event
        function handleOrderUpdate(update) {
            console.log('📊 Order update:', update);
            setOrders(function (prev) {
                return prev.map(function (order) {
                    if (order.id === update.orderId) {
                        return Object.assign({}, order, { status: update.status });
                    }
                    return order;
                });
            });
        }

        // Register event listeners
        socket.on('order:new', handleNewOrder);
        socket.on('order:update', handleOrderUpdate);
        socket.on('dashboard:refresh', fetchAllData);

        // Cleanup function
        return function () {
            socket.off('order:new', handleNewOrder);
            socket.off('order:update', handleOrderUpdate);
            socket.off('dashboard:refresh', fetchAllData);
        };
    }, [socket, user]);

    // ============================================
    // EFFECT: Fallback Polling
    // ============================================
    useEffect(function () {
        if (!socket && user) {
            console.log('⚠️ Using polling fallback');
            setIsRealTimeActive(false);
            startPolling();
        }

        return function () {
            stopPolling();
        };
    }, [socket, user]);

    // ============================================
    // EFFECT: Initial Data Fetch
    // ============================================
    useEffect(function () {
        if (user) {
            fetchAllData();
        }
    }, [user]);

    // ============================================
    // FUNCTION: Manual Refresh
    // ============================================
    function refresh() {
        console.log('🔄 Manual refresh');
        fetchAllData();
    }

    // ============================================
    // RETURN VALUE
    // ============================================
    return {
        stats: stats,
        orders: orders,
        recommendedGigs: recommendedGigs,
        dataLoading: dataLoading,
        isRealTimeActive: isRealTimeActive,
        refresh: refresh,
        fetchActiveOrders: fetchActiveOrders,
        fetchUserStats: fetchUserStats,
        fetchRecommendedGigs: fetchRecommendedGigs
    };
}

// ================================================
// EXPORT
// ================================================
export { useRealTimeDashboard };
