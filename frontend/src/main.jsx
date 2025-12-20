// ================================================
// 📦 MAIN.JSX - Application Entry Point
// ================================================
// This is the starting point of the React application
// It renders the App component into the DOM
//
// CONCEPTS USED:
// - ES6 Modules (import/export)
// - React Components
// - useContext (via providers)
// ================================================

// Import React library
import React from 'react';

// Import ReactDOM for rendering to the DOM
import ReactDOM from 'react-dom/client';

// Import main App component
import App from './App.jsx';

// Import global CSS styles (Tailwind CSS)
import './index.css';

// Import Context Providers
// AuthProvider - manages user authentication state
import { AuthProvider } from './context/AuthContext';

// SocketProvider - manages WebSocket connection
import { SocketProvider } from './context/SocketContext';

// ================================================
// RENDER THE APPLICATION
// ================================================
// Get the root element from HTML
const rootElement = document.getElementById('root');

// Create React root
const root = ReactDOM.createRoot(rootElement);

// Render the application
// Wrapped in providers to share state across components
root.render(
    <React.StrictMode>
        <AuthProvider>
            <SocketProvider>
                <App />
            </SocketProvider>
        </AuthProvider>
    </React.StrictMode>
);
