// ================================================
// 🔐 AUTH CONTEXT - Authentication State Management
// ================================================
// Manages user authentication across the application
//
// CONCEPTS USED:
// - useContext (React Hook)
// - useState (React Hook)
// - useEffect (React Hook)
// - Props (children)
// - Functional Components
// - Arrow Functions
// ================================================

// Import React and hooks
import React, { createContext, useState, useEffect, useContext } from 'react';

// Import auth API functions
import { authAPI } from '../api/api';

// ================================================
// STEP 1: CREATE CONTEXT
// ================================================
// Create a context object for authentication
const AuthContext = createContext();

// ================================================
// STEP 2: CUSTOM HOOK FOR USING AUTH
// ================================================
// This hook makes it easy to access auth state from any component

const useAuth = () => {
    // Get the context value
    const context = useContext(AuthContext);
    return context;
};

// ================================================
// STEP 3: AUTH PROVIDER COMPONENT
// ================================================
// This component wraps the app and provides auth state

const AuthProvider = ({ children }) => {
    // State for current user
    const [user, setUser] = useState(null);

    // State for loading status
    const [loading, setLoading] = useState(true);

    // ============================================
    // EFFECT: Load user on mount
    // ============================================
    useEffect(() => {
        // Function to load user from localStorage
        const loadUser = () => {
            try {
                // Get stored user data
                const storedUser = localStorage.getItem('user');

                if (storedUser) {
                    // Parse JSON string to object
                    const userData = JSON.parse(storedUser);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to load user:', error);
                // Clear invalid data
                localStorage.removeItem('user');
            }

            // Done loading
            setLoading(false);
        };

        // Call the function
        loadUser();
    }, []); // Empty array = run once on mount

    // ============================================
    // FUNCTION: Login
    // ============================================
    const login = async (credentials) => {
        // Call API
        const data = await authAPI.login(credentials);

        // Save user data
        setUser(data.user);

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    };

    // ============================================
    // FUNCTION: Register
    // ============================================
    const register = async (userData) => {
        // Call API
        const data = await authAPI.register(userData);

        // Save user data
        setUser(data.user);

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    };

    // ============================================
    // FUNCTION: Logout
    // ============================================
    const logout = () => {
        // Clear user state
        setUser(null);

        // Clear localStorage
        localStorage.removeItem('user');
    };

    // ============================================
    // FUNCTION: Update User (for profile edits)
    // ============================================
    const updateUser = (updatedUserData) => {
        // Merge with existing user data
        const newUser = { ...user, ...updatedUserData };

        // Update state
        setUser(newUser);

        // Update localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    // ============================================
    // CONTEXT VALUE
    // ============================================
    // This object is available to all child components
    const value = {
        user: user,
        loading: loading,
        login: login,
        register: register,
        logout: logout,
        updateUser: updateUser,
        isAuthenticated: user !== null
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <AuthContext.Provider value={value}>
            {/* Only render children when not loading */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// ================================================
// EXPORT
// ================================================
export { AuthProvider, useAuth };
