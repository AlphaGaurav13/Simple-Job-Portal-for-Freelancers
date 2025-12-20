// ================================================
// 🔌 SOCKET CONTEXT - WebSocket Connection Management
// ================================================
// Manages Socket.IO connection for real-time features
//
// CONCEPTS USED:
// - useContext (React Hook)
// - useState (React Hook)
// - useEffect (React Hook)
// - Functional Components
// ================================================

// Import React and hooks
import React, { createContext, useContext, useEffect, useState } from 'react';

// Import Socket.IO client
import io from 'socket.io-client';

// Import auth context to get user
import { useAuth } from './AuthContext';

// ================================================
// STEP 1: CREATE CONTEXT
// ================================================
const SocketContext = createContext();

// ================================================
// STEP 2: CUSTOM HOOK FOR USING SOCKET
// ================================================
const useSocket = () => {
    const context = useContext(SocketContext);
    return context;
};

// ================================================
// STEP 3: SOCKET PROVIDER COMPONENT
// ================================================
const SocketProvider = ({ children }) => {
    // State for socket connection
    const [socket, setSocket] = useState(null);

    // Get user from auth context
    const { user } = useAuth();

    // ============================================
    // EFFECT: Create socket connection
    // ============================================
    useEffect(() => {
        // Get API URL from environment or use default
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

        // Create new socket connection
        const newSocket = io(apiUrl);

        // Save socket to state
        setSocket(newSocket);

        // Cleanup function - runs when component unmounts
        return () => {
            // Close the socket connection
            newSocket.close();
        };
    }, []); // Empty array = run once on mount

    // ============================================
    // EFFECT: Join user room when logged in
    // ============================================
    useEffect(() => {
        // If socket exists and user is logged in
        if (socket && user && user.id) {
            // Tell server to join user's private room
            socket.emit('user:join', user.id);
            console.log('🔌 Joined socket room for user:', user.id);
        }
    }, [socket, user]); // Run when socket or user changes

    // ============================================
    // CONTEXT VALUE
    // ============================================
    const value = {
        socket: socket
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

// ================================================
// EXPORT
// ================================================
export { SocketProvider, useSocket };
