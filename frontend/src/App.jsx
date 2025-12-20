// ================================================
// 📱 APP.JSX - Main Application Component
// ================================================
// Root component that sets up routing and layout
//
// CONCEPTS USED:
// - Functional Components
// - Props
// - ES6 Modules (import/export)
// - JSX
// ================================================

// Import React
import React from 'react';

// Import React Router for navigation
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ================================================
// Import Layout Components
// ================================================
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// ================================================
// Import Page Components
// ================================================
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import GigDetails from './pages/GigDetails';
import SellerProfile from './pages/SellerProfile';
import Profile from './pages/Profile';
import CreateProject from './pages/CreateProject';
import Gigs from './pages/Gigs';
import Messages from './pages/Messages';
import Categories from './pages/Categories';
import Saved from './pages/Saved';
import Orders from './pages/Orders';

// ================================================
// Import UI Components
// ================================================
import NotificationToast from './components/ui/NotificationToast';
import ScrollToTop from './components/ui/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';

// ================================================
// APP COMPONENT
// ================================================
// Main application component with routing

function App() {
    return (
        <BrowserRouter>
            {/* Main container with flex layout */}
            <div className="flex flex-col min-h-screen bg-surface-primary transition-colors duration-300">

                {/* Navigation Bar - shown on all pages */}
                <Navbar />

                {/* Global Notification Toast */}
                <NotificationToast />

                {/* Main Content Area */}
                <main className="flex-grow">
                    <Routes>
                        {/* Home/Landing Page */}
                        <Route path="/" element={<Dashboard />} />

                        {/* User Dashboard (after login) */}
                        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

                        {/* User Profile Page */}
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                        {/* Create New Project (for clients) */}
                        <Route path="/create-project" element={<CreateProject />} />

                        {/* Browse Gigs Page */}
                        <Route path="/gigs" element={<Gigs />} />

                        {/* Messages/Chat Page */}
                        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

                        {/* Login Page */}
                        <Route path="/login" element={<Login />} />

                        {/* Registration Page */}
                        <Route path="/join" element={<Register />} />

                        {/* Single Gig Details - :id is a URL parameter */}
                        <Route path="/gigs/:id" element={<GigDetails />} />

                        {/* Seller/Freelancer Profile - :id is a URL parameter */}
                        <Route path="/seller/:id" element={<SellerProfile />} />

                        {/* Categories Page - Browse all categories */}
                        <Route path="/categories" element={<Categories />} />

                        {/* Saved Items Page - User's saved gigs */}
                        <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />

                        {/* Orders Page - User's orders */}
                        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                        <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    </Routes>
                </main>

                {/* Footer - shown on all pages */}
                <Footer />

                {/* Scroll to Top Button */}
                <ScrollToTop />
            </div>
        </BrowserRouter>
    );
}

// Export the component as default
export default App;
