// ================================================
// 📡 API.JS - API Service Functions
// ================================================
// This file handles all communication with the backend
// Uses fetch API for HTTP requests
//
// CONCEPTS USED:
// - Arrow Functions
// - async/await
// - Destructuring
// - Spread Operator
// - ES6 Modules (import/export)
// ================================================

// ================================================
// CONFIGURATION
// ================================================

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// ================================================
// GENERIC FETCH FUNCTION
// ================================================
// This is a reusable function for making API calls

const apiFetch = async (endpoint, options = {}) => {
    try {
        // Make the fetch request
        // IMPORTANT: credentials: 'include' is required for session-based auth
        // This ensures cookies (session ID) are sent with cross-origin requests
        const response = await fetch(API_BASE_URL + endpoint, {
            // Set default headers and merge with any custom headers
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            // Include credentials for session cookie
            credentials: 'include',
            // Spread other options (method, body, etc.)
            ...options
        });

        // Parse the JSON response
        const data = await response.json();

        // If response is not OK (status 400+), throw error
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        // Return the data
        return data;

    } catch (error) {
        // Log the error
        console.error('API Error (' + endpoint + '):', error);
        // Re-throw so calling code can handle it
        throw error;
    }
};

// ================================================
// CATEGORY API FUNCTIONS
// ================================================

const categoryAPI = {
    // Get all categories
    getAll: () => {
        return apiFetch('/api/categories');
    },

    // Get featured categories only
    getFeatured: () => {
        return apiFetch('/api/categories/featured');
    },

    // Get single category by slug
    getBySlug: (slug) => {
        return apiFetch('/api/categories/' + slug);
    }
};

// ================================================
// PROJECT API FUNCTIONS
// ================================================

const projectAPI = {
    // Get all projects with optional filters
    getAll: (params) => {
        // Build query string from params object
        let queryString = '';

        if (params) {
            // Convert object to array of key=value strings
            const queryParts = [];

            // Use forEach to iterate (allowed array method)
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    queryParts.push(key + '=' + encodeURIComponent(params[key]));
                }
            });

            if (queryParts.length > 0) {
                queryString = '?' + queryParts.join('&');
            }
        }

        return apiFetch('/api/projects' + queryString);
    },

    // Get featured projects
    getFeatured: () => {
        return apiFetch('/api/projects/featured');
    },

    // Get single project by ID
    getById: (id) => {
        return apiFetch('/api/projects/' + id);
    },

    // Create new project
    create: (projectData) => {
        return apiFetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(projectData)
        });
    },

    // Update existing project
    update: (id, projectData) => {
        return apiFetch('/api/projects/' + id, {
            method: 'PUT',
            body: JSON.stringify(projectData)
        });
    }
};

// ================================================
// AUTHENTICATION API FUNCTIONS
// ================================================

const authAPI = {
    // Login user
    login: (credentials) => {
        return apiFetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    },

    // Register new user
    register: (userData) => {
        return apiFetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    // Logout user
    logout: () => {
        return apiFetch('/api/auth/logout', {
            method: 'POST'
        });
    }
};

// ================================================
// NEWSLETTER API FUNCTIONS
// ================================================

const newsletterAPI = {
    // Subscribe to newsletter
    subscribe: (email) => {
        return apiFetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: email })
        });
    }
};

// ================================================
// USER API FUNCTIONS
// ================================================

const userAPI = {
    // Get user dashboard stats
    getStats: () => {
        return apiFetch('/api/users/stats');
    },

    // Get all user orders
    getOrders: () => {
        return apiFetch('/api/users/orders');
    },

    // Get active orders only
    getActiveOrders: () => {
        return apiFetch('/api/users/orders/active');
    }
};

// ================================================
// ORDER API FUNCTIONS
// ================================================

const orderAPI = {
    // Create a new order
    create: (orderData) => {
        return apiFetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },

    // Get all orders for current user
    getAll: () => {
        return apiFetch('/api/orders');
    },

    // Get a single order by ID
    getById: (id) => {
        return apiFetch('/api/orders/' + id);
    },

    // Update order status
    updateStatus: (id, status) => {
        return apiFetch('/api/orders/' + id + '/status', {
            method: 'PUT',
            body: JSON.stringify({ status: status })
        });
    }
};

// ================================================
// EXPORT ALL API FUNCTIONS
// ================================================

export {
    API_BASE_URL,
    categoryAPI,
    projectAPI,
    authAPI,
    newsletterAPI,
    userAPI,
    orderAPI
};
